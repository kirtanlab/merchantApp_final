import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import marketReducer from './market/marketReducer';
import authReducer from './auth/authReducer';
import tabReducer from './tab/tabReducer';
import newproperty_reducer from './Newproperty/newproperty_reducer';
import Newrooms_reducer from './NewRooms/Newrooms_reducer';
import Ele_Bill_reducer from './Ele_Bill/Ele_Bill_reducer';
import vidImage_reducer from './vidImage/vidImage_reducer';
import room_vidImage_reducer from './room_vidImage/room_vidImage_reducer';
// import storage from 'redux-persist/lib/storage';
// const persistConfig = {
//   key: 'persist-store',
//   storage: AsyncStorage,
// };
import Newproperty_ext_reducer from '../store/Newproperty_ext/Newproperty_ext_reducer';
const rootReducer = combineReducers({
  authReducer,
  marketReducer,
  newproperty_reducer,
  tabReducer,
  Newrooms_reducer,
  Newproperty_ext_reducer,
  Ele_Bill_reducer,
  vidImage_reducer,
  room_vidImage_reducer,
});
// const _persistedReducer = persistReducer(persistConfig, rootReducer);
export default rootReducer;
