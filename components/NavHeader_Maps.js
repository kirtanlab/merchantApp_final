import React from "react";
import { COLORS, SIZES } from "../constants";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const NavHeader_Maps = ({
  color,
  onPress_forward,
  onPress_back,
  icon_color,
  screen_name,
  back,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        // top: "4%",
        // paddingBottom: -,
        height: 55,
        borderBottomColor: COLORS.mobile_theme_back,
        borderBottomWidth: 2,
        padding: 10,
        paddingHorizontal: 20,
        width: SIZES.width,
        justifyContent: "space-between",
        alignItems: "center",
        // justifyContent: 'space-evenly',
        // marginBottom: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <TouchableOpacity onPress={onPress_back} style={{}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="arrow-back-outline"
              size={30}
              color={COLORS.mobile_theme_back}
              style={{}}
            />

            <Text
              style={{
                color: COLORS.mobile_theme_back,
                fontSize: 18,
              }}
            >
              Back
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ left: "0%", width: 180 }}>
          <Text
            style={{
              color: COLORS.mobile_theme_back,
              fontSize: 18,
            }}
          >
            {screen_name}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress_forward} style={{}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: COLORS.mobile_theme_back,
              fontSize: 18,
            }}
          >
            Next
          </Text>

          <Ionicons
            name="arrow-forward-outline"
            size={30}
            color={COLORS.mobile_theme_back}
            style={{}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default NavHeader_Maps;
