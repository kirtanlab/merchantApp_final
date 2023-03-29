import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  View,
  ScrollView,
} from "react-native";
import axios from "axios";
import * as AuthActions from "../../store/auth/authActions";
import { connect } from "react-redux";
import icons from "../../constants/icons";
import CustomButton from "../../components/CustomeButton";
import InputField from "../../components/InputField";
import { COLORS, SIZES } from "../../constants";
import { StatusBar } from "react-native";
import AppLoader from "../../components/AppLoader";
import { REACT_APP_OWNER_API } from "@env";
import SmsRetriever from "react-native-sms-retriever";
const mobile_input = ({
  phone_checked,
  update_phone,
  token,
  navigation,
  phone,
  checked_phone,
}) => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(false);
  const handleLogin = async () => {
    if (phone) {
      try {
        setLoading(true);

        const obj = {
          phoneno: phone,
        };
        const data = await axios.post(
          `${REACT_APP_OWNER_API}/api/v1/owner/mobileOTPSend`,
          obj,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("data", data);
        setLoading(false);
        navigation.navigate("MobileOTP", {
          phone_number: phone,
        });
      } catch (err) {
        setLoading(false);
        console.log("lol", err);
        // gen_login_err_method(true);
        // setError(err.response.data.msg);
      }

      // // .finally(() => setLoading(false));
    } else {
      alert("Email or Password is empty.");
    }
  };
  // useEffect(
  //   () => {
  //     let timer1 = setTimeout(() => {
  //       let _onPhoneNumberPressed = async () => {
  //         try {
  //           const phoneNumber = await SmsRetriever.requestPhoneNumber();
  //           // console.log();
  //           let phone = phoneNumber.slice(3, 13);
  //           update_phone(phone);
  //           phone_checked(true);
  //         } catch (error) {
  //           console.log(JSON.stringify(error));
  //         }
  //       };

  //       _onPhoneNumberPressed();
  //       console.log("cleared");
  //     }, 200);
  //     return () => {
  //       clearTimeout(timer1);
  //     };
  //   },

  //   // _onSmsListenerPressed();
  //   []
  // );
  return (
    <>
      <ScrollView style={{ backgroundColor: "white" }}>
        <KeyboardAvoidingView
          behavior="position"
          style={{ backgroundColor: "white" }}
        >
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
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "center",
              paddingTop: "18%",
              //   paddingHorizontal: 2
            }}
          >
            <View style={{ paddingHorizontal: 25 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={icons.mobile_input}
                  style={{
                    height: 250,
                    width: 250,
                    borderRadius: 20,
                    // marginTop: "1%",
                    alignSelf: "center",
                  }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                    fontSize: 21,
                    // paddingHorizontal: 15,
                    // fontWeight: "bold",
                    color: COLORS.mobile_theme_back,
                    marginTop: 25,
                    marginBottom: 30,
                  }}
                >
                  Enter Mobile Number to Continue
                </Text>
                {/* Mobile_no */}
                <View
                  style={{
                    flexDirection: "row",
                    width: SIZES.width,
                    // marginTop: 10,
                    marginLeft: 7,
                  }}
                >
                  <View style={{ marginTop: 4, flexDirection: "row" }}>
                    <View
                      style={{
                        borderColor: COLORS.mobile_theme_back,
                        borderWidth: 1,
                        borderTopEndRadius: 5,
                        borderTopStartRadius: 5,
                        borderBottomStartRadius: 5,
                        borderBottomEndRadius: 5,
                        backgroundColor: COLORS.white,
                        height: 30,
                        width: 40,
                        // marginTop: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: -6,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.mobile_theme_back,
                          fontSize: 14,
                          // fontWeight: "bold",
                        }}
                      >
                        +91
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: SIZES.width * 0.75, left: 2 }}>
                    <InputField
                      label={"Enter Phone Number"}
                      type={"phone"}
                      keyboardType={"phone-pad"}

                      //   icon={
                      //     <Ionicons
                      //       name="call-outline"
                      //       size={20}
                      //       color={err ? '#666' : 'red'}
                      //       style={{marginRight: 5, marginTop: 5}}
                      //     />
                      //   }
                    />
                  </View>
                </View>

                {/* {focused_phone && !checked_phone && (
                  <View style={{ marginTop: -30, left: 45, marginBottom: 20 }}>
                    <Text style={{ color: COLORS.lightGray3 }}>
                      Enter 10 Digit Phone Number
                    </Text>
                  </View>
                )} */}
                {err && (
                  <View style={{ marginTop: -30, left: 45, marginBottom: 20 }}>
                    <Text style={{ color: "red" }}>
                      Enter 10 Digit Phone Number
                    </Text>
                  </View>
                )}
                {/* {err && !checked_phone && (
                  <View style={{ marginTop: -30, left: 45, marginBottom: 20 }}>
                    <Text style={{ color: "red" }}>
                      Enter 10 Digit Phone Number
                    </Text>
                  </View>
                )} */}
              </View>
            </View>
            {/* RegisterButton */}
            <View style={{ marginTop: "10%", width: "85%", marginLeft: "6%" }}>
              <CustomButton
                label={"Send OTP"}
                color={true ? COLORS.mobile_theme_back : "gray"}
                onPress={() => {
                  if (checked_phone) {
                    console.log("Done");
                    setError(false);
                    handleLogin();
                  } else {
                    setError(true);
                    // gen_sign_err_method(true);
                  }
                }}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
      {loading && <AppLoader />}
    </>
  );
};

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,

    phone: state.authReducer.phone,
    focused_phone: state.authReducer.focused_phone,
    checked_phone: state.authReducer.checked_phone,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    update_phone: (value) => {
      return dispatch(AuthActions.update_phone(value));
    },
    phone_checked: (value) => {
      return dispatch(AuthActions.phone_checked(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(mobile_input);
