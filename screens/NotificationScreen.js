import React, { useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  LogBox,
  RefreshControl,
} from "react-native";
import EmptyScreen from "../components/EmptyScreen";
import NotificationBox from "../components/NotificationScreen/NotificationBox";
import No_notification from "../components/No_notification";
import { connect } from "react-redux";
import { COLORS, FONTS, SIZES } from "../constants";
import axios from "axios";
import { REACT_APP_OWNER_API } from "@env";

const NotificationScreen = ({ token }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const [notifications, setNotifications] = React.useState([]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      async function call_all() {
        await room_fetch_details();
      }
      call_all();
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []); ///api/v1/showinterests
  const room_fetch_details = async () => {
    // console.log("token", REACT_APP_OWNER_API);
    try {
      const data = await axios.get(
        `${REACT_APP_OWNER_API}/api/v1/owner/showinterests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("result room", data.data.data);
      console.log("notification", data.data.data);
      setNotifications(data.data.data);
    } catch (e) {
      console.log("error", e.response.data);
    }
  };
  useLayoutEffect(() => {
    room_fetch_details();
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: "white",
        // paddingBottom: 100,
        paddingVertical: 17,
        paddingBottom: 1000,
      }}
    >
      <View>
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            paddingHorizontal: 15,
            fontSize: SIZES.form_section_title_fontsize + 10,
            // fontWeight: "bold",
            borderBottomColor: COLORS.lightGray4,
            // borderBottomWidth: 1,
            paddingBottom: 10,
            paddingLeft: 27,
            fontFamily: FONTS.fontFamily_regular,
          }}
        >
          Notifications
        </Text>
      </View>
      <View style={{ paddingHorizontal: 7 }}>
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            renderItem={({ item }) => {
              return (
                <NotificationBox
                  name={item.username}
                  room_type={item.roomtitle}
                  email={item.useremail}
                  phone_number={item.userphoneno}
                  time={item.createdAt}
                />
              );
            }}
          />
        ) : (
          <No_notification />
        )}
      </View>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
