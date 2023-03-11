import React from 'react';
import {COLORS, SIZES} from '../constants';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const NAVHeader_BLOB = ({
  color,
  onPress_forward,
  onPress_back,
  icon_color,
  screen_name,
  back,
}) => {
  return (
    <View
      style={{
        borderBottomColor: COLORS.lightGray3,
        borderBottomWidth: 1,
        width: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: '3%',
          // paddingBottom: 7,

          // alignItems: 'center',
          // left: 0,
          backgroundColor: 'white',
          // justifyContent: 'space-evenly',
        }}>
        <View
          style={{
            left: SIZES.width * 0.05,
            width: SIZES.width * 0.22,
            top: 5,
            height: 47,
            flex: 1,
            // width: 100,
          }}>
          <TouchableOpacity onPress={onPress_back} style={{height: 100}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{}}>
                <Ionicons
                  name="arrow-back-outline"
                  size={30}
                  color={COLORS.mobile_theme_back}
                  style={{}}
                />
              </View>
              <View style={{}}>
                <Text
                  style={{
                    color: COLORS.mobile_theme_back,
                    fontSize: 23,
                  }}>
                  Back
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 2, top: 7}}>
          <Text
            style={{
              color: COLORS.mobile_theme_back,
              fontSize: 23,
              fontWeight: 'bold',
            }}>
            {screen_name}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default NAVHeader_BLOB;
