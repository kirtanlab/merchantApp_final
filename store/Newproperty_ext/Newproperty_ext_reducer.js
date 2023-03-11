import * as Newproperty_ext_actions from './Newproperty_ext_actions';
let initialState = {
  Location: {},
  Location_address: '',
  checked_Location: false,
};

const Newproperty_ext_reducer = (state = initialState, action) => {
  switch (action.type) {
    case Newproperty_ext_actions.UPDATE_LOCATION_ADDRESS:
      return {
        Location_address: action.value,
      };
    case Newproperty_ext_actions.UPDATE_ELE_BILL:
      return {
        elebill: action.value,
      };
    case Newproperty_ext_actions.CHECKED_ELE_BILL:
      return {
        ...state,
        checked_ele_bill: action.value,
      };

    case Newproperty_ext_actions.CHECKED_LOCATION:
      return {
        ...state,
        checked_Location: action.value,
      };
    case Newproperty_ext_actions.UPDATE_LOCATION:
      return {
        ...state,
        Location: action.value,
      };
    default:
      return state;
  }
};
export default Newproperty_ext_reducer;
