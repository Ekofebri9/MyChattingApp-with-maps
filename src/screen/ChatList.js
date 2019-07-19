import React, { Component } from 'react';
import { Text, TouchableOpacity, SafeAreaView, FlatList, Image,View } from 'react-native';
import firebase from './rootNavigator/firebase';
import Icon from 'react-native-vector-icons/FontAwesome5'
import User from './User';
import styles from '../assets/Styles';
export default class ChatList extends Component {
    constructor(props) {
        super(props)
        this.state = {
           users:[]
        }
    }

    static navigationOptions = ({navigation})=> {
        return {
            title: 'Chats',
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.navigate('Maps')}>
                    <Icon name='map-marked-alt' size={30} color='#455a64' style={{padding:10 }}/>
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity onPress={()=>navigation.navigate('MyProfile')}>
                    <Icon name='user-cog' size={30} color='#455a64' style={{padding:10 }}/>
                </TouchableOpacity>
            ),
        }
    }
    componentDidMount(){
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added',(val)=>{
            let person = val.val();
            person.uid = val.key;
            if (person.uid === User.uid) {
                User.name = person.name
                User.telp = person.telp
                User.photo = person.photo
                User.email = person.email
                User.password = person.password
            }else {
                this.setState((prevState)=>{
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
            
        })
        
    }
    maps = async () => {
        this.props.navigation.navigate('Maps');
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{padding:10, borderBottomWidth:1, borderBottomColor:'#ccc'}} 
            onPress={()=>this.props.navigation.navigate('Chat',item)}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView>
                <View style={styles.containerRegister}>
                <FlatList 
                data={this.state.users}
                renderItem={this._renderItem}
                keyExtractor={(item,index) => index.toString()}
                />
                </View>
                
            </SafeAreaView>
        )
    }
}

