/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';

import {COLORS, FONTS, icons, SIZES} from '../constants';
import APIKit, {setClientToken} from '../constants/apiKit';

const DriverDash = ({route, navigation}) => {
  const [accInfo, setAccInfro] = React.useState('');

  React.useEffect(() => {
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
            <Text style={{...FONTS.body3}}>streetName</Text>
          </View>

          <Text style={{...FONTS.body3}}>{Date().toLocaleString()}</Text>
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

  return (
    <View style={{flex: 1}}>
      {/* {renderMap()} */}
      {renderDestinationHeader()}
      {renderInfo()}
      {/* {renderButtons()} */}
    </View>
  );
};

export default DriverDash;
