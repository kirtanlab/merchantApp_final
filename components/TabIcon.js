import React from "react";
import { View, Text, Image, Appearance } from "react-native";
import { useSelector } from "react-redux";
import { FONTS, COLORS } from "../constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { lightBlue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
const TabIcon = ({ focused, icon_name, iconStyle, subtitle, isTrade }) => {
  let userData = useSelector((state) => state.authReducer.userData);
  let Color_mode = Appearance.getColorScheme();
  let text_color;
  if (focused && Color_mode == "White") {
    text_color = COLORS.black;
  } else if (!focused && Color_mode == "light") {
    text_color = COLORS.lightGray3;
  } else if (focused && Color_mode == "dark") {
    text_color = COLORS.black;
  } else {
    text_color = COLORS.lightGray3;
  }
  console.log("Apperance", Color_mode);

  return (
    <View
      style={{
        borderColor: COLORS.mobile_theme_back,
        borderTopWidth: focused ? 2 : 0,
        minWidth: 50,
        maxWidth: 70,
        alignItems: "center",
        justifyContent: "center",
        // paddingBottom: 10,
      }}
    >
      <MaterialIcons
        name={icon_name}
        size={30}
        color={focused ? COLORS.mobile_theme_back : "#A4BFE7"}
        style={{ top: 4 }}
        // label="notifications"
      />
      <Text
        style={{
          color: focused ? COLORS.mobile_theme_back : "#A4BFE7",
          ...FONTS.h4,

          fontWeight: "bold",
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default TabIcon;
