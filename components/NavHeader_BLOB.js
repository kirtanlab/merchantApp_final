import React from "react";
import { COLORS, SIZES } from "../constants";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const NAVHeader_BLOB = ({
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
        borderBottomColor: COLORS.lightGray3,
        borderBottomWidth: 1,
        width: "100%",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={onPress_back}
        style={{ flex: 1, flexDirection: "row" }}
      >
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
      </TouchableOpacity>

      <Text
        style={{
          color: COLORS.mobile_theme_back,
          fontSize: 18,
          flex: 1.8,
          // fontWeight: "bold",
        }}
      >
        {screen_name}
      </Text>
    </View>
  );
};
export default NAVHeader_BLOB;
