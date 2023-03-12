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
import {
  toastConfig,
  showErrorToast,
} from "../../components/NewProperty/ToastConfig";
const vidImage = ({
  token,
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
  const [loading, setLoading] = React.useState(false);
  function return_looking(looking_form) {
    if (looking_form.pg) {
      return "PG";
    } else if (looking_form.rent) {
      return "FAMILYROOMS";
    } else {
      return "HOSTEL";
    }
  }

  const upload_all = async () => {
    // try {
    // setLoading(true);
    console.log("valid", gender);
    const obj = {
      nameasperaadhar: adhar_name,
      typeofpg: return_looking(looking_form),
      propertytitle: propertyName,
      isMale: gender?.male || gender?.both ? true : false,
      isMale: gender?.female || gender?.both ? true : false,
      address: house_no + Landmark,
      lat: Location.latitude,
      lng: Location.longitude,
      isWifi: amneties.wifi,
      isAC: amneties.AC,
      isHotWater: amneties.hotwater,
      isCooler: amneties.cooler,
      Rules: terms_pg,
    };

    // const data = await axios.post(
    //   `${REACT_APP_OWNER_API}/api/v1/owner/updateowner`,
    //   obj,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log("vid_img", data);
    // setLoading(false);
    // navigation.replace("Thankyou");
    // } catch (err) {
    //   setLoading(false);
    //   console.log("lol", err);
    //   // gen_login_err_method(true);
    //   // setError(err.response.data.msg);
    // }
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
    // console.log('render_video', vidUri);
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
            await updateOuterVideos(copy_vidUri);
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
    token: state.authReducer.token,
    adhar_name: state.authReducer.adhar_name,
    propertyName: state.newproperty_reducer.propertyName,
    looking_form: state.newproperty_reducer.looking_form,
    gender: state.newproperty_reducer.gender,
    house_no: state.newproperty_reducer.house_no,
    Landmark: state.newproperty_reducer.Landmark,
    Location: state.Newproperty_ext_reducer.Location,
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
