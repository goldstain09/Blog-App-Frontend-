import React, { useEffect, useState } from "react";
import "./SCSS/MyProfilePage.scss";
import ProfilePostCard from "../Components/ProfilePostCard";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  notAuthorised,
  verifyUserAuthStart,
} from "../Redux(Saga)/Actions/UserAction";
import ProfileLikedAndSavedPostsCard from "../Components/ProfileLikedAndSavedPostsCard";
import { getAllPostsDataStart } from "../Redux(Saga)/Actions/PostAction";
import MyFollowersModal from "../Components/MyFollowersModal";
import MyFollowingsModal from "../Components/MyFollowingsModal";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  // setting user data
  const [datashow, setDatashow] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    // it's for if user account was deleted and he is on edit page thenn info from state or store is mandatory to remove!!
    if (UserDataFromResponse.hasOwnProperty("accountDeleted")) {
      if (UserDataFromResponse.accountDeleted) {
        dispatch(notAuthorised(false));
      }
    }
  }, [UserDataFromResponse]);
  // -----------------------------------------------------------------------------

  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      setUserData(UserDataFromResponse);
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          token: UserDataFromResponse.jwToken,
          validity: "15 minutes",
        })
      );
      setLikedPosts(UserDataFromResponse.likedPost);
      setSavedPosts(UserDataFromResponse.savedPost);
      setDatashow(true);
      setWhatToShow("myPosts");
    } else {
      const tokenInfo = JSON.parse(localStorage.getItem("blogApp"));
      if (tokenInfo) {
        if (tokenInfo.hasOwnProperty("validity")) {
          dispatch(verifyUserAuthStart(tokenInfo.token));
          dispatch(getAllPostsDataStart(tokenInfo.token));
        }
      } else {
        navigate("/login");
      }
    }
  }, [UserDataFromResponse]);
  // -----------------------------------------------------------------------------
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  // for profile nav [NavLink is for routes butt i want small nav so that's why i did this!];
  const [WhatToShow, setWhatToShow] = useState("Loading");
  useEffect(() => {
    const myPosts = document.getElementById("myPosts");
    const Saved = document.getElementById("Saved");
    const Liked = document.getElementById("Liked");
    switch (WhatToShow) {
      case "myPosts":
        myPosts.style.color = "white";
        Saved.style.color = "grey";
        Liked.style.color = "grey";
        myPosts.style.transform = "scale(1.1)";
        Saved.style.transform = "none";
        Liked.style.transform = "none";
        break;

      case "Saved":
        Saved.style.color = "white";
        myPosts.style.color = "grey";
        Liked.style.color = "grey";
        Saved.style.transform = "scale(1.1)";
        myPosts.style.transform = "none";
        Liked.style.transform = "none";
        break;
      case "Liked":
        Liked.style.color = "white";
        myPosts.style.color = "grey";
        Saved.style.color = "grey";
        Liked.style.transform = "scale(1.1)";
        myPosts.style.transform = "none";
        Saved.style.transform = "none";
        break;

      default:
        myPosts.style.color = "white";
        Saved.style.color = "grey";
        Liked.style.color = "grey";
        myPosts.style.transform = "scale(1.1)";
        Saved.style.transform = "none";
        Liked.style.transform = "none";
        break;
    }
  }, [WhatToShow]);

  return (
    <>
      <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
        <Link className="btn btn-outline-dark" to={"/"}>
          <i className="bi bi-box-arrow-left"></i>
        </Link>
      </div>
      <div className="container-fluid MyProfilePage">
        <div className="row d-flex">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            {datashow && (
              <img src={userData.profilePicture} alt="Profile Picture" />
            )}
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <div className="row d-flex usernameAndEditBtnContainer">
              <div className="col-7">
                {datashow && (
                  <h3
                    className="h3 username"
                    style={{ wordWrap: "break-word" }}
                  >
                    {userData.userName}
                  </h3>
                )}
              </div>
              <div className="col-5">
                <button
                  className="mx-1"
                  onClick={() => {
                    navigate("/addPost");
                  }}
                >
                  Add Blog
                </button>
                <button
                  onClick={() => {
                    navigate("/editProfile");
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="row d-flex postFollowersAndFollowingContainer">
              <div className="col-4">
                {datashow && (
                  <h4 className="h4">
                    <span>{userData.myPosts.length}</span>&nbsp;Posts
                  </h4>
                )}
              </div>
              {datashow && (
                <>
                  <div className="col-4">
                    <h4
                      className="h4"
                      data-bs-toggle="modal"
                      data-bs-target="#myFollowers"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFollowers(userData.Followers);
                      }}
                    >
                      {userData.Followers.length} Followers
                    </h4>
                  </div>
                  <div className="col-4">
                    <h4
                      className="h4"
                      data-bs-toggle="modal"
                      data-bs-target="#myFollowings"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFollowings(userData.Followings);
                      }}
                    >
                      {userData.Followings.length} Following
                    </h4>
                  </div>
                </>
              )}
            </div>
            <div className="row NameAndBio">
              <div className="col-12">
                {datashow && <h2 className="h2">{userData.Name}</h2>}
              </div>
              <div className="col-12">
                <pre>{datashow && userData.Biography}</pre>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="row">
          <ul className="nav justify-content-center postetcNavbar">
            <li className="nav-item">
              <a
                id="myPosts"
                className="nav-link"
                aria-current="page"
                onClick={() => {
                  setWhatToShow("myPosts");
                }}
              >
                <i className="bi bi-grid-3x3"></i> Your Posts
              </a>
            </li>
            <li className="nav-item">
              <a
                id="Saved"
                className="nav-link"
                onClick={() => {
                  setWhatToShow("Saved");
                }}
              >
                <i className="bi bi-bookmark-check"></i> Saved Posts
              </a>
            </li>
            <li className="nav-item">
              <a
                id="Liked"
                className="nav-link"
                onClick={() => {
                  setWhatToShow("Liked");
                }}
              >
                <i className="bi bi-heart"></i> Liked Posts
              </a>
            </li>
          </ul>
        </div>

        {WhatToShow === "Loading" && (
          <div className="container PostContainer">
            <div className="row">Loading-------------------------------</div>
          </div>
        )}
        {WhatToShow === "myPosts" && (
          <div className="container PostContainer">
            <div className="row">
              {userData.hasOwnProperty("jwToken") &&
              userData.myPosts.length > 0 ? (
                userData.myPosts.map((item, index) => (
                  <ProfilePostCard key={index} data={item} />
                ))
              ) : (
                <>No Posts</>
              )}
            </div>
          </div>
        )}

        {WhatToShow === "Saved" && (
          <div className="container PostContainer">
            {/* in this there is saved post but i used PstContainer again because these are similar i wouldn't repeat it!  */}
            <div className="row">
              {savedPosts.length > 0 ? (
                savedPosts.map((item, index) => (
                  <ProfileLikedAndSavedPostsCard
                    Saved={item}
                    Liked={{}}
                    key={index}
                  />
                ))
              ) : (
                <>No saved posts</>
              )}
            </div>
          </div>
        )}
        {WhatToShow === "Liked" && (
          <div className="container PostContainer">
            <div className="row">
              {likedPosts.length > 0 ? (
                likedPosts.map((item, index) => (
                  <ProfileLikedAndSavedPostsCard
                    Liked={item}
                    Saved={{}}
                    key={index}
                  />
                ))
              ) : (
                <> no liked posts </>
              )}
            </div>
          </div>
        )}
      </div>
      <MyFollowersModal followers={followers} />
      <MyFollowingsModal followings={followings} />
    </>
  );
}
