import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants';

const HeaderBar = ({title}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: 'white',

        paddingVertical: 17,
      }}>
      <View>
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            // paddingHorizontal: 15,
            fontSize: SIZES.h1,
            fontWeight: 'bold',
            borderBottomColor: COLORS.lightGray4,
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}>
          {title}
        </Text>
      </View>
    </ScrollView>
  );
};

export default HeaderBar;
