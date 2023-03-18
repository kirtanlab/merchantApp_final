import React, { useState, useEffect } from "react";
var qs = require("qs");
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
// import SvgUri from 'react-native-svg-uri';
import InputField from "../../components/InputField";
import { COLORS, icons, SIZES } from "../../constants";
import { Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import RegistrationSVG from "../../assets/icons/registration.svg";
import CustomButton from "../../components/CustomeButton";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
// import {auth} from '../../firebase';
// import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { REACT_APP_OWNER_API } from "@env";
import * as AuthActions from "../../store/auth/authActions";
import AppLoader from "../../components/AppLoader";
const SignupScreen = ({
  navigation,
  updateUser,
  name,
  phone,
  focused_phone,
  checked_phone,
  email,
  password,
  login_email,
  login_password,
  checked_login_email,
  checked_login_pass,
  gen_login_err,
  confirmPassword,
  focused_sign_email,
  focused_sign_name,
  focused_sign_pass,
  focused_sign_conf_pass,
  checked_sign_email,
  checked_sign_name,
  checked_sign_pass,
  checked_sign_conf_pass,
  gen_sign_err,
  gen_sign_err_method,
  reset_checked,
}) => {
  let err = true;
  // let checked = false;
  const [loading, setLoading] = useState(false);
  const [_err, setError] = useState(false);
  const [_email, setEmail] = useState("");
  const [_password, setPass] = useState("");
  const [verified, setVerified] = useState(false);
  const [posted, setPosted] = useState(true);

  // const persistUserData = user => {
  //   return new Promise(function (resolve, reject) {
  //     AsyncStorage.setItem('userData', JSON.stringify(user))
  //       .then(() => resolve(JSON.stringify(user)))
  //       .catch(err => reject('Logged in User data not persisted : ', err));
  //   });
  // };
  async function handleSignUp() {
    if (email && password && confirmPassword && name) {
      try {
        setLoading(true);
        const obj = {
          email: email,
          password: password,
          name: name,
        };
        console.log(JSON.stringify(obj));
        // console.log(obj);
        const data = await axios.post(
          `http://13.233.240.199:8000/api/v1/owner/register`,
          obj,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(data.data.token);
        setLoading(false);
        navigation.navigate("LoginScreen");
      } catch (err) {
        setLoading(false);
        console.log(err);
        setError("Already Registered");
        Alert.alert("Already Registered");
      }
    } else {
      setLoading(false);
      console.error("else part");
    }
  }
  // console.log(phone);
  return (
    // <SafeAreaView
    //   style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 15 }}
        >
          <View style={{ marginTop: 0, alignItems: "center" }}>
            <Image
              source={icons.logo_rent}
              style={{
                height: 350,
                width: 350,
                borderRadius: 20,
                marginTop: 30,
                alignSelf: "center",
              }}
            />
          </View>

          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 35,
              fontWeight: "bold",
              color: COLORS.mobile_theme_back,
              marginTop: 40,
              marginBottom: 30,
            }}
          >
            Register
          </Text>
          {/* UserName */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: SIZES.width * 0.82, marginLeft: 4 }}>
              <InputField
                label={"User Name"}
                type={"sign_name"}
                value={name}
                // style={{left: 10}}
                icon={
                  <Ionicons
                    name="person-outline"
                    size={26}
                    color={err ? COLORS.mobile_theme_back : "red"}
                    style={{ marginTop: 18, marginLeft: 7 }}
                  />
                }
              />
            </View>
            <TouchableOpacity>
              <Ionicons
                name="checkmark-done-outline"
                size={20}
                color={
                  checked_sign_name ? COLORS.mobile_theme_back : "lightgray"
                }
                style={{ marginTop: 18 }}
              />
            </TouchableOpacity>
          </View>
          {focused_sign_name === true && checked_sign_name == false && (
            <View style={{ marginTop: -30, left: 55, marginBottom: 20 }}>
              <Text style={{ color: COLORS.lightGray3 }}>
                Enter Minimum 5 Letter{"\n"}Include at least one alphabet
              </Text>
            </View>
          )}

          {/* EmailSection */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: SIZES.width * 0.81, marginLeft: 8 }}>
              <InputField
                label={"Email ID"}
                type={"sign_email"}
                value={email}
                icon={
                  <MaterialIcons
                    name="alternate-email"
                    size={26}
                    color={err ? COLORS.mobile_theme_back : "red"}
                    style={{ marginTop: 18 }}
                  />
                }
                keyboardType="email-address"
              />
            </View>
            <TouchableOpacity>
              <Ionicons
                name="checkmark-done-outline"
                size={20}
                color={
                  checked_sign_email ? COLORS.mobile_theme_back : "lightgray"
                }
                style={{ marginTop: 18 }}
              />
            </TouchableOpacity>
          </View>
          {focused_sign_email && !checked_sign_email && (
            <View style={{ marginTop: -30, left: 55, marginBottom: 20 }}>
              <Text style={{ color: COLORS.lightGray3 }}>
                Enter Your Valid Email ID
              </Text>
            </View>
          )}

          {/* PasswordField */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: SIZES.width * 0.82, marginLeft: 4 }}>
              <InputField
                label={"Password"}
                type={"sign_password"}
                value={password}
                icon={
                  <Ionicons
                    name="ios-lock-closed-outline"
                    size={26}
                    color={true ? COLORS.mobile_theme_back : "red"}
                    style={{ marginTop: 18 }}
                  />
                }
                inputType="password"
              />
            </View>

            <TouchableOpacity>
              <Ionicons
                name="checkmark-done-outline"
                size={20}
                color={
                  checked_sign_pass ? COLORS.mobile_theme_back : "lightgray"
                }
                style={{ marginTop: 18 }}
              />
            </TouchableOpacity>
          </View>
          {focused_sign_pass && !checked_sign_pass && (
            <View style={{ marginTop: -30, left: 55, marginBottom: 20 }}>
              <Text style={{ color: COLORS.lightGray3 }}>
                Enter Atleast one number{"\n"}Enter Atleast One Symbol(!@#$%^&*)
                {"\n"}Enter atleast 6 letters
              </Text>
            </View>
          )}

          {/* ConfirmPassword */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: SIZES.width * 0.82, marginLeft: 4 }}>
              <InputField
                label={"Confirm Password"}
                type={"sign_conf_password"}
                value={confirmPassword}
                icon={
                  <Ionicons
                    name="ios-lock-closed-outline"
                    size={26}
                    color={err ? COLORS.mobile_theme_back : "red"}
                    style={{ marginTop: 18 }}
                  />
                }
                inputType="password"
              />
            </View>

            <TouchableOpacity>
              <Ionicons
                name="checkmark-done-outline"
                size={20}
                color={
                  password == confirmPassword &&
                  checked_sign_conf_pass &&
                  checked_sign_pass
                    ? COLORS.mobile_theme_back
                    : "lightgray"
                }
                style={{ marginTop: 18 }}
              />
            </TouchableOpacity>
          </View>
          {focused_sign_conf_pass &&
            checked_sign_conf_pass &&
            checked_sign_pass &&
            !(password == confirmPassword) && (
              <View style={{ marginTop: -30, left: 40, marginBottom: 20 }}>
                <Text style={{ color: COLORS.lightGray3 }}>
                  Shouldn't be empty {"\n"}Should match password entered above
                </Text>
              </View>
            )}
          {gen_sign_err && (
            <View style={{ marginTop: -30, left: 55, marginBottom: 20 }}>
              <Text style={{ color: "red" }}>{_err}</Text>
            </View>
          )}

          {/* RegisterButton */}
          <CustomButton
            label={"Register"}
            color={
              checked_sign_email &&
              checked_sign_name &&
              checked_sign_pass &&
              password == confirmPassword &&
              checked_sign_conf_pass
                ? COLORS.mobile_theme_back
                : "gray"
            }
            onPress={() => {
              if (
                password == confirmPassword &&
                checked_sign_email &&
                checked_sign_name &&
                checked_sign_pass &&
                checked_sign_conf_pass
              ) {
                console.log("Done");
                handleSignUp();
              } else {
                gen_sign_err_method(true);
              }
            }}
          />

          {/* Login Redirect */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text>Already registered?</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LoginScreen", {
                  __email: login_email,
                  __password: login_password,
                  _checked_login_email: checked_login_email,
                  _checked_login_pass: checked_login_pass,
                  _gen_login_err: gen_login_err,
                })
              }
            >
              <Text
                style={{ color: COLORS.mobile_theme_back, fontWeight: "700" }}
              >
                {" "}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {loading && <AppLoader />}
    </>
  );
};

function mapStateToProps(state) {
  return {
    gen_login_err: state.authReducer.gen_login_err,
    checked_login_pass: state.authReducer.checked_login_pass,
    checked_login_email: state.authReducer.checked_login_email,
    login_email: state.authReducer.login_email,
    login_password: state.authReducer.login_password,
    name: state.authReducer.sign_name,
    email: state.authReducer.sign_email,
    password: state.authReducer.sign_password,
    confirmPassword: state.authReducer.sign_conf_password,
    focused_sign_email: state.authReducer.focused_sign_email,
    focused_sign_name: state.authReducer.focused_sign_name,
    focused_sign_pass: state.authReducer.focused_sign_pass,
    focused_sign_conf_pass: state.authReducer.focused_sign_conf_pass,
    checked_sign_email: state.authReducer.checked_sign_email,
    checked_sign_name: state.authReducer.checked_sign_name,
    checked_sign_pass: state.authReducer.checked_sign_pass,
    checked_sign_conf_pass: state.authReducer.checked_sign_conf_pass,
    gen_sign_err: state.authReducer.gen_sign_err,
    phone: state.authReducer.phone,
    focused_phone: state.authReducer.focused_phone,
    checked_phone: state.authReducer.checked_phone,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (auth_states) => {
      return dispatch(AuthActions.updateUser(auth_states));
    },
    gen_sign_err_method: (value) => {
      return dispatch(AuthActions.gen_sign_err(value));
    },
    reset_checked: () => {
      return dispatch(AuthActions.reset_checked());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
