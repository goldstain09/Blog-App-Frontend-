import {
  DELETE_A_BLOG_ERROR,
  DELETE_A_BLOG_START,
  DELETE_A_BLOG_SUCCESS,
  DELETE_A_COMMENT_ERROR,
  DELETE_A_COMMENT_START,
  DELETE_A_COMMENT_SUCCESS,
  GET_ALL_POST_DATA_ERROR,
  GET_ALL_POST_DATA_START,
  GET_ALL_POST_DATA_SUCCESS,
  GET_POST_DATA_ERROR,
  GET_POST_DATA_START,
  GET_POST_DATA_SUCCESS,
  LIKE_POST_ERROR,
  LIKE_POST_START,
  LIKE_POST_SUCCESS,
  POST_A_BLOG_ERROR,
  POST_A_BLOG_START,
  POST_A_BLOG_SUCCESS,
  POST_A_COMMENT_ERROR,
  POST_A_COMMENT_START,
  POST_A_COMMENT_SUCCESS,
  SAVE_POST_ERROR,
  SAVE_POST_START,
  SAVE_POST_SUCCESS,
  UNLIKE_POST_ERROR,
  UNLIKE_POST_START,
  UNLIKE_POST_SUCCESS,
  UNSAVE_POST_ERROR,
  UNSAVE_POST_START,
  UNSAVE_POST_SUCCESS,
  UPDATE_A_BLOG_ERROR,
  UPDATE_A_BLOG_START,
  UPDATE_A_BLOG_SUCCESS,
} from "../Constants/PostConstants";

// post a blog
export const postBlogStart = (data) => ({
  type: POST_A_BLOG_START,
  payload: data,
});
export const postBlogSuccess = (data) => ({
  type: POST_A_BLOG_SUCCESS,
  payload: data,
});
export const postBlogError = (data) => ({
  type: POST_A_BLOG_ERROR,
  payload: data,
});

// get a particular post data
export const getPostDataStart = (data) => ({
  type: GET_POST_DATA_START,
  payload: data,
});
export const getPostDataSuccess = (data) => ({
  type: GET_POST_DATA_SUCCESS,
  payload: data,
});
export const getPostDataError = (data) => ({
  type: GET_POST_DATA_ERROR,
  payload: data,
});

// to update a blog
export const updateBlogStart = (data) => ({
  type: UPDATE_A_BLOG_START,
  payload: data,
});
export const updateBlogSuccess = (data) => ({
  type: UPDATE_A_BLOG_SUCCESS,
  payload: data,
});
export const updateBlogError = (data) => ({
  type: UPDATE_A_BLOG_ERROR,
  payload: data,
});

// to delete a blog
export const deleteBlogStart = (data) => ({
  type: DELETE_A_BLOG_START,
  payload: data,
});
export const deleteBlogSuccess = (data) => ({
  type: DELETE_A_BLOG_SUCCESS,
  payload: data,
});
export const deleteBlogError = (data) => ({
  type: DELETE_A_BLOG_ERROR,
  payload: data,
});

// get all posts data
export const getAllPostsDataStart = (data) => ({
  type: GET_ALL_POST_DATA_START,
  payload: data,
});
export const getAllPostsDataSuccess = (data) => ({
  type: GET_ALL_POST_DATA_SUCCESS,
  payload: data,
});
export const getAllPostsDataError = (data) => ({
  type: GET_ALL_POST_DATA_ERROR,
  payload: data,
});

// to like a post
export const likePostStart = (data) => ({
  type: LIKE_POST_START,
  payload: data,
});
export const likePostSuccess = (data) => ({
  type: LIKE_POST_SUCCESS,
  payload: data,
});
export const likePostError = (data) => ({
  type: LIKE_POST_ERROR,
  payload: data,
});

// to unlike a post
export const unLikePostStart = (data) => ({
  type: UNLIKE_POST_START,
  payload: data,
});
export const unLikePostSuccess = (data) => ({
  type: UNLIKE_POST_SUCCESS,
  payload: data,
});
export const unLikePostError = (data) => ({
  type: UNLIKE_POST_ERROR,
  payload: data,
});

// to save a post
export const savePostStart = (data) => ({
  type: SAVE_POST_START,
  payload: data,
});
export const savePostSuccess = (data) => ({
  type: SAVE_POST_SUCCESS,
  payload: data,
});
export const savePostError = (data) => ({
  type: SAVE_POST_ERROR,
  payload: data,
});

// to unsave a post
export const unSavePostStart = (data) => ({
  type: UNSAVE_POST_START,
  payload: data,
});
export const unSavePostSuccess = (data) => ({
  type: UNSAVE_POST_SUCCESS,
  payload: data,
});
export const unSavePostError = (data) => ({
  type: UNSAVE_POST_ERROR,
  payload: data,
});

// to post a comment
export const postCommentStart = (data) => ({
  type: POST_A_COMMENT_START,
  payload: data,
});
export const postCommentSuccess = (data) => ({
  type: POST_A_COMMENT_SUCCESS,
  payload: data,
});
export const postCommentError = (data) => ({
  type: POST_A_COMMENT_ERROR,
  payload: data,
});

// to delete a comment
export const deleteCommentStart = (data) => ({
  type: DELETE_A_COMMENT_START,
  payload: data,
});
export const deleteCommentError = (data) => ({
  type: DELETE_A_COMMENT_ERROR,
  payload: data,
});
