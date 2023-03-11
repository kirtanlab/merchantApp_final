import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UPDATE_USER = 'UPDATE_USER'; //Storing Async Data
export const GET_FROM_STORAGE = 'GET_FROM_STORAGE'; //Getting Async Data

export const UPDATE_LAUNCH_SCREEN = 'UPDATE_LAUNCH_SCREEN';
export const UPDATE_APPEARANCE = 'UPDATE_APPEARANCE';
export const UPDATE_PAYMENT_CURRENCY = 'UPDATE_PAYMENT_CURRENCY';
export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';
export const UPDATE_FACE_ID = 'UPDATE_FACE_ID';

export const UPDATE_LOGIN_EMAIL = 'UPDATE_LOGIN_EMAIL';
export const UPDATE_LOGIN_PASS = 'UPDATE_LOGIN_PASS';

export const UPDATE_SING_NAME = 'UPDATE_SING_NAME';
export const UPDATE_SING_PASS = 'UPDATE_SING_PASS';
export const UPDATE_SING_CONF_PASS = 'UPDATE_SING_CONF_PASS';
export const UPDATE_SING_EMAIL = 'UPDATE_SING_EMAIL';
export const UPDATE_PHONE = 'UPDATE_PHONE';
export const UPDATE_ADHAR_NAME = 'UPDATE_ADHAR_NAME';

export const FOCUSED_SING_EMAIL = 'FOCUSED_SING_EMAIL';
export const FOCUSED_SING_PASS = 'FOCUSED_SING_PASS';
export const FOCUSED_SING_CONF_PASS = 'FOCUSED_SING_CONF_PASS';
export const FOCUSED_SING_NAME = 'FOCUSED_SING_NAME';
export const FOCUSED_PHONE = 'FOCUSED_PHONE';
export const FOCUSED_ADHAR_NAME = 'FOCUSED_ADHAR_NAME';

export const CHECKED_SING_EMAIL = 'CHECKED_SING_EMAIL';
export const CHECKED_SING_PASS = 'CHECKED_SING_PASS';
export const CHECKED_SING_CONF_PASS = 'CHECKED_SING_CONF_PASS';
export const CHECKED_SING_NAME = 'CHECKED_SING_NAME';
export const CHECKED_PHONE = 'CHECKED_PHONE';
export const CHECKED_ADHAR_NAME = 'CHECKED_ADHAR_NAME';

export const GEN_SING_ERR = 'GEN_SING_ERR';

export const GEN_LOGIN_ERR = 'GEN_LOGIN_ERR';

export const CHECKED_LOGIN_EMAIL = 'CHECKED_LOGIN_EMAIL';
export const CHECKED_LOGIN_PASS = 'CHECKED_LOGIN_PASS';
export const CHECKED_FIRST_FORM = 'CHECKED_FIRST_FORM';

export const RESET_TOKEN = 'RESET_TOKEN';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';

export const updateToken = value => ({
  type: UPDATE_TOKEN,
  value: value,
});

export const RESET_CHECKED = 'RESET_CHECKED';

export const UPDATE_PROPERTY_VALUE_AUTH = 'UPDATE_PROPERTY_VALUE_AUTH';
export const updatePropertyValueAuth = value => ({
  type: UPDATE_PROPERTY_VALUE_AUTH,
  value: value,
});

export const checked_first_form = value => ({
  type: CHECKED_FIRST_FORM,
  value: value,
});
export const phone_checked = value => ({
  type: CHECKED_PHONE,
  value: value,
});

export const update_phone = value => ({
  type: UPDATE_PHONE,
  value: value,
});

export const phone_focused = value => ({
  type: FOCUSED_PHONE,
  value: value,
});

export const reset_checked = () => ({
  type: RESET_CHECKED,
  flag: false,
});

export const update_adhar_name = value => ({
  type: UPDATE_ADHAR_NAME,
  value: value,
});

export const adhar_name_checked = value => {
  // console.log('clicked');
  return {
    type: CHECKED_ADHAR_NAME,
    value: value,
  };
};

export const adhar_name_focused = value => {
  console.log('clicked');
  return {
    type: FOCUSED_ADHAR_NAME,
    value: value,
  };
};

export const logout = () => {
  console.log('LOGOUT');
  let auth_states = {
    user: null,
    status: 'logged out',
    error: null,
    userData: null,
  };
  return {
    type: RESET_TOKEN,
    auth_states: auth_states,
  };
};
export const updatelogin_email = value => ({
  type: UPDATE_LOGIN_EMAIL,
  value: value,
});
export const updatelogin_pass = value => ({
  type: UPDATE_LOGIN_PASS,
  value: value,
});

export const login_email_checked = value => ({
  type: CHECKED_LOGIN_EMAIL,
  value: value,
});

export const login_pass_checked = value => ({
  type: CHECKED_LOGIN_PASS,
  value: value,
});

export const gen_login_err = value => ({
  type: GEN_LOGIN_ERR,
  value: value,
});
// export const gen_phone_err = value => ({
//   type: GEN_LOGIN_ERR,
//   value: value,
// });

export const gen_sign_err = value => ({
  type: GEN_SING_ERR,
  value: value,
});

export const sign_email_checked = value => ({
  type: CHECKED_SING_EMAIL,
  value: value,
});
export const sign_name_checked = value => ({
  type: CHECKED_SING_NAME,
  value: value,
});
export const sign_pass_checked = value => ({
  type: CHECKED_SING_PASS,
  value: value,
});
export const sign_conf_pass_checked = value => ({
  type: CHECKED_SING_CONF_PASS,
  value: value,
});

export const sign_email_focused = value => ({
  type: FOCUSED_SING_EMAIL,
  value: value,
});
export const sign_name_focused = value => ({
  type: FOCUSED_SING_NAME,
  value: value,
});
export const sign_password_focused = value => ({
  type: FOCUSED_SING_PASS,
  value: value,
});
export const sign_conf_pass_focused = value => ({
  type: FOCUSED_SING_CONF_PASS,
  value: value,
});

export const updatesign_name = value => ({
  type: UPDATE_SING_NAME,
  value: value,
});

export const updatesign_password = value => ({
  type: UPDATE_SING_PASS,
  value: value,
});

export const updatesign_conf_password = value => ({
  type: UPDATE_SING_CONF_PASS,
  value: value,
});

export const updatesign_email = value => ({
  type: UPDATE_SING_EMAIL,
  value: value,
});

// export const updateUser = ({user, userData, status, error}) => ({
//   type: UPDATE_USER,
//   payload: {user, userData, status, error},
// });
async function persistUserData(auth_states) {
  try {
    console.log('var_name', Object.keys({auth_states})[0]);
    let name = Object.keys({auth_states})[0];
    AsyncStorage.setItem(name, JSON.stringify(auth_states), err => {
      if (err) {
        console.log('an error');
        throw err;
      }
      console.log('success');
    }).catch(err => {
      console.log('error is: ' + err);
    });
    // if (res) {
    //   console.log(`${data} saved`, JSON.stringify(data));
    // } else {
    //   console.log(`${data} can not be persisted : `, res);
    // }
  } catch (e) {
    console.log('persistUserData', e);
  }
}

// const getDataFromStorage = async () => {
//   let user = await AsyncStorage.getItem('user', JSON.stringify(user));
//   console.log('User', user);
//   navigation.navigate('LoginScreen');
// };
const getpersistedData = async data => {
  try {
    let res = await AsyncStorage.getItem(data);
    if (res) {
      console.log(`${data} got from storage`, res);
      return res;
    } else {
      console.log(`${data} is not in storage : `, res);
    }
  } catch (e) {
    console.log('getPersisted', e);
  }
};

export const getUserFromStorage = _auth_states => {
  return async (dispatch, getState) => {
    try {
      let auth_states = await getpersistedData(_auth_states);
      dispatch({
        type: GET_FROM_STORAGE,
        payload: auth_states,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = auth_states => {
  return async (dispatch, getState) => {
    try {
      console.log('updateUser Entered');
      await persistUserData(auth_states);
      dispatch({
        type: UPDATE_USER,
        payload: auth_states,
      });
    } catch (err) {
      console.log('updateUser Error', err);
    }
  };
};

export const updateLaunchScreen = ({Launch_Screen}) => ({
  type: UPDATE_LAUNCH_SCREEN,
  payload: {Launch_Screen},
});

export const updateAppearance = ({Appearance}) => ({
  type: UPDATE_APPEARANCE,
  payload: {Appearance},
});
export const updatePaymentCurrency = ({Payment_Currency}) => ({
  type: UPDATE_PAYMENT_CURRENCY,
  payload: {Payment_Currency},
});
export const updateLanguage = ({Language}) => ({
  type: UPDATE_LANGUAGE,
  payload: {Language},
});

export const updateFaceId = ({FaceID}) => ({
  type: UPDATE_FACE_ID,
  payload: {FaceID},
});
