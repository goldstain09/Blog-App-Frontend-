import React, { useEffect, useState } from "react";
import "./SCSS/MyPost.scss";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Comment from "../Components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { verifyUserAuthStart } from "../Redux(Saga)/Actions/UserAction";
import {
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

export default function MyBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  const getPostDataResponse = useSelector(
    (state) => state.postReducer.getPostDataResponse
  );
  const likePostResponse = useSelector(
    (state) => state.postReducer.likePostResponse
  );
  const unlikePostResponse = useSelector(
    (state) => state.postReducer.unlikePostResponse
  );
  const savePostResponse = useSelector(
    (state) => state.postReducer.savePostResponse
  );
  const unsavePostResponse = useSelector(
    (state) => state.postReducer.unsavePostResponse
  );
  const postCommentResponse = useSelector(
    (state) => state.postReducer.postCommentResponse
  );
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
        }
      } else {
        navigate("/login");
      }
    }
  }, [UserDataFromResponse]);
  // -----------------------------------------------------------------------------

  // to get post data!
  useEffect(() => {
    setPostData({});
    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
    if (jwToken) {
      dispatch(
        getPostDataStart({ postId: params.postId, token: jwToken.token })
      );
    }
  }, [params.postId]);
  // handling response
  const [postData, setPostData] = useState({});
  useEffect(() => {
    if (getPostDataResponse) {
      if (getPostDataResponse.hasOwnProperty("userName")) {
        setPostData(getPostDataResponse);
        setLikedCount(getPostDataResponse.postLikes.length);
        dispatch(getPostDataSuccess({}));
      }
    }
  }, [getPostDataResponse]);

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
  }, [UserDataFromResponse]);

  // handling response
  useEffect(() => {
    if (likePostResponse.hasOwnProperty("liked")) {
      // setLiked(true);
      dispatch(likePostSuccess({}));
    }
  }, [likePostResponse]);
  useEffect(() => {
    if (unlikePostResponse.hasOwnProperty("liked")) {
      // setLiked(false);
      dispatch(unLikePostSuccess({}));
    }
  }, [unlikePostResponse]);
  useEffect(() => {
    if (savePostResponse.hasOwnProperty("saved")) {
      // setSaved(true);
      dispatch(savePostSuccess({}));
    }
  }, [savePostResponse]);
  useEffect(() => {
    if (unlikePostResponse.hasOwnProperty("unsaved")) {
      // setSaved(false);
      dispatch(unSavePostSuccess({}));
    }
  }, [unsavePostResponse]);

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
    if (postCommentResponse.hasOwnProperty("postComments")) {
      setPostData(postCommentResponse);
      setComment("");
      dispatch(postCommentSuccess({}));
    }
  }, [postCommentResponse]);
  return (
    <>
      <Header />
      <div
        className="exitBtn1"
        style={{ position: "absolute", left: "1rem", top: "9rem" }}
      >
        <Link to={"/myProfile"} className="btn btn-outline-dark text-light">
          <i class="bi bi-box-arrow-left"></i>
        </Link>
      </div>
      <div className="container-fluid MyBlogPost">
        {postData.hasOwnProperty("userName") ? (
          <>
            <div className="row d-flex">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                <div className="row d-flex">
                  <div className="col col-12 ImageContainer">
                    <h6 className="h4 text-start categoryy">
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
                        <div className="tags" key={index}>
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
                  <>No comments</>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>Deleted</h1>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
