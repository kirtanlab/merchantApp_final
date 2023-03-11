import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, SIZES} from '../../constants';
const Header = ({step, title, subtitle, total}) => {
  return (
    <View>
      <Text
        style={{
          color: COLORS.lightGray,
          //   fontWeight: 'bold',
          //   fontFamily: 'Roboto-Bold',
          fontSize: SIZES.h4,
        }}>
        STEP {step} OF {total ? total : 4}
      </Text>
      <Text
        style={{
          marginTop: 8,
          color: COLORS.lightGray,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Bold',
          fontSize: SIZES.h1,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: COLORS.lightGray3,
          fontWeight: 'bold',
          //   fontFamily: 'Roboto-Bold',
          fontSize: SIZES.subtitle,
          marginTop: 6,
        }}>
        {subtitle}
      </Text>
    </View>
  );
};
export default Header;
