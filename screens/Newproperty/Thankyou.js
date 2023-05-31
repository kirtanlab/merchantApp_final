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
const Thankyou = ({ route,navigation, property_updating }) => {
  let {prev_screen,typeofpg} = route?.params
  console.log('typeofpg',typeofpg)
  function next_page() {
    if (property_updating.updating || typeofpg == 'MESS') {
      navigation.replace("MainScreens");
    } else {
      navigation.replace("NewRooms");
    }
    console.log("next pagee");
  }
  // const upload_images = () => {
  //   const data = new FormData();

  // }
  console.log('updating',property_updating.updating)

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.mobile_theme_back}
        barStyle={"light-content"}
      />
      {/* <SafeAreaView
        style={{
          height: SIZES.height * 0.03,
          backgroundColor: COLORS.mobile_theme_back,
          elevation: 1,
        }}
      /> */}
      {/* <View> */}
      {/* <Progress.Bar
          progress={1}
          color={COLORS.mobile_theme_back}
          width={SIZES.width}
         
          style={{ position: "absolute", top: -1 }}
        /> */}
      {/* </View> */}
      <View style={{ flexDirection: "column", marginTop: "20%" }}>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: COLORS.mobile_theme_back,
            }}
          >
            {property_updating.updating
              ? "Property Updated"
              : "Property Updated"}
          </Text>
        </View>
        <View>
          <Custom_Animation />
        </View>
      </View>
      <View style={{}}>
        <CustomButton_form
          fontColor={COLORS.font_color}
          backgroundColor={COLORS.mobile_theme_back}
          label={typeofpg === 'MESS' || property_updating.updating ? "Go to Homescreen" : "Add Rooms Now "}
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

function mapStateToProps(state) {
  return {
    property_updating: state.newproperty_reducer.property_updating,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);
