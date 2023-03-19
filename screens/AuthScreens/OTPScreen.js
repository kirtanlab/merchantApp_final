import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import icons from "../../constants/icons";
import CustomButton from "../../components/CustomeButton";
import { COLORS, SIZES } from "../../constants";
import { StatusBar } from "react-native";
import AppLoader from "../../components/AppLoader";
import { REACT_APP_OWNER_API } from "@env";
import axios from "axios";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const ForgetPass = ({ route, navigation }) => {
  const { email } = route.params;
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [err_num, setError_num] = useState(false);
  const [err, setErr] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const handleLogin = async () => {
    console.log("final", value.length);
    if (value.length == 4) {
      setError_num(false);
      try {
        setLoading(true);
        const obj = {
          email: email,
          otp: Number(value),
        };
        console.log(obj);
        const data = await axios.post(
          `${REACT_APP_OWNER_API}/api/v1/owner/verifyotp`,
          obj
        );
        console.log("data", data.data);

        setLoading(false);
        navigation.replace("NewPassword", { email: email });
      } catch (err) {
        setLoading(false);
        console.log("lol", err.response.data);
        // navigation.replace("NewPassword");
        // gen_login_err_method(true);
        // setErr(err.response.data.msg);
        setErr(true);
      }
    } else {
      setError_num(true);
      //   setErr(true)
    }
  };
  const handle_resend = async () => {
    try {
      setLoading(true);
      const obj = {
        email: email,
      };
      const data = await axios.patch(
        `${REACT_APP_OWNER_API}/api/v1/owner/forgotpassword`,
        obj,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("data", data.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("lol", err.response.data.msg);
      // gen_login_err_method(true);
      setErr(err.response.data.msg);
    }
  };
  useEffect(() => {
    // reset_checked();
  }, []);
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
              paddingTop: "20%",
              //   paddingHorizontal: 2
            }}
          >
            <View style={{ paddingHorizontal: 25 }}>
              <View style={{ alignItems: "center" }}>
                {/* <SvgUri
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
            source={icons.logo_rent}
          /> */}
                <Image
                  source={icons.OTP_email}
                  style={{
                    height: 250,
                    width: 250,
                    borderRadius: 20,
                    // marginTop: 10,
                    top: -50,
                    alignSelf: "center",
                  }}
                />
              </View>
              <View style={{ top: -10, flexDirection: "column" }}>
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                    fontSize: 30,
                    // fontWeight: "bold",
                    color: COLORS.mobile_theme_back,
                    // marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  Enter OTP
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: COLORS.mobile_theme_back,
                    // marginTop: '',
                    marginBottom: 30,
                  }}
                >
                  OTP sent to {email}
                </Text>
              </View>
              <View style={{}}>
                {
                  <SafeAreaView style={styles.root}>
                    {/* <Text style={styles.title}>Verification</Text> */}
                    <CodeField
                      ref={ref}
                      {...props}
                      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                      value={value}
                      onChangeText={(e) => {
                        setValue(e);
                        // setotp(e);
                        console.log(e.length);
                        if (e.length >= 4) {
                          console.log("Done");
                          setDone(true);
                        } else {
                          setDone(false);
                        }
                      }}
                      cellCount={CELL_COUNT}
                      rootStyle={styles.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({ index, symbol, isFocused }) => (
                        <Text
                          key={index}
                          style={[styles.cell, isFocused && styles.focusCell]}
                          onLayout={getCellOnLayoutHandler(index)}
                        >
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                      )}
                    />
                  </SafeAreaView>
                }
                <TouchableOpacity
                  onPress={() => handle_resend()}
                  style={{ height: 20, marginLeft: "75%", marginTop: 20 }}
                >
                  <Text
                    style={{
                      color: COLORS.mobile_theme_back,
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Resend OTP
                  </Text>
                </TouchableOpacity>
                {err_num && (
                  <View
                    style={{
                      marginTop: 0,
                      top: -15,
                      left: 23,
                      marginBottom: 0,
                    }}
                  >
                    <Text
                      style={{
                        color: "red",
                        // fontWeight: "bold",
                        fontSize: 13,
                      }}
                    >
                      Enter Four Digit OTP
                    </Text>
                  </View>
                )}
                {err && (
                  <View
                    style={{
                      marginTop: 0,
                      top: -15,
                      left: 23,
                      marginBottom: 0,
                    }}
                  >
                    <Text
                      style={{
                        color: "red",
                        // fontWeight: "bold",
                        fontSize: 13,
                      }}
                    >
                      Enter Correct OTP
                    </Text>
                  </View>
                )}
              </View>

              {/* <InputField
            label={'Email ID'}
            type={'forget_email'}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color={COLORS.mobile_theme_back}
                style={{marginTop: 18}}
              />
            }
            onChange={value => handle_email(value.nativeEvent.text)}
            keyboardType="email-address"
          />
        */}

              <View style={{ marginTop: "5%" }}>
                <CustomButton
                  label={"submit"}
                  color={done ? COLORS.mobile_theme_back : "gray"}
                  onPress={() => {
                    if (done) {
                      console.log("Done");
                      handleLogin();
                    } else {
                      setError_num(true);
                      setErr(false);
                    }
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 30,
                }}
              >
                <Text>New to the app?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Text
                    style={{
                      color: COLORS.mobile_theme_back,
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    Back to Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
      {loading && <AppLoader />}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
    // paddingVertical: 15,
    // marginTop: 20,
  },
  title: { textAlign: "center", fontSize: 30 },
  //   codeFieldRoot: {marginTop: 20},
  cell: {
    width: 33,
    height: 33,
    // lineHeight: 45,
    fontSize: 20,
    borderWidth: 2,
    color: COLORS.black,
    borderColor: COLORS.mobile_theme_back,
    textAlign: "center",
    // justifyContent: 'center',
    alignItems: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPass);
