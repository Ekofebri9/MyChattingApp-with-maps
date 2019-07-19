import React, { Component } from 'react';
import { Text, View, TextInput, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import User from '../screen/User';
import firebase from '../screen/rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';
import styles from '../assets/Styles';

export default class Logo extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            telp: '',
            password: '',
            photo: ''
        }
    }
    changerValue = field => value => { this.setState({[field]:value})}
    submit = async () => { 
        if (this.state.name.length < 4 ) {
            Alert.alert('Error','name is not valid,it should be at least 4 caracters')
        } else if (this.state.telp.length < 10) {
            Alert.alert('Error','telephone numbers is not valid')
        } else {
            await AsyncStorage.setItem('email',this.state.email.trim())
            await AsyncStorage.setItem('password',this.state.password.trim())
            User.email = this.state.email
            User.password = this.state.password
            firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(),this.state.password.trim())
            .then(async(result)=>{
                await AsyncStorage.setItem('uid',result.user.uid)
                User.uid = result.user.uid
                Geolocation.getCurrentPosition(
                    async (position) => {
                        await firebase.database().ref('users/'+ result.user.uid).set({
                            name: this.state.name.trim(),
                            email: this.state.email.trim(),
                            telp: this.state.telp,
                            photo: this.state.photo || "https://images-na.ssl-images-amazon.com/images/I/51AfUgaGboL._SY445_.jpg",
                            password: this.state.password.trim(),
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
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                  alert('The password is too weak.');
                } else {
                  alert(errorMessage);
                }
                console.log(error);
              });
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    placeholder="Full Name"
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    value={this.state.name}
                    maxLength={64}
                    onChangeText={this.changerValue('name')}
                    onSubmitEditing={()=> this.email.focus()}/>
                <TextInput style={styles.inputBox}
                    placeholder="Email"
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    value={this.state.email}
                    maxLength={64}
                    onChangeText={this.changerValue('email')}
                    ref={(input) => this.email = input}
                    onSubmitEditing={()=> this.telp.focus()}/>
                <TextInput style={styles.inputBox}
                    placeholder="Telp"
                    selectionColor="#fff"
                    keyboardType="phone-pad"
                    placeholderTextColor = "#ffffff"
                    value={this.state.telp}
                    maxLength={13}
                    onChangeText={this.changerValue('telp')}
                    ref={(input) => this.telp = input}
                    onSubmitEditing={()=> this.photo.focus()}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Image Url"
                    selectionColor="#fff"
                    placeholderTextColor = "#ffffff"
                    value={this.state.photo}
                    onChangeText={this.changerValue('photo')}
                    ref={(input) => this.photo = input}
                    onSubmitEditing={()=> this.password.focus()}/>
                <TextInput style={styles.inputBox}
                    placeholder="Password"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    placeholderTextColor = "#ffffff"
                    value={this.state.password}
                    maxLength={32}
                    onChangeText={this.changerValue('password')}
                    ref={(input) => this.password = input}
                    onSubmitEditing={()=> this.password.focus()}/>
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>    
            </View>
        )
    }
}
