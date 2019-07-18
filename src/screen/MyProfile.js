import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from './rootNavigator/firebase';

export default class MyProfile extends Component {
    static navigationOptions = {
        title: 'My Profile',
        // headerRight: (
        //     <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyProfile')}>
        //         <Image source={require("http://creativecommons.org/licenses/by/3.0/")} style={{width:32, hight:32}}/>
        //     </TouchableOpacity>
        // )
    }

    // for edit profil =firebase.datebase().ref('users').child(User.email).set({name: this.state.name})
    // User.name=this.state.name
    render() {
        return (
            <View>
                <Text> hay</Text>
            </View>
        )
    }
}