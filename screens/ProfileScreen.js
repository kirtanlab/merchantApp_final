import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  StyleSheet,
  Switch,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBar } from "../components";
import { FONTS, COLORS, SIZES, dummyData, icons } from "../constants";
import { connect } from "react-redux";
import * as AuthActions from "../store/auth/authActions";
import { RadioButton } from "react-native-paper";
import MainLayout from "./MainLayout";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "@rneui/themed/dist/config";
const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Text
        style={{
          color: COLORS.mobile_theme_back,
          ...FONTS.h2,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const Setting = ({ title, value, type, onPress, icon_name }) => {
  if (type == "button") {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Ionicons
          name={icon_name}
          size={30}
          color={true ? COLORS.mobile_theme_back : "lightgray"}
          style={{ flex: 1 }}
        />
        <Text
          style={{
            flex: 9,
            color: COLORS.black,
            fontSize: 20,
            // fontWeight: 'bold',
          }}
        >
          {title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginRight: SIZES.radius,
              color: COLORS.mobile_theme_back,
              ...FONTS.h3,
              // fontWeight: 'bold',
            }}
          >
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.mobile_theme_back,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          // fontWeight: 'bold',
        }}
      >
        <Text
          style={{
            flex: 1,
            color: COLORS.black,
            fontSize: 20,
            // fontWeight: 'bold',
          }}
        >
          {title}
        </Text>

        <Switch value={value} onValueChange={(value) => onPress(value)} />
      </View>
    );
  }
};

const ProfileScreen = ({ auth_states, logout, navigation, updatingMobile }) => {
  const [faceId, setFaceId] = React.useState(true);
  const [isDarkMode, setisDarkMode] = React.useState(false);
  const [value, setValue] = React.useState("first");

  const Profile_Comp = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: COLORS.lightGray4,
          borderBottomWidth: 1,
        }}
      >
        <Ionicons
          name="person-circle-outline"
          size={90}
          style={{ color: COLORS.mobile_theme_back, top: -10, flex: 1 }}
        />
        <View style={{ flexDirection: "column", flex: 2.7, top: 9 }}>
          <Text style={{ fontSize: SIZES.h2, color: COLORS.mobile_theme_back }}>
            Kirtan Prajapati
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                flex: 1,
                fontSize: SIZES.h2,
                color: COLORS.mobile_theme_back,
              }}
            >
              7016700396
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                top: -3,
                // flex: 1,
              }}
            >
              <Image
                source={icons.verified}
                style={{
                  // color: COLORS.mobile_theme_back,
                  height: 35,
                  width: 35,
                }}
              />
              <Text
                style={{
                  // marginLeft: SIZES.base,
                  // flex: 1,
                  color: COLORS.mobile_theme_back,
                  fontSize: 18,

                  // fontWeight: 'bold',
                }}
              >
                Verified
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const Profile_About = () => {
    return (
      <View
        style={{
          width: "100%",
          borderBottomColor: COLORS.lightGray4,
          borderBottomWidth: 1,
          paddingBottom: 5,
        }}
      >
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            ...FONTS.h2,
            // fontWeight: 'bold',
          }}
        >
          kirtanprajapati234@gmail.com
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: COLORS.mobile_theme_back,
              ...FONTS.h2,
              alignItems: "center",
              // fontWeight: 'bold',
              flex: 1,
            }}
          >
            ID: 12312312
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        // flex: 1,
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
      }}
    >
      {/* Header */}

      <HeaderBar title="Profile" />

      {/* Details */}

      <Profile_Comp />

      <ScrollView style={{ height: SIZES.height, padding: 6 }}>
        {/* Email & User ID */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius - 7,
          }}
        >
          {/* Email & User ID*/}

          {/* <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}>
            

          </View> */}

          {/* Status : Verified*/}
          {/* <Profile_About /> */}
        </View>

        {/* APP */}

        <SectionTitle title="APP" />

        {/* <Setting
          title="Launch Screen"
          value="Home"
          type="button"
          onPress={() => console.log('OnPressed')}
        /> */}

        {/* <Setting
          title="Dark Mode"
          value="Dark"
          // type="button"
          onPress={() => {
            // setModalVisible(true);
            // render_modal();
            console.log("OnPressed");
          }}
        /> */}

        <Setting
          title="Change Profile"
          type="button"
          icon_name={"person-circle-outline"}
          onPress={() => {
            // setModalVisible(true);
            // render_modal();
            navigation.navigate("ChangeProfile");
            console.log("OnPressed");
          }}
        />
        <Setting
          title="Change Mobile Number"
          type="button"
          icon_name={"call-outline"}
          onPress={() => {
            // setModalVisible(true);
            // render_modal();
            // navigation.navigate("ChangeProfile");
            updatingMobile(true);
            navigation.navigate("Root", { screen: "mobile_input" });
          }}
        />
        <SectionTitle title="SECURITY" />
        <Setting
          title="Change Password"
          type="button"
          icon_name={"lock-closed-outline"}
          onPress={() => {
            navigation.push("Root", { screen: "ForgetPassword" }),
              console.log("OnPressed");
            // navigation.navigate('Nested Navigator 2', { screen: 'screen D' });
          }}
        />
        <Setting
          title="Privacy Policy"
          type="button"
          icon_name={"document-text-outline"}
          onPress={() => {
            navigation.navigate("Appterms");
            console.log("OnPressed");
          }}
        />
        <Setting
          title="Goverment Terms"
          type="button"
          icon_name={"documents-outline"}
          onPress={() => {
            navigation.navigate("GovtTerms");
            console.log("OnPressed");
          }}
        />
        <Setting
          title="Logout"
          type="button"
          icon_name={"log-out-outline"}
          onPress={() => {
            // logout();
            navigation.navigate("Root", { screen: "LoginScreen" });
          }}
        />
        <Setting
          title="Rate us on Playstore"
          type="button"
          icon_name={"logo-google-playstore"}
          onPress={() => {
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=com.ssip.governmentsachivalay"
            );
          }}
        />
      </ScrollView>
    </View>
  );
};
function mapStateToProps(state) {
  //   return {
  //     auth_states: state.authReducer.auth_states,
  //   };
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    updatingMobile: (value) => {
      dispatch(AuthActions.updatingMobile(value));
    },
    // logout: () => {
    //   dispatch(AuthActions.logout());
    // },
  };
}
// connect(mapStateToProps, mapDispatchToProps)
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
