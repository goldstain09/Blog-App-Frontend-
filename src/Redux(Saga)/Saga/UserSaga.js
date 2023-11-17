import { put, takeLatest } from "redux-saga/effects";
import {
  CREATE_USER_ACCOUNT_START,
  VERIFY_USER_AUTH_START,
} from "../Constants/UserConstants";
import { createUserAccount, verifyUserAuth } from "../Service";
import {
  authorised,
  createUserAccountError,
  createUserAccountSuccess,
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
          yield put(createUserAccountSuccess(Response));
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
            yield put(verifyUserAuthSuccess(Response));
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

function* userSaga() {
  yield takeLatest(CREATE_USER_ACCOUNT_START, createUserSaga);
  yield takeLatest(VERIFY_USER_AUTH_START, verifyUserAuthSaga);
}

export { userSaga };
