import React, { useEffect, useState } from "react";
import "./SCSS/MyPost.scss";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Comment from "../Components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { verifyUserAuthStart } from "../Redux(Saga)/Actions/UserAction";
import {
  getAllPostsDataStart,
  getPostDataStart,
  getPostDataSuccess,
  likePostStart,
  likePostSuccess,
  postCommentStart,
  postCommentSuccess,
  savePostStart,
  savePostSuccess,
  unLikePostStart,
  unLikePostSuccess,
  unSavePostStart,
  unSavePostSuccess,
} from "../Redux(Saga)/Actions/PostAction";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

export default function MyBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { UserDataFromResponse, verifyUserLoading, verifyUserError } =
    useSelector((state) => state.userReducer);
  const {
    getPostDataResponse,
    getPostDataLoading,
    getPostDataError,
    updateBlogLoading,
    updateBlogError,
    deleteBlogLoading,
    deleteBlogError,
    likePostResponse,
    unlikePostResponse,
    savePostResponse,
    unsavePostResponse,
    postCommentResponse,
    postCommentLoading,
    postCommentError,
    deleteCommentLoading,
    deleteCommentError,
  } = useSelector((state) => state.postReducer);

  // this useEffect is for authorization!
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          validity: "15min",
          token: UserDataFromResponse.jwToken,
        })
      );
      if (
        UserDataFromResponse.myPosts.every(
          (item) => item.postId !== params.postId
        )
      ) {
        navigate(`/blog/${params.postId}`);
      }
    } else {
      const jwToken = JSON.parse(localStorage.getItem("blogApp"));
      if (jwToken) {
        if (jwToken.hasOwnProperty("validity")) {
          dispatch(verifyUserAuthStart(jwToken.token));
          dispatch(getAllPostsDataStart(jwToken.token));
        }
      } else {
        navigate("/login");
      }
    }
  }, [UserDataFromResponse, navigate, dispatch]);
  // -----------------------------------------------------------------------------

  const [postData, setPostData] = useState({});
  // to get post data!
  useEffect(() => {
    setPostData({});
    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
    if (jwToken) {
      dispatch(
        getPostDataStart({ postId: params.postId, token: jwToken.token })
      );
    }
  }, [params.postId, setPostData, dispatch]);

  // like or unlike
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(false);
  // save or unsave
  const [saved, setSaved] = useState(false);

  // comments
  // post a comment
  const [comment, setComment] = useState("");
  const [emptyComment, setEmptyComment] = useState(false);

  const post = (e) => {
    e.preventDefault();
    if (comment !== "") {
      const jwToken = JSON.parse(localStorage.getItem("blogApp"));
      const finalData = {
        token: jwToken.token,
        comment: comment,
        postId: params.postId,
      };
      dispatch(postCommentStart(finalData));
    } else {
      setEmptyComment(true);
    }
  };
  // handling response
  useEffect(() => {
    if (getPostDataResponse) {
      if (getPostDataResponse.hasOwnProperty("userName")) {
        setPostData(getPostDataResponse);
        setLikedCount(getPostDataResponse.postLikes.length);
        dispatch(getPostDataSuccess({}));
      }
    }
  }, [getPostDataResponse, setPostData, setLikedCount, dispatch]);

  // for setting up like and save !!!
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      if (UserDataFromResponse.likedPost.length > 0) {
        if (
          UserDataFromResponse.likedPost.every(
            (item) => item.postId !== params.postId
          )
        ) {
          setLiked(false);
        } else {
          setLiked(true);
        }
      } else {
        setLiked(false);
      }
      if (UserDataFromResponse.savedPost.length > 0) {
        if (
          UserDataFromResponse.savedPost.every(
            (item) => item.postId !== params.postId
          )
        ) {
          setSaved(false);
        } else {
          setSaved(true);
        }
      } else {
        setSaved(false);
      }
    }
  }, [UserDataFromResponse, setSaved, setLiked]);

  // handling response
  useEffect(() => {
    if (likePostResponse.hasOwnProperty("liked")) {
      // setLiked(true);
      dispatch(likePostSuccess({}));
    }
  }, [likePostResponse, dispatch]);
  useEffect(() => {
    if (unlikePostResponse.hasOwnProperty("unliked")) {
      // setLiked(false);
      dispatch(unLikePostSuccess({}));
    }
  }, [unlikePostResponse, dispatch]);
  useEffect(() => {
    if (savePostResponse.hasOwnProperty("saved")) {
      // setSaved(true);
      dispatch(savePostSuccess({}));
    }
  }, [savePostResponse, dispatch]);
  useEffect(() => {
    if (unlikePostResponse.hasOwnProperty("unsaved")) {
      // setSaved(false);
      dispatch(unSavePostSuccess({}));
    }
  }, [unsavePostResponse, dispatch]);

  // handling response
  useEffect(() => {
    if (postCommentResponse.hasOwnProperty("postComments")) {
      setPostData(postCommentResponse);
      setComment("");
      dispatch(postCommentSuccess({}));
    }
  }, [postCommentResponse, setPostData, setComment, dispatch]);
  return (
    <>
      <Header />
      <div
        className="exitBtn1"
        style={{ position: "absolute", left: "1rem", top: "9rem" }}
      >
        <Link to={"/"} className="btn btn-outline-dark text-light">
          Back
        </Link>
      </div>
      <div className="container-fluid MyBlogPost">
        {postData.hasOwnProperty("userName") ? (
          <>
            <div className="row d-flex">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                <div className="row d-flex">
                  <div className="col col-12 ImageContainer">
                    <h6
                      className="h4 text-start categoryy"
                      onClick={() =>
                        navigate(`/categoryPage/${postData.postCategory}`)
                      }
                    >
                      {postData.postCategory}
                    </h6>
                    <h1 className="h1">{postData.postTitle.toUpperCase()}</h1>
                    <img src={postData.postImage} alt="Preview" />
                    <p>{new Date(postData.postedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="col col-12 text-container text-center">
                    {postData.postBlogsPara.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <div className="row d-flex">
                  <div
                    className="col-1 dp"
                    onClick={() => navigate(`/myProfile`)}
                  >
                    <img src={postData.userProfilePicture} alt="PP" />
                  </div>
                  <div
                    className=" col-8 name"
                    onClick={() => navigate(`/myProfile`)}
                  >
                    <h4 className="h4">
                      {postData.userName.split("").slice(0, 15).join("")}
                    </h4>
                  </div>
                  <div className="col-1 btnn">
                    <button
                      onClick={() => navigate(`/editPost/${params.postId}`)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-11">
                    <p>{postData.postCaption}</p>
                  </div>
                  <div className="col-12">
                    {postData.postTags.length > 0 ? (
                      postData.postTags.map((item, index) => (
                        <div
                          className="tags"
                          key={index}
                          onClick={() => navigate(`/tagPage/${item}`)}
                        >
                          <i className="bi bi-tags-fill"> </i>
                          {item}
                        </div>
                      ))
                    ) : (
                      <>
                        <i className="bi bi-tags-fill"> </i>
                        No Tags
                      </>
                    )}
                  </div>
                </div>

                <div className="row BlogLikeAndSaveBtnContainer">
                  <div className="col-6">
                    {liked ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const jwToken = JSON.parse(
                            localStorage.getItem("blogApp")
                          );
                          const finalData = {
                            token: jwToken.token,
                            postId: params.postId,
                          };
                          setLiked(true);
                          dispatch(unLikePostStart(finalData));
                          setLikedCount(likedCount - 1);
                        }}
                      >
                        <i className="bi bi-suit-heart-fill"></i>{" "}
                        {likedCount > 0 ? `${likedCount}` : ""}
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const jwToken = JSON.parse(
                            localStorage.getItem("blogApp")
                          );
                          const finalData = {
                            token: jwToken.token,
                            postId: params.postId,
                          };
                          setLiked(true);
                          dispatch(likePostStart(finalData));
                          setLikedCount(likedCount + 1);
                        }}
                      >
                        <i className="bi bi-suit-heart"></i>{" "}
                        {likedCount > 0 ? `${likedCount}` : ""}
                      </button>
                    )}
                  </div>
                  <div className="col-6 text-center">
                    {saved ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const jwToken = JSON.parse(
                            localStorage.getItem("blogApp")
                          );
                          const finalData = {
                            token: jwToken.token,
                            postId: params.postId,
                          };
                          setSaved(false);
                          dispatch(unSavePostStart(finalData));
                        }}
                      >
                        <i className="bi bi-bookmark-fill"></i>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const jwToken = JSON.parse(
                            localStorage.getItem("blogApp")
                          );
                          const finalData = {
                            token: jwToken.token,
                            postId: params.postId,
                          };
                          setSaved(true);
                          dispatch(savePostStart(finalData));
                        }}
                      >
                        <i className="bi bi-bookmark"></i>
                      </button>
                    )}
                  </div>
                </div>

                <div className="row PostACommentSection">
                  <div className="col-9">
                    <input
                      type="text"
                      placeholder="  Add a Comment!"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                        setEmptyComment(false);
                      }}
                    />
                    {emptyComment && (
                      <p className="text-danger">Please type something!</p>
                    )}
                  </div>
                  <div className="col-3">
                    <button className="btn btn-outline-danger" onClick={post}>
                      Post
                    </button>
                  </div>
                </div>

                <h4 className="h4">Comments</h4>
                {postData.postComments.length > 0 ? (
                  postData.postComments.map((item, index) => (
                    <Comment
                      data={item}
                      key={index}
                      postId={params.postId}
                      myBlog={true}
                    />
                  ))
                ) : (
                  <>
                    <h4 className="h4 text-light text-center mt-5 pt-5">
                      No comments
                    </h4>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container my-5 p-1 postDeleted">
              <h1 className="text-center h1 text-light">
                Post not found or may be deleted!
              </h1>
            </div>
          </>
        )}
      </div>
      <Footer />
      {/* {(unsavePostLoading ||
        savePostLoading ||
        likePostLoading ||
        unlikePostLoading) && <Loading message={""} />} */}
      {(verifyUserLoading || getPostDataLoading) && (
        <Loading message={"Fetching data!"} />
      )}
      {updateBlogLoading && <Loading message={"Updating your blog!"} />}
      {deleteBlogLoading && <Loading message={"Deleting your blog!"} />}
      {postCommentLoading && <Loading message={"Posting your comment!"} />}
      {deleteCommentLoading && <Loading message={"Deleting your comment!"} />}

      {verifyUserError !== "" && <Error errorMessage={verifyUserError} />}
      {getPostDataError !== "" && <Error errorMessage={getPostDataError} />}
      {updateBlogError !== "" && <Error errorMessage={updateBlogError} />}
      {deleteBlogError !== "" && <Error errorMessage={deleteBlogError} />}
      {/* {likePostError !== "" && <Error errorMessage={likePostError} />} */}
      {/* {unlikePostError !== "" && <Error errorMessage={unlikePostError} />} */}
      {/* {savePostError !== "" && <Error errorMessage={savePostError} />} */}
      {/* {unsavePostError !== "" && <Error errorMessage={unsavePostError} />} */}
      {postCommentError !== "" && <Error errorMessage={postCommentError} />}
      {deleteCommentError !== "" && <Error errorMessage={deleteCommentError} />}
    </>
  );
}
