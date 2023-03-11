import {Home} from '../../screens';
import * as authActions from './authActions';

const initialState = {
  auth_states: {
    user: null,
    //Defaults are stored in userData
    userData: null,
    status: 'loading',
    error: 'error',
  },
  token: '',
  login_email: '',
  login_password: '',
  sign_name: '',
  sign_email: '',
  sign_password: '',
  sign_conf_password: '',
  phone: '',
  adhar_name: '',
  focused_adhar_name: false,
  focused_sign_email: false,
  focused_sign_name: false,
  focused_sign_pass: false,
  focused_phone: false,
  focused_sign_conf_pass: false,
  checked_adhar_name: false,
  checked_sign_name: false,
  checked_phone: false,
  checked_sign_email: false,
  checked_sign_pass: false,
  checked_sign_conf_pass: false,
  gen_sign_err: false,
  gen_login_err: false,
  checked_login_email: false,
  checked_login_pass: false,
  checked_first_form: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case
    case authActions.UPDATE_TOKEN: {
      return {
        ...state,
        token: action.value,
      };
    }

    case authActions.UPDATE_PROPERTY_VALUE_AUTH: {
      return {
        ...state,
        adhar_name: action.value.adhar_name,
      };
    }
    case authActions.CHECKED_FIRST_FORM: {
      return {
        ...state,
        checked_first_form: action.value,
      };
    }
    case authActions.CHECKED_ADHAR_NAME: {
      return {
        ...state,
        checked_adhar_name: action.value,
      };
    }
    case authActions.FOCUSED_ADHAR_NAME: {
      return {
        ...state,
        focused_adhar_name: action.value,
      };
    }
    case authActions.UPDATE_ADHAR_NAME: {
      return {
        ...state,
        adhar_name: action.value,
      };
    }

    case authActions.UPDATE_PHONE:
      return {
        ...state,
        phone: action.value,
      };
    case authActions.CHECKED_PHONE:
      return {
        ...state,
        checked_phone: action.value,
      };
    case authActions.FOCUSED_PHONE:
      return {
        ...state,
        focused_phone: action.value,
      };
    //ASYNC
    case authActions.GET_FROM_STORAGE:
      return {
        ...state,
        auth_states: action.payload.auth_states,
      };

    //LOGOUT
    case authActions.RESET_TOKEN:
      return {
        ...state,
        auth_states: action.auth_states,
      };

    //Reset Checked all
    case authActions.RESET_CHECKED:
      return {
        ...state,
        checked_sign_pass: false,
        checked_sign_email: false,
        checked_sign_conf_pass: false,
        checked_login_pass: false,
        checked_login_email: false,
        checked_sign_name: false,
        gen_login_err: false,
        gen_sign_err: false,
      };

    //UPDATE VALUES
    case authActions.UPDATE_LOGIN_PASS:
      return {
        ...state,
        login_password: action.value,
      };
    case authActions.UPDATE_LOGIN_EMAIL:
      return {
        ...state,
        login_email: action.value,
      };

    //CHECKED LOGIN EMAIL AND PASSWORD
    case authActions.CHECKED_LOGIN_EMAIL:
      return {
        ...state,
        checked_login_email: action.value,
      };
    case authActions.CHECKED_LOGIN_PASS:
      return {
        ...state,
        checked_login_pass: action.value,
      };
    //GENERAL LOGIN ERROR
    case authActions.GEN_LOGIN_ERR:
      return {
        ...state,
        gen_login_err: action.value,
      };

    //GENERAL SIGN ERROR
    case authActions.GEN_SING_ERR:
      return {
        ...state,
        gen_sign_err: action.value,
      };

    //CHECKED
    case authActions.CHECKED_SING_CONF_PASS:
      return {
        ...state,
        checked_sign_conf_pass: action.value,
      };
    case authActions.CHECKED_SING_PASS:
      return {
        ...state,
        checked_sign_pass: action.value,
      };
    case authActions.CHECKED_SING_NAME:
      return {
        ...state,
        checked_sign_name: action.value,
      };
    case authActions.CHECKED_SING_EMAIL:
      return {
        ...state,
        checked_sign_email: action.value,
      };

    // FOCUSED
    case authActions.FOCUSED_SING_CONF_PASS:
      return {
        ...state,
        focused_sign_conf_pass: action.value,
      };
    case authActions.FOCUSED_SING_PASS:
      return {
        ...state,
        focused_sign_pass: action.value,
      };
    case authActions.FOCUSED_SING_NAME:
      return {
        ...state,
        focused_sign_name: action.value,
      };
    case authActions.FOCUSED_SING_EMAIL:
      return {
        ...state,
        focused_sign_email: action.value,
      };

    //UPDATES OF VALUES

    case authActions.UPDATE_SING_CONF_PASS:
      return {
        ...state,
        sign_conf_password: action.value,
      };
    case authActions.UPDATE_SING_PASS:
      return {
        ...state,
        sign_password: action.value,
      };
    case authActions.UPDATE_SING_EMAIL:
      return {
        ...state,
        sign_email: action.value,
      };
    case authActions.UPDATE_SING_NAME:
      return {
        ...state,
        sign_name: action.value,
      };

    //OTHER
    case authActions.UPDATE_USER:
      return {
        ...state,
        auth_states: action.payload.auth_states,
      };

    case authActions.UPDATE_APPEARANCE:
      return {
        ...state.auth_states.userData,
        Appearance: action.payload.Appearance,
      };

    // case authActions.UPDATE_PAYMENT_CURRENCY:
    //   return {
    //     ...state.userData,
    //     Payment_Currency: action.payload.Payment_Currency,
    //   };

    // case authActions.UPDATE_LANGUAGE:
    //   return {
    //     ...state.userData,
    //     Language: action.payload.Language,
    //   };

    // case authActions.FaceID:
    //   return {
    //     ...state.userData,
    //     FaceID: action.payload.FaceID,
    //   };
    default:
      return state;
  }
};
export default authReducer;
