import React, { Component } from 'react';
import { StyleSheet, Text,TextInput, View, TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/FormRegister';

export default class Signup extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Logo/>
                <Form navigation={this.props.navigation}/>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Login') }>
                        <Text style={styles.signupButton}> Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Maps') }>
                        <Text style={styles.signupButton}> MAPS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'#455a64',
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    signupTextCont : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    }
});