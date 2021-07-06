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
  Modal,
  ScrollView,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import {Avatar} from 'react-native-elements';
import APIKit, {setClientToken} from '../constants/apiKit';
import DropDownPicker from 'react-native-dropdown-picker';

function DriverScreen({navigation}) {
  const [fire, setFire] = React.useState(true);
  const [drowned, setDrowned] = React.useState(false);
  const [fallen, setFallen] = React.useState(true);
  const [updown, setUpdown] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Reason 1', value: '1'},
    {label: 'Reason 2', value: '2'},
  ]);
  const [accData, setAccData] = React.useState({
    accident_type: 'loading',
    accuracy: {
      bleeding: '0',
      car_vs_bike: '0',
      car_vs_car: '0',
      car_vs_pedestrian: '0',
      car_vs_tree: '0',
      drown_in_water: '4',
      falling_from_moutain: '0',
      human_count_avg: '0',
      upside_down: '0',
      vehicle_fire: '0',
    },
    file:
      'https://aqueous-dawn-29192.herokuapp.com/uploads/file_1625560405164.mp4',
    location: '6.960531573928369, 80.08066322927147',
    time: '2021-07-03T06:00:30.823Z',
    user: '60e004f60913a115f4145d7f',
    username: 'SandeepVithanage',
  });

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
    console.log('hey 💁‍♀️💁‍♀️');
    const onSuccess = ({data}) => {
      console.log('data', data);
      setAccData(data);
    };
    const onFailure = error => {
      console.log('error', error);
    };

    // Show spinner when call is made
    APIKit.get('/get_one').then(onSuccess).catch(onFailure);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/wave-haikei.png')}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Reason to decline</Text>
              <DropDownPicker
                style={styles.modalText}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
              <TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonTextStyle}>submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={styles.title}>AMBULANCE Driver App</Text>
          <Avatar
            rounded
            onPress={() => navigation.navigate('Profile')}
            size="medium"
            source={images.user}
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
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
              marginLeft: SIZES.padding * 2,
              justifyContent: 'flex-start',
            }}>
            <View style={styles.listBackground}>
              <Text style={styles.listTitle}>Accident Type</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btnDriver}>
                <Text style={styles.listTitle2}>{accData.accident_type}</Text>
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
                {accData.accuracy.vehicle_fire > '50' ? (
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
              <Text style={styles.listTitle}>car vs bike</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btnDriver}>
                {accData.accuracy.car_vs_bike > '50' ? (
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
              <Text style={styles.listTitle}>car vs car</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btnDriver}>
                {accData.accuracy.car_vs_car > '50' ? (
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
              <Text style={styles.listTitle}>car vs pedestrian</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btnDriver}>
                {accData.accuracy.car_vs_pedestrian > '50' ? (
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
              <Text style={styles.listTitle}>car vs tree</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btnDriver}>
                {accData.accuracy.car_vs_tree > '50' ? (
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
              <Text style={styles.listTitle}>Bleeding</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btnDriver}>
                {accData.accuracy.bleeding > '50' ? (
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
                {accData.accuracy.drown_in_water > '50' ? (
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
                {accData.accuracy.falling_from_moutain > '50' ? (
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
              <Text style={styles.listTitle}>Average Humans</Text>
            </View>

            <View>
              <TouchableOpacity style={styles.btnDriver}>
                <Text style={styles.listTitle2}>
                  {accData.accuracy.human_count_avg}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listBackground}>
              <Text style={styles.listTitle}>Vehicle upside down</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btnDriver}>
                {accData.accuracy.upside_down > '50' ? (
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
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity style={styles.btnDriver2}>
            <Text
              style={{...FONTS.h3, color: COLORS.white}}
              onPress={() => navigation.navigate('AmbulanceMap')}>
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnDriver2}
            onPress={() => setModalVisible(!modalVisible)}>
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
    fontSize: 13,
    color: COLORS.black,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: SIZES.padding * 2,
  },
  listTitle2: {
    fontSize: 15,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  listBackground: {
    width: width / 2,
    backgroundColor: '#fff',
    borderColor: COLORS.primary,
    elevation: 20,
    borderWidth: 1,
    padding: 4,
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
    width: 70,
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

export default DriverScreen;
