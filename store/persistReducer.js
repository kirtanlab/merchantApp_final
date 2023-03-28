import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import newproperty_reducer from "./Newproperty/newproperty_reducer";
import Newrooms_reducer from "./NewRooms/Newrooms_reducer";
import Ele_Bill_reducer from "./Ele_Bill/Ele_Bill_reducer";
import vidImage_reducer from "./vidImage/vidImage_reducer";
import AdharCard_reducer from "./AdharCard/AdharCard_reducer";
import room_vidImage_reducer from "./room_vidImage/room_vidImage_reducer";
import Location_reducer from "./Location/Locations_reducer";
import Newproperty_ext_reducer from "../store/Newproperty_ext/Newproperty_ext_reducer";
import mess_vidImage_reducer from "./mess_vidImage/mess_vidImage_reducer";
const rootReducer = combineReducers({
  authReducer,
  newproperty_reducer,
  Newrooms_reducer,
  Newproperty_ext_reducer,
  Ele_Bill_reducer,
  vidImage_reducer,
  room_vidImage_reducer,
  AdharCard_reducer,
  Location_reducer,
  mess_vidImage_reducer,
});
// const _persistedReducer = persistReducer(persistConfig, rootReducer);
export default rootReducer;
