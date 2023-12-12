import React, { useEffect, useState } from "react";
import "./SCSS/Comment.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentStart } from "../Redux(Saga)/Actions/PostAction";

export default function Comment({ data, postId,myBlog }) {
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );

  const [showDeleteCommentBtn, setShowDeleteCommentBtn] = useState(false);

  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      if (UserDataFromResponse._id === data.userId || myBlog) {
        setShowDeleteCommentBtn(true);
      }
    }
  }, [UserDataFromResponse]);

  const [userInfo, setUserInfo] = useState({
    userId: data.userId,
    profilePicture:
      "https://firebasestorage.googleapis.com/v0/b/blog-app-2d912.appspot.com/o/icon.webp?alt=media&token=99270953-b1b0-40bd-99a8-e381c255afcb",
    userName: "user__",
  });

  // it's for showing updated data to user of commenter
  useEffect(() => {
    Response(data.userId);
  }, [data]);

  const Response = async (userId) => {
    try {
      const jwToken = JSON.parse(localStorage.getItem("blogApp"));
      const response = await axios.get(
        `http://localhost:8080/v1/UserApi/getUserUserNameAndDp/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwToken.token}`,
          },
        }
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

  return (
    <>
      <div className="row d-flex comment">
        <div className="col-1 commenterDp">
          <img src={userInfo.profilePicture} alt="" />
        </div>
        <div className="col-11 commenterName">
          <h5 className="h5">{userInfo.userName}</h5>
        </div>
        <div
          className={showDeleteCommentBtn ? "col-12" : "col-12 dropdown"}
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle={showDeleteCommentBtn ? "" : "dropdown"}
          aria-expanded="false"
        >
          <p>{data.comment}</p>
          {/* dropdown */}
          {!showDeleteCommentBtn && (
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
          )}
        </div>
      </div>

      {showDeleteCommentBtn && (
        <div className="row m-0 p-0 delete">
          <div className="col col-12 m-0 p-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                const jwToken = JSON.parse(localStorage.getItem("blogApp"));
                const finalData = {
                  token: jwToken.token,
                  commentDetail: data,
                  postId:postId
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
