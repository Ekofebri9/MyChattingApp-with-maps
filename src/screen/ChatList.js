import React, { Component } from 'react';
import { Text, TouchableOpacity, SafeAreaView, FlatList, AsyncStorage, Image } from 'react-native';
import firebase from 'firebase';
import User from './User';
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
        headerRight: (
            <TouchableOpacity onPress={()=>navigation.navigate('MyProfile')}>
                <Image source={require('../assets/Logo.png')} style={{width:32, hight:32}}/>
            </TouchableOpacity>
        )
        }
        
    }

    componentDidMount(){
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added',(val)=>{
            let person = val.val();
            person.email = val.key;
            if (person.email === User.email) {
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
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
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
                <FlatList 
                data={this.state.users}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.email}
                />
                <TouchableOpacity onPress={this.logout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.maps}>
                    <Text>Go Maps</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

