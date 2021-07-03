/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
np
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
  const getData = () => {
    console.log('hey');
    const onSuccess = ({data}) => {
      console.log('data', data);
    };
    const onFailure = error => {
      console.log('error', error);
    };

    // Show spinner when call is made
    APIKit.get('').then(onSuccess).catch(onFailure);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/wave-haikei.png')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={styles.title}>AMBULANCE Driver App</Text>
          <Avatar
            rounded
            size="medium"
            source={images.user}
            onPress={() => console.log('Works!')}
          />
        </View>
        <View style={{height: 200, padding: 10}}>
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={2}
            data={data}
            renderItem={({item}) => (
              <View style={styles.child}>
                <Image
                  source={item.img}
                  key={item.destinationId}
                  style={{height: '100%', width: '100%'}}
                />
              </View>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding * 3,
            marginLeft: SIZES.padding * 2,
            justifyContent: 'flex-start',
          }}>
          <View style={styles.listBackground}>
            <Text style={styles.listTitle}>Accident Location</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnDriver}>
              <Image
                source={icons.location}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.black,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.list}>
          <View style={styles.listBackground}>
            <Text style={styles.listTitle}>Approximation Time</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnDriver}>
              <Text style={styles.listTitle2}>10 minutes</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.list}>
          <View style={styles.listBackground}>
            <Text style={styles.listTitle}>Vehicle Firing</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnDriver}>
              {fire === true ? (
                <Image
                  source={icons.done}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.black,
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.list}>
          <View style={styles.listBackground}>
            <Text style={styles.listTitle}>Vehicle drowned in water</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnDriver}>
              {drowned === true ? (
                <Image
                  source={icons.done}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.black,
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.list}>
          <View style={styles.listBackground}>
            <Text style={styles.listTitle}>Vehicle fallen</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnDriver}>
              {fallen === true ? (
                <Image
                  source={icons.done}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.black,
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.list}>
          <View style={styles.listBackground}>
            <Text style={styles.listTitle}>Vehicle upside down</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnDriver}>
              {updown === true ? (
                <Image
                  source={icons.done}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.black,
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding * 6,
            // marginLeft: SIZES.padding * 5,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity style={styles.btnDriver2}>
            <Text
              style={{...FONTS.h3, color: COLORS.white}}
              onPress={() => navigation.navigate('AmbulanceMap')}>
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDriver2}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>Declined</Text>
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
    color: COLORS.black,
    fontWeight: 'bold',
  },
  listBackground: {
    width: width / 2,
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
    width: 120,
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
