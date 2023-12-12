import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import CategoryHeader from "../Components/CategoryHeader";
import "./SCSS/HomePageBlog.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostsDataStart,
  postCommentStart,
  postCommentSuccess,
} from "../Redux(Saga)/Actions/PostAction";
import Comment from "../Components/Comment";

export default function HomePageBlog() {
  const dispatch = useDispatch();
  const getAllPostsDataResponse = useSelector(
    (state) => state.postReducer.getAllPostsDataResponse
  );
  const postCommentResponse = useSelector(
    (state) => state.postReducer.postCommentResponse
  );
  useEffect(() => {
    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
    if (jwToken) {
      dispatch(getAllPostsDataStart(jwToken.token));
    }
  }, []);
  // handling response
  const [postsData, setPostsData] = useState([]);
  useEffect(() => {
    if (getAllPostsDataResponse.length > 0) {
      setPostsData(getAllPostsDataResponse);
    }
  }, [getAllPostsDataResponse]);

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
  }, [postCommentResponse]);
  return (
    <>
      <CategoryHeader />
      <div className="container-fluid HomePageBlogSection">
        <div className="container">
          <div className="row d-flex">
            {postsData.length > 0 ? (
              postsData.map((item, index) => (
                <BlogCard data={item} key={index} setAllData={setAllData} />
              ))
            ) : (
              <>no posts</>
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
                  <Comment key={index} data={item} postId={allData._id}/>
                ))
              ) : (
                <> no comments</>
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
    </>
  );
}

// important thing to learn
// agr hm kisi card ko map loop m execute krde and chahe ki hr card pr alg data us card k data k according show hojaye
// to hme modal structure ko usi page ya component prr rkhna pdega jis pr hmne Card pr loop chlayi hai!
// and jo me mistake krrha tha vo ye thi ki me modal ko card component me hi use krrrha tha end usi m vo card data send krrha tha joki ek br set
// hokr ke change ni horha tha !!
