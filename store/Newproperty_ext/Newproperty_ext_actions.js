export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_LOCATION_ADDRESS = 'UPDATE_LOCATION_ADDRESS';

export const CHECKED_LOCATION = 'CHECKED_LOCATION';
export const updateLocationAddress = value => ({
  type: UPDATE_LOCATION_ADDRESS,
  value: value,
});
export const checked_location = value => ({
  type: CHECKED_LOCATION,
  value: value,
});
export const update_location = value => ({
  type: UPDATE_LOCATION,
  value: value,
});
