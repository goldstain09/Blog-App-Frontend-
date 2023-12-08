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

const initialState = {
  postNewBlogLoading: false,
  postNewBlogError: "",
  postBlogResponse: {},

  getPostDataError: "",
  getPostDataLoading: false,
  getPostDataResponse: {},

  updateBlogError: "",
  updateBlogLoading: false,
  updateBlogResponse: {},

  deleteBlogError: "",
  deleteBlogLoading: false,
  deleteBlogResponse: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // post a blog
    case POST_A_BLOG_START:
      return {
        ...state,
        postNewBlogError: "",
        postNewBlogLoading: true,
      };
    case POST_A_BLOG_SUCCESS:
      return {
        ...state,
        postBlogResponse: action.payload,
        postNewBlogError: "",
        postNewBlogLoading: false,
      };
    case POST_A_BLOG_ERROR:
      return {
        ...state,
        postNewBlogError: action.payload,
        postNewBlogLoading: false,
      };

    // get post data
    case GET_POST_DATA_START:
      return {
        ...state,
        getPostDataError: "",
        getPostDataLoading: true,
      };
    case GET_POST_DATA_SUCCESS:
      return {
        ...state,
        getPostDataError: "",
        getPostDataLoading: false,
        getPostDataResponse: action.payload,
      };
    case GET_POST_DATA_ERROR:
      return {
        ...state,
        getPostDataError: action.payload,
        getPostDataLoading: false,
      };

    // update blog
    case UPDATE_A_BLOG_START:
      return {
        ...state,
        updateBlogLoading: true,
        updateBlogError: "",
      };
    case UPDATE_A_BLOG_SUCCESS:
      return {
        ...state,
        updateBlogError: "",
        updateBlogLoading: false,
        updateBlogResponse: action.payload,
      };
    case UPDATE_A_BLOG_ERROR:
      return {
        ...state,
        updateBlogError: action.payload,
        updateBlogLoading: false,
      };

    // delete post
    case DELETE_A_BLOG_START:
      return {
        ...state,
        deleteBlogError: "",
        deleteBlogLoading: true,
      };
    case DELETE_A_BLOG_SUCCESS:
      return {
        ...state,
        deleteBlogError: "",
        deleteBlogLoading: false,
        deleteBlogResponse: action.payload,
      };
    case DELETE_A_BLOG_ERROR:
      return {
        ...state,
        deleteBlogError: action.payload,
        deleteBlogLoading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
