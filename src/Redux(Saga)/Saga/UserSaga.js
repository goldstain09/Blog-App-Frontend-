import { put, take, takeLatest } from "redux-saga/effects";
import {
  ADD_USER_EMAIL_START,
  CREATE_USER_ACCOUNT_START,
  EDIT_USER_ACCOUNT_START,
  LOGIN_USER_ACCOUNT_START,
  VERIFY_USER_AUTH_START,
} from "../Constants/UserConstants";
import {
  addUserEmail,
  createUserAccount,
  editUserAccount,
  loginUserAccount,
  verifyUserAuth,
} from "../Service";
import {
  addUserEmailError,
  addUserEmailSuccess,
  authorised,
  createUserAccountError,
  createUserAccountSuccess,
  editUserAccountError,
  editUserAccountSuccess,
  loginUserAccountError,
  loginUserAccountSuccess,
  notAuthorised,
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
          } else {
            yield put(authorised(false));
            throw Error("");
          }
          break;
        default:
          yield put(authorised(false));
          throw Error("");
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
    } else {
      if (Response.hasOwnProperty("verification")) {
        switch (Response.verification) {
          case true:
            yield put(verifyUserAuthSuccess(Response.data));
            yield put(authorised(true));
            break;
          case false:
            yield put(notAuthorised(false));
            throw Error("");
          default:
            yield put(notAuthorised(false));
            throw Error("");
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
        default:
          throw Error("Unable to Login at the moment!");
      }
    }
  } catch (error) {
    yield put(loginUserAccountError(error.message));
  }
}

function* editUserAccountSaga({ payload }) {
  try {
    const Response = yield editUserAccount(payload);
    if (Response.hasOwnProperty("userUpdated")) {
      switch (Response.userUpdated) {
        case true:
          yield put(editUserAccountSuccess(Response.data));
          yield put(authorised(true));
          break;

        case false:
          yield put(notAuthorised(false));
          throw Error(Response.errorMessage);
        default:
          throw Error("Unable to Update at the moment!");
      }
    }
  } catch (error) {
    yield put(editUserAccountError(error.message));
  }
}

function* addUserEmailSaga({ payload }) {
  try {
    const Response = yield addUserEmail(payload);
    if (Response.hasOwnProperty("emailUpdated")) {
      switch (Response.emailUpdated) {
        case true:
          yield put(addUserEmailSuccess(Response.data));
          yield put(authorised(true));
          break;
        case false:
          yield put(notAuthorised(false));
          throw Error(Response.errorMessage);
        default:
          throw Error("Something went wrong!");
      }
    } else {
      throw Error("Something went wrong!");
    }
  } catch (error) {
    yield put(addUserEmailError(error.message));
  }
}

function* userSaga() {
  yield takeLatest(CREATE_USER_ACCOUNT_START, createUserSaga);
  yield takeLatest(VERIFY_USER_AUTH_START, verifyUserAuthSaga);
  yield takeLatest(LOGIN_USER_ACCOUNT_START, loginUserAccountSaga);
  yield takeLatest(EDIT_USER_ACCOUNT_START, editUserAccountSaga);
  yield takeLatest(ADD_USER_EMAIL_START, addUserEmailSaga);
}

export { userSaga };
