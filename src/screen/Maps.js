import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, Dimensions,PermissionsAndroid } from 'react-native';
import firebase from './rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;
const LATITUDE = -7.7584436;
const LONGITUDE = 110.3759749;
const LATITUDE_DELTA = 0.0043;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            latitude: LATITUDE,
            longitude: LONGITUDE,
        }
    }

    static navigationOptions = {
        header: null
    }
    componentDidMount(){
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({longitude: position.coords.longitude, latitude:position.coords.latitude})
                console.warn(position);
            },
            (error) => {
                alert(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    onRegionChange = (region) => {
        this.setState({ region });
    }
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    render() {
        return (
            <View style={{flex: 1,
                alignItems:'center',
                justifyContent :'center'}
            }>
                <TouchableOpacity onPress={this.logout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <MapView
                style={{ flex: 1, width: width, }}
                provider={PROVIDER_GOOGLE}
                region={this.state.region}>
                <Marker coordinate={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE, }}
                    title={'halo'}
                    description={'cek'}
                />
            </MapView>
            </View>
            

        )
    }
}

