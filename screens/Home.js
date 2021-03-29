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

import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const Home = ({navigation}) => {
  const initialCurrentLocation = {
    streetName: 'Nuwara Eliya',
    gps: {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    },
  };

  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation,
  );

  function renderHeader() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/wave-haikei.png')}>
          <View style={styles.container}>
            <View style={styles.contentCenter}>
              <Text style={styles.title}> AMBULANCE{'\n'}EMS</Text>
              <TouchableOpacity
                onPress={() => {
                  // createUser();

                  navigation.navigate('PreAccident');

                  // navigation.navigate('Home');
                }}
                style={{
                  marginTop: SIZES.height * 0.1,
                  marginLeft: 100,
                  borderRadius: 30,
                  paddingVertical: 15,
                  paddingHorizontal: 25,
                  marginBottom: 20,
                  justifyContent: 'center',
                  backgroundColor: COLORS.primary,
                }}>
                <Text style={{...FONTS.h3, color: COLORS.white}}>
                  Pre Accident Detection
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // createUser();

                  navigation.navigate('CallAmbulance');

                  // navigation.navigate('Home');
                }}
                style={{
                  marginLeft: -20,
                  elevation: 8,
                  borderRadius: 30,
                  paddingVertical: 15,
                  paddingHorizontal: 25,
                  marginBottom: 20,
                  justifyContent: 'center',
                  backgroundColor: COLORS.primary,
                }}>
                <Text style={{...FONTS.h3, color: COLORS.white}}>
                  Call Ambulance
                </Text>
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
    marginTop: SIZES.height * 0.16,
    fontSize: 55,
    padding: 15,
    marginLeft: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
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

export default Home;
