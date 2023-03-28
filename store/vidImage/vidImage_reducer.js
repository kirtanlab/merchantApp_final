import * as vidImage_actions from "./vidImage_actions";
const initialState = {
  checked_outer_image: false,
  outerImages: [],
  checked_outer_video: false,
  outerVideos: [],
  vid_downloaded: 0,
};
const vidImage_reducer = (state = initialState, action) => {
  switch (action.type) {
    case vidImage_actions.VID_DOWNLOADED:
      console.log("vid_downloaded_reducer", action.value + vid_downloaded);
      return {
        ...state,
        vid_downloaded: action.value + vid_downloaded,
      };
    case vidImage_actions.UPDATE_ALL:
      return {
        ...state,
        outerImages: action.value.photos,
        checked_outer_image: true,
        // checked_outer_video: true,
        // outerVideos: action.value.videos,
      };
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
