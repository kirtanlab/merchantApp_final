import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Image, StyleSheet, StatusBar, Text, View } from "react-native";
import axios from "axios";
import { COLORS } from "../../constants";
import { REACT_APP_OWNER_API } from "@env";
import { connect } from "react-redux";
import * as AuthActions from "../../store/auth/authActions";
import { icons } from "../../constants";
import SplashScreen from "react-native-splash-screen";

const _SplashScreen = ({ navigation, updateToken }) => {
  useEffect(() => {}, []);
  useEffect(() => {
    // setTimeout(() => {
    // SplashScreen.hide();
    const _getUserFromStorage = async () => {
      // setLoading(true);
      let token = await AsyncStorage.getItem("token");
      token = JSON.parse(token);
      console.log("from splashscreen", token);
      if (token == "" || token == null) {
        SplashScreen.hide();
        navigation.replace("LoginScreen");
      } else {
        // console.log("from splashscreen", token);
        updateToken(token);
        const data = await axios.get(
          `${REACT_APP_OWNER_API}/api/v1/owner/getstatus`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        let phone_status = data.data.data.phoneVerified;
        let details_status = data.data.data.detailsEntered; //for details of property
        let roomFilled = data.data.data.roomFilled; //for room 
        let typeofpg = data.data.data.typeofpg;
        console.log(
          "roomFilled",
          roomFilled,
          "phone_status",
          phone_status,
          "details_status",
          details_status
        );
        let isMESS = false;
        if(typeofpg === 'MESS'){
          isMESS= true
        }
        console.log("typeofpg", data.data);
        if (!phone_status) {
          navigation.replace("mobile_input");
          SplashScreen.hide();
        } else if (!details_status) {
          navigation.replace("Newproperty");
          SplashScreen.hide();
        } else if (!roomFilled && isMESS == false) {
          navigation.replace("NewRooms");
          SplashScreen.hide();
        } else {
          navigation.replace("MainScreens");
          SplashScreen.hide();
        }
      }
    };
    _getUserFromStorage();
    // }, 1000);
  }, []);
  console.log(icons.logo_rent);
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.mobile_theme_back}
        barStyle={"light-content"}
      />
      <View style={styles.splashScreenCont}>
        {/* <Image
          source={icons.logo_rent}
          style={{
            height: 400,
            width: 400,
            borderRadius: 20,
            marginTop: 25,
            alignSelf: "center",
          }}
        /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  splashScreenCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

function mapStateToProps(state) {
  return {
    auth_states: state.authReducer.auth_states,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateToken: (value) => {
      return dispatch(AuthActions.updateToken(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(_SplashScreen);
