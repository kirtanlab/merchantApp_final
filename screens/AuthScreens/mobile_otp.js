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
import axios from 'axios';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const mobile_otp = ({route, phone, token, navigation}) => {
  const {phone_number} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  //   const [err, setError] = useState(false);
  const [otp, setotp] = useState('');
  const [done, setDone] = useState(false);
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [err_num, setError_num] = useState(false);
  const [err, setErr] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const handlereset = async () => {
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
        console.log('data', data.config.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        console.log('lol', err.response.data);
        // gen_login_err_method(true);
        // setError(err.response.data.msg);
      }

      // // .finally(() => setLoading(false));
    } else {
      alert('Email or Password is empty.');
    }
  };
  const handleLogin = async () => {
    console.log('final', value);
    if (value.length == '4') {
      try {
        setLoading(true);
        const obj = {
          otp: Number(value),
        };
        const data = await axios.post(
          `${REACT_APP_OWNER_API}/api/v1/owner/mobileOTPVerify`,
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
        navigation.replace('Newproperty');
      } catch (err) {
        setLoading(false);
        setErr(true);
        console.log('lol', err.response.data);
        // gen_login_err_method(true);
        // setError(err.response.data.msg);
      }
    } else {
      setError_num(true);
      //   setErr(true)
    }
  };
  useEffect(() => {
    // reset_checked();
  }, []);
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
                {/* <SvgUri
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
            source={icons.logo_rent}
          /> */}
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
                    fontSize: 35,
                    fontWeight: 'bold',
                    color: COLORS.mobile_theme_back,
                    marginTop: '20%',
                    marginBottom: 5,
                  }}>
                  Enter OTP
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.mobile_theme_back,
                    // marginTop: '',
                    marginBottom: 30,
                  }}>
                  OTP sent to {phone_number}
                </Text>
              </View>
              <View style={{}}>
                {
                  <SafeAreaView style={styles.root}>
                    {/* <Text style={styles.title}>Verification</Text> */}
                    <CodeField
                      ref={ref}
                      {...props}
                      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                      value={value}
                      onChangeText={e => {
                        setValue(e);
                        // setotp(e);
                        console.log(e.length);
                        if (e.length >= 4) {
                          console.log('Done');
                          setDone(true);
                        } else {
                          setDone(false);
                        }
                      }}
                      cellCount={CELL_COUNT}
                      rootStyle={styles.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({index, symbol, isFocused}) => (
                        <Text
                          key={index}
                          style={[styles.cell, isFocused && styles.focusCell]}
                          onLayout={getCellOnLayoutHandler(index)}>
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                      )}
                    />
                  </SafeAreaView>
                }
                <TouchableOpacity
                  onPress={() => handlereset()}
                  style={{marginLeft: '75%', marginTop: 20}}>
                  <Text
                    style={{
                      color: COLORS.mobile_theme_back,
                      fontSize: SIZES.h3 + 3,
                      fontWeight: 'bold',
                    }}>
                    Resend otp
                  </Text>
                </TouchableOpacity>
                {err_num && (
                  <View style={{marginTop: 0, left: 23, marginBottom: 0}}>
                    <Text
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: SIZES.h3,
                      }}>
                      Enter Four Digit OTP
                    </Text>
                  </View>
                )}
                {err && (
                  <View style={{marginTop: 0, left: 23, marginBottom: 0}}>
                    <Text
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: SIZES.h3,
                      }}>
                      Enter Correct OTP
                    </Text>
                  </View>
                )}
              </View>

              {/* <InputField
            label={'Email ID'}
            type={'forget_email'}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color={COLORS.mobile_theme_back}
                style={{marginTop: 18}}
              />
            }
            onChange={value => handle_email(value.nativeEvent.text)}
            keyboardType="email-address"
          />
        */}

              <View style={{marginTop: '10%'}}>
                <CustomButton
                  label={'submit'}
                  color={done ? COLORS.mobile_theme_back : 'gray'}
                  onPress={() => {
                    if (done) {
                      console.log('Done');
                      handleLogin();
                    } else {
                      setErr(true);
                    }
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 30,
                }}>
                <Text>New to the app?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('LoginScreen')}>
                  <Text
                    style={{
                      color: COLORS.mobile_theme_back,
                      fontWeight: '700',
                    }}>
                    {' '}
                    Back to Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
      {loading && <AppLoader />}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: 15,
    // marginTop: 20,
  },
  title: {textAlign: 'center', fontSize: 30},
  //   codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    // lineHeight: 45,
    fontSize: 30,
    borderWidth: 2,
    color: COLORS.black,
    borderColor: COLORS.mobile_theme_back,
    textAlign: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    phone: state.authReducer.phone,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(mobile_otp);
