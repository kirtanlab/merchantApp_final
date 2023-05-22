import React, { Fragment, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
} from "react-native";
import { REACT_APP_OWNER_API } from "@env";
import axios from "axios";
import * as Ele_Bill_actions from "../../store/Ele_Bill/Ele_Bill_actions";
// import {} from 'react-native-safe-area-context';
import * as Newpropert_ext_actions from "../../store/Newproperty_ext/Newproperty_ext_actions";
import Header from "../../components/NewProperty/Header";
import * as Progress from "react-native-progress";
// import * as newproperty_actions from '../../store/Newproperty/newproperty_action';
import { COLORS, SIZES, FONTS } from "../../constants";
import Looking_Selection_Button from "../../components/NewProperty/Looking_Selection_Button";
import { connect } from "react-redux";
import * as newproperty_actions from "../../store/Newproperty/newproperty_action";
import Who_you from "../../components/NewProperty/Who_you";
import Text_Input from "../../components/NewProperty/Text_Input";
import DocumentPicker from "react-native-document-picker";
import CustomButton_form from "../../components/NewProperty/CustomButton_form";
import NumericInput from "../../components/NewProperty/NumericInput";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  toastConfig,
  showErrorToast,
} from "../../components/NewProperty/ToastConfig";
import Nav_Header from "../../components/NewProperty/Nav_Header";
import AppLoader from "../../components/AppLoader";
import Dropdown from "../../components/Dropdown";
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

const Location = ({
  checked_Description_pg,
  checked_Location,
  navigation,
  checked_house_no,
  checked_Landmark,
  checked_ele_bill,
  elebill,
  checkedElebill,
  updateElebill,
  house_no,
  Landmark,
  Location,
  adharcard,
  gender,
  adhar_name,
  looking_for,
  token,
  propertyName,
  setArea,
  areaname
}) => {
  const [_intImg, setintImg] = React.useState([]);
  // useEffect(() => {
  //   checked_ele_bill && console.log("checked_ele_bill", checked_ele_bill);
  // }, [checked_ele_bill]);
  useEffect(() => {
    console.log(
      adhar_name,
      " ",
      propertyName,
      " ",
      looking_for,
      " ",
      gender,
      " ",
      adharcard
    );
    console.log(
      checkedElebill,
      " ",
      house_no,
      " ",
      Landmark,
      " ",
      Location,
      " "
    );
  }, [Location, Landmark, house_no, elebill]);
  const options = ['Indraprastha', 'Vigyan Nagar', 'Jawahar Nagar', 'Rajeev Gandh Nagar', 'Indra Vihar', 'Talwandi', 'Kunhari',"other"];
  let temp_index = options.indexOf(areaname);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(temp_index) || new IndexPath(0));
  const [loading, setLoading] = React.useState(false);
  
  const handleOptionSelect = (index) => {
    setSelectedIndex(index);
    setArea(options[index-1])
  };
  // useEffect(() => {
  //   const temp_index = options.indexOf(areaname);
  //   setSelectedIndex(temp_index)
  // },[areaname])
  
  // const [imgUri, setimgUri] = React.useState(undefined);
  const [img_url, setimg_url] = React.useState(elebill ? elebill?.uri : "");
  const upload_ele_bill = async () => {
    try {
      console.log("entered");
      setLoading(true);
      let ele_bill_obj = {
        name: _intImg[0].name,
        uri: _intImg[0].uri,
        type: _intImg[0].type,
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
      console.log("good", data);
      setLoading(false);
    } catch (e) {
      console.log("upload_ele_bill", e.response.data.msg);
      setLoading(false);
    }
  };
  console.log("elebill", elebill,Location);
  function next_page() {
    navigation.navigate("MoreProperty");
    console.log("next pagee");
  }
  async function onPress_for() {
    if (checked_Landmark && checked_house_no && checked_ele_bill) {
      if (_intImg.length > 0) {
        await upload_ele_bill();
        3;
      }

      console.log("Done");
      next_page();
    } else {
      showErrorToast((title = "Fill Required Fields"));
      console.log("ckicked");
    }
  }
  function back_page() {
    navigation.navigate("BasicDetails");
    console.log("back pagee");
  }

  const selectDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      if (res[0].size <= 10000000) {
        setimg_url(res[0].uri);
        checkedElebill(true);
        await updateElebill(res);
        setintImg(res);
      } else {
        showErrorToast((title = "File size limit exceeded"));
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled", err);
      } else {
        console.log(err);
      }
      checkedElebill(false);
    }
  };
  const selectDoc_multiple = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      console.log(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled", err);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: "white" }}>
        {/* <KeyboardAvoidingView
        behavior="position"
        style={{backgroundColor: 'white'}}> */}
        <View style={{}}>
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
            progress={0.5}
            color={COLORS.progress_bar}
            width={SIZES.width + 20}
            height={SIZES.height * 0.01}
            style={{ position: "relative", right: 10, top: -1 }}
          />
          <Nav_Header
            onPress_forward={onPress_for}
            onPress_back={back_page}
            color={
              checked_Landmark && checked_house_no && checked_ele_bill
                ? COLORS.mobile_theme_back
                : COLORS.lightGray3
            }
            icon_color={
              checked_Landmark && checked_house_no && checked_ele_bill
                ? COLORS.mobile_theme_back
                : COLORS.lightGray3
            }
            back={true}
          />
        </View>
        <View style={{ padding: 15, marginTop: 25 }}>
          <View>
            <Header
              step={2}
              subtitle={"Your House Number,Landmark,Location & Document"}
              title={"Add Location Details"}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <NumericInput navigation={navigation} />
          </View>


          {/* Areas Selection */}
          <View style={{

          }}>
            <Text style={{fontSize: SIZES.form_section_title_fontsize,
                color: COLORS.black,}}>Select your area</Text>
            <Layout
              style={{
                minHeight: 60,
                top: 5,
                width: "95%",
              }}
            >
              <Select
                selectedIndex={selectedIndex}
                onSelect={(index) => handleOptionSelect(index)}
                value={selectedIndex !== null ? options[selectedIndex -1] : ''}
              >
                {options.map((option, index) => (
                  <SelectItem key={index} title={option} />
                ))}
              </Select>
            </Layout>
             {/* <Select style={{top: 5}}>
              <SelectItem title={evaProps => 
              <View style={{width: "90%"}}>
                <View style={{borderBottomColor: "lightblue",borderBottomWidth: 0.8,width: "100%"}}>
                  <Text style={{paddingBottom: 4,color:"black",fontSize:SIZES.form_section_title_fontsize, }}>Indraprastha</Text>
                </View>
                <View style={{borderBottomColor: "lightblue",borderBottomWidth: 0.8,width: "100%"}}>
                  <Text style={{paddingBottom: 4,color:"black",fontSize:SIZES.form_section_title_fontsize, }}>Vigyan Nagar</Text>
                </View>
                <View style={{borderBottomColor: "lightblue",borderBottomWidth: 0.8,width: "100%"}}>
                  <Text style={{paddingBottom: 4,color:"black",fontSize:SIZES.form_section_title_fontsize, }}>Jawahar Nagar</Text>
                </View>
                <View style={{borderBottomColor: "lightblue",borderBottomWidth: 0.8,width: "100%"}}>
                  <Text style={{paddingBottom: 4,color:"black",fontSize:SIZES.form_section_title_fontsize, }}>Rajeev Gandh Nagar</Text>
                </View>
                <View style={{borderBottomColor: "lightblue",borderBottomWidth: 0.8,width: "100%"}}>
                  <Text style={{paddingBottom: 4,color:"black",fontSize:SIZES.form_section_title_fontsize, }}>Indra Vihar</Text>
                </View>
                <View style={{borderBottomColor: "lightblue",borderBottomWidth: 0.8,width: "100%"}}>
                  <Text style={{paddingBottom: 4,color:"black",fontSize:SIZES.form_section_title_fontsize, }}>Talwandi</Text>
                </View>
                <View style={{borderBottomColor: "lightblue",borderBottomWidth: 0.8,width: "100%"}}>
                  <Text style={{paddingBottom: 4,color:"black",fontSize:SIZES.form_section_title_fontsize, }}>Kunhari</Text>
                </View>
              </View>
              } />
            </Select> */}
          </View>


          {/* Bijli ka bil*/}
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: COLORS.mobile_theme_back,
              // minWidth: 100,
              // width: '100%',
              minHeight: 40,
              borderRadius: 10,
              // marginTop: 25,
              maxHeight: 200,
              // alignItems: 'center',
              padding: 5,
              // marginTop: 25
              // marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: SIZES.form_section_title_fontsize,
                color: COLORS.black,
                //   bottom: 8,
                // marginTop: 5,
                flex: 1,
                // top: 5,
              }}
            >
              Electricity Bill (Maximum Image size is 10MB)
            </Text>
            {img_url !== "" && (
              <TouchableOpacity
                style={{
                  // marginTop: 18,
                  height: 36,
                  width: 56,
                  // padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  // paddingTop: 5,
                  // left: 20,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  color: COLORS.mobile_theme_back,
                  fontSize: SIZES.h2,
                  // marginTop: 25,
                }}
                onPress={async () => {
                  var pattern = /^((https):\/\/)/;

                  if (pattern.test(img_url)) {
                    try {
                      const data = await axios.delete(
                        `${REACT_APP_OWNER_API}/api/v1/deleteaddressproof`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                          data: { name: elebill.name },
                        }
                      );
                      console.log("data", data);
                    } catch (err) {
                      console.log("deleteroom video", err.response);
                    }
                  }
                  setimg_url("");
                  checkedElebill(false);
                  await updateElebill("");
                  setintImg([]);
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
          </View>
          {img_url === "" && (
            <View style={{}}>
              {/* <Text
              style={{
                fontSize: SIZES.h2,
                color: COLORS.mobile_theme_back,
                //   fontWeight: 'bold',
              }}>
              Upload Adhar(image or pdf form)
            </Text> */}
              <TouchableOpacity
                style={{
                  // marginTop: 15,
                  borderColor: COLORS.mobile_theme,
                  borderWidth: SIZES.form_button_borderWidth,
                  borderRadius: SIZES.form_button_borderRadius,
                  maxWidth: SIZES.form_button_maxWidth,
                  alignItems: SIZES.form_button_alignItems,
                  justifyContent: SIZES.form_button_justifyContent,
                  backgroundColor: COLORS.mobile_theme_back,
                }}
                onPress={() => {
                  selectDoc();
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
                    marginHorizontal: SIZES.form_button_text_marginHorizontal,
                  }}
                >
                  Select File
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {img_url !== "" && (
            <Image
              source={{ uri: img_url }}
              style={{
                height: 200,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.lightGray3,
                borderRadius: 10,
                width: SIZES.width - 50,
                // height: 300,
                marginLeft: 5,
              }}
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
    areaname: state.newproperty_reducer.areaname,
    token: state.authReducer.token,
    elebill: state.Ele_Bill_reducer.elebill,
    checked_ele_bill: state.Ele_Bill_reducer.checked_ele_bill,
    house_no: state.newproperty_reducer.house_no,
    Landmark: state.newproperty_reducer.Landmark,
    Location: state.Location_reducer.Location,
    looking_for: state.newproperty_reducer.looking_form,
    adhar_name: state.authReducer.adhar_name,
    gender: state.newproperty_reducer.gender,
    propertyName: state.newproperty_reducer.propertyName,
    adharcard: state.AdharCard_reducer.adharcard,
    checked_house_no: state.newproperty_reducer.checked_house_no,
    checked_Location: state.Newproperty_ext_reducer.checked_Location,
    checked_Landmark: state.newproperty_reducer.checked_Landmark,
    checked_Description_pg: state.newproperty_reducer.checked_Description_pg,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkedElebill: (value) => {
      dispatch(Ele_Bill_actions.checkedElebill(value));
    },
    updateElebill: (value) => {
      dispatch(Ele_Bill_actions.updateElebill(value));
    },
    setArea: (value) => {
      dispatch(newproperty_actions.setArea(value))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
