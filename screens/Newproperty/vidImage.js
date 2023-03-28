import React, { Fragment, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/NewProperty/Header";
import * as Progress from "react-native-progress";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { connect } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import Nav_Header from "../../components/NewProperty/Nav_Header";
import Toast from "react-native-toast-message";
import * as vidImage_actions from "../../store/vidImage/vidImage_actions";
import AppLoader from "../../components/AppLoader";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { REACT_APP_OWNER_API } from "@env";
import VideoPlayer from "react-native-video-controls";
import * as mess_vidImage_actions from "../../store/mess_vidImage/mess_vidImage_actions";
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
  vid_downloaded,
  checkedOuterVideos,
  updateOuterVideos,
  checkedOuterImages,
  updateOuterImages,
  outerVideos,
  checked_outer_video,
  outerImages,
  checked_outer_image,
  navigation,
  messImage,
  checked_mess_image,
  mess,
  update_menuImage,
  checked_menuImage,
  mess_price,
}) => {
  const [imgUri, setimgUri] = React.useState(outerImages);
  const [vidUri, setvidUri] = React.useState(outerVideos);
  const [mess_imgUri, setmess_imgUri] = React.useState(messImage);
  const [mess_url, setmess_url] = React.useState(
    mess_imgUri ? mess_imgUri?.uri : undefined
  );
  let [intMessimg, setintMessimg] = React.useState({});
  let [intvid, setintVid] = React.useState([]);
  let [intImg, setintImg] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  // console.log(vidUri);
  console.log("vidImage", messImage);
  function return_looking(looking_form) {
    if (looking_form.pg) {
      return "PG";
    } else if (looking_form.rent) {
      return "FAMILYROOMS";
    } else if (looking_form.Hostel) {
      return "HOSTEL";
    } else {
      return "MESS";
    }
  }
  const upload_menuImage = async () => {
    if (intMessimg.length > 0) {
      try {
        let image_obj = {
          name: intMessimg[0].name,
          uri: intMessimg[0].uri,
          type: intMessimg[0].type,
        };
        // console.log("entered", image_obj);

        const formData = new FormData();
        // formData.append("name", "pic");
        formData.append("pic", image_obj);
        console.log("entered", formData);
        const data = await axios.post(
          `${REACT_APP_OWNER_API}/api/v1/addmenuphoto`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("upload mess Images", data.data);
      } catch (e) {
        console.log("upload_mess_images", e);
        setLoading(false);
      }
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
      console.log("upload", Location.latitude);
      const obj = {
        nameasperaadhar: adhar_name,
        typeofpg: return_looking(looking_form),
        propertytitle: propertyName,
        isMale: gender?.male || gender?.both ? true : false,
        isFemale: gender?.female || gender?.both ? true : false,
        address: house_no + "//" + Landmark,
        lat: Location.latitude.$numberDecimal,
        lng: Location.longitude.$numberDecimal,
        isWIFI: amneties.wifi,
        isAC: amneties.AC,
        isCleaning: amneties.isCleaning,
        detailsEntered: true,
        isHotWater: amneties.hotwater,
        isCooler: amneties.cooler,
        Rules: terms_pg,
        price: mess_price,
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
      await upload_details();
      await upload_menuImage();
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
    if (checked_mess_image && checked_outer_video && checked_outer_image) {
      console.log("Done");
      upload_all();
    } else {
      showErrorToast((title = "Fill All Required Details"));
      console.log(
        "ckicked",
        checked_outer_video,
        checked_outer_image,
        checked_mess_image
      );
    }
  }
  function back_page() {
    navigation.navigate("MoreProperty");
    console.log("back pagee");
  }
  const selectDoc_mess_image = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (res[0].size <= 10000000) {
        console.log("mess_img", res);
        setmess_imgUri(res);
        setmess_url(res[0].uri);
        setintMessimg(res);
        update_menuImage(res);
        await checked_menuImage(true);
        console.log("checked", res);
      } else {
        showErrorToast((title = "File size limit exceeded"));
      }

      // setimgUri(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled images", err);
      } else {
        console.log(err);
      }
      checked_menuImage(false);
    }
  };
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

      if (res?.length > 2) {
        showErrorToast((title = "Maximum 2 Videos"));
      } else if (res?.length + vidUri?.length > 2) {
        showErrorToast((title = "Maximum 2 Videos"));
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
            style={{ height: 150, borderRadius: 10, width: 180 }}
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
            left: "88.5%",
            // borderRadius: 10,

            fontSize: SIZES.h2,
            backgroundColor: COLORS.mobile_theme_back,
          }}
          onPress={async () => {
            // var pattern = /^((http|https|ftp):\/\/)/;
            console.log("video", video.item.name);
            RNFetchBlob.fs
              .unlink(video.item.uri)
              .then(() => {
                console.log("deleted from DocumnetdIr");
              })
              .catch((err) => {
                console.log("error deleted from DocumnetdIr", err);
              });
            console.log("video entered", video.item.uri);
            var pattern = /^((https):\/\/)/;
            // if (video.item.uri.endsWith("tmp")) {
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
              console.log("data_vid_sucess", data);
            } catch (err) {
              console.log("deleteroom video", err.response.data.msg);
            }
            // } else {
            //   let temp = intvid.filter((obj) => obj.name !== video.item.name);
            //   setintVid(temp);
            // }

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
  const redner_mess_images = ({ _imgUri, image }) => {
    console.log("render_iamges", imgUri);
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
            style={{ height: 150, borderRadius: 10, width: 180 }}
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
            console.log("mess_imaage", image.item.name);
            var pattern = /^((https):\/\/)/;
            if (pattern.test(image.item.uri)) {
              try {
                const data = await axios.delete(
                  `${REACT_APP_OWNER_API}/api/v1/deletemenuphoto`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    data: { name: image.item.name },
                  }
                );
                console.log("mess_data", data);
              } catch (err) {
                console.log("deletemess image", err.response.data.msg);
              }
            } else {
              let temp = intMessimg.filter(
                (obj) => obj.name !== image.item.name
              );
              setintMessimg(temp);
            }
            let copy_imgUri = mess_imgUri;
            console.log("copy", image);
            console.log("copy1", copy_imgUri);
            copy_imgUri = copy_imgUri.filter(
              (obj) => obj.name !== image.item.name
            );
            setmess_imgUri(copy_imgUri);
            console.log("copy", copy_imgUri);
            await update_menuImage(copy_imgUri);
            await checked_menuImage(false);
          }}
        >
          <MaterialIcons
            name="delete"
            size={26}
            color={true ? COLORS.white : "red"}
            style={{}}
          />
          {/* <Ionicons
            name="trash-bin-outline"
            size={35}
            color={true ? COLORS.white : "lightgray"}
            style={{}}
          /> */}
        </TouchableOpacity>
      </View>
    );
  };
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
            style={{ height: 150, borderRadius: 10, width: 180 }}
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
          <MaterialIcons
            name="delete"
            size={26}
            color={true ? COLORS.white : "red"}
            style={{}}
          />
          {/* <Ionicons
            name="trash-bin-outline"
            size={35}
            color={true ? COLORS.white : "lightgray"}
            style={{}}
          /> */}
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
            width={SIZES.width + 20}
            height={SIZES.height * 0.01}
            style={{ position: "absolute", left: -10, top: -1 }}
          />
          <View style={{ top: 10 }}>
            <Nav_Header
              onPress_forward={onPress_for}
              onPress_back={back_page}
              color={COLORS.mobile_theme_back}
              icon_color={COLORS.mobile_theme_back}
              back={true}
            />
          </View>
        </View>
        <View style={{ padding: 15, marginTop: 25 }}>
          <View>
            <Header
              step={4}
              subtitle={"Propertie's outer image,video"}
              title={"Videos and Images of Property"}
            />
          </View>
          {/* MessImage */}
          {mess && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  minHeight: 40,
                  borderRadius: 10,
                  marginTop: 25,
                  maxHeight: 200,
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: SIZES.form_section_input_fontsize,
                    color: COLORS.black,
                    //   bottom: 8,
                    // marginTop: 25,
                    flex: 1,
                    // top: 5,
                  }}
                >
                  Menu Image (Maximum Image size is 10MB)
                </Text>

                {mess_url !== undefined && (
                  <TouchableOpacity
                    style={{
                      // marginTop: 18,
                      height: 36,
                      width: 40,
                      // padding: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      // paddingTop: 5,
                      // left: 20,
                      // backgroundColor: COLORS.mobile_theme_back,
                      borderRadius: 10,
                      color: COLORS.white,
                      fontSize: SIZES.h2,
                      // marginTop: 25,
                    }}
                    onPress={async () => {
                      // _setimg_url("");
                      console.log("cleared");
                      var pattern = /^((https):\/\/)/;

                      if (pattern.test(mess_imgUri)) {
                        try {
                          const _data = await axios.delete(
                            `${REACT_APP_OWNER_API}/api/v1/deletemenuphoto`,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                              data: { name: mess_imgUri.name },
                            }
                          );
                          console.log("data_success", _data);
                        } catch (err) {
                          console.log("deleteroom video", err);
                        }
                      }
                      setmess_imgUri(undefined);
                      setmess_url(undefined);
                      checked_menuImage(false);
                      setintMessimg([]);
                    }}
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={25}
                      color={true ? COLORS.mobile_theme_back : "lightgray"}
                      style={{ flex: 1 }}
                    />
                  </TouchableOpacity>
                )}

                {mess_url === undefined && (
                  <TouchableOpacity
                    style={{
                      flex: 0.4,
                      borderColor: COLORS.mobile_theme,
                      borderWidth: SIZES.form_button_borderWidth,
                      borderRadius: SIZES.form_button_borderRadius,
                      maxWidth: SIZES.form_button_maxWidth,
                      maxHeight: SIZES.form_button_maxHeight + 2.5,
                      alignItems: SIZES.form_button_alignItems,
                      justifyContent: SIZES.form_button_justifyContent,
                      backgroundColor: COLORS.mobile_theme_back,
                    }}
                    onPress={() => {
                      selectDoc_mess_image();
                      console.log("doc clicked");
                    }}
                  >
                    <Text
                      style={{
                        lineHeight: SIZES.form_button_text_lineHeight,
                        // fontFamily: FONTS.fontFamily_black,
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
                )}
              </View>
            </View>
          )}

          {mess_url === undefined && (
            <View style={{}}>
              <Image
                style={{ height: 130, borderRadius: 10, width: 160 }}
                source={icons.no_image}
              />
            </View>
          )}
          {mess_url !== undefined && (
            <Image
              source={{ uri: mess_url }}
              style={{
                height: 150,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.lightGray3,
                borderRadius: 10,
                width: 180,
                // height: 300,
                marginLeft: 5,
              }}
            />
          )}

          {/* Outer Images */}
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.form_section_input_fontsize,
                // fontWeight: "bold",
                top: 7,
                flex: 1,
              }}
            >
              Outer Images{"  "}({imgUri.length} out of 10)
            </Text>

            {imgUri === undefined ||
              (imgUri?.length <= 10 && (
                <View style={{ flex: 0.4 }}>
                  <TouchableOpacity
                    style={{
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
                        // fontFamily: FONTS.fontFamily_black,
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
            keyExtractor={(image) => image.index}
            renderItem={(image) =>
              redner_images({ _imgUri: image.item.uri, image: image })
            }
          />

          {/* Outer Videso */}
          <View style={{ marginTop: 15, flexDirection: "row" }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.form_section_input_fontsize,
                // fontWeight: "bold",
                top: 7,
                flex: 1,
              }}
            >
              Outer Videos{"  "}({vidUri.length} out of 2)
            </Text>

            {vidUri === undefined ||
              (vidUri?.length <= 2 && (
                <View style={{ flex: 0.4 }}>
                  <TouchableOpacity
                    style={{
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
                        // fontFamily: FONTS.fontFamily_black,
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
            keyExtractor={(video) => video.index}
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
    messImage: state.mess_vidImage_reducer.messImage,
    checked_mess_image: state.mess_vidImage_reducer.checked_mess_image,
    checked_outer_image: state.vidImage_reducer.checked_outer_image,
    outerImages: state.vidImage_reducer.outerImages,
    checked_outer_video: state.vidImage_reducer.checked_outer_video,
    outerVideos: state.vidImage_reducer.outerVideos,
    vid_downloaded: state.vidImage_reducer.vid_downloaded,
    //imported for uploading
    adhar_card: state.AdharCard_reducer.adharcard,
    elebill: state.Ele_Bill_reducer.elebill,
    token: state.authReducer.token,
    adhar_name: state.authReducer.adhar_name,
    propertyName: state.newproperty_reducer.propertyName,
    looking_form: state.newproperty_reducer.looking_form,
    mess: state.newproperty_reducer.looking_form.mess,
    gender: state.newproperty_reducer.gender,
    house_no: state.newproperty_reducer.house_no,
    Landmark: state.newproperty_reducer.Landmark,
    Location: state.Location_reducer.Location,
    Location_address: state.Newproperty_ext_reducer.Location_address,
    amneties: state.newproperty_reducer.amneties,
    terms_pg: state.newproperty_reducer.terms_pg,
    about_pg: state.newproperty_reducer.about_pg,
    mess_price: state.newproperty_reducer.mess_price,
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
    update_menuImage: (value) => {
      dispatch(mess_vidImage_actions.update_menuImage(value));
    },
    checked_menuImage: (value) => {
      dispatch(mess_vidImage_actions.checked_menuImage(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(vidImage);
