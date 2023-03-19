import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  RefreshControl,
  PermissionsAndroid,
} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { connect } from "react-redux";
import HomeScreen_Header from "../components/Homescreen/HomeScreen_Header";
import MyProperty from "../components/Homescreen/MyProperty";
import MyRooms from "../components/Homescreen/MyRooms";
import Notifications from "../components/Homescreen/Notifications";
import Intrests from "../components/Homescreen/Intrests";
import axios from "axios";

import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { REACT_APP_OWNER_API } from "@env";
import AppLoader from "../components/AppLoader";
const HomeScreen = ({ navigation, token }) => {
  const [key, setKey] = React.useState(0);
  const [prop_data, prop_setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [prop_image, prop_setImage] = useState("");
  const [room_data, room_setData] = React.useState([]);
  const [view, setViews] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);
  const [interestedusers, setInterestedusers] = React.useState("");
  const resetFlatList = () => {
    setKey(key + 1);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      async function call_all() {
        await owner_fetch_details();
        await room_fetch_details();
      }
      call_all();
      setRefreshing(false);
    }, 2000);
  }, []);
  const owner_fetch_details = async () => {
   
    const instance = axios.create({
      baseURL: `${REACT_APP_OWNER_API}/api/v1/owner/displayowner`,
      // timeout: 1000,
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
    });
    // axios.defaults.cache = false;
    const data = await instance.get();
    // console.log("result_property", data.data.data);
    prop_setData(data.data.data);
    // console.log("result", data.data.data.address);
    setViews(data.data.data.views);
    setInterestedusers(data.data.data.interestedusers);
    prop_setImage(data.data.data?.photos[0]?.uri);
  };

  const room_fetch_details = async () => {
  
    const data = await axios.get(
      `${REACT_APP_OWNER_API}/api/v1/owner/displayallrooms`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      }
    );
    console.log("result room", data.data.data);
    room_setData(data.data.data);
  };
  async function checkPermission() {
    console.log("permission");
    const permissionAndroid = await PermissionsAndroid.check(
      "android.permission.ACCESS_FINE_LOCATION"
    );
    if (permissionAndroid != PermissionsAndroid.RESULTS.granted) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission Required",
          message:
            "App needs access to your Location to fetch current location",
        }
      );
      console.log("request", granted);
    }
  }

  useLayoutEffect(() => {
    console.log("clicked Homescreen");
    async function call_all() {
      setLoading(true);
      await owner_fetch_details();
      await room_fetch_details();

      setLoading(false);
    }
    call_all();
  }, []);


  return (
    <>
      <Provider>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{
            backgroundColor: "white",
            paddingHorizontal: 1,
            paddingVertical: 13,
          }}
        >
          <StatusBar
            animated={true}
            backgroundColor={COLORS.mobile_theme_back}
            barStyle={"light-content"}
          />

          <HomeScreen_Header username={"Kirtan"} navigation={navigation} />
          <MyProperty
            propertytitle={prop_data.propertytitle}
            image={prop_image}
            nameasperaadhar={prop_data.nameasperaadhar}
            typeofpg={prop_data.typeofpg}
            address={prop_data.address}
            navigation={navigation}
            status={prop_data ? "GOOD" : "BAD"}
            ratings={prop_data?.ratings?.$numberDecimal}
          />
          <MyRooms
            data={room_data}
            key={key}
            status={room_data.length > 0 ? "GOOD" : "BAD"}
            navigation={navigation}
            agreed={agreed}
            onDelete={async (room_id) => {
              setLoading(true);
              console.log("token", token);
              const data = await axios.delete(
                `${REACT_APP_OWNER_API}/api/v1/owner/deleteroom/${room_id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(data.data);
              setLoading(false);
              await room_fetch_details();
              resetFlatList();
            }}
          />

          <Notifications views={view} navigation={navigation} />
          <Intrests interestedusers={interestedusers} navigation={navigation} />
        </ScrollView>
      </Provider>
      {loading && <AppLoader />}
    </>
  );
};
function mapStateToProps(state) {
  return {
    token: state.authReducer.token,

  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
