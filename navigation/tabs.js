import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {setTradeModelVisibility} from '../store/tab/tabActions';
import {Home, Portfolio, Market, Profile} from '../screens';
import {COLORS, icons} from '../constants';
import {TabIcon} from '../components';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};
// {setTradeModelVisibility, isTradeModalVisible}
const Tabs = () => {
  // function tradeTabButtonOnClickHandler() {
  //   setTradeModelVisibility(!isTradeModalVisible);
  // }
  // const userData = useSelector(state => state.authReducer.userData);
  // let theme = userData.Appearance ? userData.Appearance : 'white';
  let theme = 'white';
  let home_icon;
  // function setValues(focused, Label) {
  //   if (focused && theme == 'White') {
  //     if (Label == 'Portfolio') {
  //       return icons.briefcase_Dark;
  //     }
  //   } else if (!focused && theme == 'White') {
  //     return icons.briefcase;
  //   } else if (focused && theme == 'Dark') {
  //     return icons.briefcase_Dark;
  //   } else {
  //     return icons.briefcase;
  //   }
  // }
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        style: {
          height: 70,
          backgroundColor: theme === 'Dark' ? COLORS.primary : COLORS.white,
          borderTopColor: 'gray',
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon focused={focused} icon_name={'home'} subtitle="Home" />
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
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                focused={focused}
                icon_name={'notifications'}
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
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                focused={focused}
                icon_name={'person'}
                subtitle="Profile"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

// export default Tabs;

// //export defualt Tabs;

// function mapStateToProps(state) {
//   return {
//     isTradeModalVisible: state.tabReducer.isTradeModalVisible,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     setTradeModelVisibility: isVisible => {
//       return dispatch(setTradeModelVisibility(isVisible));
//     },
//   };
// }
// connect(mapStateToProps, mapDispatchToProps)
export default Tabs;
