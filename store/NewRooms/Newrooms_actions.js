export const UPDATE_title = 'UPDATE_title';
export const UPDATE_AC = 'UPDATE_AC';
export const UPDATE_ATTACHED = 'UPDATE_ATTACHED';
export const UPDATE_PRICES = 'UPDATE_PRICES';
export const UPDATE_EXTRA_DESCRIPTORS = 'UPDATE_EXTRA_DESCRIPTORS';
export const UPDATE_BASE_TERMS = 'UPDATE_BASE_TERMS';
export const UPDATE_TOTAL_AVAILABLE = 'UPDATE_TOTAL_AVAILABLE';
export const UPDATE_OCCUPANCY = 'UPDATE_OCCUPANCY';
export const UPDATE_ABOUT_ROOM = 'UPDATE_ABOUT_ROOM';

export const CHECKED_title = 'CHECKED_title';
export const CHECKED_AC = 'CHECKED_AC';
export const CHECKED_ATTACHED = 'CHECKED_ATTACHED';
export const CHECKED_PRICES = 'CHECKED_PRICES';
export const CHECKED_BASE_TERMS = 'CHECKED_BASE_TERMS';
export const CHECKED_TOTAL_AVAILABLE = 'CHECKED_TOTAL_AVAILABLE';
export const CHECKED_OCCUPANCY = 'CHECKED_OCCUPANCY';

export const FOCUSED_title = 'FOCUSED_title';
export const FOCUSED_AC = 'FOCUSED_AC';
export const FOCUSED_ATTACHED = 'FOCUSED_ATTACHED';
export const FOCUSED_PRICES = 'FOCUSED_PRICES';
export const FOCUSED_TOTAL_AVAILABLE = 'FOCUSED_TOTAL_AVAILABLE';
export const FOCUSED_OCCUPANCY = 'FOCUSED_OCCUPANCY';

export const updateAboutRoom = value => {
  return {
    type: UPDATE_ABOUT_ROOM,
    value: value,
  };
};

export const updateBaseTerms = value => {
  return {
    type: UPDATE_BASE_TERMS,
    value: value,
  };
};
export const checkedBaseTerms = value => {
  console.log('main', value);
  return {
    type: CHECKED_BASE_TERMS,
    value: value,
  };
};

export const updateExtraDescription = value => ({
  type: UPDATE_EXTRA_DESCRIPTORS,
  value: value,
});

export const udpateAttached = value => ({
  type: UPDATE_ATTACHED,
  value: value,
});
export const updatetitle = value => ({
  type: UPDATE_title,
  value: value,
});
export const updateAC = value => ({
  type: UPDATE_AC,
  value: value,
});
export const updatePrices = value => ({
  type: UPDATE_PRICES,
  value: value,
});

export const updatetotalAval = value => ({
  type: UPDATE_TOTAL_AVAILABLE,
  value: value,
});
export const updateOccupancy = value => ({
  type: UPDATE_OCCUPANCY,
  value: value,
});

export const checkedtitle = value => ({
  type: CHECKED_title,
  value: value,
});
export const checkedAC = value => ({
  type: CHECKED_AC,
  value: value,
});
export const checkedAttached = value => ({
  type: CHECKED_ATTACHED,
  value: value,
});
export const checkedPrices = value => ({
  type: CHECKED_PRICES,
  value: value,
});
export const checkedAvailableRoom = value => ({
  type: CHECKED_TOTAL_AVAILABLE,
  value: value,
});
export const checkedoccupancy = value => ({
  type: CHECKED_OCCUPANCY,
  value: value,
});

export const focusedtitle = value => ({
  type: FOCUSED_title,
  value: value,
});
export const focusedAC = value => ({
  type: FOCUSED_AC,
  value: value,
});
export const focusedAttached = value => ({
  type: FOCUSED_ATTACHED,
  value: value,
});
export const focusedPrices = value => ({
  type: FOCUSED_PRICES,
  value: value,
});

export const focusedTotalAvai = value => ({
  type: FOCUSED_TOTAL_AVAILABLE,
  value: value,
});
export const focusedOccupancy = value => ({
  type: FOCUSED_OCCUPANCY,
  value: value,
});
