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
import * as newproperty_actions from "../../store/Newproperty/newproperty_action";
const Amneties = ({ amneties, setAmneties }) => {
  let [amneties_copy, setamneties_copy] = useState(amneties);
  let [wifi, setwifi] = useState(amneties_copy.wifi);
  let [AC, setAC] = useState(amneties_copy.AC);
  let [hotwater, sethotwater] = useState(amneties_copy.hotwater);
  let [cooler, setcooler] = useState(amneties_copy.cooler);
  let [cleaning, setCleaning] = useState(amneties_copy.isCleaning);
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.form_section_title_fontsize,
          }}
        >
          Select Amneties
        </Text>
      </View>
      {/* Wifi */}
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
              backgroundColor: wifi ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (!wifi) {
                setwifi(true);
                amneties_copy.wifi = true;
                amneties_copy.AC = AC;
                amneties_copy.hotwater = hotwater;
                amneties_copy.cooler = cooler;
                setamneties_copy(amneties_copy);
                setAmneties(amneties_copy);
              } else {
                setwifi(false);
                amneties_copy.wifi = false;
                amneties_copy.AC = AC;
                amneties_copy.hotwater = hotwater;
                amneties_copy.cooler = cooler;
                setamneties_copy(amneties_copy);
                setAmneties(amneties_copy);
              }
              console.log("Pressed0");
            }}
          >
            <Text
              style={{
                fontWeight: SIZES.form_button_text_fontWeight,
                lineHeight: SIZES.form_button_text_lineHeight,
                // fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: wifi ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Wifi
            </Text>
          </TouchableOpacity>
        </View>
        {/* AC */}
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: SIZES.form_button_minWidth,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: AC ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (!AC) {
                setAC(true);
                amneties_copy.wifi = wifi;
                amneties_copy.AC = true;
                amneties_copy.hotwater = hotwater;
                amneties_copy.cooler = cooler;
                setamneties_copy(amneties_copy);
                setAmneties(amneties_copy);
              } else {
                setAC(false);
                amneties_copy.wifi = wifi;
                amneties_copy.AC = false;
                amneties_copy.hotwater = hotwater;
                amneties_copy.cooler = cooler;
                setamneties_copy(amneties_copy);
                setAmneties(amneties_copy);
              }
              console.log("Pressed0");
            }}
          >
            <Text
              style={{
                lineHeight: SIZES.form_button_text_lineHeight,
                // fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                fontWeight: SIZES.form_button_text_fontWeight,
                color: AC ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              AC
            </Text>
          </TouchableOpacity>
        </View>
        {/* Hot water */}
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: SIZES.form_button_minWidth,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: hotwater ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (!hotwater) {
                sethotwater(true);
                amneties_copy.wifi = wifi;
                amneties_copy.AC = AC;
                amneties_copy.hotwater = true;
                amneties_copy.cooler = cooler;
                setamneties_copy(amneties_copy);
                setAmneties(amneties_copy);
              } else {
                sethotwater(false);
                amneties_copy.wifi = wifi;
                amneties_copy.AC = AC;
                amneties_copy.hotwater = false;
                amneties_copy.cooler = cooler;
                setamneties_copy(amneties_copy);
                setAmneties(amneties_copy);
              }
              console.log("Pressed2");
            }}
          >
            <Text
              style={{
                lineHeight: SIZES.form_button_text_lineHeight,
                // fontFamily: FONTS.fontFamily_black,
                fontWeight: SIZES.form_button_text_fontWeight,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: hotwater ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Hot Water
            </Text>
          </TouchableOpacity>
        </View>
        {/* Cooler */}
        <View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: SIZES.form_button_minWidth,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: cooler ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (!cooler) {
                setcooler(true);
                amneties_copy.wifi = wifi;
                amneties_copy.AC = AC;
                amneties_copy.hotwater = hotwater;
                amneties_copy.cooler = true;
                setamneties_copy(amneties_copy);
                setAmneties(amneties_copy);
              } else {
                setcooler(false);
                amneties_copy.wifi = wifi;
                amneties_copy.AC = AC;
                amneties_copy.hotwater = hotwater;
                amneties_copy.cooler = false;
                setamneties_copy(amneties_copy);
                setAmneties(amneties_copy);
              }
              console.log("Pressed0");
            }}
          >
            <Text
              style={{
                lineHeight: SIZES.form_button_text_lineHeight,
                // fontFamily: FONTS.fontFamily_black,
                fontWeight: SIZES.form_button_text_fontWeight,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: cooler ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Cooler
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {/* isCleaning */}
        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              maxWidth: SIZES.form_button_maxWidth + 50,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: cleaning ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              if (!cleaning) {
                setCleaning(true);
                amneties_copy.wifi = wifi;
                amneties_copy.AC = AC;
                amneties_copy.hotwater = hotwater;
                amneties_copy.cooler = cooler;
                amneties_copy.isCleaning = true;
                setamneties_copy(amneties_copy);
                setAmneties(amneties_copy);
              } else {
                setCleaning(false);
                amneties_copy.wifi = wifi;
                amneties_copy.AC = AC;
                amneties_copy.hotwater = hotwater;
                amneties_copy.cooler = cooler;
                amneties_copy.isCleaning = false;
                setamneties_copy(amneties_copy);
                setAmneties(amneties_copy);
              }
              console.log("Pressed0");
            }}
          >
            <Text
              style={{
                lineHeight: SIZES.form_button_text_lineHeight,
                // fontFamily: FONTS.fontFamily_black,
                fontWeight: SIZES.form_button_text_fontWeight,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                color: cleaning ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Regular Cleaning
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    test: state.newproperty_reducer.new_test,

    amneties: state.newproperty_reducer.amneties,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAmneties: (value) => {
      dispatch(newproperty_actions.setAmneties(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Amneties);
