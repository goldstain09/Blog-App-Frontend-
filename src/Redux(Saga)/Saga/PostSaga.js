import { delay, put, takeLatest } from "redux-saga/effects";
import {
  DELETE_A_BLOG_START,
  DELETE_A_COMMENT_START,
  GET_ALL_POST_DATA_START,
  GET_POST_DATA_START,
  LIKE_POST_START,
  POST_A_BLOG_START,
  POST_A_COMMENT_START,
  SAVE_POST_START,
  UNLIKE_POST_START,
  UNSAVE_POST_START,
  UPDATE_A_BLOG_START,
} from "../Constants/PostConstants";
import {
  deleteBlog,
  deleteComment,
  getAllPostsData,
  getPostData,
  likePost,
  postABlog,
  postComment,
  savePost,
  unlikePost,
  unsavePost,
  updateBlog,
} from "../Service/PostService";
import {
  deleteBlogError,
  deleteBlogSuccess,
  deleteCommentError,
  getAllPostsDataError,
  getAllPostsDataSuccess,
  getPostDataError,
  getPostDataSuccess,
  likePostError,
  likePostSuccess,
  postBlogError,
  postBlogSuccess,
  postCommentError,
  postCommentSuccess,
  savePostError,
  savePostSuccess,
  unLikePostError,
  unLikePostSuccess,
  unSavePostError,
  unSavePostSuccess,
  updateBlogError,
  updateBlogSuccess,
} from "../Actions/PostAction";
import {
  authorised,
  notAuthorised,
  verifyUserAuthSuccess,
} from "../Actions/UserAction";

function* postABlogSaga({ payload }) {
  try {
    const Response = yield postABlog(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("blogPosted")) {
        switch (Response.blogPosted) {
          case true:
            yield delay(3000);
            yield put(postBlogSuccess({ blogPosted: true }));
            // here i fired user to set new user data with myPosts data !
            yield put(verifyUserAuthSuccess(Response.userData));
            yield put(authorised(true));
            yield localStorage.setItem(
              "blogApp",
              JSON.stringify({
                validity: "15 min",
                token: Response.userData.jwToken,
              })
            );
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield delay(3000);
    yield put(postBlogError(error.message));
  }
}

function* getPostDataSaga({ payload }) {
  try {
    const Response = yield getPostData(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("post")) {
        yield delay(1500);
        yield put(getPostDataSuccess(Response.post));
        yield put(authorised(true));
      } else {
        throw Error(Response.errorMessage);
      }
    }
  } catch (error) {
    yield delay(2000);
    yield put(getPostDataError(error.message));
  }
}

function* updateBlogSaga({ payload }) {
  try {
    const Response = yield updateBlog(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("postUpdated")) {
        switch (Response.postUpdated) {
          case true:
            yield delay(2000);
            yield put(authorised(true));
            yield put(updateBlogSuccess({ postUpdated: true }));
            yield put(verifyUserAuthSuccess(Response.userData));
            yield localStorage.setItem(
              "blogApp",
              JSON.stringify({
                validity: "15 min",
                token: Response.userData.jwToken,
              })
            );
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
    yield put(updateBlogError(error.message));
  }
}

function* deleteBlogSaga({ payload }) {
  try {
    const Response = yield deleteBlog(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("postDeleted")) {
        switch (Response.postDeleted) {
          case true:
            yield delay(3000);
            yield put(authorised(true));
            yield put(verifyUserAuthSuccess(Response.userData));
            yield put(deleteBlogSuccess({ postDeleted: true }));
            yield localStorage.setItem(
              "blogApp",
              JSON.stringify({
                validity: "15 min",
                token: Response.userData.jwToken,
              })
            );
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        yield delay(3000);
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(deleteBlogError(error.message));
  }
}

function* getAllPostsDataSaga({ payload }) {
  try {
    const Response = yield getAllPostsData(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("allPosts")) {
        yield delay(1000);
        yield put(getAllPostsDataSuccess(Response.allPosts));
        yield put(authorised(true));
      } else {
        throw Error(Response.errorMessage);
      }
    }
  } catch (error) {
    yield delay(1000);
    yield put(getAllPostsDataError(error.message));
  }
}

function* likePostSaga({ payload }) {
  try {
    const Response = yield likePost(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("liked")) {
        switch (Response.liked) {
          case true:
            yield put(authorised);
            yield put(verifyUserAuthSuccess(Response.userData));
            yield put(likePostSuccess({ liked: true }));
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(likePostError(error.message));
  }
}
function* unlikePostSaga({ payload }) {
  try {
    const Response = yield unlikePost(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("unliked")) {
        switch (Response.unliked) {
          case true:
            yield put(authorised(true));
            yield put(verifyUserAuthSuccess(Response.userData));
            yield put(unLikePostSuccess({ unliked: true }));
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(unLikePostError(error.message));
  }
}
function* savePostSaga({ payload }) {
  try {
    const Response = yield savePost(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("saved")) {
        switch (Response.saved) {
          case true:
            yield put(authorised(true));
            yield put(verifyUserAuthSuccess(Response.userData));
            yield put(savePostSuccess({ saved: true }));
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(savePostError(error.message));
  }
}

function* unsavePostSaga({ payload }) {
  try {
    const Response = yield unsavePost(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("unsaved")) {
        switch (Response.unsaved) {
          case true:
            yield put(authorised(true));
            yield put(verifyUserAuthSuccess(Response.userData));
            yield put(unSavePostSuccess({ unsaved: true }));
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield put(unSavePostError(error.message));
  }
}

function* postCommentSaga({ payload }) {
  try {
    const Response = yield postComment(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("commentPosted")) {
        switch (Response.commentPosted) {
          case true:
            yield delay(500);
            yield put(authorised(true));
            yield put(postCommentSuccess(Response.updatedPost)); // in this Response.updatedPost all updatedPost's data is present!
            break;
          case false:
            throw Error(Response.errorMessage);
        }
      } else {
        throw Error("Something went wrong!");
      }
    }
  } catch (error) {
    yield delay(500);
    yield put(postCommentError(error.message));
  }
}

function* deleteCommentSaga({ payload }) {
  try {
    const Response = yield deleteComment(payload);
    if (Response.hasOwnProperty("Unauthorized")) {
      yield put(notAuthorised(false));
    } else {
      if (Response.hasOwnProperty("commentDeleted")) {
        switch (Response.commentDeleted) {
          case true:
            yield delay(1000);
            yield put(authorised(true));
            yield put(postCommentSuccess(Response.updatedPost)); // here i didnot creating a reducer state for deletecommentsuccess beczz same data should be saved in postCommentSuccess
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
    yield put(deleteCommentError(error.message));
  }
}

function* postSaga() {
  yield takeLatest(POST_A_BLOG_START, postABlogSaga);
  yield takeLatest(UPDATE_A_BLOG_START, updateBlogSaga);
  yield takeLatest(DELETE_A_BLOG_START, deleteBlogSaga);
  yield takeLatest(GET_POST_DATA_START, getPostDataSaga);
  yield takeLatest(GET_ALL_POST_DATA_START, getAllPostsDataSaga);
  yield takeLatest(LIKE_POST_START, likePostSaga);
  yield takeLatest(UNLIKE_POST_START, unlikePostSaga);
  yield takeLatest(SAVE_POST_START, savePostSaga);
  yield takeLatest(UNSAVE_POST_START, unsavePostSaga);
  yield takeLatest(POST_A_COMMENT_START, postCommentSaga);
  yield takeLatest(DELETE_A_COMMENT_START, deleteCommentSaga);
}

export { postSaga };
