import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MainLayout} from './';
import {HeaderBar} from '../components';
import {FONTS, COLORS, SIZES, dummyData, icons} from '../constants';
import {connect} from 'react-redux';
import * as AuthActions from '../store/auth/authActions';
const SectionTitle = ({title}) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}>
      <Text
        style={{
          color: COLORS.lightGray3,
          ...FONTS.h4,
        }}>
        {title}
      </Text>
    </View>
  );
};

const Setting = ({title, value, type, onPress}) => {
  if (type == 'button') {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
        }}
        onPress={onPress}>
        <Text style={{flex: 1, color: COLORS.white, ...FONTS.h3}}>{title}</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginRight: SIZES.radius,
              color: COLORS.lightGray3,
              ...FONTS.h3,
            }}>
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
        }}>
        <Text style={{flex: 1, color: COLORS.white, ...FONTS.h3}}>{title}</Text>

        <Switch value={value} onValueChange={value => onPress(value)} />
      </View>
    );
  }
};

const Profile = ({auth_states, logout}) => {
  let navigation = useNavigation();
  // const email = useSelector(user.email);
  const [faceId, setFaceId] = React.useState(true);

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,
        }}>
        {/* Header */}

        <HeaderBar title="Profile" />

        {/* Details */}

        <ScrollView>
          {/* Email & User ID */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
            }}>
            {/* Email & User ID*/}

            <View
              style={{
                flex: 1,
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h3}}>
                {auth_states?.user?.email}
              </Text>

              <Text style={{color: COLORS.white, ...FONTS.h3}}>
                ID: {auth_states?.user?.displayName}
              </Text>
            </View>

            {/* Status : Verified*/}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={icons.verified}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  color: COLORS.lightGreen,
                  ...FONTS.body4,
                }}>
                {' '}
                Verified
              </Text>
            </View>
          </View>

          {/* APP */}

          <SectionTitle title="APP" />

          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log('OnPressed')}
          />

          <Setting
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log('OnPressed')}
          />

          {/* Account */}

          {/* <SectionTitle title="ACCOUNT" /> */}

          {/* <Setting
            title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log('OnPressed')}
          /> */}

          {/* <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log('OnPressed')}
          /> */}

          {/* SECURITY */}

          <SectionTitle title="SECURITY" />

          {/* <Setting
            title="FaceID"
            value={faceId}
            type="switch"
            onPress={value => setFaceId(value)}
          /> */}

          {/* <Setting
            title="Password Settings"
            type="button"
            onPress={() => console.log('OnPressed')}
          /> */}
          <Setting
            title="Change Password"
            type="button"
            onPress={() => console.log('OnPressed')}
          />
          {/* <Setting
            title="2-Factor Authentication"
            type="button"
            onPress={() => console.log('OnPressed')}
          /> */}
          <Setting
            title="Logout"
            type="button"
            onPress={() => {
              logout();
              navigation.navigate('LoginScreen');
            }}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};
function mapStateToProps(state) {
  return {
    auth_states: state.authReducer.auth_states,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(AuthActions.logout());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
