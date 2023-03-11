import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native';
// import {Button} from 'react-native-paper';
import {COLORS, FONTS, SIZES} from '../../constants';
import {connect, useSelector} from 'react-redux';
import * as NewRoomActions from '../../store/NewRooms/Newrooms_actions';
const AC_attached = ({updateAttached, attached, updateAC, AC}) => {
  let [_AC, setAC] = useState(AC);
  let [_attched, setAttched] = useState(attached);
  return (
    <SafeAreaView>
      {/* AC/NON_AC */}
      <View>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.custom1,
            fontWeight: 'bold',
          }}>
          Select AC Type
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: 14, marginTop: 12}}>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: SIZES.form_button_minWidth,
              maxWidth: SIZES.form_button_maxWidth,
              maxHeight: SIZES.form_button_maxHeight,
              padding: SIZES.form_button_padding,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: _AC ? COLORS.mobile_theme_back : 'white',
            }}
            onPress={async () => {
              if (!_AC) {
                setAC(true);
                await updateAC(_AC);
              }

              console.log('Pressed0');
            }}>
            <Text
              style={{
                fontSize: SIZES.form_button_text_fontSize,
                fontWeight: SIZES.form_button_text_fontWeight,
                color: _AC ? COLORS.font_color : COLORS.lightGray3,
              }}>
              AC
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: SIZES.form_button_minWidth,
              maxWidth: SIZES.form_button_maxWidth,
              maxHeight: SIZES.form_button_maxHeight,
              padding: SIZES.form_button_padding,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: !_AC ? COLORS.mobile_theme_back : 'white',
            }}
            onPress={async () => {
              if (_AC) {
                setAC(false);
                await updateAC(false);
              }
              console.log('Pressed1');
            }}>
            <Text
              style={{
                fontSize: SIZES.form_button_text_fontSize,
                fontWeight: SIZES.form_button_text_fontWeight,
                color: !_AC ? COLORS.font_color : COLORS.lightGray3,
              }}>
              Non AC
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Attached */}
      <View style={{marginTop: 32}}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.custom1,
            fontWeight: 'bold',
          }}>
          Select Room Type
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: 14, marginTop: 12}}>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: SIZES.form_button_minWidth,
              maxWidth: SIZES.form_button_maxWidth,
              maxHeight: SIZES.form_button_maxHeight,
              padding: SIZES.form_button_padding,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: _attched ? COLORS.mobile_theme_back : 'white',
            }}
            onPress={async () => {
              if (!_attched) {
                setAttched(true);
                await updateAttached(_attched);
              }

              console.log('Pressed0');
            }}>
            <Text
              style={{
                fontSize: SIZES.form_button_text_fontSize,
                fontWeight: SIZES.form_button_text_fontWeight,
                color: _attched ? COLORS.font_color : COLORS.lightGray3,
              }}>
              Attached
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: SIZES.form_button_minWidth,
              maxWidth: SIZES.form_button_maxWidth,
              maxHeight: SIZES.form_button_maxHeight,
              padding: SIZES.form_button_padding,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: !_attched ? COLORS.mobile_theme_back : 'white',
            }}
            onPress={async () => {
              if (_attched) {
                setAttched(false);
                await updateAttached(false);
              }
              console.log('Pressed1');
            }}>
            <Text
              style={{
                fontSize: SIZES.form_button_text_fontSize,
                fontWeight: SIZES.form_button_text_fontWeight,
                color: !_attched ? COLORS.font_color : COLORS.lightGray3,
              }}>
              Non attached
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    AC: state.Newrooms_reducer.AC,
    attached: state.Newrooms_reducer.attached,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateAttached: value => {
      return dispatch(NewRoomActions.udpateAttached(value));
    },
    updateAC: value => {
      return dispatch(NewRoomActions.updateAC(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AC_attached);
