/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Card, SimpleCard} from '@paraboly/react-native-card';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import MImagePicker from 'react-native-image-video-picker-editor';
import Spinner from 'react-native-loading-spinner-overlay';
import APIKit, {setClientToken} from '../constants/apiKit';

function CallAmbulance({navigation}) {
  const [selectedVideo, setVideo] = React.useState('');
  const [result, setResult] = React.useState('');
  const [spinner, setSpinner] = React.useState(false);

  const createTwoButtonAlert = () =>
    Alert.alert('Success.!', 'Video has been successfully submitted..', [
      {text: 'OK', onPress: () => navigation.navigate('Home')},
    ]);
  const uploadVideo = async fileUrl => {
    console.log('upload');
    console.log('🧑‍🚀🧑‍🚀', fileUrl);
    setSpinner(true);
    // const video2 = selectedVideo;
    let formData = new FormData();
    console.log('newImageUri 😹', fileUrl.uri);
    console.log('fileUrl replace 🐶', fileUrl.uri.replace('file://', ''));
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
        console.log(data);
        setResult(data);
        setSpinner(false);
        createTwoButtonAlert();
        sendData(data);
      })
      .catch(err => console.error(err));
  };
  const sendData = data => {
    const payload = data;
    console.log('send data', payload);

    const onSuccess = ({data}) => {
      console.log('data', data);
    };

    const onFailure = error => {
      console.log('error', error);
    };

    APIKit.post('/save_data', payload).then(onSuccess).catch(onFailure);
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Sending...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Text style={styles.title}> AMBULANCE EMS</Text>
      <MImagePicker
        header={{nextTitle: 'Send', cancelTitle: 'Cancel'}}
        onCancel={() => {}}
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
            // uploadVideo();
          }}
          style={{
            marginTop: 10,
            width: SIZES.width / 2.5,
            elevation: 8,
            padding: 5,
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
      {/* <TouchableOpacity
        onPress={() => {
          // createUser();
          // uploadVideo();
          startRecording();
          // navigation.navigate('AmbulanceMap');

          // navigation.navigate('Home');
        }}
        style={{
          marginTop: 40,
          elevation: 8,
          borderRadius: 30,
          paddingVertical: 15,
          paddingHorizontal: 25,
          marginBottom: 20,
          justifyContent: 'center',
          backgroundColor: COLORS.third,
        }}>
        <Text style={{...FONTS.h3, color: COLORS.white}}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // createUser();

          navigation.navigate('DriverScreen');

          // navigation.navigate('Home');
        }}
        style={{
          marginTop: 10,
          elevation: 8,
          borderRadius: 30,
          paddingVertical: 15,
          paddingHorizontal: 25,
          marginBottom: 20,
          justifyContent: 'center',
          backgroundColor: COLORS.third,
        }}>
        <Text style={{...FONTS.h3, color: COLORS.white}}>
          Call for Ambulance
        </Text>
      </TouchableOpacity>*/}
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
    backgroundColor: '#F1f5F6',
  },
});
