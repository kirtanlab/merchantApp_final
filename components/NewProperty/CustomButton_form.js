import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES } from "../../constants";

export default function CustomButton({
  label,
  onPress,
  color,
  fontColor,
  backgroundColor,
  _borderColor,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        paddingVertical: 5,
        marginTop: "20%",
        borderRadius: 10,
        marginBottom: 30,
        marginLeft: "25%",
        width: SIZES.width * 0.5,
        borderColor: _borderColor,
        borderWidth: SIZES.form_button_borderWidth,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          // fontWeight: '700',
          fontSize: SIZES.form_section_title_fontsize,
          color: fontColor,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
