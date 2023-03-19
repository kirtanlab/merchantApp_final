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
      <TouchableOpacity onPress={onPress_back} style={{}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{}}>
            <Ionicons
              name="arrow-back-outline"
              size={30}
              color={COLORS.mobile_theme_back}
              style={{}}
            />
          </View>
          <View style={{}}>
            <Text
              style={{
                color: COLORS.mobile_theme_back,
                fontSize: 18,
              }}
            >
              Back
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ width: 150 }}>
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            fontSize: 18,

            // fontWeight: "bold",
          }}
        >
          {screen_name}
        </Text>
      </View>

      <TouchableOpacity onPress={onPress_forward} style={{}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{}}>
            <Text
              style={{
                color: COLORS.mobile_theme_back,
                fontSize: 18,
              }}
            >
              Next
            </Text>
          </View>
          <View style={{}}>
            <Ionicons
              name="arrow-forward-outline"
              size={30}
              color={COLORS.mobile_theme_back}
              style={{}}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default NavHeader_Maps;
