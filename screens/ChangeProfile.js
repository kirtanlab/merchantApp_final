import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {COLORS, SIZES} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderBar from '../components/HeaderBar';
import DocumentPicker from 'react-native-document-picker';
import Nav_Header from '../components/NewProperty/Nav_Header';
import NAVHeader_BLOB from '../components/NavHeader_BLOB';
const ChangeProfile = ({navigation}) => {
  const data = {
    name: 'kirtan',
    number: 9998099893,
    email: 'kirtan@gmail.com',
    adhar: {
      fileCopyUri: null,
      name: 'Screenshot_20230309-141450_merchantApp.jpg',
      size: 754363,
      type: 'image/jpeg',
      uri: 'https://cdn.dribbble.com/users/1092261/screenshots/14701547/media/7ab1fda1209b0c9c7508a38a6a52b4d0.png?compress=1&resize=400x300',
    },
  };
  const [name, setName] = React.useState(data.name);
  const [number, setNumber] = React.useState(data.number);
  const [email, setEmail] = React.useState(data.email);
  const [adhar, setAdhar] = React.useState(data.adhar);
  const [_default, setDefault] = React.useState('kirta');
  const [imgUri, setimgUri] = React.useState(data.adhar.uri);
  const [img_uri, setIMGURI] = React.useState(data.adhar.uri);
  // console.log(imgUri.uri);
  function validate_phone(val) {
    var regex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    // var regex = /^[6-9][0-9]{9}$/;
    return regex.test(val);
  }
  function validate_name(val) {
    var regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
    return regex.test(val);
  } //
  const selectDoc = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        mode: 'import',
        copyTo: 'documentDirectory',
      });
      console.log(res);
      setimgUri(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled', err);
      } else {
        console.log(err);
      }
    }
  };
  return (
    // <View>
    //   <Text>Name</Text>
    //   <TextInput
    //     value={name}
    //     defaultValue={_default}
    //     onChange={e => console.log(e.nativeEvent.text)}
    //   />
    // </View>
    <View
      style={{
        height: SIZES.height,
        backgroundColor: 'white',
      }}>
      <NAVHeader_BLOB
        screen_name={'Change Profile'}
        onPress_back={() => {
          navigation.navigate('ProfileScreen');
        }}
      />
      <View
        style={{
          // flex: 1,
          paddingHorizontal: 15,
          backgroundColor: COLORS.white,
        }}>
        {/* Header */}

        {/* <HeaderBar title="Change Profile" /> */}
        {/* <Nav_Header /> */}
      </View>
      <View style={{paddingHorizontal: 18, marginTop: 10}}>
        {/* New Name */}
        <View style={{}}>
          <Text
            style={{
              fontSize: SIZES.h2,
              color: COLORS.mobile_theme_back,
              //   bottom: 8,
            }}>
            Enter Name
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: SIZES.width,
              marginTop: 0,
              marginLeft: 7,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name="person-outline"
                size={27}
                color={true ? COLORS.mobile_theme_back : 'lightgray'}
                style={{marginTop: 18}}
              />
              <View style={{width: SIZES.width * 0.73, marginLeft: 10}}>
                <TextInput
                  onFocus={e => {
                    // sign_name_focused(true);
                    // gen_sign_err_method(false);
                  }}
                  onBlur={() => {
                    // sign_name_focused(false);
                  }}
                  value={name}
                  placeholder="Enter Name"
                  keyboardType="default"
                  style={{
                    height: 40,
                    marginLeft: 4,
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: '#d1cfcf',
                    marginTop: 5,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingBottom: 0,
                    fontSize: 22,
                    color: '#212121',
                  }}
                  onChange={value => {
                    if (validate_name(value.nativeEvent.text)) {
                      //   sign_name_checked(true);
                      // sign_name_focused(false);
                      //   updatesign_name(value.nativeEvent.text);
                    } else {
                      //   sign_name_checked(false);
                    }
                  }}
                />
              </View>
              <TouchableOpacity>
                {/* <Ionicons
                  name="checkmark-done-outline"
                  size={20}
                  color={true ? COLORS.mobile_theme_back : 'lightgray'}
                  style={{marginTop: 18}}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* New Phone Number */}
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: SIZES.h2,
              color: COLORS.mobile_theme_back,
              //   bottom: 8,
            }}>
            Enter Number
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: SIZES.width,
              //   marginTop: -10,
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
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  +91
                </Text>
              </View>
            </View>
            <View style={{width: SIZES.width * 0.75, left: 2}}>
              <TextInput
                onFocus={() => {
                  console.log('Entering focued');
                  // phone_focused(true);
                  // gen_sign_err_method(false);
                }}
                onBlur={() => {
                  console.log('!Entering focued');
                  // phone_focused(false);
                }}
                value={number.toString()}
                placeholder="Enter Phone Number"
                keyboardType="phone-pad"
                style={{
                  height: 40,
                  marginLeft: 4,
                  // flex: 1,
                  borderBottomWidth: 1,
                  borderColor: '#d1cfcf',
                  marginTop: 5,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingBottom: 0,
                  fontSize: 22,
                  color: '#212121',
                }}
                // secureTextEntry={true}
                onChange={value => {
                  // console.log('handeled', value.nativeEvent.text);
                  value = Number(value.nativeEvent.text);
                  if (validate_phone(value)) {
                    console.log('etnereed green');
                    //   phone_checked(true);
                    // gen_sign_err_method(false);
                    // sign_password_focused(false);
                    //   update_phone(value);
                  } else {
                    //   phone_checked(false);
                  }
                }}
              />
            </View>
            <TouchableOpacity>
              {/* <Ionicons
                name="checkmark-done-outline"
                size={20}
                color={true ? COLORS.mobile_theme_back : 'lightgray'}
                style={{marginTop: 18}}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
        {/* New Email */}
        <View style={{marginTop: 15}}>
          <Text
            style={{
              fontSize: SIZES.h2,
              color: COLORS.mobile_theme_back,
              //   bottom: 8,
            }}>
            Enter Email
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: SIZES.width,
              marginTop: 0,
              marginLeft: 7,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name="mail-outline"
                size={27}
                color={true ? COLORS.mobile_theme_back : 'lightgray'}
                style={{marginTop: 18}}
              />
              <View style={{width: SIZES.width * 0.73, marginLeft: 10}}>
                <TextInput
                  onFocus={e => {
                    // sign_name_focused(true);
                    // gen_sign_err_method(false);
                  }}
                  onBlur={() => {
                    // sign_name_focused(false);
                  }}
                  value={email}
                  placeholder="Enter Email"
                  keyboardType="email-address"
                  style={{
                    height: 40,
                    marginLeft: 4,
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: '#d1cfcf',
                    marginTop: 5,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingBottom: 0,
                    fontSize: 22,
                    color: '#212121',
                  }}
                  onChange={value => {
                    if (validate_name(value.nativeEvent.text)) {
                      //   sign_name_checked(true);
                      // sign_name_focused(false);
                      //   updatesign_name(value.nativeEvent.text);
                    } else {
                      //   sign_name_checked(false);
                    }
                  }}
                />
              </View>
              <TouchableOpacity>
                {/* <Ionicons
                  name="checkmark-done-outline"
                  size={20}
                  color={true ? COLORS.mobile_theme_back : 'lightgray'}
                  style={{marginTop: 18}}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: COLORS.mobile_theme_back,
            // minWidth: 100,
            // width: '100%',
            minHeight: 40,
            borderRadius: 10,
            marginTop: 25,
            maxHeight: 200,
            // alignItems: 'center',
            padding: 5,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: SIZES.h2,
              color: COLORS.mobile_theme_back,
              //   bottom: 8,
              // marginTop: 25,
              flex: 1,
            }}>
            Addhar card
          </Text>
          <TouchableOpacity
            style={{
              // marginTop: 18,
              height: 36,
              width: 40,
              // padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 5,
              // left: 20,
              backgroundColor: COLORS.mobile_theme_back,
              borderRadius: 10,
              color: COLORS.white,
              fontSize: SIZES.h2,
              // marginTop: 25,
            }}
            onPress={() => {
              setimgUri(undefined);
            }}>
            <Ionicons
              name="close-circle-outline"
              size={25}
              color={true ? COLORS.white : 'lightgray'}
              style={{flex: 1}}
            />
          </TouchableOpacity>
        </View>
        {/* upload adhaar */}
        {imgUri === undefined && (
          <View style={{top: -10}}>
            {/* <Text
              style={{
                fontSize: SIZES.h2,
                color: COLORS.mobile_theme_back,
                //   fontWeight: 'bold',
              }}>
              Upload Adhar(image or pdf form)
            </Text> */}
            <TouchableOpacity
              style={{
                // marginTop: 15,
                borderColor: COLORS.mobile_theme,
                borderWidth: SIZES.form_button_borderWidth,
                borderRadius: SIZES.form_button_borderRadius,
                minWidth: SIZES.form_button_minWidth,
                maxWidth: SIZES.form_button_maxWidth,
                maxHeight: SIZES.form_button_maxHeight,
                padding: SIZES.form_button_padding,
                alignItems: SIZES.form_button_alignItems,
                justifyContent: SIZES.form_button_justifyContent,
                backgroundColor: COLORS.mobile_theme_back,
              }}
              onPress={() => {
                selectDoc();
                console.log('doc clicked');
              }}>
              <Text
                style={{
                  fontSize: SIZES.form_button_text_fontSize,
                  fontWeight: SIZES.form_button_text_fontWeight,
                  color: COLORS.font_color,
                }}>
                Select fles
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Show Uploaded */}
        {/* <Image
          source={{uri: imgUri}}
          style={{
            height: 300,
            width: SIZES.width - 45,
            borderRadius: 10,
            marginTop: 7,
            alignSelf: 'center',
          }}
        /> */}
        {imgUri !== undefined && (
          <View
            style={{
              // marginTop: 30,
              borderWidth: 1,
              borderColor: COLORS.lightGray3,
              borderRadius: 10,
              width: SIZES.width - 50,
              // height: 300,
              marginLeft: 5,
            }}>
            <Image
              source={{uri: img_uri}}
              style={{height: 300, borderRadius: 10, width: SIZES.width - 50}}
            />

            {/* <View
              style={{
                flexDirection: 'row',
                backgroundColor: COLORS.mobile_theme_back,
                // minWidth: 100,
                // width: '100%',
                minHeight: 40,
                borderRadius: 10,
                marginTop: 25,
                maxHeight: 200,
                // alignItems: 'center',
                padding: 5,
              }}>
              {/* <Text style={{flex: 5, color: COLORS.white, fontSize: SIZES.h2}}>
              {imgUri.name}
            </Text> */}
          </View>
        )}
      </View>
    </View>
  );
};
export default ChangeProfile;
