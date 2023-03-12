import React, { Fragment, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/NewProperty/Header";
import * as Progress from "react-native-progress";
import { COLORS, SIZES } from "../../constants";
import Looking_Selection_Button from "../../components/NewProperty/Looking_Selection_Button";
import { connect } from "react-redux";
import * as newproperty_actions from "../../store/Newproperty/newproperty_action";
import Who_you from "../../components/NewProperty/Who_you";
import Text_Input from "../../components/NewProperty/Text_Input";
import DocumentPicker from "react-native-document-picker";

import CustomButton_form from "../../components/NewProperty/CustomButton_form";

import NumericInput from "../../components/NewProperty/NumericInput";
import Custom_Animation from "../../components/NewProperty/Custom_Animation";
const Thankyou = ({ navigation }) => {
  function next_page() {
    navigation.replace("NewRooms");
    console.log("next pagee");
  }
  // const upload_images = () => {
  //   const data = new FormData();

  // }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.progress_bar}
        barStyle={"light-content"}
      />
      <SafeAreaView
        style={{
          height: SIZES.height * 0.03,
          backgroundColor: COLORS.mobile_theme_back,
          elevation: 1,
        }}
      />
      <View>
        <Progress.Bar
          progress={1}
          color={COLORS.mobile_theme_back}
          width={SIZES.width}
          height={SIZES.height * 0.01}
          style={{ position: "absolute", top: -1 }}
        />
      </View>
      <View style={{ padding: 15, marginTop: 45, flexDirection: "column" }}>
        <View style={{ margin: 24 }}>
          <Text
            style={{
              fontSize: 34,
              fontWeight: "bold",
              color: COLORS.mobile_theme_back,
            }}
          >
            Thank you for Registering Property
          </Text>
        </View>
        <View>
          <Custom_Animation />
        </View>
      </View>
      <View style={{ marginTop: 90 }}>
        <CustomButton_form
          fontColor={COLORS.font_color}
          backgroundColor={COLORS.mobile_theme_back}
          label={"Add Rooms Now "}
          _borderColor={COLORS.mobile_theme}
          borderRadius
          onPress={() => {
            next_page();
          }}
        />
      </View>
    </ScrollView>
  );
};
export default Thankyou;
