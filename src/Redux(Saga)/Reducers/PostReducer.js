import {
  DELETE_A_BLOG_ERROR,
  DELETE_A_BLOG_START,
  DELETE_A_BLOG_SUCCESS,
  DELETE_A_COMMENT_ERROR,
  DELETE_A_COMMENT_START,
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

  getAllPostsDataError: "",
  getAllPostsDataResponse: [],
  getAllPostsDataLoading: false,

  likePostError: "",
  likePostLoading: false,
  likePostResponse: {},

  unlikePostError: "",
  unlikePostLoading: false,
  unlikePostResponse: {},

  savePostError: "",
  savePostLoading: false,
  savePostResponse: {},

  unsavePostError: "",
  unsavePostLoading: false,
  unsavePostResponse: {},

  postCommentError: "",
  postCommentLoading: false,
  postCommentResponse: {},

  deleteCommentLoading: false,
  deleteCommentError: "",
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

    // get all posts
    case GET_ALL_POST_DATA_START:
      return {
        ...state,
        getAllPostsDataError: "",
        getAllPostsDataLoading: true,
      };
    case GET_ALL_POST_DATA_SUCCESS:
      return {
        ...state,
        getAllPostsDataError: "",
        getAllPostsDataLoading: false,
        getAllPostsDataResponse: action.payload,
      };
    case GET_ALL_POST_DATA_ERROR:
      return {
        ...state,
        getAllPostsDataError: action.payload,
        getAllPostsDataLoading: false,
      };

    // like post
    case LIKE_POST_START:
      return {
        ...state,
        likePostError: "",
        likePostLoading: true,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        likePostError: "",
        likePostLoading: false,
        likePostResponse: action.payload,
      };
    case LIKE_POST_ERROR:
      return {
        ...state,
        likePostError: action.payload,
        likePostLoading: false,
      };

    // unlike post
    case UNLIKE_POST_START:
      return {
        ...state,
        unlikePostError: "",
        unlikePostLoading: true,
      };
    case UNLIKE_POST_SUCCESS:
      return {
        ...state,
        unlikePostLoading: false,
        unlikePostError: "",
        unlikePostResponse: action.payload,
      };
    case UNLIKE_POST_ERROR:
      return {
        ...state,
        unlikePostLoading: false,
        unlikePostError: action.payload,
      };

    // save post
    case SAVE_POST_START:
      return {
        ...state,
        savePostError: "",
        savePostLoading: true,
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        savePostError: "",
        savePostLoading: false,
        savePostResponse: action.payload,
      };
    case SAVE_POST_ERROR:
      return {
        ...state,
        savePostError: action.payload,
        savePostLoading: false,
      };

    // unsave post
    case UNSAVE_POST_START:
      return {
        ...state,
        unsavePostLoading: true,
        unsavePostError: "",
      };
    case UNSAVE_POST_SUCCESS:
      return {
        ...state,
        unsavePostLoading: false,
        unsavePostError: "",
        unsavePostResponse: action.payload,
      };
    case UNSAVE_POST_ERROR:
      return {
        ...state,
        unsavePostLoading: false,
        unsavePostError: action.payload,
      };

    // post a comment
    case POST_A_COMMENT_START:
      return {
        ...state,
        postCommentError: "",
        postCommentLoading: true,
      };
    case POST_A_COMMENT_SUCCESS:
      return {
        ...state,
        postCommentError: "",
        postCommentLoading: false,
        postCommentResponse: action.payload,
      };
    case POST_A_COMMENT_ERROR:
      return {
        ...state,
        postCommentError: action.payload,
        postCommentLoading: false,
      };

    //delete comment
    case DELETE_A_COMMENT_START:
      return {
        ...state,
        deleteCommentError: "",
        deleteCommentLoading: true,
      };
    case DELETE_A_COMMENT_ERROR:
      return {
        ...state,
        deleteCommentError: action.payload,
        deleteCommentLoading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
