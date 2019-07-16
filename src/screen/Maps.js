import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TextInput, AsyncStorage, Dimensions} from 'react-native';
const {width,height} = Dimensions.get('window')

const ASPECT_RATIO = width / height;
const LATITUDE = -7.7584436;
const LONGITUDE = 110.3759749;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Maps extends Component{
    constructor(props){
        super(props)
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
        }
    }

    static navigationOptions = {
        header:null
    }
      
    onRegionChange = (region) => {
        this.setState({ region });
    }
    render(){
        return(
            <MapView
                style={{flex:1, width:width}}
                provider={PROVIDER_GOOGLE}
                region={this.state.region}
            />
        )
    }
}

export default Maps