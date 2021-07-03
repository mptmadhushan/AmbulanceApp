/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
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
import APIKit, {setClientToken} from '../constants/apiKitPython';

import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const AccidentPrediction = ({navigation}) => {
  useEffect(() => {
    getData();
    // Update the document title using the browser API
  }, []);
  const getData = () => {
    console.log('hey');
    const onSuccess = ({data}) => {
      console.log('data', data);
    };
    const onFailure = error => {
      console.log('error', error);
    };

    // Show spinner when call is made
    APIKit.get('/risk_predict').then(onSuccess).catch(onFailure);
  };
  function renderHeader() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/wave-haikei.png')}>
          <View style={styles.container}>
            <View style={styles.contentCenter}>
              <Text style={styles.title}> Accident{'\n'}Prediction</Text>
              <View
                style={{
                  marginTop: SIZES.height * 0.02,
                  flexDirection: 'row',
                  padding: SIZES.padding * 2,
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
                  onPress={() => navigation.navigate('Home')}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.third,
                      textAlign: 'center',
                    }}>
                    Temperature{'\n'}27'c
                  </Text>
                </TouchableOpacity>
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
                  onPress={() => navigation.navigate('Home')}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.third,
                      textAlign: 'center',
                    }}>
                    Humidity{'\n'}27
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: 80,
                    backgroundColor: COLORS.secondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() => navigation.goBack()}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.third,
                      textAlign: 'center',
                    }}>
                    Traffic condition{'\n'}27
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: SIZES.padding * 2,
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
                  onPress={() => navigation.navigate('Home')}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      textAlign: 'center',
                      color: COLORS.third,
                    }}>
                    Accident time{'\n'}27
                  </Text>
                </TouchableOpacity>
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
                  onPress={() => navigation.navigate('Home')}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.third,

                      textAlign: 'center',
                    }}>
                    Road Type{'\n'}27
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: 80,
                    backgroundColor: COLORS.secondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() => navigation.goBack()}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.third,

                      textAlign: 'center',
                    }}>
                    No Of Lanes{'\n'}27
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: SIZES.padding * 2,
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
                  onPress={() => navigation.navigate('Home')}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.third,

                      textAlign: 'center',
                    }}>
                    Bus {'\n'}27
                  </Text>
                </TouchableOpacity>
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
                  onPress={() => navigation.navigate('Home')}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.third,
                      textAlign: 'center',
                    }}>
                    Train {'\n'}27
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: 80,
                    backgroundColor: COLORS.secondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() => navigation.goBack()}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.third,
                      textAlign: 'center',
                    }}>
                    Junction {'\n'}27
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: SIZES.padding * 2,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 80,
                  backgroundColor: COLORS.secondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.third,
                    textAlign: 'center',
                  }}>
                  Risk of {'\n'}accident : 45.2
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: SIZES.padding * 5,
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
    fontSize: 45,
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    padding: 10,
  },
});

export default AccidentPrediction;
