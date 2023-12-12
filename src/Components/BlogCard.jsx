import React, { useEffect, useState } from "react";
import "./SCSS/BlogCard.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  likePostStart,
  likePostSuccess,
  postCommentStart,
  savePostStart,
  savePostSuccess,
  unLikePostStart,
  unLikePostSuccess,
  unSavePostStart,
  unSavePostSuccess,
} from "../Redux(Saga)/Actions/PostAction";
import Comment from "./Comment";

export default function BlogCard({ data , setAllData}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
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

  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      if (UserDataFromResponse.likedPost.length > 0) {
        if (
          UserDataFromResponse.likedPost.every(
            (item) => item.postId !== data._id
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
            (item) => item.postId !== data._id
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
  // save or unsave
  const [saved, setSaved] = useState(false);


  return (
    <>
      <div className="BlogCard col col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 card">
        <div className="row">
          <div
            className="col-2"
            onClick={() => navigate(`/bloggerProfile/${data.userId}`)}
          >
            <img src={data.userProfilePicture} alt="PP" />
          </div>
          <div
            className="col-9 align-content-center"
            onClick={() => navigate(`/bloggerProfile/${data.userId}`)}
          >
            <h5 title="Name">{data.userName}</h5>
          </div>
          <div className="col-1 dropdown">
            <button
              type="button"
              id="dropdownCardMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi h5 bi-three-dots-vertical"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownCardMenu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------------------- */}
        <img src={data.postImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="row d-flex">
            <div className="col-6">
              {liked ? (
                <>
                  <button
                    className="liked"
                    title="Unlike"
                    onClick={(e) => {
                      e.preventDefault();
                      const jwToken = JSON.parse(
                        localStorage.getItem("blogApp")
                      );
                      const finalData = {
                        token: jwToken.token,
                        postId: data._id,
                      };
                      dispatch(unLikePostStart(finalData));
                      setLiked(false);
                    }}
                  >
                    <i className="bi bi-suit-heart-fill"></i>
                  </button>
                </>
              ) : (
                <>
                  <button
                    title="Like"
                    onClick={(e) => {
                      e.preventDefault();
                      const jwToken = JSON.parse(
                        localStorage.getItem("blogApp")
                      );
                      const finalData = {
                        token: jwToken.token,
                        postId: data._id,
                      };
                      setLiked(true);
                      dispatch(likePostStart(finalData));
                    }}
                  >
                    <i className="bi bi-suit-heart"></i>
                  </button>
                </>
              )}

              <button
                title="Comment"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#CommentModal"
                onClick={(e) => {
                  e.preventDefault()
                  setAllData(data);
                  
                }}
              >
                <i className="bi bi-chat"></i>
              </button>
            </div>
            <div className="col-6 text-end">
              {saved ? (
                <button
                  className="saved"
                  title="Remove from Saved"
                  onClick={(e) => {
                    e.preventDefault();
                    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
                    const finalData = {
                      token: jwToken.token,
                      postId: data._id,
                    };
                    setSaved(false);
                    dispatch(unSavePostStart(finalData));
                  }}
                >
                  <i className="bi bi-bookmark-fill"></i>
                </button>
              ) : (
                <button
                  title="Save"
                  onClick={(e) => {
                    e.preventDefault();
                    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
                    const finalData = {
                      token: jwToken.token,
                      postId: data._id,
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
          <h5 className="card-title">{data.postTitle}</h5>
          <p className="card-text">{data.postCaption}</p>
          <Link to={`/myBlog/${data._id}`} className="btn btn-primary">
            Read
          </Link>
        </div>
      </div>

    </>
  );
}
