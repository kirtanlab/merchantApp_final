import React from "react";
import { Text, View, StatusBar, ScrollView, SafeAreaView } from "react-native";
import * as Progress from "react-native-progress";
import { COLORS, SIZES } from "../../constants";
import { connect } from "react-redux";
import CustomButton_form from "../../components/NewProperty/CustomButton_form";
import Custom_Animation from "../../components/NewProperty/Custom_Animation";
const Basic3 = ({ navigation, room_updating }) => {
  function next_page() {
    if (room_updating) {
      navigation.replace("MainScreens");
    } else {
      navigation.replace("NewRooms");
    }
    console.log("next pagee");
  }
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: "white" }}
    >
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
      />
      <View>
        <Progress.Bar
          progress={1}
          color={COLORS.mobile_theme_back}
          width={SIZES.width}
          height={SIZES.height * 0.01}
          style={{ position: "absolute", top: -1 }}
        />
      </View> */}
      <View style={{ marginTop: "30%", flexDirection: "column" }}>
        <View style={{alignItems:"center"}}>
          <Text
            style={{
              fontSize: 25,
              // fontWeight: "bold",
              color: COLORS.mobile_theme_back,
              // marginLeft: room_updating ? 70 : 0,
            }}
          >
            {room_updating ? "Room Updated" : "Room Updated"}
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
          label={"Go to Home Screen"}
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
    room_updating: state.Newrooms_reducer.room_updating.updating,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Basic3);
