import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import icons from "../../constants/icons";
import CustomButton from "../../components/CustomeButton";
import InputField from "../../components/InputField";
import { COLORS, SIZES } from "../../constants";
import { StatusBar } from "react-native";
import AppLoader from "../../components/AppLoader";
import { REACT_APP_OWNER_API } from "@env";
import * as AuthActions from '../../store/auth/authActions'
import axios from "axios";
const ForgetPass = ({ navigation, route,prev_screen_name,setPrevScreenname }) => {
  const { email } = route.params;
  const [prev_screen,setPrevScreen] = React.useState(prev_screen_name)
  console.log('Prevscreen',prev_screen)
  
  
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(false);
  const [pass, setPass] = useState("");
  const [conf_pass, set_conf_pass] = useState("");
  const [done, setDone] = useState(false);
  const [focused_new, setFocused_new] = useState(false);
  const [focused_conf, setFocused_conf] = useState(false);
  const [checked_new, setChecked_new] = useState(false);
  const [checked_conf, setChecked_conf] = useState(false);
  const handleLogin = async () => {
    if (pass === conf_pass) {
      // set(false);
      try {
        setLoading(true);
        const obj = {
          email: email,
          password: pass,
        };
        const data = await axios.post(
          `${REACT_APP_OWNER_API}/api/v1/owner/changepassword`,
          obj,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("data", data.data);

        setLoading(false);
        Alert.alert('Password changed')
        if(prev_screen === "ProfileScreen"){
          setPrevScreenname('')
          navigation.replace("MainScreens",{screen: "ProfileScreen"});
        }else{
          navigation.replace("LoginScreen");
        }
        

      } catch (err) {
        setLoading(false);
        console.log("lol", err.response.data);
        // gen_login_err_method(true);
        // setErr(err.response.data.msg);
        setError(true);
      }
    } else {
      Alert.alert("Email or Password is empty.");
    }
  };
  const handle_pass = (e) => {
    setPass(e);
    function validate_password(val) {
      var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      return regex.test(val);
    }
    if (validate_password(e)) {
      setChecked_new(true);
      setChecked_conf(false);
      if (conf_pass === e) {
        setDone(true);
        setChecked_conf(true);
      } else {
        setDone(false);
      }
    } else {
      setChecked_new(false);
      setChecked_conf(false);
      setDone(false);
    }
    // set(e);
    console.log("password", e);
  };
  const handle_conf_pass = (e) => {
    console.log("password conf", pass);
    console.log("password_conf_real", e);
    set_conf_pass(e);
    function validate_conf_password(val) {
      return pass == val;
    }
    if (validate_conf_password(e)) {
      setChecked_conf(true);
      if (checked_new) {
        setDone(true);
      }
    } else {
      setChecked_conf(false);
      setDone(false);
    }
    // set(e);
    console.log("password", e);
  };

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
              // flex: 1,
              backgroundColor: "white",
              justifyContent: "center",
              paddingTop: "10%",
              //   paddingHorizontal: 2
            }}
          >
            <View style={{ paddingHorizontal: 25 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={icons.Newpass}
                  style={{
                    height: 250,
                    width: 250,
                    borderRadius: 20,
                    // marginTop: 30,
                    alignSelf: "center",
                  }}
                />
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                    fontSize: 20,
                    // fontWeight: "bold",
                    color: COLORS.mobile_theme_back,
                    marginTop: 50,
                    marginBottom: 10,
                  }}
                >
                  New Password
                </Text>
                {/* New Password */}
                <InputField
                  label={"New Password"}
                  type={"new_password"}
                  onFocus={() => {
                    setFocused_new(true);
                  }}
                  onBlur={() => {
                    setFocused_new(false);
                  }}
                  onChange={(e) => {
                    handle_pass(e.nativeEvent.text);
                  }}
                  icon={
                    <MaterialIcons
                      name="lock"
                      size={25}
                      color={COLORS.mobile_theme_back}
                      style={{ marginTop: 5 }}
                    />
                  }
                  // onChange={value => handle_email(value.nativeEvent.text)}
                  keyboardType="email-address"
                />
                {focused_new && !checked_new && (
                  <View style={{ top: -20,left: 30 }}>
                    <Text style={{ color: COLORS.lightGray2 }}>
                      Enter Minimum 5 Letter{"\n"}Include at least one alphabet
                    </Text>
                  </View>
                )}
              </View>
              {/* conf_pass */}
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                    fontSize: 20,
                    // fontWeight: "bold",
                    color: COLORS.mobile_theme_back,
                    // marginTop: 40,
                    marginBottom: 10,
                  }}
                >
                  Confirm New Password
                </Text>

                <InputField
                  label={"New Password"}
                  type={"new_conf_password"}
                  onFocus={() => {
                    setFocused_conf(true);
                  }}
                  onBlur={() => {
                    setFocused_conf(false);
                  }}
                  onChange={(e) => {
                    handle_conf_pass(e.nativeEvent.text);
                  }}
                  icon={
                    <MaterialIcons
                      name="lock"
                      size={25}
                      color={COLORS.mobile_theme_back}
                      style={{ marginTop: 5 }}
                    />
                  }
                  // onChange={value => handle_email(value.nativeEvent.text)}
                  keyboardType="email-address"
                />
                {focused_conf && !checked_conf && (
                  <View style={{ top: -20,left: 30 }}>
                    <Text style={{ color: COLORS.lightGray2 }}>
                      Both Field should matched
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {err && (
              <View style={{ marginTop: -20, left: 50 }}>
                <Text style={{ color: "red" }}>Check both fields</Text>
              </View>
            )}
            <View
              style={{ marginTop: "2%", width: SIZES.width * 0.8, left: "10%" }}
            >
              <CustomButton
                label={"submit"}
                color={done ? COLORS.mobile_theme_back : "gray"}
                onPress={() => {
                  if (checked_new && checked_conf) {
                    console.log("Done");
                    handleLogin();
                  } else {
                    setError(true);
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
              <Text style={{ color: "grey" }}>New to the app?</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("LoginScreen")}
              >
                <Text
                  style={{ color: COLORS.mobile_theme_back, fontWeight: "700" }}
                >
                  {" "}
                  Back to Sign in
                </Text>
              </TouchableOpacity>
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
    prev_screen_name: state.authReducer.prev_screen_name
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPrevScreenname: (value) => {
      return dispatch(AuthActions.setPrevScreen(value))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPass);
