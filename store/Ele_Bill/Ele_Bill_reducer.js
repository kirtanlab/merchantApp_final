import * as Ele_Bill_actions from './Ele_Bill_actions';
let initialState = {
  elebill: '',
  checked_ele_bill: false,
};

const Ele_Bill_reducer = (state = initialState, action) => {
  switch (action.type) {
    case Ele_Bill_actions.UPDATE_ELE_BILL:
      return {
        ...state,
        elebill: action.value,
      };
    case Ele_Bill_actions.CHECKED_ELE_BILL:
      return {
        ...state,
        checked_ele_bill: action.value,
      };
    default:
      return state;
  }
};
export default Ele_Bill_reducer;
