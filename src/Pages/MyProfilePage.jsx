import React, { useEffect, useState } from "react";
import "./SCSS/MyProfilePage.scss";
import founder from "../Media/Founder.jpg";
import founderr from "../Media/Logo.jpg";
import ff from "./SCSS/Media/HomePageBGImageTop.jpg";
import ProfilePostCard from "../Components/ProfilePostCard";
import ProfileTagsUsedCard from "../Components/ProfileTagsUsedCard";
import BlogCard from "../Components/BlogCard";
import Modal from "../Components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyUserAuthStart } from "../Redux(Saga)/Actions/UserAction";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  const authorised = useSelector(
    (state) => state.userReducer.authorised
  );
  // user authorisation
  useEffect(()=>{
    if(authorised.hasOwnProperty('authorised')){
      if(authorised.authorised === false){
        navigate("/signup");
        // alert (your token is expired please login)!
      }
    }
  },[authorised])

  // setting user data
  const [datashow, setDatashow] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("data")) {
      setDatashow(true);
      setUserData(UserDataFromResponse.data);
    } else {
      const tokenInfo = JSON.parse(localStorage.getItem("blogApp"));
      if (tokenInfo.hasOwnProperty("validity")) {
        dispatch(verifyUserAuthStart(tokenInfo.token));
      } else {
        navigate("/signup");
      }
    }
  }, [UserDataFromResponse]);

  // for profile nav [NavLink is for routes butt i want small nav so that's why i did this!];
  const [WhatToShow, setWhatToShow] = useState("myPosts");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    const myPosts = document.getElementById("myPosts");
    const tagsUsed = document.getElementById("tagsUsed");
    const Saved = document.getElementById("Saved");
    const Liked = document.getElementById("Liked");
    switch (WhatToShow) {
      case "myPosts":
        myPosts.style.color = "white";
        tagsUsed.style.color = "grey";
        Saved.style.color = "grey";
        Liked.style.color = "grey";
        myPosts.style.transform = "scale(1.1)";
        tagsUsed.style.transform = "none";
        Saved.style.transform = "none";
        Liked.style.transform = "none";
        break;
      case "tagsUsed":
        tagsUsed.style.color = "white";
        myPosts.style.color = "grey";
        Saved.style.color = "grey";
        Liked.style.color = "grey";
        tagsUsed.style.transform = "scale(1.1)";
        myPosts.style.transform = "none";
        Saved.style.transform = "none";
        Liked.style.transform = "none";
        break;
      case "Saved":
        Saved.style.color = "white";
        tagsUsed.style.color = "grey";
        myPosts.style.color = "grey";
        Liked.style.color = "grey";
        Saved.style.transform = "scale(1.1)";
        tagsUsed.style.transform = "none";
        myPosts.style.transform = "none";
        Liked.style.transform = "none";
        break;
      case "Liked":
        Liked.style.color = "white";
        tagsUsed.style.color = "grey";
        myPosts.style.color = "grey";
        Saved.style.color = "grey";
        Liked.style.transform = "scale(1.1)";
        tagsUsed.style.transform = "none";
        myPosts.style.transform = "none";
        Saved.style.transform = "none";
        break;

      default:
        myPosts.style.color = "white";
        tagsUsed.style.color = "grey";
        Saved.style.color = "grey";
        Liked.style.color = "grey";
        myPosts.style.transform = "scale(1.1)";
        tagsUsed.style.transform = "none";
        Saved.style.transform = "none";
        Liked.style.transform = "none";
        break;
    }
  }, [WhatToShow]);
  return (
    <>
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
                  <h3 className="h3 username">{userData.userName}</h3>
                )}
              </div>
              <div className="col-5">
                <button>Edit Profile</button>
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
              <div className="col-4">
                <h4
                  className="h4"
                  title="Comment"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#Modall"
                  onClick={() => {
                    setFollowers(["followers", "followers", "followers"]);
                    setFollowing([]);
                  }}
                >
                  {datashow && (
                    <>
                      <span>{userData.Followers.length}</span>&nbsp;Followers
                    </>
                  )}
                </h4>
              </div>
              <div className="col-4">
                <h4
                  className="h4"
                  title="Comment"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#Modall"
                  onClick={() => {
                    setFollowers([]);
                    setFollowing(["following", "following", "following"]);
                  }}
                >
                  {datashow && (
                    <>
                      <span>{userData.Followings.length}</span>&nbsp;Following
                    </>
                  )}
                </h4>
              </div>
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
                id="tagsUsed"
                className="nav-link"
                onClick={() => {
                  setWhatToShow("tagsUsed");
                }}
              >
                <i className="bi bi-tags"></i> Tags Used
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

        {WhatToShow === "myPosts" && (
          <div className="container PostContainer">
            <div className="row">
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
            </div>
          </div>
        )}
        {WhatToShow === "tagsUsed" && (
          <div className="container TagsUsedContainer">
            <div className="row">
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
            </div>
          </div>
        )}
        {WhatToShow === "Saved" && (
          <div className="container PostContainer">
            {/* in this there is saved post but i used PstContainer again because these are similar i wouldn't repeat it!  */}
            <div className="row">
              <ProfileTagsUsedCard
                Saved={["Saved Post"]}
                tagsUsed={[]}
                Liked={[]}
              />
              <ProfileTagsUsedCard
                Saved={["Saved Post"]}
                tagsUsed={[]}
                Liked={[]}
              />
              <ProfileTagsUsedCard
                Saved={["Saved Post"]}
                tagsUsed={[]}
                Liked={[]}
              />
              <ProfileTagsUsedCard
                Saved={["Saved Post"]}
                tagsUsed={[]}
                Liked={[]}
              />
              <ProfileTagsUsedCard
                Saved={["Saved Post"]}
                tagsUsed={[]}
                Liked={[]}
              />
              <ProfileTagsUsedCard
                Saved={["Saved Post"]}
                tagsUsed={[]}
                Liked={[]}
              />
              <ProfileTagsUsedCard
                Saved={["Saved Post"]}
                tagsUsed={[]}
                Liked={[]}
              />
              <ProfileTagsUsedCard
                Saved={["Saved Post"]}
                tagsUsed={[]}
                Liked={[]}
              />
            </div>
          </div>
        )}
        {WhatToShow === "Liked" && (
          <div className="container PostContainer">
            <div className="row">
              <ProfileTagsUsedCard
                Liked={["Liked Post"]}
                tagsUsed={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                Liked={["Liked Post"]}
                tagsUsed={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                Liked={["Liked Post"]}
                tagsUsed={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                Liked={["Liked Post"]}
                tagsUsed={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                Liked={["Liked Post"]}
                tagsUsed={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                Liked={["Liked Post"]}
                tagsUsed={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                Liked={["Liked Post"]}
                tagsUsed={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                Liked={["Liked Post"]}
                tagsUsed={[]}
                Saved={[]}
              />
            </div>
          </div>
        )}
      </div>
      <Modal CommentSection={[]} followers={followers} following={following} />
    </>
  );
}
