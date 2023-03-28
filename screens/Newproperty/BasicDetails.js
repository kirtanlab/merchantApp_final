import React, { Fragment, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
  Alert,
} from "react-native";
import { REACT_APP_OWNER_API } from "@env";
import axios from "axios";
import * as AdharCard_actions from "../../store/AdharCard/AdharCard_actions";
import * as Newproperty_ext_actions from "../../store/Newproperty_ext/Newproperty_ext_actions";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/NewProperty/Header";
import * as Progress from "react-native-progress";
import { COLORS, SIZES, FONTS } from "../../constants";
import Looking_Selection_Button from "../../components/NewProperty/Looking_Selection_Button";
import { connect } from "react-redux";
import * as newproperty_actions from "../../store/Newproperty/newproperty_action";
import Who_you from "../../components/NewProperty/Who_you";
import Text_Input from "../../components/NewProperty/Text_Input";
import DocumentPicker from "react-native-document-picker";
import CustomButton_form from "../../components/NewProperty/CustomButton_form";
import Gender from "../../components/NewProperty/Gender";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import {
  toastConfig,
  showErrorToast,
} from "../../components/NewProperty/ToastConfig";
import Nav_Header from "../../components/NewProperty/Nav_Header";
import AppLoader from "../../components/AppLoader";
const BasicDetails = ({
  checked_adhar_card,
  adharcard,
  updateAdharCard,
  checkedAdharCard,
  change_state,
  checked_adhar_name,
  navigation,
  checked_propertyName,
  looking_for,
  adhar_name,
  gender,
  propertyName,
  token,
}) => {
  const [_img_url, _setimg_url] = React.useState(
    adharcard ? adharcard?.uri : undefined
  );
  const [loading, setLoading] = React.useState(false);
  const [_intImg, setintImg] = React.useState([]);
  const upload_adhar = async () => {
    try {
      console.log("Uploadingadhar", token);
      let adhar_obj = {
        name: _intImg[0].name,
        uri: _intImg[0].uri,
        type: _intImg[0].type,
      };
      const formData = new FormData();
      // formData.append("name", "pic");
      formData.append("pic", adhar_obj);
      const data = await axios.post(
        `${REACT_APP_OWNER_API}/api/v1/addaadharproof`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("upload_adhar_sc", data.data);
    } catch (e) {
      console.log("upload_adhar", e);
      setLoading(false);
    }
  };
  console.log("adharcard", adharcard);
  //    change_state();s
  //   // console.log('test',test)
  // }, []);useEffect(() => {
  console.log("adharcarduri", adharcard?.uri);
  function next_page() {
    navigation.navigate("Location");
    console.log("next pagee");
  }
  function onPress_for() {
    if (checked_adhar_name && checked_propertyName && checked_adhar_card) {
      if (_intImg.length > 0) {
        upload_adhar();
      }
      console.log("Done");
      next_page();
    } else {
      showErrorToast((title = "Fill Required Fields"));
      console.log("ckicked");
    }
  }
  function back_page() {}

  const selectDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      if (res[0].size <= 10000000) {
        _setimg_url(res[0].uri);
        setintImg(res);
        await checkedAdharCard(true);
        console.log("checked", res);
        updateAdharCard(res);
      } else {
        showErrorToast((title = "File size limit exceeded"));
      }
      // setimgUri(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled", err);
      } else {
        console.log(err);
      }
      checkedAdharCard(false);
    }
  };
  useEffect(() => {
    console.log(
      adhar_name,
      " ",
      propertyName,
      " ",
      looking_for,
      " ",
      gender,
      " ",
      adharcard
    );
  }, [adhar_name, propertyName, adharcard, looking_for, gender]);
  return (
    <>
      <ScrollView style={{ backgroundColor: "white" }}>
        {/* <KeyboardAvoidingView
        behavior="position"
        style={{backgroundColor: 'white'}}> */}
        <View style={{}}>
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </View>
        <StatusBar
          animated={true}
          backgroundColor={COLORS.mobile_theme_back}
          barStyle={"light-content"}
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
            width={SIZES.width + 5}
            height={SIZES.height * 0.01}
            style={{ position: "relative", left: -2, top: -1 }}
          />
        </View>
        <Nav_Header
          icon_color={
            checked_propertyName && checked_adhar_name && checked_adhar_card
              ? COLORS.mobile_theme_back
              : COLORS.lightGray3
          }
          color={
            checked_propertyName && checked_adhar_name && checked_adhar_card
              ? COLORS.mobile_theme_back
              : COLORS.lightGray3
          }
          back={false}
          onPress_forward={onPress_for}
        />
        <View style={{ padding: 15, marginTop: 25 }}>
          <View>
            <Header
              step={1}
              subtitle={"Your intent,Property type & contact details"}
              title={"Add Basic Details"}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <Text_Input />
          </View>

          <View style={{ marginTop: 0 }}>
            <Looking_Selection_Button />
          </View>
          <View style={{ marginTop: 30 }}>
            <Gender />
          </View>
          {/* <View style={{marginTop: 25}}>
          <Who_you />
        </View> */}
          {/* upload adhaar */}
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: COLORS.mobile_theme_back,
              // minWidth: 100,
              // width: '100%',
              minHeight: 40,
              borderRadius: 10,
              marginTop: 25,
              maxHeight: 200,
              // alignItems: 'center',
              padding: 5,
              // marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: SIZES.form_section_title_fontsize,
                color: COLORS.black,
                //   bottom: 8,
                // marginTop: 25,
                flex: 1,
                // top: 5,
              }}
            >
              Addhar card (Maximum Image size is 10MB)
            </Text>

            {_img_url !== undefined && (
              <TouchableOpacity
                style={{
                  // marginTop: 18,
                  height: 36,
                  width: 40,
                  // padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  // paddingTop: 5,
                  // left: 20,
                  // backgroundColor: COLORS.mobile_theme_back,
                  borderRadius: 10,
                  color: COLORS.white,
                  fontSize: SIZES.h2,
                  // marginTop: 25,
                }}
                onPress={async () => {
                  // _setimg_url("");
                  var pattern = /^((https):\/\/)/;

                  if (pattern.test(_img_url)) {
                    try {
                      const _data = await axios.delete(
                        `${REACT_APP_OWNER_API}/api/v1/deleteaadharproof`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                          data: { name: adharcard.name },
                        }
                      );
                      console.log("data_success", _data);
                    } catch (err) {
                      console.log("deleteroom video", err);
                    }
                  }
                  _setimg_url(undefined);
                  checkedAdharCard(false);
                  setintImg([]);
                }}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={25}
                  color={true ? COLORS.mobile_theme_back : "lightgray"}
                  style={{ flex: 1 }}
                />
              </TouchableOpacity>
            )}
          </View>
          {_img_url === undefined && (
            <View style={{}}>
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
                  maxWidth: SIZES.form_button_maxWidth,
                  alignItems: SIZES.form_button_alignItems,
                  justifyContent: SIZES.form_button_justifyContent,
                  backgroundColor: COLORS.mobile_theme_back,
                }}
                onPress={() => {
                  selectDoc();
                  console.log("doc clicked");
                }}
              >
                <Text
                  style={{
                    lineHeight: SIZES.form_button_text_lineHeight,
                    // fontFamily: FONTS.fontFamily_black,
                    color: COLORS.font_color,
                    fontSize: SIZES.form_button_text_fontSize,
                    marginVertical: SIZES.form_button_text_marginVertical,
                    marginHorizontal: SIZES.form_button_text_marginHorizontal,
                  }}
                >
                  Select File
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Show Uploaded */}
          {/* <Image
          source={{uri: imgUri}}
          style={{
            height: 300,
            width: SIZES.width - 45,
            borderRadius: 10,
            marginTop: 7,
            alignSelf: 'center',
          }}
        /> */}
          {_img_url !== undefined && (
            <Image
              source={{ uri: _img_url }}
              style={{
                height: 200,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.lightGray3,
                borderRadius: 10,
                width: SIZES.width - 50,
                // height: 300,
                marginLeft: 5,
              }}
            />
          )}
        </View>
      </ScrollView>
      {loading && <AppLoader />}
    </>
  );
};

function mapStateToProps(state) {
  return {
    checked_propertyName: state.newproperty_reducer.checked_propertyName,
    focused_propertyName: state.newproperty_reducer.focused_propertyName,
    propertyName: state.newproperty_reducer.propertyName,
    test: state.newproperty_reducer.new_test,
    adharcard: state.AdharCard_reducer.adharcard,
    checked_adhar_card: state.AdharCard_reducer.checked_adhar_card,
    checked_adhar_name: state.authReducer.checked_adhar_name,
    checked_phone: state.authReducer.checked_phone,
    looking_for: state.newproperty_reducer.looking_form,
    adhar_name: state.authReducer.adhar_name,
    gender: state.newproperty_reducer.gender,
    token: state.authReducer.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    change_state: () => {
      dispatch(newproperty_actions.setTest());
    },
    checkedAdharCard: (value) => {
      dispatch(AdharCard_actions.checkedAdharCard(value));
    },
    updateAdharCard: (value) => {
      dispatch(AdharCard_actions.updateAdharCard(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BasicDetails);
