import React from 'react';
import {FlatList, View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import icons from '../../constants/icons';

const Property_Listing = ({navigation}) => {
  return (
    <View>
      <View style={{paddingHorizontal: 14}}>
        <Image
          source={icons.hotel_png}
          style={{
            height: 100,
            width: SIZES.width * 0.9,
            borderRadius: 10,
            marginTop: 17,
            // alignSelf: 'center',
          }}
        />
      </View>

      <View style={{paddingHorizontal: 14}}>
        {/* property id */}
        {/* <View style={{marginTop: 5}}>
          <Text
            style={{
              color: COLORS.lightGray3,
              // fontWeight: 'bold',
              fontSize: 16,
            }}>
            Property ID: 1231131
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
              {/* ₹ 1.3 Lac */}
              Paying Guest(PG)
            </Text>
          </View>
          <View style={{left: 20}}>
            <Text
              style={{
                color: COLORS.lightGray3,
                // fontWeight: 'bold',
                fontSize: 16,
              }}>
              Owner : Kirtan Prajapati
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
            Radhe Residency
          </Text>
        </View>
        {/* Property Location */}
        <View style={{marginTop: 5, flexDirection: 'row'}}>
          <Text
            style={{
              color: COLORS.lightGray3,
              // fontWeight: 'bold',
              fontSize: 16,
            }}>
            Karamsad,Anand
          </Text>
        </View>
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
            onPress={async () => {
              console.log('Pressed0');
              navigation.navigate('Newproperty');
            }}>
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
export default Property_Listing;
