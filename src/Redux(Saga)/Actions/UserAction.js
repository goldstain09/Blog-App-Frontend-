import {
  AUTHORISED,
  AUTHORISED_ERROR,
  AUTHORISED_START,
  AUTHORISED_SUCCESS,
  CREATE_USER_ACCOUNT_ERROR,
  CREATE_USER_ACCOUNT_START,
  CREATE_USER_ACCOUNT_SUCCESS,
  EDIT_USER_ACCOUNT_ERROR,
  EDIT_USER_ACCOUNT_START,
  EDIT_USER_ACCOUNT_SUCCESS,
  LOGIN_USER_ACCOUNT_ERROR,
  LOGIN_USER_ACCOUNT_START,
  LOGIN_USER_ACCOUNT_SUCCESS,
  NOT_AUTHORISED,
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
