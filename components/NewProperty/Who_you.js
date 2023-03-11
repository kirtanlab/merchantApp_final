import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native';
// import {Button} from 'react-native-paper';
import {COLORS, FONTS, SIZES} from '../../constants';
import {connect, useSelector} from 'react-redux';
import * as newproperty_actions from '../../store/Newproperty/newproperty_action';
const Who_you = ({whoyou, setWhoyou}) => {
  let [Whoyou_copy, setWhoyou_copy] = useState(whoyou);
  let [Broker, setBroker] = useState(Whoyou_copy.Broker);
  let [owner, setOwner] = useState(Whoyou_copy.owner);
  let [landowner, setLandowner] = useState(Whoyou_copy.landowner);
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.custom1,
            fontWeight: 'bold',
          }}>
          Who are you?
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: 14, marginTop: 12}}>
        <View>
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
              backgroundColor: owner ? COLORS.mobile_theme_back : 'white',
            }}
            onPress={async () => {
              if (!owner) {
                setOwner(true);
                setLandowner(false);
                setBroker(false);
                Whoyou_copy.owner = true;
                Whoyou_copy.Broker = false;
                Whoyou_copy.landowner = false;
                setWhoyou_copy(Whoyou_copy);
                setWhoyou(Whoyou_copy);
              }
              console.log('Pressed0');
            }}>
            <Text
              style={{
                fontSize: SIZES.form_button_text_fontSize,
                fontWeight: SIZES.form_button_text_fontWeight,
                color: owner ? COLORS.font_color : COLORS.lightGray3,
              }}>
              Owner
            </Text>
          </TouchableOpacity>
        </View>
        <View>
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
              backgroundColor: landowner ? COLORS.mobile_theme_back : 'white',
            }}
            onPress={async () => {
              if (!landowner) {
                setLandowner(true);
                setOwner(false);
                setBroker(false);
                Whoyou_copy.owner = false;
                Whoyou_copy.Broker = false;
                Whoyou_copy.landowner = true;
                setWhoyou_copy(Whoyou_copy);
                setWhoyou(Whoyou_copy);
              }
              console.log('Pressed0');
            }}>
            <Text
              style={{
                fontSize: SIZES.form_button_text_fontSize,
                fontWeight: SIZES.form_button_text_fontWeight,
                color: landowner ? COLORS.font_color : COLORS.lightGray3,
              }}>
              landowner
            </Text>
          </TouchableOpacity>
        </View>
        <View>
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
              backgroundColor: Broker ? COLORS.mobile_theme_back : 'white',
            }}
            onPress={async () => {
              if (!Broker) {
                setBroker(true);
                setLandowner(false);
                setOwner(false);
                Whoyou_copy.owner = false;
                Whoyou_copy.Broker = true;
                Whoyou_copy.landowner = false;
                setWhoyou_copy(Whoyou_copy);
                setWhoyou(Whoyou_copy);
              }
              console.log('Pressed2');
            }}>
            <Text
              style={{
                fontSize: SIZES.form_button_text_fontSize,
                fontWeight: SIZES.form_button_text_fontWeight,
                color: Broker ? COLORS.font_color : COLORS.lightGray3,
              }}>
              Broker
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    test: state.newproperty_reducer.new_test,
    whoyou: state.newproperty_reducer.who,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setWhoyou: whoyou => {
      dispatch(newproperty_actions.setWhoyou(whoyou));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Who_you);
