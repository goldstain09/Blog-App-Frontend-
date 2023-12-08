import { put, takeLatest } from "redux-saga/effects";
import {
  ADD_USER_EMAIL_START,
  CHANGE_PASSWORD_START,
  CHECK_PASSWORD_FOR_DELETE_ACCOUNT_START,
  CREATE_USER_ACCOUNT_START,
  DELETE_USER_ACCOUNT_START,
  EDIT_USER_ACCOUNT_START,
  FORGET_CHANGE_PASSWORD_START,
  LOGIN_USER_ACCOUNT_START,
  REMOVE_USER_EMAIL_START,
  VERIFY_USER_AUTH_START,
} from "../Constants/UserConstants";
import {
  addUserEmail,
  changePassword,
  checkPasswordForDeleteAccount,
  createUserAccount,
  deleteUserAccount,
  editUserAccount,
  forgetChangePassword,
  loginUserAccount,
  removeUserEmail,
  verifyUserAuth,
} from "../Service/UserService";
import {
  addUserEmailError,
  addUserEmailSuccess,
  authorised,
  changePasswordError,
  changePasswordSuccess,
  checkPasswordForDeleteAccountError,
  checkPasswordForDeleteAccountSuccess,
  createUserAccountError,
  createUserAccountSuccess,
  deleteUserAccountError,
  deleteUserAccountSuccess,
  editUserAccountError,
  editUserAccountSuccess,
  forgetChangePasswordError,
  forgetChangePasswordSuccess,
  loginUserAccountError,
  loginUserAccountSuccess,
  notAuthorised,
  removeUserEmailError,
  removeUserEmailSuccess,
  verifyUserAuthError,
  verifyUserAuthSuccess,
} from "../Actions/UserAction";

function* createUserSaga({ payload }) {
  try {
    const Response = yield createUserAccount(payload);
    if (Response.hasOwnProperty("userCreated")) {
      switch (Response.userCreated) {
        case true:
          yield put(createUserAccountSuccess(Response.data));
          yield put(authorised(true));
          break;
        case false:
          if (Response.hasOwnProperty("userNameIsUnique")) {
            yield put(createUserAccountSuccess(Response));
          } else if (Response.hasOwnProperty("errorMessage")) {
            yield put(notAuthorised(false));
            throw Error(Response.errorMessage);
          }
          break;
      }
    } else {
      throw Error("");
    }
  } catch (error) {
    yield put(createUserAccountError(error.message));
  }
}

function* verifyUserAuthSaga({ payload }) {
  try {
    const Response = yield verifyUserAuth(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
      yield localStorage.removeItem("blogApp");
    } else {
      if (Response.hasOwnProperty("verification")) {
        switch (Response.verification) {
          case true:
            yield put(verifyUserAuthSuccess(Response.data));
            yield put(authorised(true));
            break;
          case false:
            if (Response.hasOwnProperty("errorMessage")) {
              yield localStorage.removeItem("blogApp");
              throw Error(Response.errorMessage);
            } else {
              yield localStorage.removeItem("blogApp");
              yield put(notAuthorised(false));
            }
        }
      } else {
        yield put(notAuthorised(false));
        throw Error("");
      }
    }
  } catch (error) {
    yield put(verifyUserAuthError(error.message));
  }
}

function* loginUserAccountSaga({ payload }) {
  try {
    const Response = yield loginUserAccount(payload);
    if (Response.hasOwnProperty("userLoginSuccess")) {
      switch (Response.userLoginSuccess) {
        case true:
          yield put(loginUserAccountSuccess(Response.data));
          yield put(authorised(true));
          break;
        case false:
          if (Response.hasOwnProperty("PasswordIsWrong")) {
            yield put(loginUserAccountSuccess(Response));
            // yield put(notAuthorised(false));
          } else if (Response.hasOwnProperty("userNameIsWrong")) {
            yield put(loginUserAccountSuccess(Response));
            // yield put(notAuthorised(false));
          } else {
            yield put(notAuthorised(false));
            throw Error(Response.errorMessage);
          }
          break;
      }
    } else {
      throw Error("Something went wrong!");
    }
  } catch (error) {
    yield put(loginUserAccountError(error.message));
  }
}

function* editUserAccountSaga({ payload }) {
  try {
    const Response = yield editUserAccount(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
      yield localStorage.removeItem("blogApp");
    } else {
      if (Response.hasOwnProperty("userUpdated")) {
        switch (Response.userUpdated) {
          case true:
            yield put(editUserAccountSuccess(Response.data));
            yield put(authorised(true));
            break;

          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(editUserAccountError(error.message));
  }
}

function* addUserEmailSaga({ payload }) {
  try {
    const Response = yield addUserEmail(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
      yield localStorage.removeItem("blogApp");
    } else {
      if (Response.hasOwnProperty("emailUpdated")) {
        switch (Response.emailUpdated) {
          case true:
            yield put(addUserEmailSuccess(Response.data));
            yield put(authorised(true));
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(addUserEmailError(error.message));
  }
}

function* removeUserEmailSaga({ payload }) {
  try {
    // console.log(payload);
    const Response = yield removeUserEmail(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
      yield localStorage.removeItem("blogApp");
    } else {
      if (Response.hasOwnProperty("emailDeleted")) {
        switch (Response.emailDeleted) {
          case true:
            yield localStorage.setItem(
              "blogApp",
              JSON.stringify({
                token: Response.data.jwToken,
                validity: "15 minutes",
              })
            );
            yield put(removeUserEmailSuccess(Response.data));
            yield put(authorised(true));
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(removeUserEmailError(error.message));
  }
}

function* changePasswordSaga({ payload }) {
  try {
    const Response = yield changePassword(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
      yield localStorage.removeItem("blogApp");
    } else {
      if (Response.hasOwnProperty("passwordUpdated")) {
        switch (Response.passwordUpdated) {
          case true:
            yield put(changePasswordSuccess(Response.data));
            yield put(authorised(true));
            break;
          case false:
            if (Response.hasOwnProperty("wrongPassword")) {
              // i put success here bcz in this when pswrd is wrong i send user data also to handle the situation if user forget his current password
              // then their data should be saved in the state, so that any error will not shown about user data!!!
              yield put(changePasswordSuccess(Response.data));
              yield put(authorised(true));
            } else {
              throw Error(`Something went wrong! ${Response.errorMessage}`);
            }
            break;
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(changePasswordError(error.message));
  }
}

function* forgetChangePasswordSaga({ payload }) {
  try {
    const Response = yield forgetChangePassword(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
      yield localStorage.removeItem("blogApp");
    } else {
      if (Response.hasOwnProperty("passwordUpdated")) {
        switch (Response.passwordUpdated) {
          case true:
            yield put(forgetChangePasswordSuccess(Response.data));
            yield put(authorised(true));
            break;
          case false:
            throw Error(`Something went wrong! ${Response.errorMessage}`);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(forgetChangePasswordError(error.message));
  }
}

function* checkPasswordForDeleteAccountSaga({ payload }) {
  try {
    const Response = yield checkPasswordForDeleteAccount(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
      yield localStorage.removeItem("blogApp");
    } else {
      if (Response.hasOwnProperty("passwordCorrect")) {
        switch (Response.passwordCorrect) {
          case true:
            yield put(checkPasswordForDeleteAccountSuccess(Response.data));
            yield put(authorised(true));
            break;
          case false:
            if (Response.hasOwnProperty("data")) {
              yield put(checkPasswordForDeleteAccountSuccess(Response.data)); // password is incorrect here
              yield put(authorised(true));
            } else {
              throw Error(Response.errorMessage);
            }
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(checkPasswordForDeleteAccountError(error.message));
  }
}
function* deleteUserAccountSaga({ payload }) {
  try {
    const Response = yield deleteUserAccount(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
      yield localStorage.removeItem("blogApp");
    } else {
      if (Response.hasOwnProperty("accountDeleted")) {
        switch (Response.accountDeleted) {
          case true:
            yield put(deleteUserAccountSuccess(Response.data));
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(deleteUserAccountError(error.message));
  }
}

function* userSaga() {
  yield takeLatest(CREATE_USER_ACCOUNT_START, createUserSaga);
  yield takeLatest(VERIFY_USER_AUTH_START, verifyUserAuthSaga);
  yield takeLatest(LOGIN_USER_ACCOUNT_START, loginUserAccountSaga);
  yield takeLatest(EDIT_USER_ACCOUNT_START, editUserAccountSaga);
  yield takeLatest(ADD_USER_EMAIL_START, addUserEmailSaga);
  yield takeLatest(REMOVE_USER_EMAIL_START, removeUserEmailSaga);
  yield takeLatest(CHANGE_PASSWORD_START, changePasswordSaga);
  yield takeLatest(FORGET_CHANGE_PASSWORD_START, forgetChangePasswordSaga);
  yield takeLatest(
    CHECK_PASSWORD_FOR_DELETE_ACCOUNT_START,
    checkPasswordForDeleteAccountSaga
  );
  yield takeLatest(DELETE_USER_ACCOUNT_START, deleteUserAccountSaga);
}

export { userSaga };
