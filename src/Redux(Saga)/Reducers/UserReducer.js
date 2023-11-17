import {
  AUTHORISED,
  CREATE_USER_ACCOUNT_ERROR,
  CREATE_USER_ACCOUNT_START,
  CREATE_USER_ACCOUNT_SUCCESS,
  NOT_AUTHORISED,
  VERIFY_USER_AUTH_ERROR,
  VERIFY_USER_AUTH_START,
  VERIFY_USER_AUTH_SUCCESS,
} from "../Constants/UserConstants";

const initialState = {
  UserDataFromResponse: {},
  createUserLoading: false,
  createUserError: "",
  verifyUserLoading: false,
  verifyUserError: "",

  authorised: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // authorisation
    case AUTHORISED:
      return {
        ...state,
        authorised: { authorised: true },
      };
    case NOT_AUTHORISED:
      return {
        ...state,
        authorised: { authorised: false },
        UserDataFromResponse: {},
      };

    // creating user
    case CREATE_USER_ACCOUNT_START:
      return {
        ...state,
        createUserLoading: true,
        createUserError: "",
      };
    case CREATE_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        createUserLoading: false,
        UserDataFromResponse: action.payload,
        createUserError: "",
      };
    case CREATE_USER_ACCOUNT_ERROR:
      return {
        ...state,
        createUserLoading: false,
        createUserError: action.payload,
      };

    // verification
    case VERIFY_USER_AUTH_START:
      return {
        ...state,
        verifyUserLoading: true,
        verifyUserError: "",
      };
    case VERIFY_USER_AUTH_SUCCESS:
      return {
        ...state,
        UserDataFromResponse: action.payload,
        verifyUserLoading: false,
        verifyUserError: "",
      };
    case VERIFY_USER_AUTH_ERROR:
      return {
        ...state,
        verifyUserLoading: false,
        verifyUserError: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
