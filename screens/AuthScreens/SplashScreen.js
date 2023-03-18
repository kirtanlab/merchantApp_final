import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import AppLoader from "../../components/AppLoader";
import { REACT_APP_OWNER_API } from "@env";

// import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import * as AuthActions from "../../store/auth/authActions";
// import { updateUser, getUserFromStorage } from "../../store/auth/authActions";

const SplashScreen = ({ navigation, updateToken }) => {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const _getUserFromStorage = async () => {
      setLoading(true);
      let token = await AsyncStorage.getItem("token");
      token = JSON.parse(token);
      console.log("from splashscreen", token);
      if (token == null) {
        navigation.replace("LoginScreen");
        setLoading(false);
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
        setLoading(false);
      }
    };
    _getUserFromStorage();
  }, []);
  return (
    <>
      <View style={styles.splashScreenCont}>
        <Text>Checking Authentication...</Text>
      </View>
      {loading && <AppLoader />}
    </>
  );
};

const styles = StyleSheet.create({
  splashScreenCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "center",
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
