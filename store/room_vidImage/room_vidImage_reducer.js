import * as room_vidImage_actions from './room_vidImage_actions';
const initialState = {
  checked_room_outer_image: false,
  room_outerImages: [],
  checked_room_outer_video: false,
  room_outerVideos: [],
};
const room_vidImage_reducer = (state = initialState, action) => {
  switch (action.type) {
    //NewRooms Form
    case room_vidImage_actions.CHECKED_ROOM_OUTER_IMAGES:
      return {
        ...state,
        checked_room_outer_image: action.value,
      };
    case room_vidImage_actions.UPDATE_ROOM_OUTER_IMAGES:
      return {
        ...state,
        room_outerImages: action.value,
      };
    case room_vidImage_actions.CHECKED_ROOM_OUTER_VIDEOS:
      return {
        ...state,
        checked_room_outer_video: action.value,
      };
    case room_vidImage_actions.UPDATE_ROOM_OUTER_VIDEOS:
      return {
        ...state,
        room_outerVideos: action.value,
      };
    default:
      return state;
  }
};

export default room_vidImage_reducer;
