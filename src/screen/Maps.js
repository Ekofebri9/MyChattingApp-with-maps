import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
export default class Map extends Component { 
    render() {
        return (
        <MapView provider={ PROVIDER_GOOGLE }
                    style={{ flex: 1, width: window.width }} //window pake Dimensions
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421 
                    }} >
                    <MapView.Marker
                    coordinate={{
                        latitude: 38.78825,
                        longitude: -122.4324,
                    }}
                    title="Lokasi"
                    description="Hello" />
                </MapView>
        )  
    }
}