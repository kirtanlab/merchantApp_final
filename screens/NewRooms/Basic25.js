import React, { Fragment, useEffect } from "react";
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
} from "react-native";
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
import Floor_prices from "../../components/NewRooms.js/Floor_prices";
import Ac_attached from "../../components/NewRooms.js/Ac_attached";
import InputField from "../../components/InputField";
// import {Checkbox} from 'react-native-paper';
import CheckBox from "../../components/CheckBox";
import Nav_Header from "../../components/NewProperty/Nav_Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import Terms from "../../components/Terms";
import * as room_vidImage_actions from "../../store/room_vidImage/room_vidImage_actions";
import Toast from "react-native-toast-message";
import {
  toastConfig,
  showErrorToast,
} from "../../components/NewProperty/ToastConfig";
import axios from "axios";
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
  navigation,
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
  const [loading, setLoading] = React.useState(false);
  const upload_all = async () => {
    try {
      setLoading(true);

      const obj = {
        title: title_no.trimEnd(),
        availablerooms: totalRooms,
        occupancy: occupancy,
        isAC: AC,
        isAttached: attached,
        price: price,
        About: about_room.trimEnd(),
      };
      // let outer_img_obj = {
      //   name: outerImages[0].name,
      //   uri: outerImages[0].uri,
      // };
      // let outer_vid_obj = {
      //   name: outerVideos[1].name,
      //   uri: outerVideos[1].uri,
      // };
      console.log("valid", token);
      const data = await axios.post(
        `${REACT_APP_OWNER_API}/api/v1/owner/createroom`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // const formData = new FormData();
      // // formData.append("name", "pic");
      // formData.append("pic", adhar_card);
      // const data = await axios.post(
      //   `${REACT_APP_OWNER_API}/api/v1/addaadharproof`,
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "multipart/form-data; ",
      //     },
      //   }
      // );
      console.log("vid_img", data.data);
      setLoading(false);
      // navigation.replace("Thankyou");
    } catch (err) {
      setLoading(false);
      console.log("lol", err);
      //   // gen_login_err_method(true);
      //   // setError(err.response.data.msg);
    }
  };
  function next_page() {
    // navigation.replace("Basic3");
  }
  function onPress_for() {
    if (checked_room_outer_image && checked_room_outer_video) {
      // console.log("Done");
      upload_all();
      next_page();
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
        // console.log("completed", temp);
        setimgUri(temp);
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
        // console.log("completed", temp);
        setvidUri(temp);
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
    // console.log("render_video", vidUri);
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
            source={{ uri: _vidUri }} // Can be a URL or a local file.
            style={{ height: 200, borderRadius: 10, width: 230 }}
          />
        </View>

        <TouchableOpacity
          style={{
            position: "absolute",
            left: "82%",
            borderRadius: 10,

            fontSize: SIZES.h2,
            backgroundColor: COLORS.mobile_theme_back,
          }}
          onPress={async () => {
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
          <Ionicons
            name="close-circle-outline"
            size={35}
            color={true ? COLORS.white : "lightgray"}
            style={{}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const redner_images = ({ _imgUri, image }) => {
    // console.log("render_iamges", imgUri);
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
            source={{ uri: _imgUri }}
            style={{ height: 200, borderRadius: 10, width: 230 }}
          />
        </View>

        <TouchableOpacity
          style={{
            position: "absolute",
            left: "82%",
            borderRadius: 10,

            fontSize: SIZES.h2,
            backgroundColor: COLORS.mobile_theme_back,
          }}
          onPress={async () => {
            setimgUri(undefined);
            let copy_imgUri = imgUri;
            console.log("copy", image);
            console.log("copy1", copy_imgUri);
            copy_imgUri = copy_imgUri.filter(
              (obj) => obj.name !== image.item.name
            );
            setimgUri(copy_imgUri);
            console.log("copy", copy_imgUri);
            await updateRoomOuterImages(copy_imgUri);
          }}
        >
          <Ionicons
            name="close-circle-outline"
            size={35}
            color={true ? COLORS.white : "lightgray"}
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
            progress={0.75}
            color={COLORS.progress_bar}
            width={SIZES.width}
            height={SIZES.height * 0.006}
            style={{ position: "absolute", top: -1 }}
          />
          <Nav_Header
            onPress_forward={onPress_for}
            onPress_back={back_page}
            color={true ? COLORS.mobile_theme_back : COLORS.lightGray3}
            icon_color={true ? COLORS.mobile_theme_back : COLORS.lightGray3}
            back={true}
          />
        </View>
        <View style={{ padding: 15, marginTop: 25 }}>
          <View>
            <Header
              step={4}
              subtitle={"Room's outer image,video"}
              title={"Videos and Images of Rooms"}
            />
          </View>
          {/* Outer Images */}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.h2,
                fontWeight: "bold",
                marginTop: 25,
                flex: 1,
              }}
            >
              Outer Images{"  "}({imgUri.length} out of 10)
            </Text>

            {imgUri === undefined ||
              (imgUri?.length <= 10 && (
                <View style={{ marginTop: 11, flex: 0.6 }}>
                  <TouchableOpacity
                    style={{
                      marginTop: 15,
                      borderColor: COLORS.mobile_theme,
                      borderWidth: SIZES.form_button_borderWidth,
                      borderRadius: SIZES.form_button_borderRadius,
                      minWidth: SIZES.form_button_minWidth - 10,
                      maxWidth: SIZES.form_button_maxWidth - 20,
                      maxHeight: SIZES.form_button_maxHeight - 5,
                      padding: SIZES.form_button_padding - 2,
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
                        fontSize: SIZES.h2 - 3,
                        fontWeight: SIZES.form_button_text_fontWeight,
                        color: COLORS.font_color,
                      }}
                    >
                      Select Image
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
          {/* Show Uploaded */}
          {imgUri.length > 0 && (
            <FlatList
              data={imgUri}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={(image) =>
                redner_images({ _imgUri: image.item.uri, image: image })
              }
            />
          )}
          {/* Outer Videso */}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.h2,
                fontWeight: "bold",
                marginTop: 25,
                flex: 1,
              }}
            >
              Outer Videos{"  "}({vidUri.length} out of 10)
            </Text>

            {vidUri === undefined ||
              (vidUri?.length <= 10 && (
                <View style={{ marginTop: 11, flex: 0.6 }}>
                  <TouchableOpacity
                    style={{
                      marginTop: 15,
                      borderColor: COLORS.mobile_theme,
                      borderWidth: SIZES.form_button_borderWidth,
                      borderRadius: SIZES.form_button_borderRadius,
                      minWidth: SIZES.form_button_minWidth - 10,
                      maxWidth: SIZES.form_button_maxWidth - 20,
                      maxHeight: SIZES.form_button_maxHeight - 5,
                      padding: SIZES.form_button_padding - 2,
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
                        fontSize: SIZES.h2 - 3,
                        fontWeight: SIZES.form_button_text_fontWeight,
                        color: COLORS.font_color,
                      }}
                    >
                      Select Video
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
          {vidUri.length > 0 && (
            <View style={{ borderWidth: 1, borderColor: COLORS.lightGray4 }}>
              <FlatList
                data={vidUri}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={(video) =>
                  render_video({ _vidUri: video.item.uri, video: video })
                }
              />
            </View>
          )}
        </View>
      </ScrollView>
      {loading && <AppLoader />}
    </>
  );
};
function mapStateToProps(state) {
  return {
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
