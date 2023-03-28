import * as mess_vidImage_actions from "./mess_vidImage_actions";
const initialState = {
  checked_mess_image: false,
  messImage: {},
};
const mess_vidImage_reducer = (state = initialState, action) => {
  switch (action.type) {
    case mess_vidImage_actions.CHECKED_MENU_IMAGE:
      return {
        ...state,
        checked_mess_image: action.value,
      };
    case mess_vidImage_actions.UPDATE_MENU_IMAGES:
      return {
        ...state,
        messImage: action.value,
      };

    default:
      return state;
  }
};

export default mess_vidImage_reducer;
