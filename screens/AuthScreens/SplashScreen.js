import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Image, StyleSheet, StatusBar, Text, View } from "react-native";
import axios from "axios";
import { COLORS } from "../../constants";
import { REACT_APP_OWNER_API } from "@env";
import { connect } from "react-redux";
import * as AuthActions from "../../store/auth/authActions";
import { icons } from "../../constants";

const SplashScreen = ({ navigation, updateToken }) => {
  useEffect(() => {
    setTimeout(() => {
      const _getUserFromStorage = async () => {
        setLoading(true);
        let token = await AsyncStorage.getItem("token");
        token = JSON.parse(token);
        console.log("from splashscreen", token);
        if (token == "") {
          navigation.replace("LoginScreen");
        } else {
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
          let details_status = data.data.data.detailsEntered;
          let roomFilled = data.data.data.roomFilled;
          if (!phone_status) {
            navigation.replace("MobileOTP");
          } else if (!details_status) {
            navigation.replace("Newproperty");
          } else if (!roomFilled) {
            navigation.replace("NewRooms");
          } else {
            navigation.replace("MainScreens");
          }
        }
      };
      _getUserFromStorage();
    }, 2000);
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
    // user: state.authReducer.user,
    // user: state.authReducer.user,
    // userData: state.authReducer.userData,
    // status: state.authReducer.status,
    // user: state.authReducer.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
