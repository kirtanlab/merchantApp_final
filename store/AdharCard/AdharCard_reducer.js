import AsyncStorage from "@react-native-async-storage/async-storage";
import { value } from "react-native-extended-stylesheet";
import * as AdharCard_actions from "./AdharCard_actions";
let initialState = {
  adharcard: { uri: "", name: "" },
  checked_adhar_card: false,
};

const AdharCard_reducer = (state = initialState, action) => {
  switch (action.type) {
    case AdharCard_actions.UPDATE_ADHAR_CARD:
      return {
        ...state,
        adharcard: action.value,
      };
    case AdharCard_actions.CHECKED_ADHAR_CARD:
      return {
        ...state,
        checked_adhar_card: action.value,
      };

    default:
      return state;
  }
};
export default AdharCard_reducer;
