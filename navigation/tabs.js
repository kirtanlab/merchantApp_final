import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabIcon } from "../components";
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 40,
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
