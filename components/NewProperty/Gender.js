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
import * as newproperty_actions from '../../store/Newproperty/newproperty_action';
const Gender = ({gender, udpate_gender}) => {
  let [gender_form_copy, setLooking] = useState(gender);
  let [male, setmale] = useState(gender_form_copy?.male);
  let [female, setfemale] = useState(gender_form_copy?.female);
  let [both, setboth] = useState(gender_form_copy?.both);

  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.h2,
            // fontWeight: 'bold',
          }}>
          Select The reserved gender for your property
        </Text>
      </View>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 14,
            marginTop: 12,
            // flex: 3,
            // flexBasis: 33.333333,
            // flexShrink: 1,
            // overflow: 'auto',
            // justifyConte,
            // alignContent: 'center',
            // justifyContent: 'space-between',
            position: 'relative',
            // paddingHorizontal: 10,
          }}>
          {/* rent */}
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
                backgroundColor: male ? COLORS.mobile_theme_back : 'white',
              }}
              onPress={async () => {
                if (!male) {
                  gender_form_copy.male = true;
                  gender_form_copy.female = false;
                  gender_form_copy.both = false;
                  setmale(true);
                  setfemale(false);
                  setboth(false);
                  await udpate_gender(gender_form_copy);
                }

                console.log('Pressed0');
              }}>
              <Text
                style={{
                  fontSize: SIZES.form_button_text_fontSize,
                  // fontWeight: SIZES.form_button_text_fontWeight,
                  color: male ? COLORS.font_color : COLORS.lightGray3,
                }}>
                Male
              </Text>
            </TouchableOpacity>
          </View>
          {/* mess */}
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
                backgroundColor: female ? COLORS.mobile_theme_back : 'white',
              }}
              onPress={async () => {
                if (!female) {
                  gender_form_copy.male = false;
                  gender_form_copy.female = true;
                  gender_form_copy.both = false;
                  setmale(false);
                  setfemale(true);
                  setboth(false);
                  await udpate_gender(gender_form_copy);
                }
                console.log('Pressed1');
              }}>
              <Text
                style={{
                  fontSize: SIZES.form_button_text_fontSize,
                  // fontWeight: SIZES.form_button_text_fontWeight,
                  color: female ? COLORS.font_color : COLORS.lightGray3,
                }}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
          {/* PG */}
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
                backgroundColor: both ? COLORS.mobile_theme_back : 'white',
              }}
              onPress={async () => {
                if (!both) {
                  gender_form_copy.male = false;
                  gender_form_copy.female = false;
                  gender_form_copy.both = true;
                  setmale(false);
                  setfemale(false);
                  setboth(true);
                  await udpate_gender(gender_form_copy);
                }
                console.log('Pressed2');
              }}>
              <Text
                style={{
                  fontSize: SIZES.form_button_text_fontSize,
                  // fontWeight: SIZES.form_button_text_fontWeight,
                  color: both ? COLORS.font_color : COLORS.lightGray3,
                }}>
                Both
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    test: state.newproperty_reducer.new_test,
    gender: state.newproperty_reducer.gender,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    udpate_gender: value => {
      dispatch(newproperty_actions.setGender(value));
    },
    update_test: () => {
      dispatch(newproperty_actions.setTest());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Gender);
