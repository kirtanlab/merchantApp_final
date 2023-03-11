export const UPDATE_ROOM_OUTER_IMAGES = 'UPDATE_ROOM_OUTER_IMAGES';
export const CHECKED_ROOM_OUTER_IMAGES = 'CHECKED_ROOM_OUTER_IMAGES';
export const UPDATE_ROOM_OUTER_VIDEOS = 'UPDATE_ROOM_OUTER_VIDEOS';
export const CHECKED_ROOM_OUTER_VIDEOS = 'CHECKED_ROOM_OUTER_VIDEOS';

export const updateRoomOuterImages = value => ({
  type: UPDATE_ROOM_OUTER_IMAGES,
  value: value,
});
export const checkedRoomOuterImages = value => ({
  type: CHECKED_ROOM_OUTER_IMAGES,
  value: value,
});

export const updateRoomOuterVideos = value => ({
  type: UPDATE_ROOM_OUTER_VIDEOS,
  value: value,
});
export const checkedRoomOuterVideos = value => ({
  type: CHECKED_ROOM_OUTER_VIDEOS,
  value: value,
});
