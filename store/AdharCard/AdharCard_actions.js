export const CHECKED_ADHAR_CARD = "CHECKED_ADHAR_CARD";
export const UPDATE_ADHAR_CARD = "UPDATE_ADHAR_CARD";

export const updateAdharCard = (value) => ({
  type: UPDATE_ADHAR_CARD,
  value: value,
});
export const checkedAdharCard = (value) => ({
  type: CHECKED_ADHAR_CARD,
  value: value,
});
