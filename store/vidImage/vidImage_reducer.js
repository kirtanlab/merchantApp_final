import * as vidImage_actions from './vidImage_actions';
const initialState = {
  checked_outer_image: false,
  outerImages: [],
  checked_outer_video: false,
  outerVideos: [],
};
const vidImage_reducer = (state = initialState, action) => {
  switch (action.type) {
    //NewRooms Form
    case vidImage_actions.CHECKED_OUTER_IMAGES:
      return {
        ...state,
        checked_outer_image: action.value,
      };
    case vidImage_actions.UPDATE_OUTER_IMAGES:
      return {
        ...state,
        outerImages: action.value,
      };
    case vidImage_actions.CHECKED_OUTER_VIDEOS:
      return {
        ...state,
        checked_outer_video: action.value,
      };
    case vidImage_actions.UPDATE_OUTER_VIDEOS:
      return {
        ...state,
        outerVideos: action.value,
      };
    default:
      return state;
  }
};

export default vidImage_reducer;
