import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import User from '../screen/User';
import firebase from 'firebase';

export default class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('email').then(val => {
            if (val) {
                this.setState({email:val})
            }
        })
    }
    changerValue = field => value => { this.setState({[field]:value})}
    submit = async () => { 
        if (this.state.email.length < 5) {
            Alert.alert('Error','email salah')
        } else if (this.state.password.length < 3) {
            Alert.alert('Error','password salah')
        } else {
            await AsyncStorage.setItem('email',this.state.email)
            User.email = this.state.email
            firebase.database().ref('users/'+User.email).set({name: this.state.password});
            this.props.navigation.navigate('App');
        }
        
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={this.changerValue('email')}
                    onSubmitEditing={()=> this.password.focus()}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    placeholderTextColor = "#ffffff"
                    value={this.state.password}
                    onChangeText={this.changerValue('password')}
                    ref={(input) => this.password = input}/>
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={styles.buttonText}>LOGIN</Text>
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
        marginVertical: 10,
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