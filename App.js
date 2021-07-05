import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import {Home, Log} from './screens';
const Stack = createStackNavigator();
import Tabs from './navigation/tabs';
import OnBoard from './screens/OnBoarding';
import OnBoard2 from './screens/OnBoarding2';
import LogIn from './screens/LogIn';
import Register from './screens/Register';
import CallAmbulance from './screens/CallAmbulance';
import AmbulanceMap from './screens/AmbulanceMap';
import AccidentPrediction from './screens/AccidentPrediction';
import PreAccident from './screens/PreAccident';
import DriverScreen from './screens/DriverScreen';
import Profile from './screens/Profile';
import DriverDashboard from './screens/DriverDashboard';
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'OnBoard'}>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="OnBoard" component={OnBoard} />
        <Stack.Screen name="OnBoard2" component={OnBoard2} />
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
        <Stack.Screen name="RegisterScreen" component={Register} />
        <Stack.Screen name="CallAmbulance" component={CallAmbulance} />
        <Stack.Screen name="AmbulanceMap" component={AmbulanceMap} />
        <Stack.Screen name="PreAccident" component={PreAccident} />
        <Stack.Screen name="DriverScreen" component={DriverScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="AccidentPrediction"
          component={AccidentPrediction}
        />
        {/* <Stack.Screen name="Log" component={Log} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
