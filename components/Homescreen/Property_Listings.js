import React from "react";
import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";
import icons from "../../constants/icons";
import axios from "axios";
import { connect } from "react-redux";
import * as vidImage_actions from "../../store/vidImage/vidImage_actions";
import * as Newproperty_ext_actions from "../../store/Newproperty_ext/Newproperty_ext_actions";
import * as Authactions from "../../store/auth/authActions";
import * as Property_actions from "../../store/Newproperty/newproperty_action";
import * as Location_actions from "../../store/Location/Location_actions";
import * as Ele_Bill_actions from "../../store/Ele_Bill/Ele_Bill_actions";
import * as AdharActions from "../../store/AdharCard/AdharCard_actions";
import { REACT_APP_OWNER_API } from "@env";
import { REACT_APP_MAPS_API_KEY } from "@env";
import RNFetchBlob from "rn-fetch-blob";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Property_Listing = ({
  property_title,
  adharname,
  typeof_pg,
  navigation,
  address,
  image_url,
  token,
  update_adhar_name,
  propertyUpdating,
  update_property_values,
  updateAll,
  updateOuterVideos,
  updateLocationAddress,
  update_location,
  checked_adhar_name,
  updateAdharCard,
  checkedAdharCard,
  updateElebill,
  checkedElebill,
  house_no,
  Landmark,
  ratings,
}) => {
  const stars = (ratings - Math.floor(ratings)).toFixed(1);
  // console.log(stars);
  return (
    <View>
      <View style={{ paddingHorizontal: 14 }}>
        <Image
          source={{ uri: image_url }}
          style={{
            height: 170,
            width: SIZES.width * 0.9,
            borderRadius: 10,
            marginTop: 17,
            // alignSelf: 'center',
          }}
        />
      </View>

      <View style={{ paddingHorizontal: 18 }}>
        {/* property id */}
        {/* <View style={{marginTop: 5}}>
          <Text
            style={{
              color: COLORS.lightGray3,
              // fontWeight: 'bold',
              fontSize: 16,
            }}>
            Property ID: 1231131
          </Text>
        </View> */}
        {/* Name and price */}
        {/* <View style={{ marginTop: 10, flexDirection: "row" }}>
          <View>
            <Text
              style={{
                color: COLORS.lightGray2,
                lineHeight: 22,
                fontFamily: FONTS.fontFamily_black,
             
                fontSize: 14,
              }}
            >
              
              {typeof_pg == "PG" && "Paying Guest"}
              {typeof_pg == "HOSTEL" && "Hostel"}
            </Text>
          </View>
          <View style={{ left: 20 }}>
            <Text
              style={{
                color: COLORS.lightGray3,
                lineHeight: 22,
                fontFamily: FONTS.fontFamily_black,
              
                fontSize: 14,
              }}
            >
              Owner : {adharname}
            </Text>
          </View>
        </View> */}
        {/* Property Name */}
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <Text
            style={{
              color: COLORS.lightGray2,
              // fontWeight: 'bold',
              fontSize: 14,
              // lineHeight: 22,
              fontFamily: FONTS.fontFamily_black,
            }}
          >
            {property_title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 12,
              marginTop: 3,
            }}
          >
            <FontAwesome name="star" size={13} color={"#fabe1b"} />
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: "grey",
                fontSize: 14,
                // marginTop: 2,
              }}
            >
              {"  "}
              {ratings}
            </Text>
            {/* <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: "grey",
                fontSize: 11,
                marginTop: 2,
              }}
            >
              {" "}
              {"\u25CF"} {data?.noofraters} ratings
            </Text> */}
          </View>
        </View>
        {/* Property Location */}
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: COLORS.black,

              fontFamily: FONTS.fontFamily_black,
              // fontWeight: 'bold',
              fontSize: 14,
            }}
          >
            {/* Karamsad,Anand */}
            {house_no.trimEnd()}
            {","}
            {Landmark}
          </Text>
        </View>
        {/* Edit Buttons */}
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,

              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: true ? COLORS.mobile_theme_back : "white",
            }}
            onPress={async () => {
              console.log("Roomid", token);

              const data = await axios.get(
                `${REACT_APP_OWNER_API}/api/v1/owner/displayowner`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("result property", data.data.data);
              //
              //
              //
              //
              // await updateOuterVideos();
              // await updateLocationAddress();
              //
              if (data.data.data) {
                let new_temp = {
                  updating: true,
                  property_id: "",
                };
                function getAddressFromCoordinates({ latitude, longitude }) {
                  console.log("getAddressFromCoordinates", latitude, longitude);
                  return new Promise((resolve, reject) => {
                    fetch(
                      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                        latitude +
                        "," +
                        longitude +
                        "&key=" +
                        REACT_APP_MAPS_API_KEY
                    )
                      .then((response) => response.json())
                      .then((responseJson) => {
                        if (responseJson.status === "OK") {
                          resolve(
                            responseJson?.results?.[0]?.formatted_address
                          );
                          let address =
                            responseJson?.results?.[0]?.formatted_address;
                          // setLocationAddress(address);
                          console.log("setLocationAddress", address);
                          updateLocationAddress(address);
                        } else {
                          reject("not found");
                        }
                      })
                      .catch((error) => {
                        reject(error);
                      });
                  });
                }
                if (
                  Number(data.data.data.lat.$numberDecimal) != 0 &&
                  Number(data.data.data.lng.$numberDecimal)
                ) {
                  await getAddressFromCoordinates({
                    latitude: Number(data.data.data.lat.$numberDecimal),
                    longitude: Number(data.data.data.lng.$numberDecimal),
                  });
                }

                await propertyUpdating(new_temp);
                await update_property_values(data.data.data);
                await updateAll(data.data.data); //vidImage
                await checked_adhar_name(true);
                await update_adhar_name(data.data.data?.nameasperaadhar);
                await update_location({
                  latitude: data.data.data.lat,
                  longitude: data.data.data.lng,
                });
                console.log("adharcard", data.data.data.aadhaarno);
                await updateAdharCard(data.data.data.aadhaarno),
                  await checkedAdharCard(true);
                await updateElebill(data.data.data.addressproof);
                await checkedElebill(true);
                let new_array = [];
                let videos_array = data.data.data.videos;
                console.log("videos_array", videos_array);
                updateOuterVideos(videos_array);
                if (videos_array.length > 0) {
                  const path = `${RNFetchBlob.fs.dirs.DocumentDir}`;
                  await videos_array.forEach(async function (arrayItem) {
                    let uri = arrayItem.uri;
                    let title = arrayItem.name.split(".")[0];
                    await RNFetchBlob.config({
                      fileCache: true,
                      path: path + "/" + `${title}` + ".mp4.tmp",
                    })
                      .fetch("GET", uri, {
                        Authorization: `Bearer ${token}`,
                      })
                      .then((res) => {
                        console.log("res", typeof res.respInfo.status);
                        if (res.respInfo.status !== 404) {
                          let local_path = res.path();
                          console.log("LOCAL-PATH", local_path);
                          let obj = {
                            name: arrayItem.name,
                            uri: local_path,
                          };

                          // RNFetchBlob.android.actionViewIntent(
                          //   local_path,
                          //   MIME_TYPE
                          // );
                          new_array.push(obj);
                          console.log("updating", obj);
                        } else {
                          new_array = [];
                        }
                      })
                      .then(() => {
                        updateOuterVideos(new_array);
                      })
                      .catch((error) => {
                        console.log("catched");
                      });
                  });
                }
                navigation.navigate("Newproperty");

                // }}
              }
            }}
          >
            <Text
              style={{
                lineHeight: 22,
                fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                // fontWeight: SIZES.form_button_text_fontWeight,
                color: true ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Edit Property
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    network: state.network.isConnected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateOuterVideos: (value) => {
      dispatch(vidImage_actions.updateOuterVideos(value));
    },
    updateAll: (value) => {
      dispatch(vidImage_actions.updateAll(value));
    },
    update_location: (value) => {
      dispatch(Location_actions.update_location(value));
    },
    updateLocationAddress: (value) => {
      dispatch(Newproperty_ext_actions.updateLocationAddress(value));
    },
    update_property_values: (value) => {
      dispatch(Property_actions.update_property_values(value));
    },
    propertyUpdating: (value) => {
      dispatch(Property_actions.propertyUpdating(value));
    },
    update_adhar_name: (value) => {
      dispatch(Authactions.update_adhar_name(value));
    },
    checked_adhar_name: (value) => {
      dispatch(Authactions.adhar_name_checked(value));
    },
    updateAdharCard: (value) => {
      dispatch(AdharActions.updateAdharCard(value));
    },
    checkedAdharCard: (value) => {
      dispatch(AdharActions.checkedAdharCard(value));
    },
    updateElebill: (value) => {
      dispatch(Ele_Bill_actions.updateElebill(value));
    },
    checkedElebill: (value) => {
      dispatch(Ele_Bill_actions.checkedElebill(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Property_Listing);
