import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, Alert, Modal, TextInput } from 'react-native';
import firebase from './rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import User from './User';
import styles from '../assets/Styles';

export default class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            name: User.name,
            email: User.email,
            telp: User.telp,
            password: User.password,
            photo: User.photo
        }
    }
    static navigationOptions = {
        title: 'My Profile',
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    changerValue = field => value => { this.setState({ [field]: value }) }
    logout = () => {
        Alert.alert('Logout', 'Do you want to logout?', [
            {
                text: 'Yes', onPress: async () => {
                    Geolocation.getCurrentPosition(
                        async (position) => {
                            await firebase.database().ref('users/' + User.uid).update({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                status: false
                            });
                        },
                        (error) => {
                            alert(error.code, error.message);
                        },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
                    await AsyncStorage.clear();
                    this.props.navigation.navigate('Auth');
                }
            },
            {
                text: 'No',
                style: 'cancel',
            }])

    }
    submit = async () => {
        Geolocation.getCurrentPosition(
            async (position) => {
                await firebase.database().ref('users/' + User.uid).update({
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
        () => this.setModalVisible(!this.state.modalVisible)
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 2, backgroundColor: 'white' }}>
                    <Image source={{ uri: User.photo }} style={{ width: '80%', height: '100%', alignSelf: 'center' }} />
                </View>
                <View style={{ flex: 3, backgroundColor: '#455a64' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'white' }}>
                        <View style={{ width: '20%' }}>
                            <Icon name='user-astronaut' color='white' size={40} style={{ padding: 10 }} />
                        </View>
                        <Text style={{ fontSize: 18, color: 'white', }}>{User.name}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'white' }}>
                        <View style={{ width: '20%' }}>
                            <Icon name='mail-bulk' color='white' size={40} style={{ padding: 10 }} />
                        </View>
                        <Text style={{ fontSize: 18, color: 'white', }}>{User.email}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'white' }}>
                        <View style={{ width: '20%' }}>
                            <Icon name='phone-volume' color='white' size={40} style={{ padding: 10 }} />
                        </View>
                        <Text style={{ fontSize: 18, color: 'white', }}>{User.telp}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'white' }}>
                        <TouchableOpacity onPress={() => {
                            this.setModalVisible(true);
                        }} style={{ flex: 1, marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 7, backgroundColor: 'rgba(255, 255,255,0.2)' }}>
                            <Icon name='user-edit' color='#dbff26' size={40} style={{ padding: 10 }} />
                            <Text style={{ fontSize: 18, color: '#dbff26', }}>Edit profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.logout} style={{ flex: 1, marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 7, backgroundColor: 'rgba(255, 255,255,0.2)' }}>
                            <Icon name='sign-out-alt' color='#fa1134' size={40} style={{ padding: 10 }} />
                            <Text style={{ fontSize: 18, color: '#fa1134', }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <TouchableOpacity
                        style={{ height: '100%', width: '100%' }}
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={[styles.containerRegister, { alignSelf: 'center' }]}>
                            <TextInput style={[styles.inputBox, { marginVertical: 5 }]}
                                placeholder="Full Name"
                                placeholderTextColor="#ffffff"
                                selectionColor="#fff"
                                value={this.state.name}
                                maxLength={64}
                                onChangeText={this.changerValue('name')}
                                onSubmitEditing={() => this.email.focus()} />
                            <TextInput style={styles.inputBox}
                                placeholder="Email"
                                placeholderTextColor="#ffffff"
                                selectionColor="#fff"
                                keyboardType="email-address"
                                value={this.state.email}
                                maxLength={64}
                                onChangeText={this.changerValue('email')}
                                ref={(input) => this.email = input}
                                onSubmitEditing={() => this.telp.focus()} />
                            <TextInput style={styles.inputBox}
                                placeholder="Telp"
                                selectionColor="#fff"
                                keyboardType="phone-pad"
                                placeholderTextColor="#ffffff"
                                value={this.state.telp}
                                maxLength={13}
                                onChangeText={this.changerValue('telp')}
                                ref={(input) => this.telp = input}
                                onSubmitEditing={() => this.photo.focus()} />
                            <TextInput style={styles.inputBox}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Image Url"
                                selectionColor="#fff"
                                placeholderTextColor="#ffffff"
                                value={this.state.photo}
                                onChangeText={this.changerValue('photo')}
                                ref={(input) => this.photo = input}
                                onSubmitEditing={() => this.password.focus()} />
                            <TextInput style={styles.inputBox}
                                placeholder="Password"
                                selectionColor="#fff"
                                secureTextEntry={true}
                                placeholderTextColor="#ffffff"
                                value={this.state.password}
                                maxLength={32}
                                onChangeText={this.changerValue('password')}
                                ref={(input) => this.password = input}
                                onSubmitEditing={() => this.password.focus()} />
                            <TouchableOpacity style={styles.button} onPress={ this.submit }>
                                <Text style={styles.buttonText}>Update Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

            </View>
        )
    }
}