import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class Logo extends Component {
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Full Name"
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    onSubmitEditing={()=> this.email.focus()}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    ref={(input) => this.email = input}
                    onSubmitEditing={()=> this.telp.focus()}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Telp"
                    selectionColor="#fff"
                    keyboardType="phone-pad"
                    placeholderTextColor = "#ffffff"
                    ref={(input) => this.telp = input}
                    onSubmitEditing={()=> this.birthday.focus()}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Date of Birthday"
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    ref={(input) => this.birthday = input}
                    onSubmitEditing={()=> this.password.focus()}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    placeholderTextColor = "#ffffff"
                    ref={(input) => this.password = input}
                    onSubmitEditing={()=> this.password.focus()}/>
                <TouchableOpacity style={styles.button}>
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