import React, { useEffect, useState } from "react";
import "./SCSS/Comment.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentStart } from "../Redux(Saga)/Actions/PostAction";
import { useNavigate } from "react-router-dom";

export default function Comment({ data, postId, myBlog }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );

  const [userInfo, setUserInfo] = useState({
    userId: data.userId,
    profilePicture:
      "https://firebasestorage.googleapis.com/v0/b/blog-app-2d912.appspot.com/o/icon.webp?alt=media&token=99270953-b1b0-40bd-99a8-e381c255afcb",
    userName: "fetching User",
  });

  const [showDeleteCommentBtn, setShowDeleteCommentBtn] = useState(false);
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      if (UserDataFromResponse._id === data.userId) {
        setShowDeleteCommentBtn(true);
      } else {
        setShowDeleteCommentBtn(false);
      }
      if (myBlog) {
        setShowDeleteCommentBtn(true);
      }
    }
  }, [data, setShowDeleteCommentBtn]);

  const Response = async (userId) => {
    try {
      const response = await axios.get(
        `/v1/UserApi/getUserUserNameAndDp/${userId}`
      );
      if (response.data.hasOwnProperty("userName")) {
        setUserInfo({
          ...userInfo,
          profilePicture: response.data.profilePicture,
          userName: response.data.userName,
        });
      }
    } catch (error) {
      // nothing to do here if error occurs bcz initial value is visible if userdata is not getted
    }
  };
  // it's for showing updated data to user of commenter
  useEffect(() => {
    Response(data.userId);
  }, [data, Response, setUserInfo]);

  return (
    <>
      <div className="row d-flex comment">
        <div
          className="col-1 commenterDp"
          onClick={() => navigate(`/bloggerProfile/${userInfo.userId}`)}
        >
          <img src={userInfo.profilePicture} alt="" />
        </div>
        <div
          className="col-11 commenterName"
          onClick={() => navigate(`/bloggerProfile/${userInfo.userId}`)}
        >
          <h5 className="h5">
            {userInfo.userName.split("").slice(0, 13).join("")}
          </h5>
        </div>
        <div className="col-12">
          <p>{data.comment}</p>
        </div>
      </div>

      {showDeleteCommentBtn && (
        <div className="row m-0 p-0 delete___">
          <div className="col col-12 m-0 p-0">
            <button
              className="deleteBtn"
              onClick={(e) => {
                e.preventDefault();
                const jwToken = JSON.parse(localStorage.getItem("blogApp"));
                const finalData = {
                  token: jwToken.token,
                  commentDetail: data,
                  postId: postId,
                };
                dispatch(deleteCommentStart(finalData));
              }}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
