import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, Alert, Modal, TextInput } from 'react-native';
import firebase from './rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import User from './User';
import styles from '../assets/Styles';

export default class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.navigation.getParam('name'),
            email: props.navigation.getParam('email'),
            telp: props.navigation.getParam('telp'),
            photo: props.navigation.getParam('photo')
        }
    }
    static navigationOptions = ({navigation})=> {
        return {
            title: navigation.getParam('name', null),
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 2, backgroundColor: 'white' }}>
                    <Image source={{ uri: this.state.photo }} style={{ width: '80%', height: '100%', alignSelf: 'center' }} />
                </View>
                <View style={{ flex: 3, backgroundColor: '#455a64' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'white' }}>
                        <View style={{ width: '20%' }}>
                            <Icon name='user-astronaut' color='white' size={40} style={{ padding: 10 }} />
                        </View>
                        <Text style={{ fontSize: 18, color: 'white', }}>{this.state.name}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'white' }}>
                        <View style={{ width: '20%' }}>
                            <Icon name='mail-bulk' color='white' size={40} style={{ padding: 10 }} />
                        </View>
                        <Text style={{ fontSize: 18, color: 'white', }}>{this.state.email}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'white' }}>
                        <View style={{ width: '20%' }}>
                            <Icon name='phone-volume' color='white' size={40} style={{ padding: 10 }} />
                        </View>
                        <Text style={{ fontSize: 18, color: 'white', }}>{this.state.telp}</Text>
                    </View>
                </View>
            </View>
        )
    }
}