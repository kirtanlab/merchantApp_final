import React, { useEffect, useState } from "react";
import { View, Text, FlatList, PermissionsAndroid } from "react-native";
import { COLORS, icons, SIZES, FONTS } from "../../constants";
import Rooms_Listing from "./Rooms_Listing";
import axios from "axios";
import { REACT_APP_OWNER_API } from "@env";
import { connect } from "react-redux";
import EmptyScreen from "../EmptyScreen";
import * as Newrooms_actions from "../../store/NewRooms/Newrooms_actions";
import * as room_vidImage_actions from "../../store/room_vidImage/room_vidImage_actions";
import { Provider } from "react-native-paper";
import RNFetchBlob from "rn-fetch-blob";
const MyRooms = ({
  updateAll_vidimage,
  navigation,
  token,
  data,
  status,
  roomUpdating,
  updateAll,
  agreed,
  onDelete,
  key,
  updateRoomOuterVideos,
}) => {
  const checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === "ios") {
      //  downloadVideo();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "App needs access to your storage to download Photos",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log("Storage Permission Granted.");
          //  downloadVideo();
        } else {
          // If permission denied then show alert
          alert("Storage Permission Not Granted");
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadVideo = async (uri) => {
    console.log("Downloading video", uri);
    const res = await RNFetchBlob.config({
      fileCache: true,
    }).fetch("GET", uri, {
      Authorization: `Bearer ${token}`,
    });
    //  setVideoPath(res.path());
    console.log("videopath:", res.path());
    return res.path();
  };
  useEffect(() => {
    checkPermission();
  }, []);
  return (
    <View style={{ marginTop: 4, paddingHorizontal: 15 }}>
      <View style={{}}>
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            // fontWeight: "bold",
            // lineHeight: 22,
            fontFamily: FONTS.fontFamily_black,
            fontSize: SIZES.homescreen_header_fontsize,
          }}
        >
          My Rooms
        </Text>
      </View>
      <View style={{}}>
        {status == "GOOD" ? (
          <FlatList
            keyExtractor={(item) => item._id}
            key={key}
            renderItem={({ item }) => (
              <Rooms_Listing
                room_id={item._id}
                onPress={async () => {
                  console.log("Roomid", token);
                  let room_id = item._id;
                  const data = await axios.get(
                    `${REACT_APP_OWNER_API}/api/v1/owner/displayroom/${room_id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  console.log("result room", data.data.data.photos[0]);
                  if (data.data.data) {
                    let new_temp = {
                      updating: true,
                      room_id: room_id,
                    };
                    await roomUpdating(new_temp);
                    await updateAll(data.data.data);
                    await updateAll_vidimage(data.data.data);
                    // downloadVideo();
                    console.log("downloade", data.data.data);
                    let new_array = [];
                    // const { config, fs } = RNFetchBlob;
                    let videos_array = data.data.data.videos;
                    if (videos_array.length > 0) {
                      const path = `${RNFetchBlob.fs.dirs.DocumentDir}`;

                      await videos_array.forEach(async function (arrayItem) {
                        let uri = arrayItem.uri;
                        let title = arrayItem.name.split(".")[0];

                        await updateRoomOuterVideos(new_array);
                        // await updateRoomOuterVideos(new_array);
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

                              new_array.push(obj);
                              console.log("updating", obj);
                            } else {
                              new_array = [];
                            }
                          })
                          .then(async () => {
                            await updateRoomOuterVideos(new_array);
                          })
                          .catch((error) => {
                            console.log("catched", error);
                          });
                      });
                    }
                    navigation.navigate("NewRooms");
                    // await updateRoomOuterVideos(new_array);
                    //
                  }
                }}
                total_avl={item?.availablerooms}
                image_source={item?.photos[0]?.uri}
                room_name={item?.title}
                type={{ AC: item.isAC, ATTACHED: item.isAttached }}
                price={item.price.$numberDecimal}
                onDelete={onDelete}
                agreed={agreed}
              />
            )}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <EmptyScreen title={"Rooms"} />
        )}
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.lightGray7,
          marginHorizontal: 0,
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
    updateAll: (value) => {
      dispatch(Newrooms_actions.updateAll(value));
    },
    updateAll_vidimage: (value) => {
      dispatch(room_vidImage_actions.updateAll(value));
    },
    updateRoomOuterVideos: (value) => {
      dispatch(room_vidImage_actions.updateRoomOuterVideos(value));
    },
    roomUpdating: (value) => {
      dispatch(Newrooms_actions.roomUpdating(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRooms);
