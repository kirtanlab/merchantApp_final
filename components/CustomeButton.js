import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({ label, onPress, color }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        // padding: 6,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "400",
          lineHeight: 35,
          fontSize: 17,
          color: "#fff",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
