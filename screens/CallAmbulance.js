/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Card, SimpleCard} from '@paraboly/react-native-card';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
function CallAmbulance({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> AMBULANCE{'\n'}EMS</Text>
      <Card
        iconDisable
        title="Please Select Video"
        iconName="aircraft-landing"
        iconType="Entypo"
        onPress={() => {}}
        borderRadius={20}
        containerHeight={200}
        topRightText="50MB"
        // iconBackgroundColor="#ff0046"
        textContainerNumberOfLines={3}
        description="  Click here to select video."
        topRightTextStyle={{
          fontSize: 12,
          fontWeight: '700',
          color: '#ee5e80',
        }}
        bottomRightTextStyle={{
          fontSize: 36,
          marginTop: 50,
          fontWeight: 'bold',
          color: '#ee5e80',
        }}
      />

      <TouchableOpacity
        onPress={() => {
          // createUser();

          navigation.navigate('AmbulanceMap');

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
      </TouchableOpacity>
    </View>
  );
}

export default CallAmbulance;

const styles = StyleSheet.create({
  title: {
    marginBottom: SIZES.height * 0.16,
    fontSize: 55,
    padding: 15,
    marginLeft: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F6',
    justifyContent: 'center',
  },
});
