import React, { Component } from 'react';
import { StyleSheet,TextInput,FlatList, Text, View, TouchableOpacity,SafeAreaView, Dimensions } from 'react-native'; 
import firebase from './rootNavigator/firebase';
import User from './User';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state ={
            person: {
                uid: props.navigation.getParam('uid'),
                emails: props.navigation.getParam('email'),
                password: props.navigation.getParam('name')
            },
            message: '',
            messageList: []
        }
      }
    static navigationOptions = ({navigation})=> {
        return {
            title: navigation.getParam('name',null)
        }
    }
    changer = key => val => {
        this.setState({[key]: val})
    }
    send = async () => {
        if (this.state.message.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.uid)
            .child(this.state.person.uid).push().key;
            let updates = {}
            let message = {
                message: this.state.message,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.uid
            }
            updates['messages/'+ User.uid+'/'+this.state.person.uid+'/'+msgId] = message;
            updates['messages/'+ this.state.person.uid+'/'+User.uid+'/'+msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({message: ''})
        }
    }
    _renderItem = ({ item }) => {
        return (
            <View style={{flexDirection: 'row', width: '60%', 
            alignSelf: item.from === User.uid ? 'flex-end' : 'flex-start',
            backgroundColor: item.from === User.uid ? '#00897b' : '#7cb342',
            borderRadius: 5,
            marginBottom:10 }}>
                <Text>{item.message}</Text>
                <Text style={{color: '#eee', padding: 3, fontSize: 12}}>{this.formatDate(item.time)}</Text>
            </View>
        )
    }
    componentDidMount(){
        let dbRef = firebase.database().ref('messages').child(User.uid).child(this.state.person.uid)
        .on('child_added',(val)=>{
            this.setState((prevState)=>{
                    return {
                        messageList: [...prevState.messageList, val.val()]
                    }
                })
            
        })
    }
    formatDate = (time) => {
        let date = new Date(time)
        let today = new Date()
        let result = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':';
        result+= (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        if (today.getDay() !== date.getDay()) {
            result = date.getDay() + ' ' + date.getMonth() + ' ' + result ;
        } 
        return result
    }

    render() {
        let {height, width } = Dimensions.get('window')
        return(
            <SafeAreaView>
                <FlatList 
                style={{padding:10,height: height*0.8,}}
                data={this.state.messageList}
                renderItem={this._renderItem}
                keyExtractor={(item,index) => index.toString()}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 5}}>
                <TextInput 
                value={this.state.message}
                onChangeText={this.changer('message')}
                placeholder='type here...'
                />
                <TouchableOpacity
                style={{paddingBottom: 10, marginLeft: 5}}
                onPress={this.send}>
                    <Text>Send</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'#455a64',
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    signupTextCont : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    },
});