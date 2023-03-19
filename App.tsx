import React, { Children } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/persistReducer';
import Tabs from './navigation/tabs';
import SplashScreen from './screens/AuthScreens/SplashScreen';
import LoginScreen from './screens/AuthScreens/LoginScreen';
import SignupScreen from './screens/AuthScreens/SignupScreen';
import BasicDetails from './screens/Newproperty/BasicDetails';
import Location from './screens/Newproperty/Location';
import Thankyou from './screens/Newproperty/Thankyou';
import Basic1 from './screens/NewRooms/Basic1';
import Basic2 from './screens/NewRooms/Basic2';
import Basic3 from './screens/NewRooms/Basic3';
import ForgetPass from './screens/AuthScreens/ForgetPass';
import OTPScreen from './screens/AuthScreens/OTPScreen';
import NewPassword from './screens/AuthScreens/NewPassword';
import more_property from './screens/Newproperty/more_property';
import ChangeProfile from './screens/ChangeProfile';
import AppTerms from './screens/AppTerms';
import GovtTerms from './screens/GovtTerms';
import MapTest from './screens/MapsTest';
import mobile_otp from './screens/AuthScreens/mobile_otp';
import mobile_input from './screens/AuthScreens/mobile_input';
import Basic25 from './screens/NewRooms/Basic25';
import vidImage from './screens/Newproperty/vidImage';




const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

const App = () => {
  const Newproperty = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="BasicDetails"
          component={BasicDetails}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Location"
          component={Location}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MoreProperty"
          component={more_property}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="vidImage"
          component={vidImage}
        />
        
        <Stack.Screen
          options={{headerShown: false}}
          name="MapsTest"
          component={MapTest}
        />
      </Stack.Navigator>
      // </SafeAreaView>/
    );
  };
  const NewRooms = () => {
    return (
      // <SafeAreaView style={{flex: 1, backgroundColor: '#FF5236'}}>

      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Basic1"
          component={Basic1}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Basic2"
          component={Basic2}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Basic25"
          component={Basic25}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Basic3"
          component={Basic3}
        />
      </Stack.Navigator>
      // </SafeAreaView>/
    );
  };
  const Root = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="SplashScreen"
          component={SplashScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="LoginScreen"
          component={LoginScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="SignupScreen"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="mobile_input"
          component={mobile_input}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ForgetPassword"
          component={ForgetPass}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="OTPScreen"
          component={OTPScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NewPassword"
          component={NewPassword}
        />
      </Stack.Navigator>
    );
  };
  
  return (
    <Provider store={store}>
      
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Root'}>
          <Stack.Screen
            options={{headerShown: false}}
            name="MobileOTP"
            component={mobile_otp}
          />
          <Stack.Screen
            name="Root"
            component={Root}
            options={{headerShown: false}}
          />

          <Stack.Screen
            options={{}}
            name="Newproperty"
            component={Newproperty}
          />
          <Stack.Screen
            // options={{headerShown: false}}
            name="NewRooms"
            component={NewRooms}
          />
          <Stack.Screen
          options={{headerShown: false}}
          name="Thankyou"
          component={Thankyou}
        />
          <Stack.Screen name="MainScreens" component={Tabs} />
          <Stack.Screen name="Appterms" component={AppTerms} />
          <Stack.Screen name="GovtTerms" component={GovtTerms} />
          <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
        </Stack.Navigator>
      </NavigationContainer>
      
    </Provider>
  );
};

export default App;
