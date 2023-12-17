import { delay, put, takeLatest } from "redux-saga/effects";
import {
  ADD_USER_EMAIL_START,
  CHANGE_PASSWORD_START,
  CHECK_PASSWORD_FOR_DELETE_ACCOUNT_START,
  CREATE_USER_ACCOUNT_START,
  DELETE_USER_ACCOUNT_START,
  EDIT_USER_ACCOUNT_START,
  FOLLOW_BLOGGER_START,
  FORGET_CHANGE_PASSWORD_START,
  GET_ALL_BLOGGERS_DATA_START,
  GET_BLOGGER_DATA_START,
  LOGIN_USER_ACCOUNT_START,
  REMOVE_USER_EMAIL_START,
  UNFOLLOW_BLOGGER_START,
  VERIFY_USER_AUTH_START,
} from "../Constants/UserConstants";
import {
  addUserEmail,
  changePassword,
  checkPasswordForDeleteAccount,
  createUserAccount,
  deleteUserAccount,
  editUserAccount,
  followBlogger,
  forgetChangePassword,
  getAllBloggersData,
  getBloggerData,
  loginUserAccount,
  removeUserEmail,
  unfollowBlogger,
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
  followBloggerError,
  forgetChangePasswordError,
  forgetChangePasswordSuccess,
  getAllBloggersDataError,
  getAllBloggersDataSuccess,
  getBloggerDataError,
  getBloggerDataSuccess,
  loginUserAccountError,
  loginUserAccountSuccess,
  notAuthorised,
  removeUserEmailError,
  removeUserEmailSuccess,
  unfollowBloggerError,
  verifyUserAuthError,
  verifyUserAuthSuccess,
} from "../Actions/UserAction";

function* createUserSaga({ payload }) {
  try {
    const Response = yield createUserAccount(payload);
    if (Response.hasOwnProperty("userCreated")) {
      switch (Response.userCreated) {
        case true:
          yield delay(3000);
          yield put(createUserAccountSuccess(Response.data));
          yield put(authorised(true));
          break;
        case false:
          yield delay(1000);
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
    yield delay(2000);
    yield put(createUserAccountError(error.message));
  }
}

function* verifyUserAuthSaga({ payload }) {
  try {
    const Response = yield verifyUserAuth(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield delay(1500);
      yield put(notAuthorised(false));
      yield localStorage.removeItem("blogApp");
    } else {
      if (Response.hasOwnProperty("verification")) {
        switch (Response.verification) {
          case true:
            yield delay(2000);
            yield put(verifyUserAuthSuccess(Response.data));
            yield put(authorised(true));
            break;
          case false:
            yield delay(1500);
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
    yield delay(1500);
    yield put(verifyUserAuthError(error.message));
  }
}

function* loginUserAccountSaga({ payload }) {
  try {
    const Response = yield loginUserAccount(payload);
    if (Response.hasOwnProperty("userLoginSuccess")) {
      switch (Response.userLoginSuccess) {
        case true:
          yield delay(3000);
          yield put(loginUserAccountSuccess(Response.data));
          yield put(authorised(true));
          break;
        case false:
          yield delay(1000);
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
    yield delay(2000);
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
            yield delay(2000);
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
    yield delay(2000);
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
    yield delay(1500);
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
            yield delay(1500);
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
    yield delay(1500);
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
            yield delay(2500);
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
    yield delay(1500);
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
            yield delay(2500);
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
    yield delay(1500);
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
            yield delay(500);
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
    yield delay(500);
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
            yield delay(3500);
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
    yield delay(3500);
    yield put(deleteUserAccountError(error.message));
  }
}

function* getBloggerDataSaga({ payload }) {
  try {
    const Response = yield getBloggerData(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("bloggerData")) {
        yield delay(1000);
        yield put(getBloggerDataSuccess(Response.bloggerData));
        yield put(authorised(true));
      } else {
        throw Error(Response.errorMessage);
      }
    }
  } catch (error) {
    yield delay(1000);
    yield put(getBloggerDataError(error.message));
  }
}

function* followBloggerSaga({ payload }) {
  try {
    const Response = yield followBlogger(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("followed")) {
        switch (Response.followed) {
          case true:
            yield put(authorised(true));
            yield put(verifyUserAuthSuccess(Response.userData));
            yield put(getBloggerDataSuccess(Response.bloggerData));
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield delay(1000);
    followBloggerError(error.message);
  }
}

function* unfollowBloggerSaga({ payload }) {
  try {
    const Response = yield unfollowBlogger(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("unfollowed")) {
        switch (Response.unfollowed) {
          case true:
            yield put(authorised(true));
            yield put(verifyUserAuthSuccess(Response.userData));
            yield put(getBloggerDataSuccess(Response.bloggerData));
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield delay(1000);
    unfollowBloggerError(error.message);
  }
}

function* getAllBloggersDataSaga({ payload }) {
  try {
    const Response = yield getAllBloggersData(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("success")) {
        switch (Response.success) {
          case true:
            yield delay(1000);
            yield put(authorised(true));
            yield put(getAllBloggersDataSuccess(Response.bloggersList));
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield delay(1000);
    yield put(getAllBloggersDataError(error.message));
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
  yield takeLatest(GET_BLOGGER_DATA_START, getBloggerDataSaga);

  yield takeLatest(FOLLOW_BLOGGER_START, followBloggerSaga);
  yield takeLatest(UNFOLLOW_BLOGGER_START, unfollowBloggerSaga);

  yield takeLatest(GET_ALL_BLOGGERS_DATA_START, getAllBloggersDataSaga);
}

export { userSaga };
