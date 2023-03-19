import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { setTradeModelVisibility } from "../store/tab/tabActions";
import { Home, Portfolio, Market, Profile } from "../screens";
import { COLORS, icons } from "../constants";
import { TabIcon } from "../components";
import { useSelector } from "react-redux";
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const Tabs = () => {
  let theme = "white";

  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 50,
          position: "absolute",
          bottom: 7,
          right: 7,
          left: 7,
          borderRadius: 13,
          paddingBottom: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} icon_name={"home"} subtitle="Home" />
            );
          },
        }}
      />
      <Tab.Screen
        name="NotificationsScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon_name={"notifications"}
                subtitle="Notifications"
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon_name={"person"}
                subtitle="Profile"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
