import React, { Fragment, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from "react-native";
import Header from "../../components/NewProperty/Header";
import * as Progress from "react-native-progress";
import { COLORS, SIZES } from "../../constants";
import Looking_Selection_Button from "../../components/NewProperty/Looking_Selection_Button";
import { connect } from "react-redux";
import * as newproperty_actions from "../../store/Newproperty/newproperty_action";
import Who_you from "../../components/NewProperty/Who_you";
import Text_Input from "../../components/NewProperty/Text_Input";
import DocumentPicker from "react-native-document-picker";
import CustomButton_form from "../../components/NewProperty/CustomButton_form";
import NumericInput from "../../components/NewProperty/NumericInput";
import Floor_prices from "../../components/NewRooms.js/Floor_prices";
import Ac_attached from "../../components/NewRooms.js/Ac_attached";
import InputField from "../../components/InputField";
// import {Checkbox} from 'react-native-paper';
import * as Newrooms_actions from "../../store/NewRooms/Newrooms_actions";
import CheckBox from "../../components/CheckBox";
import Nav_Header from "../../components/NewProperty/Nav_Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as AuthActions from "../../store/auth/authActions";
import Terms from "../../components/Terms";
import Toast from "react-native-toast-message";
import {
  toastConfig,
  showErrorToast,
} from "../../components/NewProperty/ToastConfig";
import AppLoader from "../../components/AppLoader";
import axios from "axios";
import { REACT_APP_OWNER_API } from "@env";
import { value } from "react-native-extended-stylesheet";
const Basic2 = ({
  navigation,
  extra_description,
  roomUpdating,
  baseTerms,
  checked_base_terms,
  focused_price,
  updateRoomToken,
  checked_price,
  about_room,
  price,
  attached,
  AC,
  occupancy,
  totalRooms,
  token,
  title_no,
  room_updating,
}) => {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    console.log(
      attached,
      " ",
      AC,
      " ",
      title_no,
      " ",
      occupancy,
      " ",
      totalRooms
    );
  }, []);
  function next_page() {
    navigation.navigate("Basic25");
  }
  async function onPress_for() {
    if (checked_price && checked_base_terms) {
      console.log("Done");
      await upload_details();
      await upload_owner_details();
    } else {
      showErrorToast((title = "Fill Required Fields"));
      console.log("ckicked");
    }
  }
  function back_page() {
    navigation.navigate("Basic1");
  }
  const upload_owner_details = async () => {
    try {
      const obj = {
        roomFilled: true,
      };
      const data = await axios.post(
        `${REACT_APP_OWNER_API}/api/v1/owner/updateowner`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data.data);
      setLoading(false);
    } catch (e) {
      console.log("upload_details", e);
      setLoading(false);
    }
  };
  const upload_details = async () => {
    try {
      setLoading(true);
      const obj = {
        title: title_no.trimEnd(),
        availablerooms: totalRooms,
        occupancy: occupancy,
        isAC: AC,
        isAttached: attached,
        price: price,
        About: about_room.trimEnd(),
      };
      console.log("valid", token);
      let bool = room_updating?.updating;
      let room_id = room_updating?.room_id;
      if (bool) {
        console.log("roomid", room_id);
        const data = await axios.post(
          `${REACT_APP_OWNER_API}/api/v1/owner/updateroom/${room_id}`,
          obj,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("updateRoom", data.data.data._id);
      } else {
        const data = await axios.post(
          `${REACT_APP_OWNER_API}/api/v1/owner/createroom`,
          obj,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("createRoom", data.data.data._id);
        updateRoomToken(data.data.data._id);
        let room_id = data.data.data._id;
        let new_temp = {
          updating: true,
          room_id: room_id,
        };
        await roomUpdating(new_temp);
      }
      setLoading(false);

      next_page();
    } catch (err) {
      setLoading(false);
      console.log("lol", err);
    }
  };

  const selectDoc_multiple = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.video,
        ],
      });
      console.log(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled", err);
      } else {
        console.log(err);
      }
    }
  };
  return (
    <>
      <ScrollView
        // keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "white" }}
      >
        {/* <KeyboardAvoidingView */}
        {/* // behavior="position" */}
        {/* <ScrollView style={{backgroundColor: 'white'}}> */}
        <View style={{ left: 1 }}>
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </View>
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
        <View>
          <Progress.Bar
            progress={0.66}
            color={COLORS.progress_bar}
            width={SIZES.width}
            height={SIZES.height * 0.006}
            style={{ position: "absolute", top: -1 }}
          />
          <Nav_Header
            onPress_forward={onPress_for}
            onPress_back={back_page}
            color={
              checked_price && checked_base_terms
                ? COLORS.mobile_theme_back
                : COLORS.lightGray3
            }
            icon_color={
              checked_price && checked_base_terms
                ? COLORS.mobile_theme_back
                : COLORS.lightGray3
            }
            back={true}
          />
        </View>
        <View style={{ flexDirection: "column", height: SIZES.height * 0.8 }}>
          <View
            style={{
              padding: 15,
              marginTop: "10%",
            }}
          >
            <View>
              <Header
                step={2}
                total={3}
                subtitle={"Price,Description of Room,T&Cs"}
                title={"More About Room"}
              />
            </View>
            {/* Prices */}
            <View>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: SIZES.form_section_title_fontsize,
                  }}
                >
                  Enter Room Price
                </Text>
              </View>
              <View style={{ marginTop: 8, flexDirection: "row" }}>
                <View
                  style={{
                    borderColor: COLORS.mobile_theme_back,
                    borderRadius: 5,
                    backgroundColor: COLORS.mobile_theme_back,
                    height: 25,
                    width: 25,
                    marginTop: 11,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.font_color,
                      fontSize: SIZES.form_section_title_fontsize,
                    }}
                  >
                    ₹
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: SIZES.width * 0.7, marginLeft: 9 }}>
                    <InputField
                      label={"Enter Prices"}
                      type={"prices"}
                      keyboardType={"phone-pad"}
                      value={price}
                    />
                  </View>
                  <TouchableOpacity>
                    <Ionicons
                      name="checkmark-done-outline"
                      size={25}
                      color={
                        checked_price ? COLORS.mobile_theme_back : "lightgray"
                      }
                      style={{ marginRight: 5, marginTop: 2 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {focused_price && !checked_price && (
                <View style={{ marginTop: -30, left: 50, marginBottom: 20 }}>
                  <Text style={{ color: COLORS.lightGray3 }}>
                    Enter Valid Prices
                  </Text>
                </View>
              )}
            </View>
            {/* Add ABout */}
            <View style={{}}>
              <View style={{}}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: SIZES.form_section_title_fontsize,
                  }}
                >
                  About Room
                </Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <KeyboardAvoidingView>
                  <InputField
                    label={"Add About Room Here"}
                    type={"About_room"}
                    keyboardType={"default"}
                    // value={aboutpg}
                    defaultValue={about_room}
                    multiline
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
          </View>
          <View
            style={{
              marginLeft: 9,
              marginTop: SIZES.height * 0.7,
              position: "absolute",
            }}
          >
            <Terms />
          </View>
        </View>

        {/* </ScrollView> */}
      </ScrollView>

      {loading && <AppLoader />}
    </>
  );
};

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    price: state.Newrooms_reducer.price,
    room_updating: state.Newrooms_reducer.room_updating,
    about_room: state.Newrooms_reducer.about_room,
    focused_price: state.Newrooms_reducer.focused_price,
    checked_price: state.Newrooms_reducer.checked_price,
    checked_base_terms: state.Newrooms_reducer.checked_base_terms,
    baseTerms: state.Newrooms_reducer.baseTerms,
    extra_description: state.Newrooms_reducer.extra_description,
    title_no: state.Newrooms_reducer.title_no,
    totalRooms: state.Newrooms_reducer.totalRooms,
    occupancy: state.Newrooms_reducer.occupancy,
    AC: state.Newrooms_reducer.AC,
    attached: state.Newrooms_reducer.attached,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateRoomToken: (value) => {
      dispatch(AuthActions.updateRoomToken(value));
    },
    roomUpdating: (value) => {
      dispatch(Newrooms_actions.roomUpdating(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Basic2);
