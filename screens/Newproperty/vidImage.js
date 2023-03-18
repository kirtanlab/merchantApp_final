import React, { Fragment, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/NewProperty/Header";
import * as Progress from "react-native-progress";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { COLORS, SIZES } from "../../constants";
import { connect } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import CustomButton_form from "../../components/NewProperty/CustomButton_form";
import Amneties from "../../components/NewProperty/Amneties";
import Nav_Header from "../../components/NewProperty/Nav_Header";
import AddText from "../../components/NewProperty/AddText";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as vidImage_actions from "../../store/vidImage/vidImage_actions";
import AppLoader from "../../components/AppLoader";
import axios from "axios";
import { REACT_APP_OWNER_API } from "@env";
import VideoPlayer from "react-native-video-controls";
import {
  toastConfig,
  showErrorToast,
} from "../../components/NewProperty/ToastConfig";
const vidImage = ({
  token,
  elebill,
  adhar_card,
  adhar_name,
  propertyName,
  looking_form,
  gender,
  house_no,
  Landmark,
  Location,
  Location_address,
  amneties,
  terms_pg,
  about_pg,

  checkedOuterVideos,
  updateOuterVideos,
  checkedOuterImages,
  updateOuterImages,
  outerVideos,
  checked_outer_video,
  outerImages,
  checked_outer_image,
  navigation,
}) => {
  const [imgUri, setimgUri] = React.useState(outerImages);
  const [vidUri, setvidUri] = React.useState(outerVideos);
  let [intvid, setintVid] = React.useState([]);
  let [intImg, setintImg] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // console.log(vidUri);
  console.log("vidImage", adhar_card, elebill);
  function return_looking(looking_form) {
    if (looking_form.pg) {
      return "PG";
    } else if (looking_form.rent) {
      return "FAMILYROOMS";
    } else {
      return "HOSTEL";
    }
  }
  const upload_adhar = async () => {
    try {
      let adhar_obj = {
        name: adhar_card[0].name,
        uri: adhar_card[0].uri,
        type: adhar_card[0].type,
      };
      const formData = new FormData();
      // formData.append("name", "pic");
      formData.append("pic", adhar_obj);
      const data = await axios.post(
        `${REACT_APP_OWNER_API}/api/v1/addaadharproof`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data);
    } catch (e) {
      console.log("upload_adhar", e);
      setLoading(false);
    }
  };
  const upload_ele_bill = async () => {
    try {
      let ele_bill_obj = {
        name: elebill[0].name,
        uri: elebill[0].uri,
        type: elebill[0].type,
      };
      console.log(ele_bill_obj);
      const formData = new FormData();
      // formData.append("name", "pic");
      formData.append("pic", ele_bill_obj);
      const data = await axios.post(
        `${REACT_APP_OWNER_API}/api/v1/addaddressproof`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data);
    } catch (e) {
      console.log("upload_ele_bill", e);
      setLoading(false);
    }
  };
  const upload_outer_images = async () => {
    if (intImg.length > 0) {
      try {
        intImg.forEach((element) => {
          let image_obj = {
            name: element.name,
            uri: element.uri,
            type: element.type,
          };
          // console.log("entered", image_obj);
          var res = async function (image_obj) {
            const formData = new FormData();
            // formData.append("name", "pic");
            formData.append("pic", image_obj);
            console.log("entered", formData);
            const data = await axios.post(
              `${REACT_APP_OWNER_API}/api/v1/addownerphoto`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("upload Images", data.data);
          };
          res(image_obj);
        });
      } catch (e) {
        console.log("upload_outer_images", e);
        setLoading(false);
      }
    }
  };
  const upload_outer_videos = async () => {
    if (intvid.length > 0) {
      try {
        intvid.forEach((element) => {
          let vid_obj = {
            name: element.name,
            uri: element.uri,
            type: element.type,
          };
          console.log("entered", vid_obj);
          var res = async function (vid_obj) {
            const formData = new FormData();
            // formData.append("name", "pic");
            formData.append("pic", vid_obj);
            console.log("entered", formData);
            const data = await axios.post(
              `${REACT_APP_OWNER_API}/api/v1/addownervideo`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("upload IVideos", data.data);
          };
          res(vid_obj);
        });
      } catch (e) {
        console.log("upload_outer_videos", e);
        setLoading(false);
      }
    }
  };
  const upload_details = async () => {
    try {
      console.log("upload", token);
      const obj = {
        nameasperaadhar: adhar_name,
        typeofpg: return_looking(looking_form),
        propertytitle: propertyName,
        isMale: gender?.male || gender?.both ? true : false,
        isFemale: gender?.female || gender?.both ? true : false,
        address: house_no + "//" + Landmark,
        lat: Location.latitude,
        lng: Location.longitude,
        isWIFI: amneties.wifi,
        isAC: amneties.AC,
        detailsEntered: true,
        isHotWater: amneties.hotwater,
        isCooler: amneties.cooler,
        Rules: terms_pg,
      };
      const data = await axios.post(
        `${REACT_APP_OWNER_API}/api/v1/owner/updateowner`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("detailsdone", data.data.data);
      // setLoading(false);
    } catch (e) {
      console.log("upload_details", e.response.data.msg);
      setLoading(false);
    }
  };

  const upload_all = async () => {
    try {
      setLoading(true);
      await upload_adhar();
      await upload_details();
      await upload_ele_bill();
      await upload_outer_images();
      await upload_outer_videos();
      setLoading(false);
      navigation.replace("Thankyou");
    } catch (err) {
      setLoading(false);
      console.log("lol", err);
    }
  };

  function onPress_for() {
    if (checked_outer_video && checked_outer_image) {
      console.log("Done");
      upload_all();
    } else {
      showErrorToast((title = "Fill All Required Details"));
      console.log("ckicked");
    }
  }
  function back_page() {
    navigation.navigate("MoreProperty");
    console.log("back pagee");
  }
  const selectDoc_multiple_image = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      console.log(res.length);
      if (res?.length > 10) {
        showErrorToast((title = "Maximum 10 Images"));
      } else if (res?.length + imgUri?.length > 10) {
        showErrorToast((title = "Maximum 10 Images"));
      } else {
        let temp = outerImages;
        temp = temp.concat(res);
        console.log("completed", temp);
        setimgUri(temp);
        setintImg(res);
        console.log("completed1");
        updateOuterImages(temp);
        checkedOuterImages(true);
        console.log("completed2", outerImages);
      }
      // setimgUri(res);
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
        let temp = outerVideos;
        temp = temp.concat(res);
        console.log("completed", temp);
        setvidUri(temp);
        setintVid(res);
        console.log("completed1");
        updateOuterVideos(temp);
        checkedOuterVideos(true);
        console.log("completed2", outerVideos);
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
          {/* <Image
            source={{ uri: _vidUri }} // Can be a URL or a local file.
            style={{ height: 200, borderRadius: 10, width: 230 }}
          /> */}

          <VideoPlayer
            source={{ uri: _vidUri }}
            style={{ height: 200, borderRadius: 10, width: 230 }}
            repeat
            disableSeekbar
            disableVolume
            disableBack
            disableFullscreen
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
            // var pattern = /^((http|https|ftp):\/\/)/;
            console.log("video", video.item.name);

            console.log("video entered", token);
            var pattern = /^((https):\/\/)/;
            if (pattern.test(video.item.uri)) {
              try {
                const data = await axios.delete(
                  `${REACT_APP_OWNER_API}/api/v1/deleteownervideo`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    data: { name: video.item.name },
                  }
                );
                console.log("data", data);
              } catch (err) {
                console.log("deleteroom video", err.response.data.msg);
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
            await updateOuterImages(copy_vidUri);
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
  // const render_video = ({ _vidUri, video }) => {
  //   // console.log('render_video', vidUri);
  //   return (
  //     <View
  //       style={{
  //         flexDirection: "row",

  //         marginTop: 15,
  //         marginRight: 15,
  //       }}
  //     >
  //       <View
  //         style={{
  //           borderColor: COLORS.lightGray3,
  //         }}
  //       >
  //         <Image
  //           source={{ uri: _vidUri }} // Can be a URL or a local file.
  //           style={{ height: 200, borderRadius: 10, width: 230 }}
  //         />
  //       </View>

  //       <TouchableOpacity
  //         style={{
  //           position: "absolute",
  //           left: "82%",
  //           borderRadius: 10,

  //           fontSize: SIZES.h2,
  //           backgroundColor: COLORS.mobile_theme_back,
  //         }}
  //         onPress={async () => {
  //           let copy_vidUri = vidUri;
  //           console.log("copy", video);
  //           console.log("copy1", copy_vidUri);
  //           copy_vidUri = copy_vidUri.filter(
  //             (obj) => obj.name !== video.item.name
  //           );
  //           setvidUri(copy_vidUri);
  //           console.log("copy", copy_vidUri);
  //           await updateOuterVideos(copy_vidUri);
  //         }}
  //       >
  //         <Ionicons
  //           name="close-circle-outline"
  //           size={35}
  //           color={true ? COLORS.white : "lightgray"}
  //           style={{}}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
  const redner_images = ({ _imgUri, image }) => {
    // console.log('render_iamges', imgUri);
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
            console.log("imaage", image.item.name);
            var pattern = /^((https):\/\/)/;
            if (pattern.test(image.item.uri)) {
              let obj = {
                name: image.item.name,
              };
              try {
                const data = await axios.delete(
                  `${REACT_APP_OWNER_API}/api/v1/deleteownerphoto`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    data: { name: image.item.name },
                  }
                );
                console.log("data", data);
              } catch (err) {
                console.log("deleteroom image", err.response.data.msg);
              }
            } else {
              let temp = intImg.filter((obj) => obj.name !== image.item.name);
              setintImg(temp);
            }
            let copy_imgUri = imgUri;
            console.log("copy", image);
            console.log("copy1", copy_imgUri);
            copy_imgUri = copy_imgUri.filter(
              (obj) => obj.name !== image.item.name
            );
            setimgUri(copy_imgUri);
            console.log("copy", copy_imgUri);
            await updateOuterImages(copy_imgUri);
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
            width={SIZES.width}
            height={SIZES.height * 0.01}
            style={{ position: "absolute", top: -1 }}
          />
          <Nav_Header
            onPress_forward={onPress_for}
            onPress_back={back_page}
            color={COLORS.mobile_theme_back}
            icon_color={COLORS.mobile_theme_back}
            back={true}
          />
        </View>
        <View style={{ padding: 15, marginTop: 25 }}>
          <View>
            <Header
              step={4}
              subtitle={"Propertie's outer image,video"}
              title={"Videos and Images of Property"}
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
          {imgUri.length > 0 && (
            <FlatList
              data={imgUri}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(image) => image.index}
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
            <FlatList
              data={vidUri}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(video) => video.index}
              renderItem={(video) =>
                render_video({ _vidUri: video.item.uri, video: video })
              }
            />
          )}
        </View>
      </ScrollView>
      {loading && <AppLoader />}
    </>
  );
};
function mapStateToProps(state) {
  return {
    checked_outer_image: state.vidImage_reducer.checked_outer_image,
    outerImages: state.vidImage_reducer.outerImages,
    checked_outer_video: state.vidImage_reducer.checked_outer_video,
    outerVideos: state.vidImage_reducer.outerVideos,
    //imported for uploading
    adhar_card: state.AdharCard_reducer.adharcard,
    elebill: state.Ele_Bill_reducer.elebill,
    token: state.authReducer.token,
    adhar_name: state.authReducer.adhar_name,
    propertyName: state.newproperty_reducer.propertyName,
    looking_form: state.newproperty_reducer.looking_form,
    gender: state.newproperty_reducer.gender,
    house_no: state.newproperty_reducer.house_no,
    Landmark: state.newproperty_reducer.Landmark,
    Location: state.Location_reducer.Location,
    Location_address: state.Newproperty_ext_reducer.Location_address,
    amneties: state.newproperty_reducer.amneties,
    terms_pg: state.newproperty_reducer.terms_pg,
    about_pg: state.newproperty_reducer.about_pg,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateOuterImages: (value) => {
      dispatch(vidImage_actions.updateOuterImages(value));
    },
    checkedOuterImages: (value) => {
      dispatch(vidImage_actions.checkedOuterImages(value));
    },
    updateOuterVideos: (value) => {
      dispatch(vidImage_actions.updateOuterVideos(value));
    },
    checkedOuterVideos: (value) => {
      dispatch(vidImage_actions.checkedOuterVideos(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(vidImage);
