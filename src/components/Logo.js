import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Image  source={require('../assets/logo.png')} style={{width:70, height: 70}}/>
                <Text style={styles.logoText}>Find Me and Chat</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent:'flex-end',
        alignItems: 'center'
    },
    logoText : {
        marginVertical: 15,
        fontSize: 24,
        fontFamily: 'sans-serif-thin',
        color:'rgba(255, 255, 255, 0.7)'
    }
});