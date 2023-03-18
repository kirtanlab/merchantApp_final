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
  const [nameChecked, setNameChecked] = React.useState(false);
  const [emailChecked, setEmailChecked] = React.useState(false);
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
    // <View>
    //   <Text>Name</Text>
    //   <TextInput
    //     value={name}
    //     defaultValue={_default}
    //     onChange={e => console.log(e.nativeEvent.text)}
    //   />
    // </View>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        height: SIZES.height,
        backgroundColor: "white",
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
          // flex: 1,
          paddingHorizontal: 15,
          backgroundColor: COLORS.white,
        }}
      >
        {/* Header */}

        {/* <HeaderBar title="Change Profile" /> */}
        {/* <Nav_Header /> */}
      </View>
      <View style={{ paddingHorizontal: 18, marginTop: 10 }}>
        {/* New Name */}
        <View style={{}}>
          <Text
            style={{
              fontSize: SIZES.h2,
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
              marginLeft: 7,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="person-outline"
                size={27}
                color={true ? COLORS.mobile_theme_back : "lightgray"}
                style={{ marginTop: 18 }}
              />
              <View style={{ width: SIZES.width * 0.73, marginLeft: 10 }}>
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
                    height: 40,
                    marginLeft: 4,
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: "#d1cfcf",
                    marginTop: 5,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingBottom: 0,
                    fontSize: 22,
                    color: "#212121",
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
              <TouchableOpacity>
                {/* <Ionicons
                  name="checkmark-done-outline"
                  size={20}
                  color={true ? COLORS.mobile_theme_back : 'lightgray'}
                  style={{marginTop: 18}}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* New Phone Number
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: SIZES.h2,
              color: COLORS.mobile_theme_back,
              //   bottom: 8,
            }}>
            Enter Number
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: SIZES.width,
              //   marginTop: -10,
              marginLeft: 7,
            }}>
            <View style={{marginTop: 8, flexDirection: 'row'}}>
              <View
                style={{
                  borderColor: COLORS.mobile_theme_back,
                  borderWidth: 1,
                  borderTopEndRadius: 5,
                  borderTopStartRadius: 5,
                  borderBottomStartRadius: 5,
                  borderBottomEndRadius: 5,
                  backgroundColor: COLORS.white,
                  height: 30,
                  width: 40,
                  marginTop: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: -6,
                }}>
                <Text
                  style={{
                    color: COLORS.mobile_theme_back,
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  +91
                </Text>
              </View>
            </View>
            <View style={{width: SIZES.width * 0.75, left: 2}}>
              <TextInput
                onFocus={() => {
                  console.log('Entering focued');
                  // phone_focused(true);
                  // gen_sign_err_method(false);
                }}
                onBlur={() => {
                  console.log('!Entering focued');
                  // phone_focused(false);
                }}
                value={number.toString()}
                placeholder="Enter Phone Number"
                keyboardType="phone-pad"
                style={{
                  height: 40,
                  marginLeft: 4,
                  // flex: 1,
                  borderBottomWidth: 1,
                  borderColor: '#d1cfcf',
                  marginTop: 5,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingBottom: 0,
                  fontSize: 22,
                  color: '#212121',
                }}
                // secureTextEntry={true}
                onChange={value => {
                  // console.log('handeled', value.nativeEvent.text);
                  value = Number(value.nativeEvent.text);
                  if (validate_phone(value)) {
                    console.log('etnereed green');
                    //   phone_checked(true);
                    // gen_sign_err_method(false);
                    // sign_password_focused(false);
                    //   update_phone(value);
                  } else {
                    //   phone_checked(false);
                  }
                }}
              />
            </View>
            <TouchableOpacity>
              {/* <Ionicons
                name="checkmark-done-outline"
                size={20}
                color={true ? COLORS.mobile_theme_back : 'lightgray'}
                style={{marginTop: 18}}
              /> */}
        {/* </TouchableOpacity>
          </View>
        </View> */}
        {/* New Email */}
        <View style={{ marginTop: 15 }}>
          <Text
            style={{
              fontSize: SIZES.h2,
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
              marginLeft: 7,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="mail-outline"
                size={27}
                color={true ? COLORS.mobile_theme_back : "lightgray"}
                style={{ marginTop: 18 }}
              />
              <View style={{ width: SIZES.width * 0.73, marginLeft: 10 }}>
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
                    height: 40,
                    marginLeft: 4,
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: "#d1cfcf",
                    marginTop: 5,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingBottom: 0,
                    fontSize: 22,
                    color: "#212121",
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
              <TouchableOpacity>
                {/* <Ionicons
                  name="checkmark-done-outline"
                  size={20}
                  color={true ? COLORS.mobile_theme_back : 'lightgray'}
                  style={{marginTop: 18}}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 90 }}>
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
