import React, {Fragment, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
} from 'react-native';
import * as Ele_Bill_actions from '../../store/Ele_Bill/Ele_Bill_actions';
// import {} from 'react-native-safe-area-context';
import * as Newpropert_ext_actions from '../../store/Newproperty_ext/Newproperty_ext_actions';
import Header from '../../components/NewProperty/Header';
import * as Progress from 'react-native-progress';
// import * as newproperty_actions from '../../store/Newproperty/newproperty_action';
import {COLORS, SIZES} from '../../constants';
import Looking_Selection_Button from '../../components/NewProperty/Looking_Selection_Button';
import {connect} from 'react-redux';
import * as newproperty_actions from '../../store/Newproperty/newproperty_action';
import Who_you from '../../components/NewProperty/Who_you';
import Text_Input from '../../components/NewProperty/Text_Input';
import DocumentPicker from 'react-native-document-picker';
import CustomButton_form from '../../components/NewProperty/CustomButton_form';
import NumericInput from '../../components/NewProperty/NumericInput';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  toastConfig,
  showErrorToast,
} from '../../components/NewProperty/ToastConfig';
import Nav_Header from '../../components/NewProperty/Nav_Header';
const Location = ({
  checked_Description_pg,
  checked_Location,
  navigation,
  checked_house_no,
  checked_Landmark,
  checked_ele_bill,
  elebill,
  checkedElebill,
  updateElebill,
}) => {
  useEffect(() => {
    checked_ele_bill && console.log('checked_ele_bill', checked_ele_bill);
  }, [checked_ele_bill]);

  // const [imgUri, setimgUri] = React.useState(undefined);
  const [img_url, setimg_url] = React.useState(elebill);
  function next_page() {
    navigation.navigate('MoreProperty');
    console.log('next pagee');
  }
  function onPress_for() {
    if (checked_Landmark && checked_house_no && checked_ele_bill) {
      console.log('Done');
      next_page();
    } else {
      showErrorToast((title = 'Fill Required Fields'));
      console.log('ckicked');
    }
  }
  function back_page() {
    navigation.navigate('BasicDetails');
    console.log('back pagee');
  }

  const selectDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      setimg_url(res[0].uri);
      checkedElebill(true);
      updateElebill(res[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled', err);
      } else {
        console.log(err);
      }
      checkedElebill(false);
    }
  };
  const selectDoc_multiple = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
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
    <ScrollView style={{backgroundColor: 'white'}}>
      {/* <KeyboardAvoidingView
        behavior="position"
        style={{backgroundColor: 'white'}}> */}
      <View style={{}}>
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
          progress={0.5}
          color={COLORS.progress_bar}
          width={SIZES.width}
          height={SIZES.height * 0.01}
          style={{position: 'absolute', top: -1}}
        />
        <Nav_Header
          onPress_forward={onPress_for}
          onPress_back={back_page}
          color={
            checked_Landmark && checked_house_no && checked_ele_bill
              ? COLORS.mobile_theme_back
              : COLORS.lightGray3
          }
          icon_color={
            checked_Landmark && checked_house_no && checked_ele_bill
              ? COLORS.mobile_theme_back
              : COLORS.lightGray3
          }
          back={true}
        />
      </View>
      <View style={{padding: 15, marginTop: 25}}>
        <View>
          <Header
            step={2}
            subtitle={'Your House Number,Landmark,Location & Document'}
            title={'Add Location Details'}
          />
        </View>
        <View style={{marginTop: 30}}>
          <NumericInput navigation={navigation} />
        </View>
        {/* Bijli ka bil*/}
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: COLORS.mobile_theme_back,
            // minWidth: 100,
            // width: '100%',
            minHeight: 40,
            borderRadius: 10,
            // marginTop: 25,
            maxHeight: 200,
            // alignItems: 'center',
            padding: 5,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: SIZES.h2,
              color: COLORS.black,
              //   bottom: 8,
              marginTop: 5,
              flex: 1,
            }}>
            Electricity Bill
          </Text>
          {img_url !== '' && (
            <TouchableOpacity
              style={{
                // marginTop: 18,
                height: 36,
                width: 40,
                // padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                // paddingTop: 5,
                // left: 20,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                color: COLORS.mobile_theme_back,
                fontSize: SIZES.h2,
                // marginTop: 25,
              }}
              onPress={async () => {
                setimg_url('');
                checkedElebill(false);
                await updateElebill('');
              }}>
              <Ionicons
                name="close-circle-outline"
                size={35}
                color={true ? COLORS.mobile_theme_back : 'lightgray'}
                style={{flex: 1}}
              />
            </TouchableOpacity>
          )}
        </View>
        {img_url === '' && (
          <View style={{top: -10}}>
            {/* <Text
              style={{
                fontSize: SIZES.h2,
                color: COLORS.mobile_theme_back,
                //   fontWeight: 'bold',
              }}>
              Upload Adhar(image or pdf form)
            </Text> */}
            <TouchableOpacity
              style={{
                // marginTop: 15,
                borderColor: COLORS.mobile_theme,
                borderWidth: SIZES.form_button_borderWidth,
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
                selectDoc();
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
          </View>
        )}

        {img_url !== '' && (
          <View
            style={{
              // marginTop: 30,
              borderWidth: 1,
              borderColor: COLORS.lightGray3,
              borderRadius: 10,
              width: SIZES.width - 50,
              // height: 300,
              marginLeft: 5,
              top: -10,
            }}>
            <Image
              source={{uri: elebill}}
              style={{height: 300, borderRadius: 10, width: SIZES.width - 50}}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
function mapStateToProps(state) {
  return {
    elebill: state.Ele_Bill_reducer.elebill,
    checked_ele_bill: state.Ele_Bill_reducer.checked_ele_bill,
    checked_house_no: state.newproperty_reducer.checked_house_no,
    checked_Location: state.Newproperty_ext_reducer.checked_Location,
    checked_Landmark: state.newproperty_reducer.checked_Landmark,
    checked_Description_pg: state.newproperty_reducer.checked_Description_pg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkedElebill: value => {
      dispatch(Ele_Bill_actions.checkedElebill(value));
    },
    updateElebill: value => {
      dispatch(Ele_Bill_actions.updateElebill(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
