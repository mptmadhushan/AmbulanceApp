/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
  Image,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import {Avatar} from 'react-native-elements';
import APIKit, {setClientToken} from '../constants/apiKitPython';
import AsyncStorage from '@react-native-community/async-storage';

function DriverScreen({navigation}) {
  const [fire, setFire] = React.useState(true);
  const [drowned, setDrowned] = React.useState(false);
  const [fallen, setFallen] = React.useState(true);
  const [updown, setUpdown] = React.useState(false);

  const data = [
    {
      destinationId: '001',
      img: require('../assets/images/acc1.jpeg'),
    },
    {
      destinationId: '002',
      img: require('../assets/images/acc2.jpeg'),
    },
    {
      destinationId: '003',
      img: require('../assets/images/acc3.jpeg'),
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  const [newData, setUserData] = useState('');

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
  const logOut = async () => {
    console.log('log out');
    AsyncStorage.clear();
    navigation.navigate('OnBoard');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/wave-haikei.png')}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            padding: 10,
          }}>
          <Avatar
            rounded
            size="large"
            source={images.user}
            onPress={() => console.log('Works!')}
          />
          <Text style={styles.title}>{newData.name}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding * 3,
            marginLeft: SIZES.padding * 2,
            justifyContent: 'flex-start',
          }}>
          <View style={styles.listBackground}>
            <Text style={styles.listTitle}>Email : </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnDriver}>
              <Text style={styles.listTitle2}>{newData.email}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.list}>
          <View style={styles.listBackground}>
            <Text style={styles.listTitle}>Mobile : </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnDriver}>
              <Text style={styles.listTitle2}>{newData.mobile}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.height / 2.5,
            // marginLeft: SIZES.padding * 5,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity style={styles.btnDriver2}>
            <Text
              style={{...FONTS.h3, color: COLORS.white}}
              onPress={() => logOut()}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {width, justifyContent: 'center', marginBottom: 10},
  text: {fontSize: width * 0.2, textAlign: 'center'},
  title: {
    fontSize: 25,
    marginTop: 20,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  listTitle: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: SIZES.padding * 2,
  },
  listTitle2: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  listBackground: {
    width: width / 3,
    backgroundColor: '#fff',
    borderColor: COLORS.primary,
    elevation: 20,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  list: {
    flexDirection: 'row',
    marginTop: SIZES.padding * 1,
    marginLeft: SIZES.padding * 2,
    justifyContent: 'flex-start',
  },
  btnDriver: {
    elevation: 20,
    flex: 1,
    height: 30,
    width: 180,
    marginLeft: SIZES.padding * 5,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnDriver2: {
    // marginLeft: -20,
    elevation: 20,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});

export default DriverScreen;
