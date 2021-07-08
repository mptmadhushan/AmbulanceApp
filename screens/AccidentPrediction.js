/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ImageBackground,
} from 'react-native';
import APIKit, {setClientToken} from '../constants/apiKitPython';
import Loader from '../components/Loader';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const AccidentPrediction = ({navigation}) => {
  useEffect(() => {
    getData();
    // Update the document title using the browser API
  }, []);
  const [modalVisible, setModalVisible] = useState(false);

  const getData = () => {
    const payload = {
      temp: 32,
      hum: 80,
      traffic_cond: 50,
      acc_time: 1,
      road_type: 1,
      no_lanes: 2,
      bus_route: 0,
      train_crossing: 1,
      junction_type: 1,
    };
    console.log('hey');
    const onSuccess = ({data}) => {
      console.log('data', data.results[0].risk_level);
      setLoading(false);
      setModalVisible(!modalVisible);
      setRisk(data.results[0].risk_level);
    };
    const onFailure = error => {
      console.log('error', error);
    };

    // Show spinner when call is made
    APIKit.post('/risk_predict', payload).then(onSuccess).catch(onFailure);
  };
  const [loading, setLoading] = useState(true);
  const [risk, setRisk] = useState('');

  function renderHeader() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/wave-haikei.png')}>
          <View style={styles.container}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Accident{'\n'}Risk :
                    <Text
                      style={{
                        ...FONTS.h1,
                        color: COLORS.third,
                        textAlign: 'center',
                      }}>
                      {risk}%
                    </Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonStyle2}
                    activeOpacity={0.5}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.buttonTextStyle}>close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Loader loading={loading} />
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
                    Temperature{'\n'} {risk ? 32 : null}
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
                    Humidity{'\n'}80
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
                    Traffic condition{'\n'}
                    {risk ? <Text>50</Text> : null}
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
                    Accident time{'\n'}
                    {risk ? <Text>1</Text> : null}
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
                    Road Type{'\n'}
                    {risk ? <Text>1</Text> : null}
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
                    No Of Lanes{'\n'}
                    {risk ? <Text>2</Text> : null}
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
                    Bus route{'\n'}
                    {risk ? <Text>0</Text> : null}
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
                    Train {'\n'}
                    {risk ? <Text>1</Text> : null}
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
                    Junction {'\n'}
                    {risk ? <Text>1</Text> : null}
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
                    ...FONTS.h1,
                    color: COLORS.third,
                    textAlign: 'center',
                  }}>
                  Accident{'\n'}Risk :{risk}%
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
                  navigation.navigate('Login');
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonStyle2: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    color: '#fff',
    borderColor: '#00BFA6',
    height: 30,
    width: 50,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

export default AccidentPrediction;
