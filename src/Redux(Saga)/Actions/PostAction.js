import {
  DELETE_A_BLOG_ERROR,
  DELETE_A_BLOG_START,
  DELETE_A_BLOG_SUCCESS,
  GET_POST_DATA_ERROR,
  GET_POST_DATA_START,
  GET_POST_DATA_SUCCESS,
  POST_A_BLOG_ERROR,
  POST_A_BLOG_START,
  POST_A_BLOG_SUCCESS,
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
