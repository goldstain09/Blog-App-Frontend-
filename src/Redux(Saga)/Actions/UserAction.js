import {
  ADD_USER_EMAIL_ERROR,
  ADD_USER_EMAIL_START,
  ADD_USER_EMAIL_SUCCESS,
  AUTHORISED,
  AUTHORISED_ERROR,
  AUTHORISED_START,
  AUTHORISED_SUCCESS,
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
  FORGET_CHANGE_PASSWORD_ERROR,
  FORGET_CHANGE_PASSWORD_START,
  FORGET_CHANGE_PASSWORD_SUCCESS,
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
  VERIFY_USER_AUTH_ERROR,
  VERIFY_USER_AUTH_START,
  VERIFY_USER_AUTH_SUCCESS,
} from "../Constants/UserConstants";

// actions for creating a user
export const createUserAccountStart = (user_info) => ({
  type: CREATE_USER_ACCOUNT_START,
  payload: user_info,
});
export const createUserAccountSuccess = (user_info) => ({
  type: CREATE_USER_ACCOUNT_SUCCESS,
  payload: user_info,
});
export const createUserAccountError = (error) => ({
  type: CREATE_USER_ACCOUNT_ERROR,
  payload: error,
});

// user authorisation
export const verifyUserAuthStart = (token) => ({
  type: VERIFY_USER_AUTH_START,
  payload: token,
});
export const verifyUserAuthSuccess = (user_info) => ({
  type: VERIFY_USER_AUTH_SUCCESS,
  payload: user_info,
});
export const verifyUserAuthError = (error) => ({
  type: VERIFY_USER_AUTH_ERROR,
  payload: error,
});

// authorise or not!!
export const authorised = (data) => ({
  type: AUTHORISED,
  payload: data,
});
export const notAuthorised = (data) => ({
  type: NOT_AUTHORISED,
  payload: data,
});

// user login
export const loginUserAccountStart = (data) => ({
  type: LOGIN_USER_ACCOUNT_START,
  payload: data,
});
export const loginUserAccountSuccess = (data) => ({
  type: LOGIN_USER_ACCOUNT_SUCCESS,
  payload: data,
});
export const loginUserAccountError = (data) => ({
  type: LOGIN_USER_ACCOUNT_ERROR,
  payload: data,
});

// edit or update
export const editUserAccountStart = (data) => ({
  type: EDIT_USER_ACCOUNT_START,
  payload: data,
});
export const editUserAccountSuccess = (data) => ({
  type: EDIT_USER_ACCOUNT_SUCCESS,
  payload: data,
});
export const editUserAccountError = (data) => ({
  type: EDIT_USER_ACCOUNT_ERROR,
  payload: data,
});

// ADD USER EMAIL
export const addUserEmailStart = (data) => ({
  type: ADD_USER_EMAIL_START,
  payload: data,
});
export const addUserEmailSuccess = (data) => ({
  type: ADD_USER_EMAIL_SUCCESS,
  payload: data,
});
export const addUserEmailError = (data) => ({
  type: ADD_USER_EMAIL_ERROR,
  payload: data,
});

// REMOVE USER EMAIL
export const removeUserEmailStart = (data) => ({
  type: REMOVE_USER_EMAIL_START,
  payload: data,
});
export const removeUserEmailSuccess = (data) => ({
  type: REMOVE_USER_EMAIL_SUCCESS,
  payload: data,
});
export const removeUserEmailError = (data) => ({
  type: REMOVE_USER_EMAIL_ERROR,
  payload: data,
});

// for changing password
export const changePasswordStart = (data) => ({
  type: CHANGE_PASSWORD_START,
  payload: data,
});
export const changePasswordSuccess = (data) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: data,
});
export const changePasswordError = (data) => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: data,
});

// for changing password if user forgets passwordd
export const forgetChangePasswordStart = (data) => ({
  type: FORGET_CHANGE_PASSWORD_START,
  payload: data,
});
export const forgetChangePasswordSuccess = (data) => ({
  type: FORGET_CHANGE_PASSWORD_SUCCESS,
  payload: data,
});
export const forgetChangePasswordError = (data) => ({
  type: FORGET_CHANGE_PASSWORD_ERROR,
  payload: data,
});

// for password checking to delete user account
export const checkPasswordForDeleteAccountStart = (data) => ({
  type: CHECK_PASSWORD_FOR_DELETE_ACCOUNT_START,
  payload: data,
});
export const checkPasswordForDeleteAccountSuccess = (data) => ({
  type: CHECK_PASSWORD_FOR_DELETE_ACCOUNT_SUCCESS,
  payload: data,
});
export const checkPasswordForDeleteAccountError = (data) => ({
  type: CHECK_PASSWORD_FOR_DELETE_ACCOUNT_ERROR,
  payload: data,
});

// for deleting user account
export const deleteUserAccountStart = (data) => ({
  type: DELETE_USER_ACCOUNT_START,
  payload: data,
});
export const deleteUserAccountSuccess = (data) => ({
  type: DELETE_USER_ACCOUNT_SUCCESS,
  payload: data,
});
export const deleteUserAccountError = (data) => ({
  type: DELETE_USER_ACCOUNT_ERROR,
  payload: data,
});

// to get blogger data
export const getBloggerDataStart = (data) => ({
  type: GET_BLOGGER_DATA_START,
  payload: data,
});
export const getBloggerDataSuccess = (data) => ({
  type: GET_BLOGGER_DATA_SUCCESS,
  payload: data,
});
export const getBloggerDataError = (data) => ({
  type: GET_BLOGGER_DATA_ERROR,
  payload: data,
});
