import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, Dimensions, FlatList, Image } from 'react-native';
import firebase from './rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';
import User from './User';
import styles from '../assets/Styles';
import mapStyle from '../assets/MapStyle';
const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;
const LATITUDE = -7.7584436;
const LONGITUDE = 110.3759749;
const LATITUDE_DELTA = 0.0103;
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
            users: [],
        }
    }

    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        Geolocation.getCurrentPosition(
            async (position) => {
                console.warn(position)
                await this.setState({longitude: position.coords.longitude, latitude: position.coords.latitude })
            },
            (error) => {
                alert(error.code, error.message+'there');
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid !== User.uid) {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }

    onRegionChange = (region) => {
        this.setState({ region });
    }
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemMap} onPress={() => {
                let LatitudeDelta = LATITUDE_DELTA-0.003
                let LongitudeDelta = LatitudeDelta*ASPECT_RATIO
                _mapView.animateToRegion({
                latitude: item.latitude,
                longitude: item.longitude,
                latitudeDelta: LatitudeDelta,
                longitudeDelta: LongitudeDelta,
            })}}>
                <Image source={{ uri: item.photo }} style={{ width: '100%', height: '80%' }} />
                <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                {(item.status) ?
                    (<Text style={[styles.textStatusMap, { color: '#11f515' }]}>Online</Text>) :
                    (<Text style={[styles.textStatusMap, { color: '#f00514' }]}>Offline</Text>)
                }
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.containerMap}>
                <View style={{position: 'absolute', top: '50%', left: 0, height:'100%'}} >
                <TouchableOpacity style={{backgroundColor: 'white'}}>
                    <Image source={{uri: User.photo}} width={30} height={30} borderRadius={5} />
                </TouchableOpacity>
                </View>
                
                <MapView
                    customMapStyle={mapStyle}
                    ref={(mapView) => { _mapView = mapView }}
                    style={{ flex: 1, width: width, }}
                    provider={PROVIDER_GOOGLE}
                    region={this.state.region}>
                    {this.state.users.map(user => (
                        <Marker coordinate={{
                            latitude: user.latitude,
                            longitude: user.longitude,
                        }}
                            title={user.name}
                            description={user.email}>
                        </Marker>
                    ))}
                </MapView>
                <View style={styles.listMap} >
                    <FlatList horizontal={true}
                        data={this.state.users}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )
    }
}