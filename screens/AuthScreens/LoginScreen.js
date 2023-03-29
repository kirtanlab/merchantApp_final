import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import { StatusBar } from "react-native";
import { SIZES } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import icons from "../../constants/icons";

import * as AuthActions from "../../store/auth/authActions";
import CustomButton from "../../components/CustomeButton";
import InputField from "../../components/InputField";
import { COLORS } from "../../constants";
import AppLoader from "../../components/AppLoader";
import { REACT_APP_OWNER_API } from "@env";
const LoginScreen = ({
  navigation,
  checked_login_pass,
  checked_login_email,
  gen_login_err,
  gen_login_err_method,
  email,
  password,
  updateToken,
}) => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(false);
  const [show, setShow] = useState(true);
  const [_password, setPass] = useState("");
  const setUser = async (token) => {
    return new Promise(function (resolve, reject) {
      AsyncStorage.setItem("token", JSON.stringify(token))
        .then(() => resolve(JSON.stringify(token)))
        .catch((err) => reject("Logged in User data not persisted : ", err));
    });
  };
  const handleLogin = async () => {
    if (email && password) {
      try {
        setLoading(true);

        const obj = {
          email: email,
          password: password,
        };
        const data = await axios.post(
          `${REACT_APP_OWNER_API}/api/v1/owner/login`,
          obj,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("data", data.data);

        updateToken(data.data.token);
        let token = data.data.token;
        await setUser(token);

        let phoneVerified = data.data.user.phoneVerified;
        let detailsEntered = data.data.user.detailsEntered;
        setLoading(false);
        if (phoneVerified && !detailsEntered) {
          // navigation.navigate('Newproperty');
          // navigation.reset({
          //   index: 0,
          //   routes: [{name: 'Newproperty'}],
          // });
          navigation.replace("NewRooms");
        } else if (phoneVerified && detailsEntered) {
          // navigation.replace('MainScreens');

          navigation.replace("MainScreens");
          // navigation.reset({
          //   index: 0,
          //   routes: [{name: 'MainScreens'}],
          // });
        } else {
          navigation.navigate("mobile_input");
        }
      } catch (err) {
        setLoading(false);
        console.log("lol", err);
        gen_login_err_method(true);
        setError(err.response.data.msg);
      }

      // // .finally(() => setLoading(false));
    } else {
      alert("Email or Password is empty.");
    }
  };

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
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

        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            {/* <SvgUri
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
            source={icons.logo_rent}
          /> */}
            <Image
              source={icons.login_img}
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
              fontSize: 30,
              // fontWeight: "bold",
              color: COLORS.mobile_theme_back,
              marginTop: 40,
              marginBottom: 30,
            }}
          >
            Login
          </Text>

          <InputField
            label={"Email ID"}
            type={"login_email"}
            // value={email}
            defaultValue={email}
            // onChange={value => {
            //   console.log(value);
            //   setEmail(value.nativeEvent.text);
            // }}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color={COLORS.mobile_theme_back}
                style={{ marginTop: 10 }}
              />
            }
            keyboardType="email-address"
          />
          {/* {'kirtan' == 'kirtan' && (
          <View style={{marginTop: -30, left: 25, marginBottom: 20}}>
            <Text style={{color: 'red'}}>kirtanHEre</Text>
          </View>
        )} */}
          <InputField
            label={"Password"}
            type={"login_password"}
            defaultValue={password}
            show={show}
            // defaultValue=""
            icon={
              <MaterialIcons
                name="lock-outline"
                size={20}
                color={COLORS.mobile_theme_back}
                style={{ marginTop: 10 }}
              />
            }
            onChange={(value) => {
              setPass(value.nativeEvent.text);
            }}
            inputType="password"
            fieldType={"Button"}
            fieldButtonLabel={show ? "SHOW" : "   HIDE"}
            fieldButtonFunction={() => {
              // navigation.navigate("ForgetPassword");
              console.log("clicked");
              if (show) {
                setShow(false);
              } else {
                setShow(true);
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForgetPassword");
            }}
          >
            <Text
              style={{
                color: COLORS.mobile_theme_back,
                top: -20,
                left: "66%",
                fontSize: 14,
              }}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>
          {gen_login_err && (
            <View style={{ marginTop: -30, left: 25, marginBottom: 20 }}>
              <Text style={{ color: "red" }}>
                {err ? err : "Invalid Email and Password"}
              </Text>
            </View>
          )}
          <CustomButton
            label={"Submit"}
            color={
              checked_login_email && checked_login_pass
                ? COLORS.mobile_theme_back
                : "gray"
            }
            onPress={(e) => {
              if (checked_login_email && checked_login_pass) {
                console.log("Done");
                handleLogin();
              } else {
                gen_login_err_method(true);
              }
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text style={{ color: "grey" }}>New to the app?</Text>
            <TouchableOpacity
              onPress={(value) => {
                // value.preventDefault();
                navigation.navigate("SignupScreen");
              }}
            >
              <Text
                style={{ color: COLORS.mobile_theme_back, fontWeight: "700" }}
              >
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && <AppLoader />}
    </>
  );
};

function mapStateToProps(state) {
  return {
    gen_login_err: state.authReducer.gen_login_err,
    checked_login_pass: state.authReducer.checked_login_pass,
    checked_login_email: state.authReducer.checked_login_email,
    email: state.authReducer.login_email,
    password: state.authReducer.login_password,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateToken: (value) => {
      return dispatch(AuthActions.updateToken(value));
    },
    gen_login_err_method: (value) => {
      return dispatch(AuthActions.gen_login_err(value));
    },
    reset_checked: () => {
      return dispatch(AuthActions.reset_checked());
    },
    update_user: (auth_states) => {
      return dispatch(AuthActions.updateUser(auth_states));
    },
    login_email_checked: (value) => {
      return dispatch(AuthActions.login_email_checked(value));
    },
    login_pass_checked: (value) => {
      return dispatch(AuthActions.login_pass_checked(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
