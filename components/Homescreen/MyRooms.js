import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {COLORS, icons, SIZES} from '../../constants';
import Rooms_Listing from './Rooms_Listing';
const hotel_png = require('../../assets/icons/hotel.png');
const dummy_data = [
  {
    room_id: '123123',
    price: '20,000',
    type: {AC: true, ATTACHED: false},
    room_name: '2 BHK Delux Room',
    image_source:
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
  },
  {
    room_id: '123243',
    price: '30,000',
    type: {AC: false, ATTACHED: false},
    room_name: '3 BHK Delux Room',
    image_source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
  },
];

const MyRooms = ({navigation}) => {
  return (
    <View style={{marginTop: 4}}>
      <View style={{paddingHorizontal: 15}}>
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            fontWeight: 'bold',
            fontSize: 21.5,
          }}>
          My Rooms
        </Text>
      </View>
      <View
        style={{
          margin: 0,
          borderBottomColor: COLORS.lightGray7,
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <FlatList
          keyExtractor={item => item.room_id}
          renderItem={({item}) => (
            <Rooms_Listing
              onPress={() => {
                console.log(item.image_source), navigation.navigate('NewRooms');
              }}
              room_name={item.room_name}
              type={item.type}
              price={item.price}
              room_id={item.room_id}
              image_source={item.image_source}
            />
          )}
          data={dummy_data}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          borderBottomColor: COLORS.lightGray6,
          borderBottomWidth: 15,
        }}
      />
      <View
        style={{
          top: -10,
          borderBottomColor: COLORS.lightGray7,
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      />
    </View>
  );
};

export default MyRooms;
