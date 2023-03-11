import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

// import {auth} from '../../firebase';
// import {signInWithEmailAndPassword} from 'firebase/auth';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {updateUser} from '../../store/auth/authActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import icons from '../../constants/icons';
import LoginSVG from '../../assets/icons/login.svg';
import GoogleSVG from '../../assets/icons/google.svg';
import * as AuthActions from '../../store/auth/authActions';
import CustomButton from '../../components/CustomeButton';
import InputField from '../../components/InputField';
import {COLORS, SIZES} from '../../constants';
import {StatusBar} from 'react-native';
import AppLoader from '../../components/AppLoader';
import {REACT_APP_OWNER_API} from '@env';
const mobile_input = ({
  token,
  navigation,
  phone,
  focused_phone,
  checked_phone,
}) => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(false);
  const handleLogin = async () => {
    if (phone) {
      try {
        setLoading(true);

        const obj = {
          phoneno: phone,
        };
        const data = await axios.post(
          `${REACT_APP_OWNER_API}/api/v1/owner/mobileOTPSend`,
          obj,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        console.log('data', data);
        setLoading(false);
        navigation.navigate('MobileOTP', {
          phone_number: phone,
        });
      } catch (err) {
        setLoading(false);
        console.log('lol', err);
        // gen_login_err_method(true);
        // setError(err.response.data.msg);
      }

      // // .finally(() => setLoading(false));
    } else {
      alert('Email or Password is empty.');
    }
  };

  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <KeyboardAvoidingView
          behavior="position"
          style={{backgroundColor: 'white'}}>
          <StatusBar
            animated={true}
            backgroundColor={COLORS.mobile_theme_back}
            barStyle={'light-content'}
          />

          <SafeAreaView
            style={{
              height: SIZES.height * 0.03,
              backgroundColor: COLORS.mobile_theme_back,
              elevation: 1,
            }}
          />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center',
              paddingTop: '20%',
              //   paddingHorizontal: 2
            }}>
            <View style={{paddingHorizontal: 25}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={icons.logo_rent}
                  style={{
                    height: 232,
                    width: 232,
                    borderRadius: 20,
                    marginTop: '1%',
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: COLORS.mobile_theme_back,
                    marginTop: '20%',
                    marginBottom: 7,
                  }}>
                  Enter Mobile Number to Continue
                </Text>
                {/* Mobile_no */}
                <View
                  style={{
                    flexDirection: 'row',
                    width: SIZES.width,
                    marginTop: 10,
                    marginLeft: 7,
                  }}>
                  <View style={{marginTop: 8, flexDirection: 'row'}}>
                    <View
                      style={{
                        borderColor: COLORS.mobile_theme_back,
                        borderWidth: 1,
                        borderTopEndRadius: 5,
                        borderTopStartRadius: 5,
                        borderBottomStartRadius: 5,
                        borderBottomEndRadius: 5,
                        backgroundColor: COLORS.white,
                        height: 30,
                        width: 40,
                        marginTop: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: -6,
                      }}>
                      <Text
                        style={{
                          color: COLORS.mobile_theme_back,
                          fontSize: 17,
                          fontWeight: 'bold',
                        }}>
                        +91
                      </Text>
                    </View>
                  </View>
                  <View style={{width: SIZES.width * 0.75, left: 2}}>
                    <InputField
                      label={'Enter Phone Number'}
                      type={'phone'}
                      keyboardType={'phone-pad'}
                      value={phone.toString()}
                      //   icon={
                      //     <Ionicons
                      //       name="call-outline"
                      //       size={20}
                      //       color={err ? '#666' : 'red'}
                      //       style={{marginRight: 5, marginTop: 5}}
                      //     />
                      //   }
                    />
                  </View>
                  <TouchableOpacity>
                    <Ionicons
                      name="checkmark-done-outline"
                      size={20}
                      color={
                        checked_phone ? COLORS.mobile_theme_back : 'lightgray'
                      }
                      style={{marginTop: 18, right: 9}}
                    />
                  </TouchableOpacity>
                </View>

                {focused_phone && !checked_phone && (
                  <View style={{marginTop: -30, left: 55, marginBottom: 20}}>
                    <Text style={{color: COLORS.lightGray3}}>
                      Enter 10 Digit Phone Number
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {/* RegisterButton */}
            <View style={{marginTop: '10%', width: '85%', marginLeft: '6%'}}>
              <CustomButton
                label={'Send OTP'}
                color={checked_phone ? COLORS.mobile_theme_back : 'gray'}
                onPress={() => {
                  if (checked_phone) {
                    console.log('Done');
                    handleLogin();
                  } else {
                    // gen_sign_err_method(true);
                  }
                }}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
      {loading && <AppLoader />}
    </>
  );
};

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,

    phone: state.authReducer.phone,
    focused_phone: state.authReducer.focused_phone,
    checked_phone: state.authReducer.checked_phone,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(mobile_input);
