import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import InputField from "../../components/InputField";
import { COLORS, icons, SIZES } from "../../constants";
import { Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomeButton";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import * as AuthActions from "../../store/auth/authActions";
import AppLoader from "../../components/AppLoader";
const SignupScreen = ({
  navigation,
  name,
  email,
  password,
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
  logout_dispatch
}) => {
  let err = true;
  const [loading, setLoading] = useState(false);
  const [_err, setError] = useState(false);
  async function handleSignUp() {
    if (email && password && confirmPassword && name) {
      try {
        setLoading(true);
        const obj = {
          email: (email.toLowerCase()).trimEnd(),
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
        await logout_dispatch();
        Alert.alert('Account created successfully')
        navigation.navigate("LoginScreen");
      } catch (err) {
        setLoading(false);
        console.log(err);
        
        setError("Already Registered");
        gen_sign_err_method(true);
        Alert.alert("Email is already registered");
      }
    } else {
      setLoading(false);
      console.error("else part");
    }
  }
  // console.log(phone);
  return (
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
              source={icons.Signup}
              style={{
                height: 250,
                width: 250,
                borderRadius: 20,
                marginTop: 30,
                alignSelf: "center",
              }}
            />
          </View>

          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 25,
              paddingHorizontal: 15,
              // fontWeight: "bold",
              color: COLORS.mobile_theme_back,
              marginTop: 25,
              marginBottom: 30,
            }}
          >
            Register
          </Text>
          {/* UserName */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: SIZES.width * 0.82, marginLeft: 0 }}>
              <InputField
                label={"User Name"}
                type={"sign_name"}
                value={name}
                // style={{left: 10}}
                icon={
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={err ? COLORS.mobile_theme_back : "red"}
                    style={{ marginTop: 5, marginLeft: 7 }}
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
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>
          {focused_sign_name === true && checked_sign_name == false && (
            <View style={{ top: -20,left: 30,}}>
              <Text style={{ color: COLORS.lightGray3 }}>
                Enter Minimum 5 Letter{"\n"}Include at least one alphabet
              </Text>
            </View>
          )}

          {/* EmailSection */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: SIZES.width * 0.81, marginLeft: 5 }}>
              <InputField
                label={"Email ID"}
                type={"sign_email"}
                value={email}
                icon={
                  <MaterialIcons
                    name="alternate-email"
                    size={20}
                    color={err ? COLORS.mobile_theme_back : "red"}
                    style={{ marginTop: 5 }}
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
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>
          {focused_sign_email && !checked_sign_email && (
            <View style={{ top: -20,left: 30, }}>
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
                    size={20}
                    color={true ? COLORS.mobile_theme_back : "red"}
                    style={{ marginTop: 5 }}
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
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>
          {focused_sign_pass && !checked_sign_pass && (
            <View style={{ top: -20,left: 30, }}>
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
                    size={20}
                    color={err ? COLORS.mobile_theme_back : "red"}
                    style={{ marginTop: 5 }}
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
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>
          {focused_sign_conf_pass &&
            checked_sign_conf_pass &&
            checked_sign_pass &&
            !(password == confirmPassword) && (
              <View style={{ top: -20,left: 30, }}>
                <Text style={{ color: COLORS.lightGray3 }}>
                  Shouldn't be empty {"\n"}Should match password entered above
                </Text>
              </View>
            )}
          {gen_sign_err && (
            <View style={{ top: -20,left: 30, }}>
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
                setError("Fill all fields");
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
            <Text style={{color: 'grey'}}>Already registered?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
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
    logout_dispatch: () => {
      return dispatch(AuthActions.logout());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
