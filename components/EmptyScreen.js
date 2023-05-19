import React from "react";
import { icons, COLORS, SIZES, FONTS } from "../constants";
import { View, Text, Image } from "react-native";
const EmptyScreen = ({ title }) => {
  return (
    <View
      style={{
        // borderWidth: 2,
        // borderRadius: 15,
        // minWidth: 300,
        width: SIZES.width,
        // borderColor: COLORS.lightGray6,
        minHeight: 200,
        maxHeight: 250,
        marginTop: 10,
        left: "30%",
        paddingBottom: 10,
      }}
    >
      <Image source={icons.folder} style={{ height: 150, width: 140 }} />
      <Text
        style={{
          fontSize: SIZES.h2,
          color: COLORS.lightGray3,
          lineHeight: 22,
          fontFamily: FONTS.fontFamily_black,
          right: 15,
          top: 10,
        }}
      >
        No {title ? title : "DATA"} Found
      </Text>
    </View>
  );
};

export default EmptyScreen;
