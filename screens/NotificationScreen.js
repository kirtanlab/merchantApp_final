import React, {useEffect} from 'react';
import {View, Text, ScrollView, FlatList, LogBox} from 'react-native';
import NotificationBox from '../components/NotificationScreen/NotificationBox';
import {COLORS, SIZES} from '../constants';
const dummy_data = [
  //username,userphoneno,useremail,roomtitle,createAt
  {
    name: 'kirtan',
    room_type: 'Delux Room',
    email: 'kirtanprajapati242gmail.com',
    phone_number: '7016700396',
    time: '2023-03-04T12:42:45.208+00:00',
  },
  {
    name: 'Het',
    room_type: 'Standard Room',
    email: 'hetpatel4902.com',
    phone_number: '9076200396',
    time: '2023-03-04T12:22:45.208+00:00',
  },
  {
    name: 'Pratham',
    room_type: 'Double bed Room',
    email: 'prathamshah019.com',
    phone_number: '9723100211',
    time: '2023-03-04T1:10:45.208+00:00',
  },
  {
    name: 'kandarp',
    room_type: 'Executive bed Room',
    email: 'kandarp24@gmail.com',
    phone_number: '9723128382',
    time: '2023-02-04T12:42:45.208+00:00',
  },
];
const NotificationScreen = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: 'white',

        paddingVertical: 17,
      }}>
      <View>
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            paddingHorizontal: 15,
            fontSize: SIZES.h1,
            fontWeight: 'bold',
            borderBottomColor: COLORS.lightGray4,
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}>
          Notifications
        </Text>
      </View>
      <View style={{paddingHorizontal: 7}}>
        <FlatList
          data={dummy_data}
          renderItem={({item}) => {
            return (
              <NotificationBox
                name={item.name}
                room_type={item.room_type}
                email={item.email}
                phone_number={item.phone_number}
                time={item.time}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};
export default NotificationScreen;
