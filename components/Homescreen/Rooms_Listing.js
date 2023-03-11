import React from 'react';
import {FlatList, View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import icons from '../../constants/icons';

const Rooms_Listing = ({
  image_source,
  room_id,
  price,
  type,
  room_name,
  onPress,
}) => {
  return (
    <View
      style={{
        borderWidth: 2,
        borderRadius: 15,
        // minWidth: 300,
        width: 296,
        borderColor: COLORS.lightGray6,
        minHeight: 200,
        maxHeight: 250,
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 10,
        // justifyContent: 'center',
        // alignContent: 'center',
      }}>
      <View style={{paddingHorizontal: 10}}>
        <Image
          source={{uri: image_source}}
          style={{
            height: 100,
            width: 270,
            borderRadius: 10,
            marginTop: 7,
            // alignSelf: 'center',
          }}
        />
      </View>

      <View style={{paddingHorizontal: 15}}>
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
        <View style={{marginTop: 5, flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                color: COLORS.lightGray2,
                // fontWeight: 'bold',
                fontSize: 16,
              }}>
              ₹ {price}
            </Text>
          </View>
          <View style={{left: 20}}>
            <Text
              style={{
                color: COLORS.lightGray3,
                // fontWeight: 'bold',
                fontSize: 16,
              }}>
              Type : {type.AC ? 'AC' : 'Non AC'}
              {' , '}
              {type.ATTACHED ? 'Attached' : 'Non Attached'}
            </Text>
          </View>
        </View>
        {/* Property Name */}
        <View style={{marginTop: 5, flexDirection: 'row'}}>
          <Text
            style={{
              color: COLORS.lightGray2,
              // fontWeight: 'bold',
              fontSize: 16,
            }}>
            2 BHK Delux Room
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
        <View style={{marginTop: 10}}>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: SIZES.form_button_minWidth,
              maxWidth: SIZES.form_button_maxWidth,
              maxHeight: SIZES.form_button_maxHeight,
              padding: SIZES.form_button_padding,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: true ? COLORS.mobile_theme_back : 'white',
            }}
            onPress={onPress}>
            <Text
              style={{
                fontSize: SIZES.form_button_text_fontSize,
                // fontWeight: SIZES.form_button_text_fontWeight,
                color: true ? COLORS.font_color : COLORS.lightGray3,
              }}>
              Edit Property
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Rooms_Listing;
