export const UPDATE_OUTER_IMAGES = 'UPDATE_OUTER_IMAGES';
export const CHECKED_OUTER_IMAGES = 'CHECKED_OUTER_IMAGES';
export const UPDATE_OUTER_VIDEOS = 'UPDATE_OUTER_VIDEOS';
export const CHECKED_OUTER_VIDEOS = 'CHECKED_OUTER_VIDEOS';

export const updateOuterImages = value => ({
  type: UPDATE_OUTER_IMAGES,
  value: value,
});
export const checkedOuterImages = value => ({
  type: CHECKED_OUTER_IMAGES,
  value: value,
});

export const updateOuterVideos = value => ({
  type: UPDATE_OUTER_VIDEOS,
  value: value,
});
export const checkedOuterVideos = value => ({
  type: CHECKED_OUTER_VIDEOS,
  value: value,
});
