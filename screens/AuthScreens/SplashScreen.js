import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {updateUser, getUserFromStorage} from '../../store/auth/authActions';

const SplashScreen = ({
  updateUser,
  auth_states,
  navigation,
  getUserFromStorage,
}) => {
  useEffect(() => {
    const _getUserFromStorage = async () => {
      // const getUserData = async (user) => {
      //   return new Promise(function (resolve, reject) {
      //     AsyncStorage.setItem('user', JSON.stringify(user))
      //       .then(() => resolve(JSON.stringify(user)))
      //       .catch(err => reject('Logged in User data not persisted : ', err));
      //   });
      let auth_states = await AsyncStorage.getItem('auth_states');
      console.log('from splashscreen', auth_states);

      auth_states = JSON.parse(auth_states);
      let user = auth_states.user;
      console.log('data', typeof auth_states);
      if (user != null) {
        updateUser(auth_states);
        console.log('async succeeded', auth_states.user);
        navigation.navigate('Newproperty');
      } else {
        let auth_states = {
          user: null,
          userData: null,
          status: 'logged Out',
          error: null,
        };
        updateUser(auth_states);
        console.log('async failed', user);
        navigation.navigate('LoginScreen');
      }
    };
    _getUserFromStorage();
  }, []);
  return (
    <View style={styles.splashScreenCont}>
      <Text>Checking Authentication...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreenCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    // user: state.authReducer.user,
    // user: state.authReducer.user,
    // userData: state.authReducer.userData,
    // status: state.authReducer.status,
    // user: state.authReducer.user,
    auth_states: state.authReducer.auth_states,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: auth_states => {
      return dispatch(updateUser(auth_states));
    },
    getUserFromStorage: auth_states => {
      return dispatch(getUserFromStorage(auth_states));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
