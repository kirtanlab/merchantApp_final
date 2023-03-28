import React, { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";
import icons from "../../constants/icons";
import ShowNumberDialog from "../ShowNumberDialog";
import axios from "axios";
import { REACT_APP_OWNER_API } from "@env";
import { connect } from "react-redux";
import * as Newrooms_actions from "../../store/NewRooms/Newrooms_actions";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, Dialog, Portal, Provider } from "react-native-paper";

const Rooms_Listing = ({
  image_source,
  room_id,
  price,
  type,
  room_name,
  onPress,
  token,
  updatetotalAval,
  total_avl,
  onDelete,
}) => {
  // console.log("type", room_name, image_source);
  const [visible, setVisible] = React.useState(false);
  const [digit, setDigit] = React.useState();
  const [totalavl, setTotalavl] = React.useState(total_avl);
  const [visible_confirm, setVisible_confirm] = React.useState(false);
  const [agreed, setAgreed] = React.useState(false);
  const ConfirmBox = () => {
    const hideDialog = () => setVisible_confirm(false);
    // console.log("called", visible_confirm);
    return (
      <Portal style={{ backgroundColor: COLORS.white }}>
        <Dialog
          style={{ backgroundColor: COLORS.white }}
          visible={visible_confirm}
          onDismiss={hideDialog}
        >
          <Dialog.Title
            style={{ fontSize: SIZES.form_section_title_fontsize + 5 }}
          >
            Confirm
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ fontSize: SIZES.form_section_title_fontsize }}>
              Are you sure you want to delete {room_name}?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setAgreed(false);
                hideDialog();
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                setAgreed(true);
                hideDialog();
                onDelete(room_id);
              }}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };
  const updateCount = async () => {
    try {
      const obj = {
        availablerooms: digit,
      };
      console.log("valid", room_id);
      const data = await axios.post(
        `${REACT_APP_OWNER_API}/api/v1/owner/updateroom/${room_id}`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("createRoom", data.data.data._id);
      updatetotalAval(digit);
      setTotalavl(data.data.data.availablerooms);
    } catch (err) {
      console.log("lol", err);
    }
  };
  return (
    <View
      style={{
        borderWidth: 0.5,
        marginTop: 15,

        // borderRadius: 15,
        // padding: 10,
        // paddingLeft: 0,

        // // paddingHorizontal: 10,
        borderColor: COLORS.lightGray7,
        borderRadius: 10,
        marginRight: 10,
        // height: 600,
        // paddingHorizontal: 18,
      }}
    >
      <View style={{}}>
        {image_source ? (
          <Image
            source={{ uri: image_source }}
            style={{
              height: 170,
              width: SIZES.width * 0.8,
              borderRadius: 10,

              // alignSelf: 'center',
            }}
          />
        ) : (
          <Image
            source={icons.no_image}
            style={{
              height: 170,
              width: SIZES.width * 0.8,
              borderRadius: 10,
              // right: 10,
              // alignSelf: 'center',
            }}
          />
        )}
        {/* <TouchableOpacity
          style={{
            position: "absolute",
            left: "85%",
            // borderRadius: 10,
            top: 15,
            fontSize: SIZES.h2,
            // backgroundColor: COLORS.mobile_theme_back,
          }}
          onPress={() => {
            console.log("room_id", room_id);
            setVisible_confirm(true);
          }}
        >
          <Ionicons
            name="trash-bin-outline"
            size={35}
            color={COLORS.mobile_theme_back}
            style={{}}
          />
        </TouchableOpacity> */}
      </View>
      {/* <Modal> */}
      <ShowNumberDialog
        visible={visible}
        _hideDialog={async () => {
          if (digit) {
            await updateCount();
          }
          setVisible(false);
        }}
        digit={digit}
        onChange={async (e) => {
          setDigit(e);
          console.log(e);
        }}

        // setonfocused={() => setVisible(true)}
      />
      {/* </Modal> */}
      <ConfirmBox />
      <View style={{ paddingHorizontal: 10 }}>
        {/* property id */}
        {/* <View style={{marginTop: 5}}>
          <Text
            style={{
              color: COLORS.lightGray3,
              // fontWeight: 'bold',
              fontSize: 16,
            }}>
            Room ID: {room_id}
          </Text>
        </View> */}
        {/* Name and price */}
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <View>
            <Text
              style={{
                color: COLORS.lightGray3,

                // fontFamily: FONTS.fontFamily_black,
                // fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              ₹ {price}
            </Text>
          </View>
          <View style={{ left: 20 }}>
            <Text
              style={{
                color: COLORS.lightGray3,

                // fontFamily: FONTS.fontFamily_black,
                // fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              Type : {type.AC ? "AC" : "Non AC"}
              {" ,  "}
              {type.ATTACHED ? "Attached" : "Non Attached"}
            </Text>
          </View>
        </View>
        {/* Property Name */}
        <View style={{}}>
          <Text
            style={{
              color: COLORS.lightGray2,
              // fontFamily: FONTS.fontFamily_black,
              fontSize: 14,
            }}
          >
            {room_name}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray2,
              // fontFamily: FONTS.fontFamily_black,
              fontSize: 14,
            }}
          >
            Total Available Rooms: {totalavl}
          </Text>
        </View>
        {/* Property Location */}
        {/* <View style={{marginTop: 5, flexDirection: 'row'}}>
          <Text
            style={{
              color: COLORS.lightGray3,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Karamsad,Anand
          </Text>
        </View> */}
        {/* Edit Buttons */}
        <View style={{ marginTop: 10, marginBottom: 5, flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              // minHeight: 10,
              // maxHeight: 38,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: true ? COLORS.mobile_theme_back : "white",
            }}
            onPress={onPress}
          >
            <Text
              style={{
                lineHeight: 22,
                // fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                // fontWeight: SIZES.form_button_text_fontWeight,
                color: true ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Edit Room
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // flex: 9,

              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,

              alignItems: SIZES.form_button_alignItems,
              marginLeft: 10,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: true ? COLORS.mobile_theme_back : "white",
            }}
            onPress={() => setVisible(true)}
          >
            <Text
              style={{
                lineHeight: 22,
                // fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                // fontWeight: SIZES.form_button_text_fontWeight,
                color: true ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Avaibility of Rooms
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // flex: 9,

              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,

              alignItems: SIZES.form_button_alignItems,
              marginLeft: 10,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: true ? COLORS.mobile_theme_back : "white",
            }}
            onPress={() => setVisible_confirm(true)}
          >
            <Text
              style={{
                lineHeight: 22,
                // fontFamily: FONTS.fontFamily_black,
                fontSize: SIZES.form_button_text_fontSize,
                marginVertical: SIZES.form_button_text_marginVertical,
                marginHorizontal: SIZES.form_button_text_marginHorizontal,
                // fontWeight: SIZES.form_button_text_fontWeight,
                color: true ? COLORS.font_color : COLORS.lightGray3,
              }}
            >
              Delete
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updatetotalAval: (value) => {
      dispatch(Newrooms_actions.updatetotalAval(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms_Listing);
