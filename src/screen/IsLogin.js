import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import User from './User';
import firebase from 'firebase';

export default class IsLogin extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyBSci7f2QlMpoLFVFmpBwcWrygEqYAg_SQ",
      authDomain: "my-chatting-tagloc-app.firebaseapp.com",
      databaseURL: "https://my-chatting-tagloc-app.firebaseio.com",
      projectId: "my-chatting-tagloc-app",
      storageBucket: "my-chatting-tagloc-app.appspot.com",
      messagingSenderId: "246986972924",
      appId: "1:246986972924:web:e72353509c20bedb"
  });
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.email = await AsyncStorage.getItem('email');
    this.props.navigation.navigate(User.email ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
