export const CHECKED_ELE_BILL = 'CHECKED_ELE_BILL';
export const UPDATE_ELE_BILL = 'UPDATE_ELE_BILL';

export const updateElebill = value => ({
  type: UPDATE_ELE_BILL,
  value: value,
});
export const checkedElebill = value => {
  console.log('uncalled', value);
  return {
    type: CHECKED_ELE_BILL,
    value: value,
  };
};
