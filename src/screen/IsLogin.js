import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';
import Logo from '../components/Logo';
import User from './User';

export default class IsLogin extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    User.uid = await AsyncStorage.getItem('uid');
    setTimeout(()=>this.props.navigation.navigate(User.uid ? 'App' : 'Auth'),1000)
    
  };
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <ActivityIndicator size="large" color="#afb4ba" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});