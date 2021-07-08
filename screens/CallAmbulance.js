/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  View,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import {Card, SimpleCard} from '@paraboly/react-native-card';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import MImagePicker from 'react-native-image-video-picker-editor';
import Spinner from 'react-native-loading-spinner-overlay';
import APIKit, {setClientToken} from '../constants/apiKit';
import AsyncStorage from '@react-native-community/async-storage';

function CallAmbulance({navigation}) {
  const [selectedVideo, setVideo] = React.useState('');
  const [result, setResult] = React.useState('');
  const [locationData, setLocationData] = React.useState('');
  const [filePath, setFilePath] = React.useState('');
  const [spinner, setSpinner] = React.useState(false);
  const [newData, setUserData] = React.useState('');
  React.useEffect(() => {
    getData();
    console.log('effect');
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        // console.log('location 👨‍✈️');
        // console.log(location);
        // getLocations(location);
        console.log(location);
        setLocationData(location);
      })
      .catch(error => {
        console.log('location error 🌸');
        console.log(error);
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);
  const getData = async () => {
    console.log('cis');
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const userData = JSON.parse(jsonValue);
      setUserData(userData.user);
      console.log(newData);
    } catch (e) {
      console.log('ee');
      navigation.navigate('OnBoard2');

      // error reading value
    }
  };
  const createTwoButtonAlert = () =>
    Alert.alert('Success.!', 'Video has been successfully submitted..', [
      {
        text: 'OK',
        // onPress: () =>
        //  navigation.navigate('AmbulanceMap'
        //  ),
      },
    ]);
  const uploadVideo = async fileUrl => {
    console.log('upload');
    console.log('🧑‍🚀🧑‍🚀', fileUrl);
    setSpinner(true);
    // const video2 = selectedVideo;
    let formData = new FormData();
    // console.log('newImageUri 😹', fileUrl.uri);
    // console.log('fileUrl replace 🐶', fileUrl.uri.replace('file://', ''));
    setFilePath(fileUrl);
    formData.append('video', {
      uri:
        Platform.OS === 'android'
          ? fileUrl.uri
          : fileUrl.uri.replace('file://', ''),
      type: 'video/mp4',
      name: 'name.mp4',
    });
    console.log(formData);
    fetch('http://sahan1314.pythonanywhere.com/accident_type', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('response 🤡🤡');
        console.log(fileUrl);
        setResult(data);
        setSpinner(false);
        createTwoButtonAlert();
        const toSend = data;
        newSend(toSend, fileUrl);
      })
      .catch(err => console.error(err));
  };
  const sendData = () => {
    // const sendData = toSend => {
    const newLocation = locationData.latitude + ':' + locationData.longitude;
    console.log(newLocation);
    const toSend = {
      bleeding: '0.0',
      car_vs_bike: '8.29',
      car_vs_car: '40.4',
      car_vs_pedestrian: '45.02',
      car_vs_tree: '2.12',
      drown_in_water: '32.21',
      falling_from_moutain: '19.65',
      human_count_avg: '0.0',
      upside_down: '23.87',
      vehicle_fire: '24.27',
    };
    const payload = {
      time: '1625292030823',
      location: '6.960531573928369, 80.08066322927147',
      bleeding: toSend.bleeding,
      car_vs_bike: toSend.car_vs_bike,
      car_vs_car: toSend.car_vs_car,
      car_vs_pedestrian: toSend.car_vs_pedestrian,
      car_vs_tree: toSend.car_vs_tree,
      drown_in_water: toSend.drown_in_water,
      falling_from_moutain: toSend.falling_from_moutain,
      human_count_avg: toSend.human_count_avg,
      upside_down: toSend.upside_down,
      vehicle_fire: toSend.vehicle_fire,
    };
    console.log('send data', payload);

    const onSuccess = ({data}) => {
      console.log('data', data);
    };

    const onFailure = error => {
      console.log('error', error);
    };

    APIKit.post('/save_data', payload).then(onSuccess).catch(onFailure);
  };
  const newSend = (toSend, fileUrl) => {
    // console.log('newImageUri 😹🐶', fileUrl);
    // console.log('fileUrl replace 🐶', filePath.uri.replace('file://', ''));
    console.log('😹🐶', toSend, fileUrl);
    const newLocation = locationData.latitude + ':' + locationData.longitude;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', newData.token);

    var formdata = new FormData();
    formdata.append('time', locationData.time);
    formdata.append('location', newLocation);
    formdata.append('accident_type', 'car vs car');
    formdata.append('bleeding', toSend.bleeding);
    formdata.append('car_vs_bike', toSend.car_vs_bike);
    formdata.append('car_vs_car', toSend.car_vs_car);
    formdata.append('car_vs_pedestrian', toSend.car_vs_pedestrian);
    formdata.append('car_vs_tree', toSend.car_vs_tree);
    formdata.append('drown_in_water', toSend.drown_in_water);
    formdata.append('falling_from_moutain', toSend.falling_from_moutain);
    formdata.append('human_count_avg', toSend.human_count_avg);
    formdata.append('upside_down', toSend.upside_down);
    formdata.append('vehicle_fire', toSend.vehicle_fire);
    formdata.append('file', {
      uri:
        Platform.OS === 'android'
          ? fileUrl.uri
          : fileUrl.uri.replace('file://', ''),
      type: 'video/mp4',
      name: 'name.mp4',
    });
    // formdata.append('file', fileInput.files[0], '19.mp4');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://aqueous-dawn-29192.herokuapp.com/api/save_data',
      requestOptions,
    )
      .then(response => console.log('done 👺👺'))
      // .then(response => response.json())
      .then(response => console.log('👾👾👾👾', response))
      .catch(error => console.log('error', error));
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Sending...'}
        textStyle={styles.spinnerTextStyle}
      />
      <MImagePicker
        header={{nextTitle: 'Send', cancelTitle: 'Cancel'}}
        onCancel={() => {
          navigation.navigate('Home');
        }}
        onNext={async param => {
          console.log('param🪂');
          console.log(param.photos[0].node.image);
          const fileUrl = param.photos[0].node.image;
          setVideo(param.photos[0].node.image);
          param.videoMaxLen = 1; // not set or 0 for unlimited
          param.videoQuality = 'low';
          uploadVideo(fileUrl);
        }}
        // cropSize={{width: 200, height: 200}}
        // maxScale={10}
        max={1}
        // cameraConfig={{
        //   camerPhotoTile: 'Photo',
        //   cameraVideoTitle: 'Video',
        //   cameraCancelTitle: 'Cancle',
        //   maxVideoLen: 0,
        //   videoQuality: '480p',
        // }}
        // profile={true}
      />
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            newSend();
            // Linking.openURL('tel:119');
          }}
          style={{
            marginTop: 10,
            width: SIZES.width / 2.3,
            elevation: 8,
            padding: 10,
            borderRadius: 30,
            marginBottom: 10,
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
          }}>
          <Text
            style={{...FONTS.body3, color: COLORS.white, textAlign: 'center'}}>
            Call for Ambulance
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CallAmbulance;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: COLORS.white,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
});
