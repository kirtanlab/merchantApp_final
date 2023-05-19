import React from "react";
import { icons, COLORS, SIZES } from "../constants";
import { View, Text, Image } from "react-native";
const No_notification = ({ title }) => {
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
        marginTop: "5%",

        paddingBottom: 10,
      }}
    >
      <Image
        source={icons.no_notification}
        style={{ left: "30%", height: 150, width: 140 }}
      />
      <Text
        style={{
          fontSize: SIZES.h2,
          color: COLORS.lightGray3,
          fontWeight: "bold",
          left: "12%",
          top: 10,
        }}
      >
        Can't Find your Notifications
      </Text>
    </View>
  );
};

export default No_notification;
