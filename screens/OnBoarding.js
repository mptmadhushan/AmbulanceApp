/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const OnBoard = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/background.png')}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Welcome {'\n'}to {'\n'}
            AmbulanceApp
          </Text>
          <View style={styles.contentCenter}>
            <Image
              source={require('../assets/images/Nurse_Isometric.png')}
              style={{
                width: '70%',
                height: '60%',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                // createUser();

                navigation.navigate('OnBoard2');

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
              <Text style={{...FONTS.h3, color: COLORS.white}}>Let's Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default OnBoard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 55,
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
