import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import User from '../screen/User';
import firebase from '../screen/rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';

export default class Logo extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            telp: '',
            // birthday: new Date,
            password: ''
        }
    }
    changerValue = field => value => { this.setState({[field]:value})}
    submit = async () => { 
        if (this.state.email.length < 5) {
            Alert.alert('Error','email salah')
        } else if (this.state.password.length < 3) {
            Alert.alert('Error','password salah')
        } else {
            await AsyncStorage.setItem('email',this.state.email)
            await AsyncStorage.setItem('password',this.state.password)
            User.email = this.state.email
            User.password = this.state.password
            firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(async(result)=>{
                Geolocation.getCurrentPosition(
                    async (position) => {
                        await firebase.database().ref('users/'+ result.user.uid).set({
                            name: this.state.name,
                            email: this.state.email,
                            birthday: this.state.birthday,
                            telp: this.state.telp,
                            password: this.state.password,
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
            }).catch(function(error) {
                // Handle Errors here.
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
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Full Name"
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    value={this.state.name}
                    onChangeText={this.changerValue('name')}
                    onSubmitEditing={()=> this.email.focus()}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={this.changerValue('email')}
                    ref={(input) => this.email = input}
                    onSubmitEditing={()=> this.telp.focus()}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Telp"
                    selectionColor="#fff"
                    keyboardType="phone-pad"
                    placeholderTextColor = "#ffffff"
                    value={this.state.telp}
                    onChangeText={this.changerValue('telp')}
                    ref={(input) => this.telp = input}
                    onSubmitEditing={()=> this.birthday.focus()}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Date of Birthday"
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    value={this.state.birthday}
                    onChangeText={this.changerValue('birthday')}
                    ref={(input) => this.birthday = input}
                    onSubmitEditing={()=> this.password.focus()}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    placeholderTextColor = "#ffffff"
                    value={this.state.password}
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
const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    }
});