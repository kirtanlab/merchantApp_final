import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";
import * as Newrooms_actions from "../../store/NewRooms/Newrooms_actions";
import { connect } from "react-redux";
import * as room_vidImage_actions from "../../store/room_vidImage/room_vidImage_actions";
const HomeScreen_Header = ({
  resetAll,
  resetAll_vidImage,
  navigation,
  username,
  roomUpdating,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: COLORS.lightGray4,
        borderBottomWidth: 2,
        paddingBottom: 8,
        paddingHorizontal: 15,
      }}
    >
      <View style={{ flex: 1, width: SIZES.width * 0.22 }}>
        <Text
          style={{
            color: COLORS.lightGray3,
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: FONTS.fontFamily_poppins,
          }}
        >
          Hello,{"\n"}
          <Text
            style={{
              color: COLORS.mobile_theme_back,
              fontSize: 16,
              fontFamily: FONTS.fontFamily_poppins,
            }}
          >
            {username}
          </Text>
        </Text>
      </View>
      {/* <View style={{left: SIZES.width * 0.53, width: 80}}>
        <Text>add new </Text>
      </View> */}
      <View
        style={{
          //   left: SIZES.width * 0.35,

          //   top: 2,
          minWidth: SIZES.width * 0.4,
          maxWidth: SIZES.width * 0.7,
          alignItems: SIZES.form_button_alignItems,
          justifyContent: SIZES.form_button_justifyContent,
        }}
      >
        <TouchableOpacity
          style={{
            borderColor: COLORS.mobile_theme_back,
            borderWidth: SIZES.form_button_borderWidth,
            borderRadius: SIZES.form_button_borderRadius,

            // minWidth: SIZES.form_button_minWidth,
            // maxWidth: SIZES.form_button_maxWidth,

            // maxHeight: SIZES.form_button_maxHeight,
            // padding: 10,
            // paddingVertical: 5,
            // paddingHorizontal: 10,
            // flex: 1,
            // backgroundColor: COLORS.mobile_theme_back,

            alignItems: SIZES.form_button_alignItems,
            justifyContent: SIZES.form_button_justifyContent,
            backgroundColor: true ? COLORS.mobile_theme_back : "white",
          }}
          onPress={async () => {
            console.log("Pressed1");
            resetAll();
            resetAll_vidImage();
            navigation.navigate("NewRooms");
          }}
        >
          <Text
            style={{
              fontSize: SIZES.form_button_text_fontSize,
              fontFamily: FONTS.fontFamily_poppins,
              marginVertical: SIZES.form_button_text_marginVertical,
              marginHorizontal: SIZES.form_button_text_marginHorizontal,
              // fontWeight: SIZES.form_button_text_fontWeight,
              color: true ? COLORS.font_color : COLORS.lightGray3,
            }}
          >
            + add new rooms
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    resetAll: () => {
      dispatch(Newrooms_actions.resetAll());
    },
    roomUpdating: (value) => {
      dispatch(Newrooms_actions.roomUpdating(value));
    },
    resetAll_vidImage: () => {
      dispatch(room_vidImage_actions.resetAll());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen_Header);
