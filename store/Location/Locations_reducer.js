import * as Location_actions from "./Location_actions";
let initialState = {
  Location: {},

  checked_Location: false,
};

const Location_reducer = (state = initialState, action) => {
  switch (action.type) {
    case Location_actions.CHECKED_LOCATION:
      return {
        ...state,
        checked_Location: action.value,
      };
    case Location_actions.UPDATE_LOCATION:
      return {
        ...state,
        Location: action.value,
      };
    default:
      return state;
  }
};
export default Location_reducer;
