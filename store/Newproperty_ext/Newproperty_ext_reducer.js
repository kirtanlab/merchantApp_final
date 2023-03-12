import * as Newproperty_ext_actions from "./Newproperty_ext_actions";
let initialState = {
  // Location: {},
  Location_address: "",
  // checked_Location: false,
};

const Newproperty_ext_reducer = (state = initialState, action) => {
  switch (action.type) {
    case Newproperty_ext_actions.UPDATE_LOCATION_ADDRESS:
      return {
        ...state,
        Location_address: action.value,
      };

    default:
      return state;
  }
};
export default Newproperty_ext_reducer;
