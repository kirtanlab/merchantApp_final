import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderBar from "../components/HeaderBar";
import DocumentPicker from "react-native-document-picker";
import Nav_Header from "../components/NewProperty/Nav_Header";
import NAVHeader_BLOB from "../components/NavHeader_BLOB";
import { connect } from "react-redux";
import { REACT_APP_OWNER_API } from "@env";
import axios from "axios";
import CustomButton_form from "../components/NewProperty/CustomButton_form";

const ChangeProfile = ({ navigation, token }) => {
  const data = {
    name: "kirtan",
    number: 9998099893,
    email: "kirtan@gmail.com",
    adhar: {
      fileCopyUri: null,
      name: "Screenshot_20230309-141450_merchantApp.jpg",
      size: 754363,
      type: "image/jpeg",
      uri: "https://cdn.dribbble.com/users/1092261/screenshots/14701547/media/7ab1fda1209b0c9c7508a38a6a52b4d0.png?compress=1&resize=400x300",
    },
  };
  const [name, setName] = React.useState(data.name);
  const [nameChecked, setNameChecked] = React.useState(true);
  const [emailChecked, setEmailChecked] = React.useState(true);
  const [number, setNumber] = React.useState(data.number);
  const [email, setEmail] = React.useState(data.email);
  const [adhar, setAdhar] = React.useState(data.adhar);
  const [_default, setDefault] = React.useState("kirta");
  const [imgUri, setimgUri] = React.useState(data.adhar.uri);
  const [img_uri, setIMGURI] = React.useState(data.adhar.uri);

  const fetch_details = async () => {
    console.log("token", token);
    const data = await axios.get(
      `${REACT_APP_OWNER_API}/api/v1/owner/displayowner`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("data", data.data.data);
    setName(data.data.data.name);
    setEmail(data.data.data.email);
  };
  useEffect(() => {
    fetch_details();
  }, []);
  // console.log(imgUri.uri);
  function validate_phone(val) {
    var regex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    // var regex = /^[6-9][0-9]{9}$/;
    return regex.test(val);
  }
  function validate_name(val) {
    var regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
    return regex.test(val);
  } //
  function validate_email(val) {
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(val);
  }
  const selectDoc = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        mode: "import",
        copyTo: "documentDirectory",
      });
      console.log(res);
      setimgUri(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled", err);
      } else {
        console.log(err);
      }
    }
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        backgroundColor: "white",
        // flex: 1,
        padding: 12,
      }}
    >
      <NAVHeader_BLOB
        screen_name={"Change Profile"}
        onPress_back={async () => {
          navigation.navigate("ProfileScreen");
        }}
      />
      <View
        style={{
          backgroundColor: COLORS.white,
        }}
      ></View>
      <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
        {/* New Name */}
        <View style={{}}>
          <Text
            style={{
              fontSize: SIZES.form_section_title_fontsize,
              color: COLORS.mobile_theme_back,
              //   bottom: 8,
            }}
          >
            Enter Name
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: SIZES.width,
              marginTop: 0,
              // marginLeft: 7,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="person-outline"
                size={20}
                color={true ? COLORS.mobile_theme_back : "lightgray"}
                style={{ marginTop: 10 }}
              />
              <View style={{ width: SIZES.width * 0.73 }}>
                <TextInput
                  onFocus={(e) => {
                    // sign_name_focused(true);
                    // gen_sign_err_method(false);
                  }}
                  onBlur={() => {
                    // sign_name_focused(false);
                  }}
                  value={name}
                  placeholder="Enter Name"
                  keyboardType="default"
                  style={{
                    flex: 1,
                    paddingVertical: 0,
                    borderBottomColor: "#ccc",
                    marginTop: 5,
                    borderBottomWidth: 1,
                    // paddingBottom: 4,
                    fontSize: SIZES.form_section_input_fontsize,
                  }}
                  onChange={(value) => {
                    setName(value.nativeEvent.text);
                    if (validate_name(value.nativeEvent.text)) {
                      setNameChecked(true);
                      //   sign_name_checked(true);
                      // sign_name_focused(false);
                      //   updatesign_name(value.nativeEvent.text);
                    } else {
                      setNameChecked(false);
                      //   sign_name_checked(false);
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text
            style={{
              fontSize: SIZES.form_section_title_fontsize,
              color: COLORS.mobile_theme_back,
              //   bottom: 8,
            }}
          >
            Enter Email
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: SIZES.width,
              marginTop: 0,
              // marginLeft: 7,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={true ? COLORS.mobile_theme_back : "lightgray"}
                style={{ marginTop: 10 }}
              />
              <View style={{ width: SIZES.width * 0.73 }}>
                <TextInput
                  onFocus={(e) => {
                    // sign_name_focused(true);
                    // gen_sign_err_method(false);
                  }}
                  onBlur={() => {
                    // sign_name_focused(false);
                  }}
                  value={email}
                  placeholder="Enter Email"
                  keyboardType="email-address"
                  style={{
                    flex: 1,
                    paddingVertical: 0,
                    borderBottomColor: "#ccc",
                    marginTop: 5,
                    borderBottomWidth: 1,
                    // paddingBottom: 4,
                    fontSize: SIZES.form_section_input_fontsize,
                  }}
                  onChange={(value) => {
                    setEmail(value.nativeEvent.text);
                    if (validate_email(value.nativeEvent.text)) {
                      setEmailChecked(true);
                      //   sign_name_checked(true);
                      // sign_name_focused(false);
                      //   updatesign_name(value.nativeEvent.text);
                    } else {
                      setEmailChecked(false);
                      //   sign_name_checked(false);
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{}}>
        <CustomButton_form
          fontColor={COLORS.font_color}
          backgroundColor={
            nameChecked && emailChecked
              ? COLORS.mobile_theme_back
              : COLORS.lightGray3
          }
          label={"Submit Profile"}
          _borderColor={
            nameChecked && emailChecked
              ? COLORS.mobile_theme
              : COLORS.lightGray3
          }
          borderRadius
          onPress={async () => {
            const data = await axios.post(
              `${REACT_APP_OWNER_API}/api/v1/owner/updateowner`,
              { name: name, email: email },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("done", data.data.data.name);
            Alert.alert("profile updated");
            // navigation.navigate.goBack();
          }}
        />
      </View>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfile);
