import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Image,
  FlatList,
  RefreshControl,
  PermissionsAndroid,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../../components/NewProperty/Header";
import * as Progress from "react-native-progress";
import { COLORS, icons, SIZES, FONTS } from "../../constants";
import { connect } from "react-redux";
import DocumentPicker from "react-native-document-picker";

import Nav_Header from "../../components/NewProperty/Nav_Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as room_vidImage_actions from "../../store/room_vidImage/room_vidImage_actions";
import Toast from "react-native-toast-message";
import {
  toastConfig,
  showErrorToast,
} from "../../components/NewProperty/ToastConfig";
import axios from "axios";
import VideoPlayer from "react-native-video-controls";
import AppLoader from "../../components/AppLoader";
import { REACT_APP_OWNER_API } from "@env";
const Basic25 = ({
  price,
  about_room,
  title_no,
  totalRooms,
  occupancy,
  AC,
  attached,
  room_outerVideos,
  checked_room_outer_video,
  room_outerImages,
  checked_room_outer_image,
  updateRoomOuterImages,
  checkedRoomOuterImages,
  updateRoomOuterVideos,
  checkedRoomOuterVideos,
  token,
  Room_token,
  navigation,
  room_updating,
  singleordouble,
  cooler,
}) => {
  useEffect(() => {
    console.log(
      attached,
      " ",
      AC,
      " ",
      title_no,
      " ",
      occupancy,
      " ",
      totalRooms,
      " ",
      price,
      " ",
      about_room
    );
  }, []);
  const [imgUri, setimgUri] = React.useState(room_outerImages);
  const [vidUri, setvidUri] = React.useState(room_outerVideos);
  let [intvid, setintVid] = React.useState([]);
  let [intImg, setintImg] = React.useState([]);
  const [pause, setPause] = React.useState(true);
  const videoref = React.useRef(null);
  const [videoPath, setVideoPath] = useState("");
  const [Bool, setBool] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const upload_outer_videos = async () => {
    if (intvid.length > 0) {
      try {
        // console.log("room_outer_videos", room_outerVideos);
        intvid.forEach((element) => {
          let vid_obj = {
            name: element.name,
            uri: element.uri,
            type: element.type,
          };
          let bool = room_updating?.updating;
          let room_id = room_updating?.room_id;
          console.log("entered", vid_obj);
          var res = async function (vid_obj) {
            const formData = new FormData();
            // formData.append("name", "pic");
            console.log("entered", formData);
            formData.append("pic", vid_obj);
            if (bool) {
              const data = await axios.post(
                `${REACT_APP_OWNER_API}/api/v1/addroomvideo/${room_id}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log("upload IVideos", data.data);
            } else {
              const data = await axios.post(
                `${REACT_APP_OWNER_API}/api/v1/addroomvideo/${Room_token}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log("upload IVideos", data.data);
            }
          };
          res(vid_obj);
        });
      } catch (e) {
        console.log("upload_outer_videos", e.response.data.msg);
        setLoading(false);
      }
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      async function call_all() {}
      call_all();
      setRefreshing(false);
    }, 2000);
  }, []);
  const upload_outer_images = async () => {
    if (intImg.length > 0) {
      try {
        // console.log("room_outer_images ", room_outerImages);
        intImg.forEach((element) => {
          let img_obj = {
            name: element.name,
            uri: element.uri,
            type: element.type,
          };
          let bool = room_updating?.updating;
          let room_id = room_updating?.room_id;
          console.log("upload_outer_images", Room_token);
          console.log("entered", img_obj);
          var res = async function (img_obj) {
            const formData = new FormData();
            // formData.append("name", "pic");
            formData.append("pic", img_obj);
            console.log("entered", formData);
            if (bool) {
              const data = await axios.post(
                `${REACT_APP_OWNER_API}/api/v1/addroomphoto/${room_id}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log("upload Images", data.data);
            } else {
              const data = await axios.post(
                `${REACT_APP_OWNER_API}/api/v1/addroomphoto/${Room_token}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log("upload Images", data.data);
            }
          };
          res(img_obj);
        });
      } catch (e) {
        console.log("upload_outer_images", e);
        setLoading(false);
      }
    }
  };

  const upload_all = async () => {
    try {
      setLoading(true);
      await upload_outer_videos();
      await upload_outer_images();

      setLoading(false);
      navigation.replace("Basic3");
    } catch (err) {
      setLoading(false);
      console.log("lol", err);
    }
  };
  function next_page() {
    // navigation.replace("Basic3");
  }
  async function onPress_for() {
    if (checked_room_outer_image && checked_room_outer_video) {
      await upload_all();
    } else {
      showErrorToast((title = "Fill Required Fields"));
      console.log("ckicked");
    }
  }
  function back_page() {
    navigation.navigate("Basic2");
  }

  const selectDoc_multiple_image = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      // console.log(res.length);
      if (res?.length > 10) {
        showErrorToast((title = "Maximum 10 Images"));
      } else if (res?.length + imgUri?.length > 10) {
        showErrorToast((title = "Maximum 10 Images"));
      } else {
        let temp = room_outerImages;
        temp = temp.concat(res);
        // console.log(temp);
        console.log("completed", temp);
        setimgUri(temp);
        setintImg(res);
        // console.log("completed1");
        updateRoomOuterImages(temp);
        checkedRoomOuterImages(true);
        // console.log("completed2", room_outerImages);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled images", err);
      } else {
        console.log(err);
      }
    }
  };
  const selectDoc_multiple_video = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.video],
      });
      if (res?.length > 10) {
        showErrorToast((title = "Maximum 10 Images"));
      } else if (res?.length + vidUri?.length > 10) {
        showErrorToast((title = "Maximum 10 Videos"));
      } else {
        let temp = room_outerVideos;
        temp = temp.concat(res);
        console.log("completed", temp);
        setvidUri(temp);
        setintVid(res);
        // console.log("completed1");
        updateRoomOuterVideos(temp);
        checkedRoomOuterVideos(true);
        // console.log("completed2", room_outerVideos);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled videos", err);
      } else {
        console.log(err);
      }
    }
  };
  const render_video = ({ _vidUri, video }) => {
    console.log("render_video", _vidUri);

    return (
      <ScrollView
        style={{
          flexDirection: "row",

          marginTop: 15,
          marginRight: 15,
        }}
      >
        <View
          style={{
            borderColor: COLORS.lightGray3,
          }}
        >
          {/* <Image
            source={{ uri: _vidUri }} // Can be a URL or a local file.
            style={{ height: 200, borderRadius: 10, width: 230 }}
          /> */}

          <VideoPlayer
            source={{ uri: _vidUri }}
            style={{ height: 200, borderRadius: 10, width: 230 }}
            // controls={false}
            repeat
            disableSeekbar
            disableVolume
            disableBack
            disableFullscreen
            // paused={pause}
            // ref={videoref}
          />
        </View>
        {/* <TouchableOpacity
          style={{
            position: "absolute",
            left: "40%",
            borderRadius: 10,
            top: "40%",
            fontSize: SIZES.h2,
            backgroundColor: COLORS.mobile_theme_back,
          }}
          onPress={async () => {
            // console.log("connected");
            // setPlay(true);
            // playVideo();
            // setPause(false);
            // let copy_vidUri = vidUri;
            // console.log("copy", video);
            // console.log("copy1", copy_vidUri);
            // copy_vidUri = copy_vidUri.filter(
            //   (obj) => obj.name !== video.item.name
            // );
            // setvidUri(copy_vidUri);
            // console.log("copy", copy_vidUri);
            // await updateRoomOuterVideos(copy_vidUri);
          }}
        >
          <Ionicons
            name="play-circle-outline"
            size={35}
            color={true ? COLORS.white : "lightgray"}
            style={{}}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            position: "absolute",
            left: "88.5%",
            // borderRadius: 10,

            fontSize: SIZES.h2,
            backgroundColor: COLORS.mobile_theme_back,
          }}
          onPress={async () => {
            console.log("video entered", token);
            var pattern = /^((https):\/\/)/;
            console.log("video", Room_token);
            let bool = room_updating?.updating;
            let room_id = room_updating?.room_id;
            if (video.item.uri.endsWith("tmp") && bool) {
              try {
                const data = await axios.delete(
                  `${REACT_APP_OWNER_API}/api/v1/deleteroomphoto/${room_id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    data: { name: video.item.name },
                  }
                );
                console.log("data", data);
              } catch (err) {
                console.log("deleteroom video", err.response);
              }
            } else {
              let temp = intvid.filter((obj) => obj.name !== video.item.name);
              setintVid(temp);
            }
            let copy_vidUri = vidUri;
            console.log("copy", video);
            console.log("copy1", copy_vidUri);
            copy_vidUri = copy_vidUri.filter(
              (obj) => obj.name !== video.item.name
            );
            setvidUri(copy_vidUri);
            console.log("copy", copy_vidUri);
            await updateRoomOuterVideos(copy_vidUri);
          }}
        >
          <MaterialIcons
            name="delete"
            size={26}
            color={true ? COLORS.white : "red"}
            style={{}}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  };
  const redner_images = ({ _imgUri, image }) => {
    // console.log("render_iamges lol", imgUri);
    return (
      <View
        style={{
          flexDirection: "row",

          marginTop: 15,
          marginRight: 15,
        }}
      >
        <View
          style={{
            borderColor: COLORS.lightGray3,
          }}
        >
          <Image
            source={{ uri: _imgUri }} // Can be a URL or a local file.
            style={{ height: 200, borderRadius: 10, width: 230 }}
          />
        </View>

        <TouchableOpacity
          style={{
            position: "absolute",
            left: "88.5%",
            // borderRadius: 10,

            fontSize: SIZES.h2,
            backgroundColor: COLORS.mobile_theme_back,
          }}
          onPress={async () => {
            var pattern = /^((https):\/\/)/;
            let bool = room_updating?.updating;
            let room_id = room_updating?.room_id;
            if (pattern.test(image.item.uri) && bool) {
              try {
                const data = await axios.delete(
                  `${REACT_APP_OWNER_API}/api/v1/deleteroomphoto/${room_id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    data: { name: image.item.name },
                  }
                );
                console.log("data", data.data.data);
              } catch (err) {
                console.log("deleteroom image", err.response.data.msg);
              }
            } else {
              let temp = intImg.filter((obj) => obj.name !== image.item.name);
              setintImg(temp);
            }
            let copy_imgUri = imgUri;
            console.log("copy", imgUri);
            console.log("copy1", copy_imgUri);
            copy_imgUri = copy_imgUri.filter(
              (obj) => obj.name !== image.item.name
            );

            setimgUri(copy_imgUri);
            console.log("copy", copy_imgUri);
            await updateRoomOuterImages(copy_imgUri);
          }}
        >
          <MaterialIcons
            name="delete"
            size={26}
            color={true ? COLORS.white : "red"}
            style={{}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ backgroundColor: "white" }}
      >
        {/* <KeyboardAvoidingView */}
        {/* // behavior="position" */}
        {/* <ScrollView style={{backgroundColor: 'white'}}> */}
        <View style={{ right: 12 }}>
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </View>
        <StatusBar
          animated={true}
          backgroundColor={COLORS.mobile_theme_back}
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
            color={COLORS.progress_bar}
            width={SIZES.width + 10}
            height={SIZES.height * 0.006}
            style={{ position: "absolute", left: -5, top: -1 }}
          />
          <View style={{ top: 10 }}>
            <Nav_Header
              onPress_forward={onPress_for}
              onPress_back={back_page}
              color={
                checkedRoomOuterImages && checkedRoomOuterVideos
                  ? COLORS.mobile_theme_back
                  : COLORS.lightGray3
              }
              icon_color={
                checkedRoomOuterImages && checkedRoomOuterVideos
                  ? COLORS.mobile_theme_back
                  : COLORS.lightGray3
              }
              back={true}
            />
          </View>
        </View>
        <View style={{ padding: 15, marginTop: 25 }}>
          <View>
            <Header
              step={3}
              total={3}
              subtitle={"Room's outer image,video"}
              title={"Videos and Images of Rooms"}
            />
          </View>
          {/* Outer Images */}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.form_section_title_fontsize,
                // fontWeight: "bold",
                marginTop: 25,
                flex: 1,
              }}
            >
              Outer Images{"  "}({imgUri.length} out of 10)
            </Text>

            {imgUri === undefined ||
              (imgUri?.length <= 10 && (
                <View style={{ marginTop: 11, flex: 0.4 }}>
                  <TouchableOpacity
                    style={{
                      marginTop: 15,
                      borderColor: COLORS.mobile_theme,
                      borderWidth: SIZES.form_button_borderWidth,
                      borderRadius: SIZES.form_button_borderRadius,
                      maxWidth: SIZES.form_button_maxWidth,
                      alignItems: SIZES.form_button_alignItems,
                      justifyContent: SIZES.form_button_justifyContent,
                      backgroundColor: COLORS.mobile_theme_back,
                    }}
                    onPress={() => {
                      selectDoc_multiple_image();
                      console.log("doc clicked");
                    }}
                  >
                    <Text
                      style={{
                        lineHeight: SIZES.form_button_text_lineHeight,
                        fontFamily: FONTS.fontFamily_black,
                        color: COLORS.font_color,
                        fontSize: SIZES.form_button_text_fontSize,
                        marginVertical: SIZES.form_button_text_marginVertical,
                        marginHorizontal:
                          SIZES.form_button_text_marginHorizontal,
                      }}
                    >
                      Select Image
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>

          {/* Show Uploaded */}

          <FlatList
            data={imgUri}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View style={{ top: -40, left: -40 }}>
                <Image
                  style={{ height: 200, borderRadius: 10, width: 250 }}
                  source={icons.no_image}
                />
              </View>
            }
            renderItem={(image) =>
              redner_images({ _imgUri: image.item.uri, image: image })
            }
          />

          {/* Outer Videso */}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.form_section_title_fontsize,
                // fontWeight: "bold",
                marginTop: 25,
                flex: 1,
              }}
            >
              Outer Videos{"  "}({vidUri.length} out of 2)
            </Text>

            {vidUri === undefined ||
              (vidUri?.length <= 10 && (
                <View style={{ marginTop: 11, flex: 0.4 }}>
                  <TouchableOpacity
                    style={{
                      marginTop: 15,
                      borderColor: COLORS.mobile_theme,
                      borderWidth: SIZES.form_button_borderWidth,
                      borderRadius: SIZES.form_button_borderRadius,
                      maxWidth: SIZES.form_button_maxWidth,
                      alignItems: SIZES.form_button_alignItems,
                      justifyContent: SIZES.form_button_justifyContent,
                      backgroundColor: COLORS.mobile_theme_back,
                    }}
                    onPress={() => {
                      selectDoc_multiple_video();
                      console.log("doc clicked");
                    }}
                  >
                    <Text
                      style={{
                        lineHeight: SIZES.form_button_text_lineHeight,
                        fontFamily: FONTS.fontFamily_black,
                        color: COLORS.font_color,
                        fontSize: SIZES.form_button_text_fontSize,
                        marginVertical: SIZES.form_button_text_marginVertical,
                        marginHorizontal:
                          SIZES.form_button_text_marginHorizontal,
                      }}
                    >
                      Select Video
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>

          <FlatList
            data={vidUri}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View style={{ top: -40, left: -40 }}>
                <Image
                  style={{ height: 200, borderRadius: 10, width: 250 }}
                  source={icons.no_image}
                />
              </View>
            }
            renderItem={(video) =>
              render_video({ _vidUri: video.item.uri, video: video })
            }
          />
        </View>
      </ScrollView>
      {loading && <AppLoader />}
    </>
  );
};
function mapStateToProps(state) {
  return {
    room_updating: state.Newrooms_reducer.room_updating,
    Room_token: state.authReducer.Room_token,
    price: state.Newrooms_reducer.price,
    about_room: state.Newrooms_reducer.about_room,
    token: state.authReducer.token,
    title_no: state.Newrooms_reducer.title_no,
    totalRooms: state.Newrooms_reducer.totalRooms,
    occupancy: state.Newrooms_reducer.occupancy,
    AC: state.Newrooms_reducer.AC,
    attached: state.Newrooms_reducer.attached,
    checked_room_outer_image:
      state.room_vidImage_reducer.checked_room_outer_image,
    room_outerImages: state.room_vidImage_reducer.room_outerImages,
    checked_room_outer_video:
      state.room_vidImage_reducer.checked_room_outer_video,
    singleordouble: state.Newrooms_reducer.singleordouble,
    cooler: state.Newrooms_reducer.cooler,
    room_outerVideos: state.room_vidImage_reducer.room_outerVideos,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateRoomOuterImages: (value) => {
      dispatch(room_vidImage_actions.updateRoomOuterImages(value));
    },
    checkedRoomOuterImages: (value) => {
      dispatch(room_vidImage_actions.checkedRoomOuterImages(value));
    },
    updateRoomOuterVideos: (value) => {
      dispatch(room_vidImage_actions.updateRoomOuterVideos(value));
    },
    checkedRoomOuterVideos: (value) => {
      dispatch(room_vidImage_actions.checkedRoomOuterVideos(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Basic25);
