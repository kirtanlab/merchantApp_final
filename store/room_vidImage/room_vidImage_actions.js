export const UPDATE_ROOM_OUTER_IMAGES = "UPDATE_ROOM_OUTER_IMAGES";
export const CHECKED_ROOM_OUTER_IMAGES = "CHECKED_ROOM_OUTER_IMAGES";
export const UPDATE_ROOM_OUTER_VIDEOS = "UPDATE_ROOM_OUTER_VIDEOS";
export const CHECKED_ROOM_OUTER_VIDEOS = "CHECKED_ROOM_OUTER_VIDEOS";
export const UPDATEALL = "UPDATE_ALL";
export const RESET_ALL = "RESET_ALL";

export const resetAll = () => ({
  type: RESET_ALL,
});

export const updateAll = (value) => ({
  type: UPDATEALL,
  value: value,
});

export const updateRoomOuterImages = (value) => ({
  type: UPDATE_ROOM_OUTER_IMAGES,
  value: value,
});
export const checkedRoomOuterImages = (value) => ({
  type: CHECKED_ROOM_OUTER_IMAGES,
  value: value,
});

export const updateRoomOuterVideos = (value) => ({
  type: UPDATE_ROOM_OUTER_VIDEOS,
  value: value,
});
export const checkedRoomOuterVideos = (value) => ({
  type: CHECKED_ROOM_OUTER_VIDEOS,
  value: value,
});
