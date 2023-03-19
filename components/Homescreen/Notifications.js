import React from "react";
import { View, Text, LogBox, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, SIZES } from "../../constants";
{
  /* <ion-icon name="notifications-outline"></ion-icon> */
}
const Notifications = ({ navigation, views }) => {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        flexDirection: "column",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View>
          <Ionicons
            name="notifications-circle-outline"
            size={50}
            color={true ? COLORS.mobile_theme_back : "red"}
            style={{
              alignItems: "center",
            }}
          />
        </View>
        <View style={{ top: "25%", left: 5, flexDirection: "row" }}>
          <Text
            style={{
              color: COLORS.lightGray2,
              fontWeight: "bold",
              fontSize: SIZES.form_section_title_fontsize,
            }}
          >
            {views}{" "}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray2,
              fontSize: SIZES.form_section_title_fontsize,
            }}
          >
            Views
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.lightGray7,
          marginHorizontal: 5,
          marginVertical: 15,
        }}
      />
    </View>
  );
};
export default Notifications;
