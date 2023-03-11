import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import Property_Listing from './Property_Listings';

const MyProperty = ({navigation}) => {
  return (
    <View style={{marginTop: 15}}>
      <View style={{paddingHorizontal: 14}}>
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            fontWeight: 'bold',
            fontSize: 21.5,
          }}>
          My Property
        </Text>
      </View>
      <View
        style={{
          margin: 0,
          borderBottomColor: COLORS.lightGray7,
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <Property_Listing navigation={navigation} />
      </View>
      <View
        style={{
          borderBottomColor: COLORS.lightGray6,
          borderBottomWidth: 15,
        }}
      />
      <View
        style={{
          top: -10,
          borderBottomColor: COLORS.lightGray7,
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      />
    </View>
  );
};

export default MyProperty;
