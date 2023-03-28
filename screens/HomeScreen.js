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
  Image,
  StyleSheet,
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
import RNFetchBlob from "rn-fetch-blob";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { REACT_APP_OWNER_API } from "@env";
import AppLoader from "../components/AppLoader";
import * as vidImage_actions from "../store/vidImage/vidImage_actions";
const HomeScreen = ({
  checkedOuterVideos,
  navigation,
  home_loading,
  token,
  updateOuterVideos,
}) => {
  const [key, setKey] = React.useState(0);
  const [prop_data, prop_setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
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
        setLoading(true);
        await room_fetch_details();
        await owner_fetch_details();
      }
      call_all();
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    setLoading(home_loading);
  }, [home_loading]);
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
    setName(data.data.data.name);

    // console.log("result", data.data.data.address);
    setViews(data.data.data.views);
    setInterestedusers(data.data.data.interestedusers);
    prop_setImage(data.data.data?.photos[0]?.uri);
    let videos_array = data.data.data.videos;
    let new_array = [];
    console.log("vid_array", videos_array);
    try {
      if (videos_array.length > 0) {
        console.log("ENTERING VIDEO");
        const path = `${RNFetchBlob.fs.dirs.DocumentDir}`;
        console.log("path", path);
        await videos_array.forEach(async function (arrayItem) {
          console.log("arrayItem", arrayItem);
          let uri = arrayItem.uri;
          let title = arrayItem.name.split(".")[0];
          await RNFetchBlob.config({
            // fileCache: true,
            path: path + "/" + `${title}` + ".mp4",
          })
            .fetch("GET", uri, {
              Authorization: `Bearer ${token}`,
            })
            .then((res) => {
              console.log("res", res.respInfo.status);
              if (res.respInfo.status !== 404) {
                let local_path = res.path();
                console.log("local_name_video", title);
                console.log("LOCAL-PATH_video", local_path);
                let obj = {
                  name: arrayItem.name,
                  uri: local_path,
                };
                new_array.push(obj);
              } else {
                new_array = [];
              }
            })
            .then(async () => {
              console.log("done");
              await updateOuterVideos(new_array);
              checkedOuterVideos(true);
              console.log("done1");
              setLoading(false);
            })
            .catch((error) => {
              console.log("catched propert_listing", error);
              setLoading(false);
            });
        });
      } else {
        console.log("entered else");
        setLoading(false);
      }
    } catch (err) {
      console.log("outside", err);
    }
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
      await room_fetch_details();
      await owner_fetch_details();
    }
    call_all();
  }, []);

  const PropertyDetail = ({ image, property }) => {
    return (
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.name}>{property.propertytitle}</Text>
        <Text style={styles.address}>{property.address}</Text>
        <Text style={styles.price}>1200</Text>
        <Text style={styles.rating}>3.5</Text>
      </View>
    );
  };

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
          <HomeScreen_Header username={name} navigation={navigation} />

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
          {/* <PropertyDetail image={prop_image} property={prop_data} /> */}
        </ScrollView>
      </Provider>
      {loading && <AppLoader />}
    </>
  );
};
function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    home_loading: state.authReducer.home_loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateOuterVideos: (value) => {
      dispatch(vidImage_actions.updateOuterVideos(value));
    },
    checkedOuterVideos: (value) => {
      dispatch(vidImage_actions.checkedOuterVideos(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 100,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});
