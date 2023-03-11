import React, {Fragment, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import {connect} from 'react-redux';
import HomeScreen_Header from '../components/Homescreen/HomeScreen_Header';
import MyProperty from '../components/Homescreen/MyProperty';
import MyRooms from '../components/Homescreen/MyRooms';
import Notifications from '../components/Homescreen/Notifications';
import Intrests from '../components/Homescreen/Intrests';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 1,
        paddingVertical: 13,
      }}>
      {/* <KeyboardAvoidingView
        behavior="position"
        style={{backgroundColor: 'white'}}> */}

      <StatusBar
        animated={true}
        backgroundColor={COLORS.mobile_theme_back}
        barStyle={'light-content'}
      />

      {/* <SafeAreaView
        style={{
          height: SIZES.height * 0.07,
          backgroundColor: COLORS.mobile_theme_back,
          elevation: 1,
        }}

      /> */}

      <HomeScreen_Header username={'Kirtan'} navigation={navigation} />
      <MyProperty navigation={navigation} />
      {/* <View>
        <Text> Kirtan here</Text>
      </View> */}
      <MyRooms navigation={navigation} />
      <Notifications navigation={navigation} />
      <Intrests navigation={navigation} />
    </ScrollView>
  );
};
export default HomeScreen;
