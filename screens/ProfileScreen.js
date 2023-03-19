import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  StyleSheet,
  Switch,
  Share,
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
          // ...FONTS.h2,
          fontWeight: SIZES.form_button_text_fontWeight,
          fontSize: SIZES.form_section_title_fontsize + 2,
          // fontWeight: "bold",
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
          size={25}
          color={true ? COLORS.black : "lightgray"}
          style={{ flex: 1 }}
        />
        <Text
          style={{
            flex: 9,
            color: COLORS.black,
            fontSize: SIZES.form_section_title_fontsize,
            fontWeight: SIZES.form_button_text_fontWeight,
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
              height: 12,
              width: 12,
              tintColor: COLORS.black,
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

const ProfileScreen = ({
  updateToken,
  auth_states,
  logout,
  navigation,
  updatingMobile,
}) => {
  const [faceId, setFaceId] = React.useState(true);
  const [isDarkMode, setisDarkMode] = React.useState(false);
  const [value, setValue] = React.useState("first");
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey there! I found this Niwas App really very helpful. You may solve your PG/Hostel renting problem with this amazing app.${"\n"}${"\n"} Download now:${"\n"}https://play.google.com/store/apps/details?id=com.ssip.governmentsachivalay`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const Profile_Comp = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top: -10,
        }}
      >
        <Ionicons
          name="person-circle-outline"
          size={90}
          style={{ color: COLORS.mobile_theme_back, top: 5, right: 9 }}
        />
        <View style={{ flexDirection: "column", top: -5 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              left: 10,
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
                fontSize: SIZES.form_section_title_fontsize + 5,
                fontWeight: SIZES.form_button_text_fontWeight,
                // fontWeight: 'bold',
              }}
            >
              Verified
            </Text>
          </View>
          <Text
            style={{
              fontSize: SIZES.form_section_title_fontsize + 5,
              // top: -5,
              color: COLORS.mobile_theme_back,
              fontWeight: SIZES.form_button_text_fontWeight,
            }}
          >
            Kirtan Prajapati
          </Text>
          <View style={{ flexDirection: "column", left: 25 }}>
            <Text
              style={{
                // flex: 1,
                fontSize: SIZES.form_section_title_fontsize,
                color: COLORS.mobile_theme_back,
                fontWeight: SIZES.form_button_text_fontWeight,
                // top: -5,
              }}
            >
              7016700396
            </Text>
          </View>
        </View>
        {/* <View>
          
        </View>
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
        </View> */}
      </View>
    );
  };
  // const Profile_About = () => {
  //   return (
  //     <View
  //       style={{
  //         width: "100%",
  //         borderBottomColor: COLORS.lightGray4,
  //         borderBottomWidth: 1,
  //         paddingBottom: 5,
  //       }}
  //     >
  //       <Text
  //         style={{
  //           color: COLORS.mobile_theme_back,
  //           ...FONTS.h2,
  //           // fontWeight: 'bold',
  //         }}
  //       >
  //         kirtanprajapati234@gmail.com
  //       </Text>
  //       <View style={{ flexDirection: "row" }}>
  //         <Text
  //           style={{
  //             color: COLORS.mobile_theme_back,
  //             ...FONTS.h2,
  //             alignItems: "center",
  //             // fontWeight: 'bold',
  //             flex: 1,
  //           }}
  //         >
  //           ID: 12312312
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <View
      style={{
        // flex: 1,
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
        paddingBottom: 1000,
      }}
    >
      {/* Header */}

      <HeaderBar title="Profile" />

      {/* Details */}

      <Profile_Comp />

      <ScrollView
        style={{
          height: SIZES.height,
          paddingVertical: 0,
          paddingHorizontal: 8,
        }}
      >
        {/* Email & User ID */}
        {/* <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius - 7,
          }}
        > */}
        {/* Email & User ID*/}

        {/* <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}>
            

          </View> */}

        {/* Status : Verified*/}
        {/* <Profile_About /> */}
        {/* </View> */}

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
          onPress={async () => {
            // setModalVisible(true);
            // render_modal();
            // navigation.navigate("ChangeProfile");
            await updatingMobile(true);
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
          title="About us"
          type="button"
          icon_name={"documents-outline"}
          onPress={() => {
            navigation.navigate("GovtTerms");
            console.log("OnPressed");
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
        <Setting
          title="Share/Refer App to your firends"
          type="button"
          icon_name={"share-outline"}
          onPress={onShare}
        />
        <Setting
          title="Logout"
          type="button"
          icon_name={"log-out-outline"}
          onPress={async () => {
            // logout();
            const setUser = async (token) => {
              return new Promise(function (resolve, reject) {
                AsyncStorage.setItem("token", JSON.stringify(token))
                  .then(() => resolve(JSON.stringify(token)))
                  .catch((err) =>
                    reject("Logged in User data not persisted : ", err)
                  );
              });
            };
            setUser("");
            navigation.replace("Root", { screen: "LoginScreen" });
          }}
        />
        {/* <View style={{ paddingBottom: 200 }} /> */}
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
    updateToken: (value) => {
      dispatch(AuthActions.updateToken(value));
    },
    // logout: () => {
    //   dispatch(AuthActions.logout());
    // },
  };
}
// connect(mapStateToProps, mapDispatchToProps)
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
