import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button } from "react-native";
// import {Button} from 'react-native-paper';
import { COLORS, FONTS, SIZES } from "../../constants";
import { connect, useSelector } from "react-redux";
import * as NewRoomActions from "../../store/NewRooms/Newrooms_actions";
const AC_attached = ({
  updateSingleorDouble,
  updateCooler,
  cooler,
  singleordouble,
  updateAttached,
  attached,
  updateAC,
  AC,
}) => {
  let [_AC, setAC] = useState(AC);
  let [_attched, setAttched] = useState(attached);
  let [_cooler, setCooler] = useState(cooler);
  let [_roomType, setRoomType] = useState(singleordouble);
  console.log("roomType", _roomType);
  return (
    <SafeAreaView>
      {/* AC/NON_AC */}
      <View>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.form_section_title_fontsize,
          }}
        >
          Select AC Type
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 14, marginTop: 12 }}>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: SIZES.form_button_minWidth,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: _AC ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (!_AC) {
                setAC(true);
                await updateAC(true);
              }

              console.log("Pressed0");
            }}
          >
            <Text
              style={{
                lineHeight: SIZES.form_button_text_lineHeight,
                fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                fontWeight: SIZES.form_button_text_fontWeight,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: _AC ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              AC
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,

              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: !_AC ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (_AC) {
                setAC(false);
                await updateAC(false);
              }
              console.log("Pressed1");
            }}
          >
            <Text
              style={{
                lineHeight: SIZES.form_button_text_lineHeight,
                fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                fontWeight: SIZES.form_button_text_fontWeight,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,

                color: !_AC ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Non AC
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Cooler */}
      <View style={{ marginTop: 32 }}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.form_section_title_fontsize,
          }}
        >
          Select Cooler Type
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 14, marginTop: 12 }}>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,

              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: _cooler ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (!_cooler) {
                setCooler(true);
                await updateCooler(true);
              }

              console.log("Pressed0");
            }}
          >
            <Text
              style={{
                fontWeight: SIZES.form_button_text_fontWeight,
                lineHeight: SIZES.form_button_text_lineHeight,
                fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: _cooler ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Cooler
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,

              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: !_cooler ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (_cooler) {
                setCooler(false);
                await updateCooler(false);
              }
              console.log("Pressed1");
            }}
          >
            <Text
              style={{
                fontWeight: SIZES.form_button_text_fontWeight,
                lineHeight: SIZES.form_button_text_lineHeight,
                fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: !_cooler ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Non Cooler
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Attached */}
      <View style={{ marginTop: 32 }}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.form_section_title_fontsize,
          }}
        >
          Select Bathroom Type
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 14, marginTop: 12 }}>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,

              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: _attched ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (!_attched) {
                setAttched(true);
                await updateAttached(true);
              }

              console.log("Pressed0");
            }}
          >
            <Text
              style={{
                fontWeight: SIZES.form_button_text_fontWeight,
                lineHeight: SIZES.form_button_text_lineHeight,
                fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: _attched ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Attached
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,

              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: !_attched ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (_attched) {
                setAttched(false);
                await updateAttached(false);
              }
              console.log("Pressed1");
            }}
          >
            <Text
              style={{
                fontWeight: SIZES.form_button_text_fontWeight,
                lineHeight: SIZES.form_button_text_lineHeight,
                fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: !_attched ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Non attached
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Room type */}
      <View style={{ marginTop: 32 }}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.form_section_title_fontsize,
          }}
        >
          Select Room Type
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 14, marginTop: 12 }}>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,

              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: _roomType ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (!_roomType) {
                setRoomType(true);
                await updateSingleorDouble(true);
              }

              console.log("Pressed0");
            }}
          >
            <Text
              style={{
                fontWeight: SIZES.form_button_text_fontWeight,
                lineHeight: SIZES.form_button_text_lineHeight,
                fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: _roomType ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Single
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,

              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: !_roomType ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (_roomType) {
                setRoomType(false);
                await updateSingleorDouble(false);
              }
              console.log("Pressed1");
            }}
          >
            <Text
              style={{
                fontWeight: SIZES.form_button_text_fontWeight,
                lineHeight: SIZES.form_button_text_lineHeight,
                fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: !_roomType ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Double
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    AC: state.Newrooms_reducer.AC,
    attached: state.Newrooms_reducer.attached,
    singleordouble: state.Newrooms_reducer.singleordouble,
    cooler: state.Newrooms_reducer.cooler,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateAttached: (value) => {
      return dispatch(NewRoomActions.udpateAttached(value));
    },
    updateAC: (value) => {
      return dispatch(NewRoomActions.updateAC(value));
    },
    updateCooler: (value) => {
      return dispatch(NewRoomActions.updateCooler(value));
    },
    updateSingleorDouble: (value) => {
      return dispatch(NewRoomActions.updateSingleorDouble(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AC_attached);
