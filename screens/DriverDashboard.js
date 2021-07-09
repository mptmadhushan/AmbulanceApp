/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import GetLocation from 'react-native-get-location';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import APIKit, {setClientToken} from '../constants/apiKit';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import axios from 'axios';

const initialCurrentLocation = {
  streetName: 'Nuwara Eliya',
  gps: {
    latitude: 6.9567901,
    longitude: 80.7773807,
  },
};
const initialAmbulanceLocation = {
  location: {
    latitude: 6.9621409,
    longitude: 80.7680976,
  },
};
const DriverDash = ({route, navigation}) => {
  const [accInfo, setAccInfro] = React.useState('');
  const mapView = React.useRef();
  const [region, setRegion] = React.useState(null);
  const [fromLocation, setFromLocation] = React.useState(null);
  React.useEffect(() => {
    console.log('effect');
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        // console.log('location 👨‍✈️');
        // console.log(location);
        getLocations(location);
        console.log(location);
        setCurrLocation(location);
      })
      .catch(error => {
        console.log('location error 🌸');
        console.log(error);
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);
  const [location, setLocation] = React.useState('');
  const [currLocation, setCurrLocation] = React.useState('');

  function getLocations(loca) {
    const lat = loca.latitude;
    const lng = loca.longitude;
    console.log('lat, latlng');
    console.log(lat, lng);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBw9KFdObw6LqsJJR0Mln1acv4nqjVk7sg`,
      )
      .then(function (response) {
        // console.log('lca', response.data.results[0].formatted_address);
        console.log('lca', response.data);
        const locationName = response.data.results[0].formatted_address;
        var myArray = locationName.split(',');
        console.log('myArray[0] 🚂🚂');
        console.log(myArray[0]);
        setLocation(myArray[0]);
      })
      .catch(function (error) {
        console.log('cla', error);
      });
  }
  React.useEffect(() => {
    console.log('currLocation');
    console.log(currLocation);
    let fromLoc = initialCurrentLocation.gps;
    let toLoc = initialAmbulanceLocation.location;
    let street = initialCurrentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };
    setRegion(mapRegion);
    setFromLocation(fromLoc);
    getData();
  }, []);
  const getData = () => {
    const onSuccess = ({data}) => {
      // console.log('data', data);
      setAccInfro(data);
    };
    const onFailure = error => {
      console.log('error', error);
    };

    APIKit.get('/get_one').then(onSuccess).catch(onFailure);
  };
  function renderDestinationHeader() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <Image
            source={icons.red_pin}
            style={{
              width: 30,
              height: 30,
              marginRight: SIZES.padding,
            }}
          />

          <View style={{flex: 1}}>
            <Text style={{...FONTS.body3}}>{location}</Text>
          </View>

          {/* <Text style={{...FONTS.body3}}>{Date().toLocaleString()}</Text> */}
        </View>
      </View>
    );
  }

  function renderInfo() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 3,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          {/* Buttons */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding * 2,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 80,
                marginRight: 10,
                backgroundColor: COLORS.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('DriverScreen')}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>
                Name: {accInfo.username}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding * 2,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                marginRight: 10,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate('DriverScreen');
                // Linking.openURL('tel:119');
              }}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>
                More Information
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  function renderMap() {
    // const destinationMarker = () => (
    //   <Marker coordinate={toLocation}>
    //     <View
    //       style={{
    //         height: 40,
    //         width: 40,
    //         borderRadius: 20,
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         backgroundColor: COLORS.white,
    //       }}>
    //       <View
    //         style={{
    //           height: 30,
    //           width: 30,
    //           borderRadius: 15,
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           backgroundColor: COLORS.primary,
    //         }}>
    //         <Image
    //           source={icons.pin}
    //           style={{
    //             width: 25,
    //             height: 25,
    //             tintColor: COLORS.white,
    //           }}
    //         />
    //       </View>
    //     </View>
    //   </Marker>
    // );

    const carIcon = () => (
      <Marker
        coordinate={fromLocation}
        anchor={{x: 0.5, y: 0.5}}
        flat={true}
        // rotation={angle}
      >
        <Image
          source={icons.ambulance}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Marker>
    );

    return (
      <View style={{flex: 1}}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{flex: 1}}>
          {carIcon()}
        </MapView>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderInfo()}
      {/* {renderButtons()} */}
    </View>
  );
};

export default DriverDash;
