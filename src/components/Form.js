import React, { Component } from 'react';
import { Text, View, TextInput, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import User from '../screen/User';
import firebase from '../screen/rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';
import styles from '../assets/Styles';

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid').then(val => {
            if (val) {
                this.setState({ uid: val })
            }
        });
    }
    changerValue = field => value => { this.setState({ [field]: value }) }
    submit = () => {
        
        firebase.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password.trim())
            .then(async (result) => {
                await AsyncStorage.setItem('uid', result.user.uid)
                User.uid = result.user.uid
                Geolocation.getCurrentPosition(
                    async (position) => {
                        await firebase.database().ref('users/' + result.user.uid).update({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            status: true
                        });
                    },
                    (error) => {
                        alert(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
                this.props.navigation.navigate('App');
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    value={this.state.email}
                    maxLength={64}
                    onChangeText={this.changerValue('email')}
                    onSubmitEditing={() => this.password.focus()} />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    value={this.state.password}
                    maxLength={32}
                    onChangeText={this.changerValue('password')}
                    ref={(input) => this.password = input} />
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}