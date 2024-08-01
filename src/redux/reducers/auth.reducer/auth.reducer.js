import { floorList, LoginConstants } from "../../../system/constants/globleConstants/globleConstants";
const initialState = {
  userData: {},
  loading: false,
  currentUser: {},
  floorList:[]
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginConstants.Login:
      return {
        ...state,
        userData: action.payload,
      };
    case LoginConstants.CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case LoginConstants.GET_FLOOR:
      return {
        ...state,
        floorList: action.payload,
      };
    case LoginConstants.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
