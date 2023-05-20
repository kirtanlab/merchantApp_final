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
  PermissionsAndroid,
  Alert,
} from "react-native";
import * as AuthActions from '../../store/auth/authActions'
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
import { changeProfile } from "../../store/auth/authActions";
const ForgetPass = ({ updatelogin_email,route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  let [email,setEmail] = useState(route.params?.obj?.email || route.params?.email)
  let [name,setName] = useState(route.params?.obj?.name)
  let token = route.params?.obj?.token
  const [prev_screen,setPrevscreen] = useState(route.params?.obj?.prev_screen)
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [err_num, setError_num] = useState(false);
  const [err, setErr] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  async function requestReadSmsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "Read SMS permission",
          message: "App needs permission to read SMS messages",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Read SMS permission granted");
      } else {
        console.log("Read SMS permission denied");
      }
    } catch (error) {
      console.warn(error);
    }
  }
  const handleLogin = async () => {
    console.log("final", value.length);
    if (value.length == 4) {
      setError_num(false);
      try {
        setLoading(true);
        const obj = {
          email: email.toLowerCase(),
          otp: Number(value),
        };
        // console.log(obj);
        console.log(obj);
        // const data = await axios.post(
        //   `${REACT_APP_OWNER_API}/api/v1/owner/verifyotp`,
        //   obj
        // );
        // console.log("data", data.data);
        // console.log('token',token)
        if(prev_screen === 'ChangeProfile'){
          let obj ={
            email: email.toLowerCase(),otp: Number(value)
          }
          console.log("prev_data", obj)
          const data = await axios.post(
            `${REACT_APP_OWNER_API}/api/v1/owner/verifynewemail`,
            obj,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          // const _data = await axios.post(
          //   `${REACT_APP_OWNER_API}/api/v1/owner/updateowner`,
          //   { name:name},
          //   {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //       "Content-Type": "application/json",
          //     },
          //   }
          // ); 
          // await updatelogin_email(email)
          console.log('data updated',data.data)
          setLoading(false);
          navigation.replace('Root',{screen: "ProfileScreen"})
        }else{
          navigation.replace("NewPassword", { email: email.toLowerCase() });
        }
        
      } catch (err) {
        console.log('Entered in OTP SCreen Error');
        setLoading(false);
        console.log("lol", err.response.data);
        // navigation.replace("NewPassword");
        // gen_login_err_method(true);
        // setErr(err.response.data.msg);
        if(err.response.data.msg.codeName === "DuplicateKey"){
          Alert.alert("Email already in use")
          navigation.replace('ChangeProfile')
        }
        if(err.response.data.msg === 'Please provide valid Email'){
          Alert.alert("Email already in use")
          navigation.replace('ChangeProfile')
        }
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
        email: email.toLowerCase(),
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
                      top: -18,
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

              {prev_screen !== 'ChangeProfile' && <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 30,
                }}
              >
                <Text style={{ color: "grey" }}>New to the app?</Text>
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
              </View>}
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
  return {
    updatelogin_email: (value) => {
      return dispatch(AuthActions.updatelogin_email(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPass);
