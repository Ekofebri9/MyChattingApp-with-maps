import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import User from '../screen/User';
import firebase from '../screen/rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';

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
        if (this.state.email.length < 5) {
            Alert.alert('Error', 'email is wrong')
        } else if (this.state.password.length < 3) {
            Alert.alert('Error', 'password is wrong')
        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(async (result) => {
                    await AsyncStorage.setItem('uid', result.user.uid)
                    User.uid = result.user.uid
                    Geolocation.getCurrentPosition(
                        async (position) => {
                            await firebase.database().ref('users/' + result.user.uid).update({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
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
                    onChangeText={this.changerValue('email')}
                    onSubmitEditing={() => this.password.focus()} />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    value={this.state.password}
                    onChangeText={this.changerValue('password')}
                    ref={(input) => this.password = input} />
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10,
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});