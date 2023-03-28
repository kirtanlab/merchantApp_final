import React from "react";
import { View, Text, LogBox, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, SIZES } from "../../constants";
{
  /* <ion-icon name="notifications-outline"></ion-icon> */
}
const Intrests = ({ navigation, interestedusers }) => {
  return (
    <View
      style={{
        paddingHorizontal: 17,
        // paddingVertical: 10,
        paddingBottom: 100,
        flexDirection: "column",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View>
          <Ionicons
            name="heart"
            size={40}
            color={true ? COLORS.mobile_theme_back : "red"}
            style={{
              alignItems: "center",
            }}
          />
        </View>
        <View style={{ top: "15%", left: 10, flexDirection: "row" }}>
          <Text
            style={{
              color: COLORS.lightGray2,
              fontWeight: "bold",
              fontSize: SIZES.form_section_title_fontsize,
            }}
          >
            {interestedusers}{" "}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray2,
              fontSize: SIZES.form_section_title_fontsize,
            }}
          >
            Interests
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", left: 10, top: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationsScreen")}
        >
          <Text
            style={{
              color: COLORS.lightGray2,
              fontSize: SIZES.form_section_input_fontsize,
            }}
          >
            View Interested Users{" "}
          </Text>
        </TouchableOpacity>
        <View>
          <Ionicons
            name="arrow-forward-outline"
            size={25}
            style={{ color: COLORS.lightGray2 }}
          />
        </View>
      </View>
    </View>
  );
};
export default Intrests;
