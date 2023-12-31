import {
  ADD_USER_EMAIL_ERROR,
  ADD_USER_EMAIL_START,
  ADD_USER_EMAIL_SUCCESS,
  AUTHORISED,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHECK_PASSWORD_FOR_DELETE_ACCOUNT_ERROR,
  CHECK_PASSWORD_FOR_DELETE_ACCOUNT_START,
  CHECK_PASSWORD_FOR_DELETE_ACCOUNT_SUCCESS,
  CREATE_USER_ACCOUNT_ERROR,
  CREATE_USER_ACCOUNT_START,
  CREATE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_ERROR,
  DELETE_USER_ACCOUNT_START,
  DELETE_USER_ACCOUNT_SUCCESS,
  EDIT_USER_ACCOUNT_ERROR,
  EDIT_USER_ACCOUNT_START,
  EDIT_USER_ACCOUNT_SUCCESS,
  FOLLOW_BLOGGER_ERROR,
  FOLLOW_BLOGGER_START,
  FORGET_CHANGE_PASSWORD_ERROR,
  FORGET_CHANGE_PASSWORD_START,
  FORGET_CHANGE_PASSWORD_SUCCESS,
  GET_ALL_BLOGGERS_DATA_ERROR,
  GET_ALL_BLOGGERS_DATA_START,
  GET_ALL_BLOGGERS_DATA_SUCCESS,
  GET_BLOGGER_DATA_ERROR,
  GET_BLOGGER_DATA_START,
  GET_BLOGGER_DATA_SUCCESS,
  LOGIN_USER_ACCOUNT_ERROR,
  LOGIN_USER_ACCOUNT_START,
  LOGIN_USER_ACCOUNT_SUCCESS,
  NOT_AUTHORISED,
  REMOVE_USER_EMAIL_ERROR,
  REMOVE_USER_EMAIL_START,
  REMOVE_USER_EMAIL_SUCCESS,
  UNFOLLOW_BLOGGER_ERROR,
  UNFOLLOW_BLOGGER_START,
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

  loginUserLoading: false,
  loginUserError: "",

  editUserLoading: false,
  editUserError: "",

  addUserEmailLoading: false,
  addUserEmailError: "",

  removeUserEmailLoading: false,
  removeUserEmailError: "",

  changePasswordLoading: false,
  changePasswordError: "",

  forgetchangePasswordLoading: false,
  forgetchangePasswordError: "",

  checkPasswordForDeleteAccountLoading: false,
  checkPasswordForDeleteAccountError: "",

  deleteUserAccountLoading: false,
  deleteUserAccountError: "",

  bloggerDataLoading: false,
  bloggerDataError: "",
  bloggerDataResponse: {},

  getAllBloggersDataLoading: false,
  getAllBloggersDataError: "",
  getAllBloggersDataResponse: {},

  followBloggerLoading: false,
  followBloggerError: "",

  unfollowBloggerLoading: false,
  unfollowBloggerError: "",

  authorised: { authorised: false },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // authorisation
    case AUTHORISED:
      return {
        ...state,
        authorised: { authorised: true },
        verifyUserLoading:false
      };
    case NOT_AUTHORISED:
      return {
        ...state,
        authorised: { authorised: false },
        UserDataFromResponse: {},
        verifyUserLoading:false
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

    // login user
    case LOGIN_USER_ACCOUNT_START:
      return {
        ...state,
        loginUserError: "",
        loginUserLoading: true,
      };
    case LOGIN_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        loginUserError: "",
        loginUserLoading: false,
        UserDataFromResponse: action.payload,
      };
    case LOGIN_USER_ACCOUNT_ERROR:
      return {
        ...state,
        loginUserError: action.payload,
        loginUserLoading: false,
      };

    // edit user
    case EDIT_USER_ACCOUNT_START:
      return {
        ...state,
        editUserLoading: true,
        editUserError: "",
      };
    case EDIT_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        UserDataFromResponse: action.payload,
        editUserError: "",
        editUserLoading: false,
      };
    case EDIT_USER_ACCOUNT_ERROR:
      return {
        ...state,
        editUserLoading: false,
        editUserError: action.payload,
      };

    // add user email
    case ADD_USER_EMAIL_START:
      return {
        ...state,
        addUserEmailError: "",
        addUserEmailLoading: true,
      };
    case ADD_USER_EMAIL_SUCCESS:
      return {
        ...state,
        addUserEmailError: "",
        addUserEmailLoading: false,
        UserDataFromResponse: action.payload,
      };
    case ADD_USER_EMAIL_ERROR:
      return {
        ...state,
        addUserEmailError: action.payload,
        addUserEmailLoading: false,
      };

    // remove user email
    case REMOVE_USER_EMAIL_START:
      return {
        ...state,
        removeUserEmailError: "",
        removeUserEmailLoading: true,
      };
    case REMOVE_USER_EMAIL_SUCCESS:
      return {
        ...state,
        removeUserEmailError: "",
        removeUserEmailLoading: false,
        UserDataFromResponse: action.payload,
      };
    case REMOVE_USER_EMAIL_ERROR:
      return {
        ...state,
        removeUserEmailError: action.payload,
        removeUserEmailLoading: false,
      };

    // change Password
    case CHANGE_PASSWORD_START:
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordError: "",
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordError: "",
        changePasswordLoading: false,
        UserDataFromResponse: action.payload,
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordError: action.payload,
        changePasswordLoading: false,
      };

    // forget change pasword
    case FORGET_CHANGE_PASSWORD_START:
      return {
        ...state,
        forgetchangePasswordError: "",
        forgetchangePasswordLoading: true,
      };
    case FORGET_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        forgetchangePasswordError: "",
        forgetchangePasswordLoading: false,
        UserDataFromResponse: action.payload,
      };
    case FORGET_CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        forgetchangePasswordError: action.payload,
        forgetchangePasswordLoading: false,
      };

    // check Password for delete account
    case CHECK_PASSWORD_FOR_DELETE_ACCOUNT_START:
      return {
        ...state,
        checkPasswordForDeleteAccountError: "",
        checkPasswordForDeleteAccountLoading: true,
      };
    case CHECK_PASSWORD_FOR_DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        checkPasswordForDeleteAccountError: "",
        checkPasswordForDeleteAccountLoading: false,
        UserDataFromResponse: action.payload,
      };
    case CHECK_PASSWORD_FOR_DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        checkPasswordForDeleteAccountLoading: false,
        checkPasswordForDeleteAccountError: action.payload,
      };

    // delete account
    case DELETE_USER_ACCOUNT_START:
      return {
        ...state,
        deleteUserAccountError: "",
        deleteUserAccountLoading: true,
      };
    case DELETE_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        deleteUserAccountError: "",
        deleteUserAccountLoading: false,
        UserDataFromResponse: action.payload,
      };
    case DELETE_USER_ACCOUNT_ERROR:
      return {
        ...state,
        deleteUserAccountError: action.payload,
        deleteUserAccountLoading: false,
      };

    //blogger data
    case GET_BLOGGER_DATA_START:
      return {
        ...state,
        bloggerDataError: "",
        bloggerDataLoading: true,
      };
    case GET_BLOGGER_DATA_SUCCESS:
      return {
        ...state,
        bloggerDataError: "",
        bloggerDataLoading: false,
        bloggerDataResponse: action.payload,
        followBloggerLoading: false,
        unfollowBloggerLoading: false,
      };
    case GET_BLOGGER_DATA_ERROR:
      return {
        ...state,
        bloggerDataError: action.payload,
        bloggerDataLoading: false,
      };

    // follow blogger
    case FOLLOW_BLOGGER_START:
      return {
        ...state,
        followBloggerError: "",
        followBloggerLoading: true,
      };
    case FOLLOW_BLOGGER_ERROR:
      return {
        ...state,
        followBloggerError: action.payload,
        followBloggerLoading: false,
      };

    // unfollow blogger
    case UNFOLLOW_BLOGGER_START:
      return {
        ...state,
        unfollowBloggerError: "",
        unfollowBloggerLoading: true,
      };
    case UNFOLLOW_BLOGGER_ERROR:
      return {
        ...state,
        unfollowBloggerError: action.payload,
        unfollowBloggerLoading: false,
      };

    // all bloggers data
    case GET_ALL_BLOGGERS_DATA_START:
      return {
        ...state,
        getAllBloggersDataError: "",
        getAllBloggersDataLoading: true,
      };
    case GET_ALL_BLOGGERS_DATA_SUCCESS:
      return {
        ...state,
        getAllBloggersDataError: "",
        getAllBloggersDataLoading: false,
        getAllBloggersDataResponse: action.payload,
      };
    case GET_ALL_BLOGGERS_DATA_ERROR:
      return {
        ...state,
        getAllBloggersDataError: action.payload,
        getAllBloggersDataLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
