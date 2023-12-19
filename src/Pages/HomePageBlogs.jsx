import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import cardimg from '../Media/Logo.png';
import "./SCSS/HomePageBlog.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostsDataStart,
  postCommentStart,
  postCommentSuccess,
} from "../Redux(Saga)/Actions/PostAction";
import Comment from "../Components/Comment";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

export default function HomePageBlog() {
  const dispatch = useDispatch();
  const {
    getAllPostsDataResponse,
    getAllPostsDataLoading,
    getAllPostsDataError,
    postCommentResponse,
    postCommentError,
    postCommentLoading,
    deleteCommentLoading,
    deleteCommentError,
  } = useSelector((state) => state.postReducer);

  useEffect(() => {
    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
    if (jwToken) {
      dispatch(getAllPostsDataStart(jwToken.token));
    }
  }, [dispatch]);
  // handling response
  const [postsData, setPostsData] = useState([]);
  useEffect(() => {
    if (getAllPostsDataResponse.length > 0) {
      setPostsData(
        [...getAllPostsDataResponse].sort(() => Math.random() - 0.5)
      );
    }
  }, [getAllPostsDataResponse, setPostsData]);

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
      <div className="container-fluid HomePageBlogSection">
        <div className="container">
          <div className="row d-flex">
            {postsData.length > 0 ? (
              postsData.map((item, index) => (
                <BlogCard data={item} key={index} setAllData={setAllData} />
              ))
            ) : (
              <>
                <div className="container">
                  <div className="row">
                    <div
                      className="card bg-dark col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                      aria-hidden="true"
                    >
                      <img src={cardimg} alt="" className="card-img-top bg-dark" />
                      <div className="card-body bg-dark">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a href="#"
                          className="btn btn-primary disabled placeholder col-6"
                          aria-disabled="true"
                        ></a>
                      </div>
                    </div>
                    <div
                      className="card bg-dark col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                      aria-hidden="true"
                    >
                      <img src={cardimg} alt="" className="card-img-top bg-dark" />
                      <div className="card-body bg-dark">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a href="#"
                          className="btn btn-primary disabled placeholder col-6"
                          aria-disabled="true"
                        ></a>
                      </div>
                    </div>
                    <div
                      className="card bg-dark col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                      aria-hidden="true"
                    >
                      <img src={cardimg} alt="" className="card-img-top bg-dark" />
                      <div className="card-body bg-dark">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a href="#"
                          className="btn btn-primary disabled placeholder col-6"
                          aria-disabled="true"
                        ></a>
                      </div>
                    </div>
                    <div
                      className="card bg-dark col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                      aria-hidden="true"
                    >
                      <img src={cardimg} alt="" className="card-img-top bg-dark" />
                      <div className="card-body bg-dark">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a href="#"
                          className="btn btn-primary disabled placeholder col-6"
                          aria-disabled="true"
                        ></a>
                      </div>
                    </div>
                    <div
                      className="card bg-dark col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                      aria-hidden="true"
                    >
                      <img src={cardimg} alt="" className="card-img-top bg-dark" />
                      <div className="card-body bg-dark">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a href="#"
                          className="btn btn-primary disabled placeholder col-6"
                          aria-disabled="true"
                        ></a>
                      </div>
                    </div>
                    <div
                      className="card bg-dark col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                      aria-hidden="true"
                    >
                      <img src={cardimg} alt="" className="card-img-top bg-dark" />
                      <div className="card-body bg-dark">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a href="#"
                          className="btn btn-primary disabled placeholder col-6"
                          aria-disabled="true"
                        ></a>
                      </div>
                    </div>
                    <div
                      className="card bg-dark col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                      aria-hidden="true"
                    >
                      <img src={cardimg} alt="" className="card-img-top bg-dark" />
                      <div className="card-body bg-dark">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a href="#"
                          className="btn btn-primary disabled placeholder col-6"
                          aria-disabled="true"
                        ></a>
                      </div>
                    </div>
                    <div
                      className="card bg-dark col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                      aria-hidden="true"
                    >
                      <img src={cardimg} alt="" className="card-img-top bg-dark" />
                      <div className="card-body bg-dark">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a href="#"
                          className="btn btn-primary disabled placeholder col-6"
                          aria-disabled="true"
                        ></a>
                      </div>
                    </div>
                  </div>
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

      {getAllPostsDataLoading && <Loading message={"Fetching data!"} />}
      {postCommentLoading && <Loading message={"Posting your comment!"} />}
      {deleteCommentLoading && <Loading message={"Deleting your comment!"} />}

      {deleteCommentError !== "" && <Error errorMessage={deleteCommentError} />}
      {postCommentError !== "" && <Error errorMessage={postCommentError} />}
      {getAllPostsDataError !== "" && (
        <Error errorMessage={getAllPostsDataError} />
      )}
    </>
  );
}

// important thing to learn
// agr hm kisi card ko map loop m execute krde and chahe ki hr card pr alg data us card k data k according show hojaye
// to hme modal structure ko usi page ya component prr rkhna pdega jis pr hmne Card pr loop chlayi hai!
// and jo me mistake krrha tha vo ye thi ki me modal ko card component me hi use krrrha tha end usi m vo card data send krrha tha joki ek br set
// hokr ke change ni horha tha !!
