import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { connect } from "react-redux";
import { REACT_APP_OWNER_API } from "@env";
import * as AuthActions from "../../store/auth/authActions";
const ReviewBox = ({Deletereview,token, name, room_type,id, email, phone_number, time, review }) => {
  let [comment, setComment] = React.useState(false);
  let relative_time = "";
  let time_obj = new Date(time);
  let year = time_obj.getFullYear();
  let month = time_obj.getMonth() + 1;
  let date = time_obj.getUTCDate();
  let Hours = time_obj.getHours();
  let Minutes = time_obj.getMinutes();
  let Seconds = time_obj.getSeconds();
  let ms = time_obj.getMilliseconds();

  var current_obj = new Date();
  let cur_year = current_obj.getFullYear();
  let cur_month = current_obj.getMonth() + 1;
  let cur_date = current_obj.getUTCDate();
  let cur_Hours = current_obj.getHours();
  let cur_Minutes = current_obj.getMinutes();
  let cur_Seconds = current_obj.getSeconds();
  let cur_ms = current_obj.getMilliseconds();

  var test_curr = new Date(
    cur_year,
    cur_month,
    cur_date,
    cur_Hours,
    cur_Minutes,
    cur_Seconds,
    cur_ms
  );
  var test_time_obj = new Date(year, month, date, Hours, Minutes, Seconds, ms);

  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;
    console.log("timeDifference", elapsed);
    if (!elapsed || elapsed < 0) {
      return "while ago";
    } else if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  }

  relative_time = timeDifference(test_curr, test_time_obj);

  return (
    <View
      style={{
        flexDirection: "column",
        borderColor: COLORS.lightGray6,
        borderTopWidth: 1,
        paddingHorizontal: 17,
        paddingVertical: 2,
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.form_section_input_fontsize - 2,
          }}
        >
          <Text
            style={{
              color: COLORS.mobile_theme_back,
            }}
          >
            {name}
          </Text>{" "}
          commented on your property
        </Text>
        <TouchableOpacity
          onPress={async () => {
            console.log("Pressed");
            try{
              
              Deletereview(id)
            }catch(err){
              console.error('Err',err)
            }
          }}
          style={{
            borderColor: COLORS.mobile_theme_back,
            borderWidth: SIZES.form_button_borderWidth,
            borderRadius: SIZES.form_button_borderRadius,
            alignItems: SIZES.form_button_alignItems,
            top: 5,
            justifyContent: SIZES.form_button_justifyContent,
            backgroundColor: true ? COLORS.mobile_theme_back : "white",
          }}
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color={true ? "white" : "red"}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.form_section_input_fontsize - 2,
            }}
          >
            Email:{" "}
            <Text
              style={{
                color: COLORS.mobile_theme_back,
                // fontFamily: FONTS.fontFamily_regular,
              }}
            >
              {email}
            </Text>
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            {/* <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.form_section_input_fontsize - 2,
              }}
            >
              Number:{" "}
              <Text
                style={{
                  color: COLORS.mobile_theme_back,
                }}
              >
                {phone_number}
              </Text>
            </Text> */}
          </View>
        </View>
        {comment ? (
          <View style={{ flexDirection: "column" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (comment) {
                    setComment(false);
                  } else {
                    setComment(true);
                  }
                }}
              >
                <Text style={{ color: COLORS.lightGray3,fontSize: SIZES.form_section_input_fontsize - 2}}>Hide comment</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: SIZES.form_section_input_fontsize - 4,
                  color: COLORS.lightGray3,
                }}
              >
                {relative_time !== NaN ? relative_time : "while ago"}
              </Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                marginTop: 5,

                borderBottomWidth: 1,
                fontSize: FONTS.form_section_input_fontsize,
                textAlignVertical: "top",
                height: 100,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.lightGray7,
                paddingBottom: 10,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.form_section_input_fontsize - 2,
                  color: COLORS.black,
                  padding: 5,
                }}
              >
                {review}
              </Text>
            </ScrollView>
          </View>
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => {
                if (comment) {
                  setComment(false);
                } else {
                  setComment(true);
                }
              }}
            >
              <Text style={{  color: COLORS.lightGray3,fontSize: SIZES.form_section_input_fontsize - 2 }}>
                Show comment
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                // flex: 1,
                fontSize: SIZES.form_section_input_fontsize - 4,
                color: COLORS.lightGray3,
                top: 2,
                // fontFamily: FONTS.fontFamily_regular,
              }}
            >
              {relative_time !== NaN ? relative_time : "while ago"}
            </Text>
          </View>
        )}
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
    Deletereview: (value) => {
      return dispatch(AuthActions.Deletereview(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewBox);
