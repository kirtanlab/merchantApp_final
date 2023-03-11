import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {connect} from 'react-redux';
import * as newproperty_actions from '../../store/Newproperty/newproperty_action';
const Looking_Selection_Button = ({looking_form, update_looking}) => {
  let [looking_form_copy, setLooking] = useState(looking_form);
  let [pg, setpg] = useState(looking_form_copy?.pg);
  let [mess, setmess] = useState(looking_form_copy?.mess);
  let [rent, setrent] = useState(looking_form_copy?.rent);
  let [Hostel, setHostel] = useState(looking_form_copy?.Hostel);
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.h2,
            // fontWeight: 'bold',
          }}>
          What You're upto?
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
                backgroundColor: rent ? COLORS.mobile_theme_back : 'white',
              }}
              onPress={async () => {
                if (!rent) {
                  looking_form_copy.rent = true;
                  looking_form_copy.mess = false;
                  looking_form_copy.Hostel = false;
                  looking_form_copy.pg = false;
                  setrent(true);
                  setmess(false);
                  setHostel(false);
                  setpg(false);
                  await update_looking(looking_form_copy);
                }

                console.log('Pressed0');
              }}>
              <Text
                style={{
                  fontSize: SIZES.form_button_text_fontSize,
                  //
                  color: rent ? COLORS.font_color : COLORS.lightGray3,
                }}>
                Rent
              </Text>
            </TouchableOpacity>
          </View>
          {/* mess */}
          {/* <View>
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
                backgroundColor: mess ? COLORS.mobile_theme_back : 'white',
              }}
              onPress={async () => {
                if (!mess) {
                  looking_form_copy.rent = false;
                  looking_form_copy.mess = true;
                  looking_form_copy.pg = false;
                  looking_form_copy.Hostel = false;
                  setrent(false);
                  setmess(true);
                  setpg(false);
                  setHostel(false);
                  await update_looking(looking_form_copy);
                }
                console.log('Pressed1');
              }}>
              <Text
                style={{
                  fontSize: SIZES.form_button_text_fontSize,
                  //
                  color: mess ? COLORS.font_color : COLORS.lightGray3,
                }}>
                Mess
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* Hostel */}
          <View style={{}}>
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
                backgroundColor: Hostel ? COLORS.mobile_theme_back : 'white',
              }}
              onPress={async () => {
                if (!Hostel) {
                  looking_form_copy.rent = false;
                  looking_form_copy.mess = false;
                  looking_form_copy.pg = false;
                  looking_form_copy.Hostel = true;
                  setrent(false);
                  setmess(false);
                  setpg(false);
                  setHostel(true);
                  await update_looking(looking_form_copy);
                }

                console.log('Pressed0');
              }}>
              <Text
                style={{
                  fontSize: SIZES.form_button_text_fontSize,
                  //
                  color: Hostel ? COLORS.font_color : COLORS.lightGray3,
                }}>
                Hostel
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
                maxWidth: SIZES.form_button_maxWidth + 50,
                maxHeight: SIZES.form_button_maxHeight,
                padding: SIZES.form_button_padding,
                alignItems: SIZES.form_button_alignItems,
                justifyContent: SIZES.form_button_justifyContent,
                backgroundColor: pg ? COLORS.mobile_theme_back : 'white',
              }}
              onPress={async () => {
                if (!pg) {
                  looking_form_copy.rent = false;
                  looking_form_copy.mess = false;
                  looking_form_copy.Hostel = false;
                  looking_form_copy.pg = true;
                  setrent(false);
                  setmess(false);
                  setpg(true);
                  setHostel(false);
                  await update_looking(looking_form_copy);
                }
                console.log('Pressed2');
              }}>
              <Text
                style={{
                  fontSize: SIZES.form_button_text_fontSize,
                  //
                  color: pg ? COLORS.font_color : COLORS.lightGray3,
                }}>
                Paying Guest(PG)
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
    looking_form: state.newproperty_reducer.looking_form,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    update_looking: looking_form => {
      dispatch(newproperty_actions.setLooking(looking_form));
    },
    update_test: () => {
      dispatch(newproperty_actions.setTest());
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Looking_Selection_Button);
