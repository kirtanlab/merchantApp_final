import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Share,
  Linking,
} from "react-native";
import { HeaderBar } from "../components";
import { FONTS, COLORS, SIZES, icons } from "../constants";
import { connect } from "react-redux";
import * as AuthActions from "../store/auth/authActions";
import axios from "axios";
import { REACT_APP_OWNER_API } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
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
          fontSize: SIZES.form_section_title_fontsize,
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

        <Image
          source={icons.rightArrow}
          style={{
            height: 12,
            width: 12,
            tintColor: COLORS.black,
          }}
        />
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
  token,
  updatingMobile,
}) => {
  const [faceId, setFaceId] = React.useState(true);
  const [isDarkMode, setisDarkMode] = React.useState(false);
  const [value, setValue] = React.useState("first");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const owner_fetch_details = async () => {
    const instance = axios.create({
      baseURL: `${REACT_APP_OWNER_API}/api/v1/owner/displayowner`,
      // timeout: 1000,
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
    });
    // axios.defaults.cache = false;
    const data = await instance.get();
    // console.log("result", data.data.data.phoneno);
    // console.log("result", data.data.data.nameasperaadhar);
    setName(data.data.data.nameasperaadhar);
    setPhone(data.data.data.phoneno);
    // console.log("result_property", data.data.data);
    // prop_setData(data.data.data);

    // // console.log("result", data.data.data.address);
    // setViews(data.data.data.views);
    // setInterestedusers(data.data.data.interestedusers);
    // prop_setImage(data.data.data?.photos[0]?.uri);
  };

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
        <View
          style={{ flexDirection: "column", alignItems: "center", top: -5 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              left: 7,
            }}
          >
            <Text
              style={{
                color: COLORS.mobile_theme_back,
                fontSize: SIZES.form_section_title_fontsize + 5,
                fontWeight: SIZES.form_button_text_fontWeight,
              }}
            >
              Verified
            </Text>
            <Image
              source={icons.verified}
              style={{
                // color: COLORS.mobile_theme_back,
                height: 30,
                width: 30,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: SIZES.form_section_title_fontsize + 5,
              top: -5,
              left: -5,
              color: COLORS.mobile_theme_back,
              fontWeight: SIZES.form_button_text_fontWeight,
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              // flex: 1,
              fontSize: SIZES.form_section_title_fontsize,
              color: COLORS.mobile_theme_back,
              fontWeight: SIZES.form_button_text_fontWeight,
              top: -5,
              left: -5,
            }}
          >
            {phone}
          </Text>
        </View>
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
  useEffect(() => {
    owner_fetch_details();
  }, []);
  return (
    <ScrollView
      style={{
        // flex: 1,
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
        paddingBottom: 1000,
      }}
    >
      {/* Header */}

      <HeaderBar title="Setting" />

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
    </ScrollView>
  );
};
function mapStateToProps(state) {
  //   return {
  //     auth_states: state.authReducer.auth_states,
  //   };
  return {
    token: state.authReducer.token,
  };
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
