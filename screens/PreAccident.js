/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const PreAccident = ({navigation}) => {
  function renderHeader() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/wave-haikei.png')}>
          <View style={styles.container}>
            <View style={styles.contentCenter}>
              <Text style={styles.title}> AMBULANCE{'\n'}Prediction</Text>
              <Text style={styles.title2}> Hi User</Text>
            </View>
            <View>{/* <Text style={styles.title2}> Hi User</Text> */}</View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding * 10,
                justifyContent: 'space-around',
              }}>
              <View style={styles.container2}>
                <RNCamera
                  ref={ref => {
                    // this.camera = ref;
                  }}
                  style={styles.preview}
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
                  onGoogleVisionBarcodesDetected={({barcodes}) => {
                    console.log(barcodes);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: SIZES.padding * 2,
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: 30,
                    width: 120,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <Text style={{...FONTS.h4, color: COLORS.white}}>
                    Location
                  </Text>
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
                  <Text style={{...FONTS.h4, color: COLORS.white}}>
                    Raining
                  </Text>
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
                  <Text style={{...FONTS.h4, color: COLORS.white}}>Time</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-around',
            }}>
            <Image
              source={images.risk}
              style={{
                width: 70,
                height: 70,
              }}
            />
            <Text style={{...FONTS.h4, color: COLORS.white}}>Time</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                // createUser();

                navigation.navigate('Login');

                // navigation.navigate('Home');
              }}
              style={{
                borderRadius: 30,
                paddingVertical: 15,
                paddingHorizontal: 25,
                marginBottom: 20,
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
              }}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Home</Text>
            </TouchableOpacity>
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
    height: SIZES.height / 4,
    width: SIZES.width / 2,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
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

  title: {
    marginTop: SIZES.height * 0.02,
    fontSize: 55,
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title2: {
    marginTop: SIZES.height * 0.02,
    fontSize: 25,
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
