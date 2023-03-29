import React, { useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  LogBox,
  RefreshControl,
} from "react-native";
import NotificationBox from "../components/NotificationScreen/NotificationBox";
import No_notification from "../components/No_notification";
import { connect } from "react-redux";
import { COLORS, FONTS, SIZES } from "../constants";
import axios from "axios";
import { REACT_APP_OWNER_API } from "@env";
import { List } from "react-native-paper";
import ReviewBox from "../components/NotificationScreen/ReviewBox";

const NotificationScreen = ({ token }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);
  const handlePress1 = () => setExpanded1(!expanded1);
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
  }, []);
  const room_fetch_details = async () => {
    try {
      const data = await axios.get(
        `${REACT_APP_OWNER_API}/api/v1/owner/showinterests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("notification", data.data.data);
      setNotifications(data.data.data);
    } catch (e) {
      console.log("error", e.response.data);
    }
  };
  const review_details = async () => {
    try {
      const data = await axios.get(
        `${REACT_APP_OWNER_API}/api/v1/owner/showreview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("reviews", data.data.data);
      setReviews(data.data.data);
    } catch (e) {
      console.log("error", e.response.data);
    }
  };
  useLayoutEffect(() => {
    room_fetch_details();
    review_details();
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
          Notification
        </Text>
      </View>
      <View style={{ paddingHorizontal: 7 }}>
        <List.Section>
          <List.Accordion
            title="All Interests"
            titleStyle={{ color: COLORS.mobile_theme_back }}
            style={{ backgroundColor: "white" }}
            // left={(props) => <List.Icon {...props} icon="heart" />}
            expanded={expanded}
            onPress={handlePress}
          >
            {notifications.length > 0 ? (
              <FlatList
                data={notifications}
                inverted
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
          </List.Accordion>
        </List.Section>
        <List.Section>
          <List.Accordion
            title="All Reviews"
            titleStyle={{ color: COLORS.mobile_theme_back }}
            style={{ backgroundColor: "white", paddingTop: -20 }}
            // left={(props) => <List.Icon {...props} icon="heart" />}
            expanded={expanded1}
            onPress={handlePress1}
          >
            {reviews.length > 0 ? (
              <FlatList
                data={reviews}
                inverted
                renderItem={({ item }) => {
                  return (
                    <ReviewBox
                      name={item.username}
                      room_type={item.roomtitle}
                      email={item.useremail}
                      phone_number={item.phoneno}
                      time={item.createdAt}
                      review={item.review}
                    />
                  );
                }}
              />
            ) : (
              <No_notification />
            )}
          </List.Accordion>
        </List.Section>
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
