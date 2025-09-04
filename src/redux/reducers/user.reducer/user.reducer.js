import { userConstants } from "../../../system/constants/globleConstants/globleConstants";
const initialState = {
  userData: {},
  loading: false,
  currentUser: {},
  newUserList: [],
  newUserListLemgth: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.GET_USER:
      // console.log(action.payload);
      return {
        ...state,
        userData: action.payload,
      };
    case userConstants.GET_USERS:
      // console.log(action.payload);
      return {
        ...state,
        newUserList: action.payload,
      };
    case userConstants.GET_USERSLIST:
      // console.log(action.payload);
      return {
        ...state,
        newUserListLemgth: action.payload,
      };
    case userConstants.USER_CREATED:
      // console.log(action.payload);

      return {
        ...state,
        userData: action.payload,
      };

    case userConstants.LOADING:
      // console.log(action.payload);

      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
