import React, { useEffect, useState } from "react";
import "./SCSS/BloggerProfilePage.scss";
import ProfilePostCard from "../Components/ProfilePostCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  followBloggerStart,
  getBloggerDataStart,
  unfollowBloggerStart,
  verifyUserAuthStart,
} from "../Redux(Saga)/Actions/UserAction";
import { getAllPostsDataStart } from "../Redux(Saga)/Actions/PostAction";
import BloggerFollowersModal from "../Components/BloggerFollowersModal";
import BloggerFollowingsModal from "../Components/BloggerFollowingsModal";

export default function BloggerProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  const bloggerDataResponse = useSelector(
    (state) => state.userReducer.bloggerDataResponse
  );
  // this useEffect is for authorization!
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      if (UserDataFromResponse._id === params.bloggerId) {
        navigate("/myProfile");
      }
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          validity: "15min",
          token: UserDataFromResponse.jwToken,
        })
      );
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
  }, [UserDataFromResponse]);
  // -----------------------------------------------------------------------------

  // to getting this blogger's data for showing their profile
  useEffect(() => {
    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
    if (jwToken) {
      dispatch(
        getBloggerDataStart({
          token: jwToken.token,
          bloggerId: params.bloggerId,
        })
      );
    }
  }, [params.bloggerId]);
  // handling its response
  const [bloggerData, setBloggerData] = useState({});
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followingMe, setFollowingMe] = useState(false); // if user followed that blogger then it is true
  useEffect(() => {
    if (bloggerDataResponse.hasOwnProperty("userName")) {
      setBloggerData(bloggerDataResponse);
      if (UserDataFromResponse.hasOwnProperty("_id")) {
        if (
          bloggerDataResponse.Followers.every(
            (item) => item.bloggerId !== UserDataFromResponse._id
          )
        ) {
          // if user didnot followed him then it execute
          setFollowingMe(true);
        }
      }
    }
  }, [bloggerDataResponse]);

  return (
    <>
      <div className="container-fluid BloggerProfilePage">
        {bloggerData.hasOwnProperty("userName") ? (
          <>
            <div className="row d-flex">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <img src={bloggerData.profilePicture} alt="Profile Picture" />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                <div className="row d-flex usernameAndFollowBtnContainer">
                  <div className="col-7">
                    <h3 className="h3 username">{bloggerData.userName}</h3>
                  </div>
                  <div className="col-5">
                    {followingMe ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const jwToken = JSON.parse(
                            localStorage.getItem("blogApp")
                          );
                          const finalData = {
                            token: jwToken.token,
                            bloggerId: params.bloggerId,
                          };
                          dispatch(followBloggerStart(finalData));
                          setFollowingMe(false);
                        }}
                      >
                        Follow
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
                            bloggerId: params.bloggerId,
                          };
                          dispatch(unfollowBloggerStart(finalData));
                          setFollowingMe(true);
                        }}
                      >
                        Unfollow
                      </button>
                    )}
                  </div>
                </div>
                <div className="row d-flex postFollowersAndFollowingContainer">
                  <div className="col-4">
                    <h4 className="h4">
                      <span>{bloggerData.myPosts.length}</span>&nbsp;Posts
                    </h4>
                  </div>
                  <div className="col-4">
                    <h4
                      className="h4"
                      data-bs-toggle="modal"
                      data-bs-target="#bloggerFollowers"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFollowers(bloggerData.Followers);
                      }}
                    >
                      <span>{bloggerData.Followers.length}</span>&nbsp;Followers
                    </h4>
                  </div>
                  <div className="col-4">
                    <h4
                      className="h4"
                      data-bs-toggle="modal"
                      data-bs-target="#bloggerFollowings"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFollowings(bloggerData.Followings);
                      }}
                    >
                      <span>{bloggerData.Followings.length}</span>
                      &nbsp;Following
                    </h4>
                  </div>
                </div>
                <div className="row NameAndBio">
                  <div className="col-12">
                    <h2 className="h2">{bloggerData.Name}</h2>
                  </div>
                  <div className="col-12">
                    <pre>{bloggerData.Biography}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <ul className="nav justify-content-center postetcNavbar">
                <li className="nav-item">
                  <a id="myPosts" className="nav-link" aria-current="page">
                    <i className="bi bi-grid-3x3"></i> Posts
                  </a>
                </li>
              </ul>
            </div>

            <div className="container PostContainer">
              <div className="row">
                {bloggerData.hasOwnProperty("myPosts") &&
                bloggerData.myPosts.length > 0 ? (
                  bloggerData.myPosts.map((item, index) => (
                    <ProfilePostCard key={index} data={item} />
                  ))
                ) : (
                  <>no posts</>
                )}
              </div>
            </div>
          </>
        ) : (
          <>No PRofile</>
        )}
      </div>

      <BloggerFollowersModal followers={followers} />
      <BloggerFollowingsModal followings={followings} />
    </>
  );
}
