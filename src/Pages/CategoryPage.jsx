import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import "./SCSS/BlogReadPage.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserAuthStart } from "../Redux(Saga)/Actions/UserAction";
import {
  getAllPostsDataStart,
  postCommentStart,
  postCommentSuccess,
} from "../Redux(Saga)/Actions/PostAction";
import Comment from "../Components/Comment";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

export default function CategoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { UserDataFromResponse, verifyUserLoading, verifyUserError } =
    useSelector((state) => state.userReducer);
  const {
    getAllPostsDataResponse,
    getAllPostsDataLoading,
    getAllPostsDataError,
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
      if (getAllPostsDataResponse.length > 0) {
        let categoryPosts = getAllPostsDataResponse.filter(
          (item) =>
            item.postCategory.toLowerCase() === params.category.toLowerCase()
        );
        setCatgoryPosts(categoryPosts);
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
  }, [
    UserDataFromResponse,
    params.category,
    setCatgoryPosts,
    dispatch,
    navigate,
  ]);
  // -----------------------------------------------------------------------------

  const [categoryPosts, setCatgoryPosts] = useState([]);
  // comments
  const [allData, setAllData] = useState([]);
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
        postId: allData._id,
      };
      dispatch(postCommentStart(finalData));
    } else {
      setEmptyComment(true);
    }
  };

  // handling response
  useEffect(() => {
    if (postCommentResponse.hasOwnProperty("postComments")) {
      setAllData(postCommentResponse);
      setComment("");
      dispatch(postCommentSuccess({}));
    }
  }, [postCommentResponse, setAllData, setComment, dispatch]);
  return (
    <>
      <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
        <Link to={"/"} className="btn btn-outline-dark">
          Back
        </Link>
      </div>
      <div className="container-fluid TagPage">
        <div className="container">
          <h1>
            <i className="bi bi-collection"></i> {params.category}
          </h1>
          <h6 className="h6">Here's related posts to this Category...</h6>
          <div className="row d-flex">
            {categoryPosts.length > 0 ? (
              categoryPosts.map((item, index) => (
                <BlogCard data={item} key={index} setAllData={setAllData} />
              ))
            ) : (
              <>
                <div className="container my-5 p-1 postDeleted">
                  <h1 className="text-center h1 text-light">
                    No Posts Related to this category!
                  </h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* comment section modal */}
      <div
        className="modal fade commentSectionModal"
        id="CommentModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h5" id="exampleModalLabel">
                Comment Section
              </h5>
              <button
                type="button"
                className="bi bi-twitter-x text-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {allData.hasOwnProperty("postComments") &&
              allData.postComments.length > 0 ? (
                allData.postComments.map((item, index) => (
                  <Comment key={index} data={item} postId={allData._id} />
                ))
              ) : (
                <>
                  <h5 className="h5 text-center text-light">No Comments!</h5>
                </>
              )}
            </div>

            {/* // post a comment  */}
            <div className="modal-footer">
              <div className="row">
                <div className="col-10">
                  <input
                    placeholder="Add a Comment"
                    type="text"
                    className="w-100"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      setEmptyComment(false);
                    }}
                  />
                  {emptyComment && (
                    <p className="text-danger">
                      Please type something to post!
                    </p>
                  )}
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={post}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(verifyUserLoading || getAllPostsDataLoading) && (
        <Loading message={"Fetching data!"} />
      )}
      {postCommentLoading && <Loading message={"Posting your comment!"} />}
      {deleteCommentLoading && <Loading message={"Deleting your comment!"} />}

      {verifyUserError !== "" && <Error errorMessage={verifyUserError} />}
      {getAllPostsDataError !== "" && (
        <Error errorMessage={getAllPostsDataError} />
      )}
      {postCommentError !== "" && <Error errorMessage={postCommentError} />}
      {deleteCommentError !== "" && <Error errorMessage={deleteCommentError} />}
    </>
  );
}
