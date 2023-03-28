export const UPDATE_OUTER_IMAGES = "UPDATE_OUTER_IMAGES";
export const CHECKED_MENU_IMAGE = "CHECKED_MENU_IMAGE";
export const UPDATE_MENU_IMAGES = "UPDATE_MENU_IMAGES";

export const checked_menuImage = (value) => ({
  type: CHECKED_MENU_IMAGE,
  value: value,
});
export const update_menuImage = (value) => ({
  type: UPDATE_MENU_IMAGES,
  value: value,
});
