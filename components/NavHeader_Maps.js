import React from 'react';
import {COLORS, SIZES} from '../constants';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const NavHeader_Maps = ({
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
        flexDirection: 'row',
        // marginTop: '3%',
        // paddingBottom: 7,
        borderBottomColor: COLORS.lightGray3,
        borderBottomWidth: 1,
        // alignItems: 'center',
        // left: -12,
        paddingBottom: 8,
        backgroundColor: 'white',
        // justifyContent: 'space-evenly',
        marginBottom: 2,
      }}>
      <View
        style={{
          left: SIZES.width * 0.03,
          width: SIZES.width * 0.22,
          top: 14,
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
                color={COLORS.white}
                style={{}}
              />
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 23,
                }}>
                Back
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1.6, top: 16}}>
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          {screen_name}
        </Text>
      </View>
      <View
        style={{
          left: SIZES.width * 0.05,
          width: SIZES.width * 0.22,
          top: 14,
          height: 47,
          flex: 1,
          // width: 100,
        }}>
        <TouchableOpacity onPress={onPress_forward} style={{height: 100}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{}}>
              <Text
                style={{
                  color: COLORS.mobile_theme_back,
                  fontSize: 23,
                }}>
                Next
              </Text>
            </View>
            <View style={{}}>
              <Ionicons
                name="arrow-forward-outline"
                size={30}
                color={COLORS.mobile_theme_back}
                style={{}}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default NavHeader_Maps;
