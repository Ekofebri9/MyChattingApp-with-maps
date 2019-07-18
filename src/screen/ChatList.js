import React, { Component } from 'react';
import { Text, TouchableOpacity, SafeAreaView, FlatList, AsyncStorage, Image } from 'react-native';
import firebase from './rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';
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
                {/* <Image source={require('../assets/Logo.png')} style={{width:32, hight:32}}/> */}
            </TouchableOpacity>
        )
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
                User.birthday = person.birthday
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
    logout = async () => {
        Geolocation.getCurrentPosition(
            async (position) => {
                await firebase.database().ref('users/' + User.uid).update({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                alert(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
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
                keyExtractor={(item,index) => index.toString()}
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

