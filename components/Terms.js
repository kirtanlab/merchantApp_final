import React, { useState } from "react";
import CheckBox from "./CheckBox";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../constants";
import { connect } from "react-redux";
import * as Newrooms_actions from "../store/NewRooms/Newrooms_actions";
const Terms = ({
  updateBaseTerms,
  checked_base_terms,
  baseTerms,
  checkedBaseTerms,
  govt_term,
  myApp_term,
}) => {
  let _baseTerms = {
    govt: false,
    myApp: false,
  };
  let [govt, setgovt] = useState(false);
  let [myApp, setmyApp] = useState(false);
  const checkBox1 = () => {
    if (!govt) {
      setgovt(true);
      _baseTerms.govt = true;
      _baseTerms.myApp = myApp;
      console.log("_baseTerms", _baseTerms);

      if (myApp) {
        checkedBaseTerms(true);
      }
      updateBaseTerms(_baseTerms);
    } else {
      setgovt(false);
      _baseTerms.govt = false;
      _baseTerms.myApp = myApp;
      checkedBaseTerms(false);
      updateBaseTerms(_baseTerms);
    }
  };
  const checkBox2 = () => {
    if (!myApp) {
      setmyApp(true);
      _baseTerms.myApp = true;
      _baseTerms.govt = govt;
      console.log("_baseTerms", _baseTerms);
      if (govt) {
        checkedBaseTerms(true);
      }
      updateBaseTerms(_baseTerms);
    } else {
      setmyApp(false);
      _baseTerms.myApp = false;
      _baseTerms.govt = govt;
      checkedBaseTerms(false);
      updateBaseTerms(_baseTerms);
    }
  };
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox
          status={baseTerms.govt ? "checked" : "unchacked"}
          onPress={checkBox1}
        />

        <Text
          style={{
            fontSize: SIZES.form_section_title_fontsize + 2,
            color: COLORS.mobile_theme_back,
          }}
        >
          I accept Goverments T&C
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: SIZES.width,
          alignItems: "center",
        }}
      >
        <CheckBox
          status={baseTerms.myApp ? "checked" : "unchacked"}
          onPress={checkBox2}
        />

        <Text
          style={{
            fontSize: SIZES.form_section_title_fontsize + 2,
            color: COLORS.mobile_theme_back,
          }}
        >
          I accept Shelterhub Business app T&C
        </Text>
      </View>
    </SafeAreaView>
  );
};
function mapStateToProps(state) {
  return {
    checked_base_terms: state.Newrooms_reducer.checked_base_terms,
    baseTerms: state.Newrooms_reducer.baseTerms,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkedBaseTerms: (value) => {
      dispatch(Newrooms_actions.checkedBaseTerms(value));
    },
    updateBaseTerms: (value) => {
      dispatch(Newrooms_actions.updateBaseTerms(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
