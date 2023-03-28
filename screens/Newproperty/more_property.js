import React, { Fragment, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/NewProperty/Header";
import * as Progress from "react-native-progress";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { COLORS, SIZES } from "../../constants";
import { connect } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import CustomButton_form from "../../components/NewProperty/CustomButton_form";
import Amneties from "../../components/NewProperty/Amneties";
import Nav_Header from "../../components/NewProperty/Nav_Header";
import AddText from "../../components/NewProperty/AddText";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  toastConfig,
  showErrorToast,
} from "../../components/NewProperty/ToastConfig";
import AppLoader from "../../components/AppLoader";
import InputField from "../../components/InputField";
const more_property = ({
  focused_mess_price,
  checked_mess_price,
  mess,
  navigation,
  vid_downloaded,
}) => {
  const [imgUri, setimgUri] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const [vidUri, setvidUri] = React.useState(undefined);

  function next_page() {
    console.log("vidDownloaded", vid_downloaded);
    // if (vid_downloaded !== 2) {
    //   setLoading(true);
    // } else {
    //   setLoading(false);

    // }
    navigation.navigate("vidImage");
    console.log("next pagee");
  }
  function onPress_for() {
    if (mess) {
      if (checked_mess_price) {
        console.log("Done");
        next_page();
      } else {
        showErrorToast((title = "Fill All Required Details"));
        console.log("ckicked");
      }
    } else {
      next_page();
    }
  }
  function back_page() {
    navigation.navigate("Location");
    console.log("back pagee");
  }
  //   const selectDoc = async () => {
  //     try {
  //       const res = await DocumentPicker.pickSingle({
  //         type: [DocumentPicker.types.images],
  //       });
  //       console.log(res);
  //     } catch (err) {
  //       if (DocumentPicker.isCancel(err)) {
  //         console.log('User cancelled', err);
  //       } else {
  //         console.log(err);
  //       }
  //     }
  //   };
  const selectDoc_multiple_image = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      console.log(res);
      setimgUri(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled images", err);
      } else {
        console.log(err);
      }
    }
  };
  const selectDoc_multiple_video = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.video],
      });
      console.log(res);
      setvidUri(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled videos", err);
      } else {
        console.log(err);
      }
    }
  };
  return (
    <>
      <Provider>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: "white" }}
        >
          {/* <KeyboardAvoidingView
        behavior="position"
        style={{backgroundColor: 'white'}}> */}
          <View style={{ right: 12 }}>
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
              progress={0.75}
              color={COLORS.progress_bar}
              width={SIZES.width + 10}
              height={SIZES.height * 0.01}
              style={{ position: "absolute", left: -5, top: -1 }}
            />
            <View style={{ top: 12 }}>
              {mess ? (
                <Nav_Header
                  onPress_forward={onPress_for}
                  onPress_back={back_page}
                  color={checked_mess_price && COLORS.mobile_theme_back}
                  icon_color={checked_mess_price && COLORS.mobile_theme_back}
                  back={true}
                />
              ) : (
                <Nav_Header
                  onPress_forward={onPress_for}
                  onPress_back={back_page}
                  color={COLORS.mobile_theme_back}
                  icon_color={COLORS.mobile_theme_back}
                  back={true}
                />
              )}
            </View>
          </View>
          <View style={{ padding: 15, marginTop: 25 }}>
            <View>
              <Header
                step={3}
                subtitle={"Propertie's amneties, description"}
                title={"More about Property"}
              />
            </View>
            {!mess ? (
              <View style={{ marginTop: 30, marginBottom: 20 }}>
                <Amneties />
              </View>
            ) : (
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: SIZES.form_section_title_fontsize,
                  }}
                >
                  Enter Mess Price (Total Monthly Price)
                </Text>
                <View style={{ marginTop: 8, flexDirection: "row" }}>
                  <View
                    style={{
                      borderColor: COLORS.mobile_theme_back,
                      borderRadius: 5,
                      backgroundColor: COLORS.mobile_theme_back,
                      height: 25,
                      width: 25,
                      marginTop: 11,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.font_color,
                        fontSize: SIZES.form_section_title_fontsize,
                      }}
                    >
                      ₹
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: SIZES.width * 0.7, marginLeft: 9 }}>
                      <InputField
                        label={"Enter Prices"}
                        type={"mess_prices"}
                        keyboardType={"phone-pad"}
                      />
                    </View>
                    <TouchableOpacity>
                      <Ionicons
                        name="checkmark-done-outline"
                        size={20}
                        color={
                          checked_mess_price
                            ? COLORS.mobile_theme_back
                            : "lightgray"
                        }
                        style={{ marginRight: 5, top: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {focused_mess_price && !checked_mess_price && (
                  <View style={{ top: -30, left: 35 }}>
                    <Text
                      style={{
                        color: COLORS.lightGray3,
                        fontSize: SIZES.form_section_input_helper,
                      }}
                    >
                      Enter Valid Prices
                    </Text>
                  </View>
                )}
              </View>
            )}

            <View>
              <AddText />
            </View>

            {/* Videos of Images
        <View style={{marginTop: 25}}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.custom1,
              fontWeight: 'bold',
            }}>
            Upload Outer Photo of PG
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

          {/* <View style={{marginTop: '15%'}}>
        <CustomButton_form
          fontColor={true ? COLORS.font_color : COLORS.lightGray3}
          backgroundColor={true ? COLORS.mobile_theme_back : COLORS.lightGray4}
          label={'Go for Next Step '}
          _borderColor={true ? COLORS.mobile_theme_back : COLORS.lightGray4}
          borderRadius
          onPress={() => {
            if (true) {
              console.log('Done');
              next_page();
            } else {
            }
          }}
        />
      </View> */}
        </ScrollView>
      </Provider>
      {loading && <AppLoader />}
    </>
  );
};
function mapStateToProps(state) {
  return {
    vid_downloaded: state.vidImage_reducer.vid_downloaded,
    mess: state.newproperty_reducer.looking_form.mess,
    checked_mess_price: state.newproperty_reducer.checked_mess_price,
    focused_mess_price: state.newproperty_reducer.focused_mess_price,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(more_property);
