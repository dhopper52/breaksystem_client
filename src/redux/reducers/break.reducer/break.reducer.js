import {
  userConstants,
  breakConstants,
} from "../../../system/constants/globleConstants/globleConstants";
const initialState = {
  userData: {},
  loading: false,
  breakList: {},
};

const breakReducer = (state = initialState, action) => {
  switch (action.type) {
    case breakConstants.BREAK_DAILY:
      return {
        ...state,
        breakList: action.payload,
      };
    case breakConstants.BREAK_MONTHLY:
      return {
        ...state,
        breakList: action.payload,
      };

    case breakConstants.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default breakReducer;
