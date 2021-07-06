/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
// import {useCamera} from 'react-native-camera-hooks';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const PreAccident = ({navigation}) => {
  var today = new Date();
  const time = today.getHours() + ':' + today.getMinutes();
  const [dt, setDt] = useState(time);

  React.useEffect(() => {
    let secTimer = setInterval(() => {
      var today = new Date();
      const time = today.getHours() + ':' + today.getMinutes();
      setDt(time);
    }, 60000);

    setInterval(() => {
      takePicture();
    }, 3000);

    // return () => clearInterval(secTimer);
  });
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
      })
      .catch(error => {
        console.log('location error 🌸');
        console.log(error);
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  const [safe, setSafe] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [activity, setActivity] = React.useState('');
  function getLocations(loca) {
    const lat = loca.latitude;
    const lng = loca.longitude;
    console.log('lat, latlng');
    console.log(lat, lng);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAjO92NdWvu0qpgVhOXZdj89OUGxS94F-U`,
      )
      .then(function (response) {
        // console.log('lca', response.data.results[0].formatted_address);
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
  let camera;
  async function takePicture() {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
        orientation: 'landscapeLeft',
        forceUpOrientation: true,
        fixOrientation: true,
      };
      const data = await camera.takePictureAsync(options);
      console.log('🧕🧕🧕🧕🧕');
      console.log('🧕🧕🧕🧕🧕');
      const baseImage = data.base64;
      axios
        .post('http://sahan1314.pythonanywhere.com/driver_activity', {
          base_string: baseImage,
        })
        .then(function (response) {
          console.log(response.data.driver_activity);
          let resData = response.data;
          let isSleep = resData.Sleep;
          if (response.data.driver_activity == 'Looking Around') {
            setSafe(false);
            setActivity('Looking Around');
          }
          if (isSleep === 'Not Sleeping') {
            console.log('not sleeping 💃💃💃');
            setActivity('Safe Driving');

            setSafe(true);
          } else {
            console.log('Seeping 😪😪😪');
            setSafe(false);
            setActivity('Sleeping');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function renderHeader() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/wave-haikei.png')}>
          <View style={styles.containerNew}>
            <View style={styles.contentCenter}>
              <Text style={styles.title}>Pre-Accident {'\n'}Detection</Text>
              <Text style={styles.title2}>Hello Buford!</Text>
            </View>
          </View>

          <View
            style={{
              padding: 24,
            }}>
            <View style={styles.container2}>
              <RNCamera
                ref={ref => (camera = ref)}
                style={{flex: 1}}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                  title: 'Permission to use audio recording',
                  message: 'We need your permission to use your audio',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: -120,
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexDirection: 'column',
              // marginTop: SIZES.padding * 2,
            }}>
            <TouchableOpacity
              onPress={takePicture}
              style={{
                flex: 1,
                height: 30,
                width: 120,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>{location}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 30,
                marginTop: SIZES.padding * 2,
                width: 120,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>Raining</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                marginTop: SIZES.padding * 2,
                height: 30,
                width: 120,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>{dt}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 24,
            }}>
            <View style={{width: SIZES.width / 5}}>
              {safe === true ? (
                <Image
                  source={require('../assets/images/face.png')}
                  style={{
                    width: 90,
                    height: 90,
                  }}
                />
              ) : (
                <Image
                  source={require('../assets/images/clipart258856.png')}
                  style={{
                    width: 100,
                    height: 100,
                    paddingTop: 15,
                  }}
                />
              )}
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home');
                }}
                style={{
                  borderRadius: 30,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 40,
                  marginBottom: 20,
                  justifyContent: 'center',
                  backgroundColor: COLORS.primary,
                }}>
                <Text style={{...FONTS.h3, color: COLORS.white}}>Home</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 20,
                width: SIZES.width / 4,
                backgroundColor: COLORS.black,
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {activity ? (
                <Text style={{...FONTS.h3, color: COLORS.white}}>
                  {activity}
                </Text>
              ) : null}
              {/* {safe === true ? (
                <Text style={{...FONTS.h3, color: COLORS.white}}>
                  Safe Driving
                </Text>
              ) : (
                <Text style={{...FONTS.h3, color: COLORS.white}}>Sleepy</Text>
              )} */}
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={styles.container}>{renderHeader()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: COLORS.lightGray4,
  // },
  container2: {
    transform: [{rotate: '-90deg'}],
    height: SIZES.height / 4,
    width: SIZES.width,

    backgroundColor: 'black',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  container: {
    flex: 1,
  },
  containerNew: {
    flex: 1,
  },

  title: {
    fontSize: 35,
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title2: {
    marginTop: SIZES.height * 0.02,
    fontSize: 15,
    padding: 5,
    color: 'white',
    textAlign: 'left',
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    padding: 11,
  },
});

export default PreAccident;
