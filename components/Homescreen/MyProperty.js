import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";
import Property_Listing from "./Property_Listings";
import axios from "axios";
import { connect } from "react-redux";
import { REACT_APP_OWNER_API } from "@env";
import * as AuthActions from "../../store/auth/authActions";
import EmptyScreen from "../EmptyScreen";
const MyProperty = ({
  navigation,
  token,
  nameasperaadhar,
  updateHomeLoading,
  propertytitle,
  typeofpg,
  image,
  status,
  ratings,
  address,
}) => {
  console.log("address", address);
  let house_no = "";
  let Landmark = "";
  if (address) {
    house_no = address.split("//")[0];
    Landmark = address.split("//")[1];
  }

  return (
    <View style={{ marginTop: 15 }}>
      <View style={{ paddingHorizontal: 14 }}>
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            // fontWeight: "bold",
            // lineHeight: 22,
            // fontFamily: FONTS.fontFamily_black,
            fontSize: SIZES.homescreen_header_fontsize,
          }}
        >
          My Property
        </Text>
      </View>
      <View
        style={{
          margin: 0,
          borderBottomColor: COLORS.lightGray7,
          // borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      >
        {status === "GOOD" ? (
          <Property_Listing
            adharname={nameasperaadhar}
            property_title={propertytitle}
            typeof_pg={typeofpg}
            image_url={image}
            address={address}
            house_no={house_no}
            Landmark={Landmark}
            navigation={navigation}
            ratings={ratings}
          />
        ) : (
          <EmptyScreen title={"Property"} />
        )}
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: COLORS.lightGray7,
          marginHorizontal: 20,
          marginVertical: 15,
        }}
      />
    </View>
  );
};

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateHomeLoading: (value) => {
      dispatch(AuthActions.updateHomeLoading(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProperty);
