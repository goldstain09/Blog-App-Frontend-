import React, { useCallback, useEffect, useState } from "react";
import "./SCSS/Follower.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Following({ data }) {
  const navigate = useNavigate();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );

  const [userInfo, setUserInfo] = useState({
    userId: data.bloggerId,
    profilePicture:
      "https://firebasestorage.googleapis.com/v0/b/blog-app-2d912.appspot.com/o/icon.webp?alt=media&token=99270953-b1b0-40bd-99a8-e381c255afcb",
    userName: "user__",
  });

  const Response = useCallback(
    async (bloggerId) => {
      try {
        const response = await axios.get(
          `/v1/UserApi/getUserUserNameAndDp/${bloggerId}`
        );
        if (response.data.hasOwnProperty("userName")) {
          setUserInfo({
            ...userInfo,
            profilePicture: response.data.profilePicture,
            userName: response.data.userName,
          });
        }
      } catch (error) {}
    },
    [setUserInfo, userInfo]
  );
  useEffect(() => {
    Response(data.bloggerId);
  }, [data, Response]);
  return (
    <>
      <div className="row d-flex" id="Followd">
        <div className="col-2">
          <img src={userInfo.profilePicture} alt="dp" className="w-100" />
        </div>
        <div className="col-8">
          <h4 className="h4">
            {userInfo.userName.split("").slice(0, 15).join("")}
          </h4>
        </div>
        <div className="col-2">
          <button
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={(e) => {
              e.preventDefault();
              if (UserDataFromResponse.hasOwnProperty("_id")) {
                if (userInfo.userId === UserDataFromResponse._id) {
                  navigate("/myProfile");
                } else {
                  navigate(`/bloggerProfile/${userInfo.userId}`);
                }
              }
            }}
          >
            View
          </button>
        </div>
      </div>
    </>
  );
}
