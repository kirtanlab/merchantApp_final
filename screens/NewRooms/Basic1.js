import React, {Fragment, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/NewProperty/Header';
import * as Progress from 'react-native-progress';
import {COLORS, SIZES} from '../../constants';
import Looking_Selection_Button from '../../components/NewProperty/Looking_Selection_Button';
import {connect} from 'react-redux';
import * as newproperty_actions from '../../store/Newproperty/newproperty_action';
import Who_you from '../../components/NewProperty/Who_you';
import Text_Input from '../../components/NewProperty/Text_Input';
import DocumentPicker from 'react-native-document-picker';
import CustomButton_form from '../../components/NewProperty/CustomButton_form';
import NumericInput from '../../components/NewProperty/NumericInput';
import Floor_prices from '../../components/NewRooms.js/Floor_prices';
import Ac_attached from '../../components/NewRooms.js/Ac_attached';
import Nav_Header from '../../components/NewProperty/Nav_Header';
import Toast from 'react-native-toast-message';
import {
  toastConfig,
  showErrorToast,
} from '../../components/NewProperty/ToastConfig';
const Basic1 = ({
  checked_totalRooms,
  checked_title,
  checked_occpancy,
  checked_floor_no,
  checked_price,
  navigation,
}) => {
  function next_page() {
    navigation.navigate('Basic2');
    console.log('next pagee');
  }
  function onPress_for() {
    if (checked_occpancy && checked_title && checked_totalRooms) {
      console.log('Done');
      next_page();
    } else {
      showErrorToast((title = 'Fill Required Fields'));
      console.log('ckicked');
    }
  }
  // function back_page() {
  //   navigation.navigate('Location');
  //   console.log('back pagee');
  // }
  const selectDoc_multiple = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.video,
        ],
      });
      console.log(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled', err);
      } else {
        console.log(err);
      }
    }
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{backgroundColor: 'white', padding: 0}}>
      {/* <KeyboardAvoidingView
        behavior="position"
        style={{backgroundColor: 'white'}}> */}
      <View style={{right: 12}}>
        <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
      </View>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.mobile_theme_back}
        barStyle={'light-content'}
      />

      <SafeAreaView
        style={{
          height: SIZES.height * 0.03,
          backgroundColor: COLORS.mobile_theme_back,
          elevation: 1,
        }}
      />
      <View>
        <Progress.Bar
          progress={0.25}
          color={COLORS.progress_bar}
          width={SIZES.width}
          height={SIZES.height * 0.01}
          style={{position: 'absolute', top: -1}}
        />
        <Nav_Header
          onPress_forward={onPress_for}
          // onPress_back={back_page}
          color={
            checked_occpancy && checked_title && checked_totalRooms
              ? COLORS.mobile_theme_back
              : COLORS.lightGray3
          }
          icon_color={
            checked_occpancy && checked_title && checked_totalRooms
              ? COLORS.mobile_theme_back
              : COLORS.lightGray3
          }
          back={false}
        />
      </View>
      <View style={{padding: 18, marginTop: 25}}>
        <View>
          <Header
            step={1}
            total={4}
            subtitle={'Room Title, Ac/Non AC, occupancy,Available rooms'}
            title={'Add Room Details'}
          />
        </View>
        <View style={{marginTop: 30}}>
          <Floor_prices />
        </View>
        <View style={{marginTop: 8}}>
          <Ac_attached />
        </View>
        {/* Videos of Images
        <View style={{marginTop: 35}}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.custom1,
              fontWeight: '//',
            }}>
            Upload Outer Photo & Videos of Rooms
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 15,
              borderColor: COLORS.mobile_theme,
              // borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: SIZES.form_button_minWidth,
              maxWidth: SIZES.form_button_maxWidth,
              maxHeight: SIZES.form_button_maxHeight,
              padding: SIZES.form_button_padding,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: COLORS.mobile_theme_back,
            }}
            onPress={() => {
              selectDoc_multiple();
              console.log('doc clicked');
            }}>
            <Text
              style={{
                fontSize: SIZES.form_button_text_fontSize,
                fontWeight: SIZES.form_button_text_fontWeight,
                color: COLORS.font_color,
              }}>
              Select fles
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
      {/* <View style={{marginTop: 60}}>
        <CustomButton_form
          fontColor={
            checked_occpancy && checked_totalRooms && checked_title
              ? COLORS.font_color
              : COLORS.lightGray3
          }
          backgroundColor={
            checked_occpancy && checked_totalRooms && checked_title
              ? COLORS.mobile_theme_back
              : COLORS.lightGray4
          }
          label={'Go for Next Step '}
          _borderColor={
            checked_occpancy && checked_totalRooms && checked_title
              ? COLORS.mobile_theme_back
              : COLORS.lightGray4
          }
          borderRadius
          onPress={() => {
            if (checked_occpancy && checked_totalRooms && checked_title) {
              console.log('Done');
              next_page();
            } else {
              // gen_login_err_method(true);
              console.log('ckicked');
            }
          }}
        />
      </View> */}
    </ScrollView>
  );
};
function mapStateToProps(state) {
  return {
    checked_title: state.Newrooms_reducer.checked_title_no,
    checked_floor_no: state.Newrooms_reducer.checked_floor_no,
    checked_price: state.Newrooms_reducer.checked_price,
    checked_occpancy: state.Newrooms_reducer.checked_occupancy,
    checked_totalRooms: state.Newrooms_reducer.checked_totalRooms,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Basic1);
