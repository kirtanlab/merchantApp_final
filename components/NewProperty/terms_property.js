import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import InputField from '../../components/InputField';
import {COLORS, SIZES} from '../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {phone_checked} from '../../store/auth/authActions';
import {connect} from 'react-redux';
const terms_property = ({
  phone,
  focused_phone,
  checked_phone,
  adhar_name,
  focused_adhar_name,
  checked_adhar_name,
}) => {
  let [name, setName] = useState();
  let [err, setErr] = useState(true);
  //   let [phone, setPhone] = useState();
  console.log(focused_adhar_name);
  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        <View>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.custom1,
              fontWeight: 'bold',
            }}>
            Enter Your Name(As per AdharCard)
          </Text>
        </View>
        <View>
          {/* Adhar_Name */}
          <View style={{marginTop: 6}}>
            <View style={{width: SIZES.width * 0.8}}>
              <InputField
                label={'Full Name'}
                type={'Adhar_Name'}
                keyboardType={'default'}
                value={adhar_name}
                icon={
                  <Ionicons
                    name="person-outline"
                    size={30}
                    color={err ? COLORS.mobile_theme_back : 'red'}
                    style={{marginRight: 15, marginTop: 5, marginLeft: 5}}
                  />
                }
              />
            </View>
            {focused_adhar_name && !checked_adhar_name && (
              <View style={{marginTop: -30, left: 50, marginBottom: 20}}>
                <Text style={{color: COLORS.lightGray3}}>Fill this</Text>
              </View>
            )}
          </View>
        </View>
        {/* Mobile umber/
        <View style={{marginTop: 0}}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.custom1,
              fontWeight: 'bold',
            }}>
            Phone Number
          </Text>
        </View> */}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

function mapStateToProps(state) {
  return {
    phone: state.authReducer.phone,
    focused_phone: state.authReducer.focused_phone,
    checked_phone: state.authReducer.checked_phone,
    checked_adhar_name: state.authReducer.checked_adhar_name,
    focused_adhar_name: state.authReducer.focused_adhar_name,
    adhar_name: state.authReducer.adhar_name,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(terms_property);
