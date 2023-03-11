import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import * as Newproperty_ext_actions from '../../store/Newproperty_ext/Newproperty_ext_actions';
import * as newproperty_actions from '../../store/Newproperty/newproperty_action';
import {REACT_APP_MAPS_API_KEY} from '@env';
import InputField from '../../components/InputField';
import {COLORS, SIZES} from '../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {phone_checked} from '../../store/auth/authActions';
import {connect} from 'react-redux';
const NumericInput = ({
  Landmark,
  focused_Landmark,
  focused_Description_pg,
  focused_Location,
  focused_house_no,
  checked_house_no,
  checked_Location,
  checked_Landmark,
  updateLocationAddress,
  Location_address,
  checked_location,

  // checked_Description_pg,
  // Description_pg,
  house_no,
  Location,
  navigation,
}) => {
  let [name, setName] = useState();
  let [err, setErr] = useState(true);
  let [_location, setLocation] = useState(
    Location ? Location : {latitude: '', longitude: ''},
  );
  useEffect(() => {
    console.log('screen location', Location, Location_address);
  }, [Location, Location_address]);
  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        {/* House_No */}
        <View>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.h2,
              // fontWeight: 'bold',
            }}>
            Enter House Number or Flat Number
          </Text>
        </View>
        <View>
          <View style={{marginTop: 6}}>
            <View style={{width: SIZES.width * 0.8}}>
              <InputField
                label={'House No/Flat No'}
                type={'House_No'}
                keyboardType={'default'}
                // value={house_no}
                // icon={
                //   <Ionicons
                //     name="person-outline"
                //     size={30}
                //     color={err ? COLORS.mobile_theme : 'red'}
                //     style={{marginRight: 15, marginTop: 5, marginLeft: 5}}
                //   />
                // }
              />
            </View>
            {focused_house_no && !checked_house_no && (
              <View style={{marginTop: -30, left: 3, marginBottom: 20}}>
                <Text style={{color: COLORS.lightGray3}}>Fill this</Text>
              </View>
            )}
          </View>
        </View>
        {/* Google Map */}
        <View>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.h2,
              // fontWeight: 'bold',
            }}>
            Selet Location
          </Text>
          {!Location_address && (
            <TouchableOpacity
              style={{
                marginTop: 15,
                borderColor: COLORS.mobile_theme,
                borderWidth: SIZES.form_button_borderWidth,
                borderRadius: SIZES.form_button_borderRadius,
                minWidth: SIZES.form_button_minWidth,
                maxWidth: SIZES.form_button_maxWidth,
                maxHeight: SIZES.form_button_maxHeight,
                padding: SIZES.form_button_padding,
                // paddingLeft: 7,
                alignItems: SIZES.form_button_alignItems,
                justifyContent: SIZES.form_button_justifyContent,
                backgroundColor: COLORS.mobile_theme_back,
              }}
              onPress={() => {
                navigation.navigate('MapsTest');
              }}>
              <Text
                style={{
                  fontSize: SIZES.form_button_text_fontSize,
                  // fontWeight: SIZES.form_button_text_fontWeight,
                  color: COLORS.font_color,
                }}>
                Select Location
              </Text>
            </TouchableOpacity>
          )}
          {Location_address && (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: COLORS.white,
                // minWidth: 100,
                // width: '100%',
                minHeight: 40,
                borderRadius: 10,
                marginTop: 5,
                maxHeight: 200,
                // alignItems: 'center',
                // padding: 5,
              }}>
              <Text
                style={{
                  flex: 5,
                  color: COLORS.mobile_theme_back,
                  fontSize: SIZES.h2,
                }}>
                {Location_address}
              </Text>
              <TouchableOpacity
                style={{
                  // marginTop: 18,
                  flex: 1,
                  left: 20,
                  color: COLORS.white,
                  fontSize: SIZES.h2,
                }}
                onPress={() => {
                  checked_location(false);
                  updateLocationAddress('');
                  setLocation({latitude: '', longitude: ''});
                }}>
                <Ionicons
                  name="close-circle-outline"
                  size={35}
                  color={true ? COLORS.mobile_theme_back : 'lightgray'}
                  style={{}}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Landmark */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.h2,
              // fontWeight: 'bold',
            }}>
            Enter Landmark / Address
          </Text>
        </View>
        <View>
          <View style={{marginTop: 6}}>
            <View style={{width: SIZES.width * 0.8}}>
              <InputField
                label={'Landmark'}
                type={'Landmark'}
                keyboardType={'default'}
                // value={Landmark}
                // icon={
                //   <Ionicons
                //     name="person-outline"
                //     size={30}
                //     color={err ? COLORS.mobile_theme : 'red'}
                //     style={{marginRight: 15, marginTop: 5, marginLeft: 5}}
                //   />
                // }
              />
            </View>

            {focused_Landmark && !checked_Landmark && (
              <View style={{marginTop: -30, left: 3, marginBottom: 20}}>
                <Text style={{color: COLORS.lightGray3}}>Fill it</Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

function mapStateToProps(state) {
  return {
    Location_address: state.Newproperty_ext_reducer.Location_address,
    Landmark: state.newproperty_reducer.Landmark,
    focused_Landmark: state.newproperty_reducer.focused_Landmark,
    focused_Description_pg: state.newproperty_reducer.focused_Description_pg,
    focused_Location: state.Newproperty_ext_reducer.focused_Location,
    focused_house_no: state.newproperty_reducer.focused_house_no,
    checked_house_no: state.newproperty_reducer.checked_house_no,
    checked_Location: state.Newproperty_ext_reducer.checked_Location,
    checked_Landmark: state.newproperty_reducer.checked_Landmark,
    checked_Description_pg: state.newproperty_reducer.checked_Description_pg,
    Description_pg: state.newproperty_reducer.Description_pg,
    house_no: state.newproperty_reducer.house_no,

    Location: state.Newproperty_ext_reducer.Location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLocationAddress: value => {
      dispatch(Newproperty_ext_actions.updateLocationAddress(value));
    },
    checked_location: value => {
      dispatch(Newproperty_ext_actions.checked_location(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NumericInput);
