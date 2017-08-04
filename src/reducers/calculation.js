import {
  CALCULATE_TOTAL_HOURS,
  CALCULATE_GENERAL_HOURS,
  CALCULATE_ADDITIONAL_TIME,
  CALCULATE_PROBABILITY_TIME,
} from '../constants/actionTypes';

import initialState from './initialState';

export function calculation(state = initialState.calculation, action) {
  switch (action.type) {
    case CALCULATE_GENERAL_HOURS:
      return { ...state, ...action.payload };

    case CALCULATE_TOTAL_HOURS:
      return { ...state, ...action.payload };

    case CALCULATE_PROBABILITY_TIME:
      return { ...state, ...action.payload };

    case CALCULATE_ADDITIONAL_TIME:
      return {
        ...state,
        additionalTime: { ...state.additionalTime, ...action.payload },
      };

    default:
      return state;
  }
}

export default calculation;
