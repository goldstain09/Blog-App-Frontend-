import React, { useEffect, useState } from "react";
import "./SCSS/BloggerProfilePage.scss";
import founder from "../Media/Founder.jpg";
import ProfilePostCard from "../Components/ProfilePostCard";
import ProfileTagsUsedCard from "../Components/ProfileLikedAndSavedPostsCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBloggerDataStart,
  verifyUserAuthStart,
} from "../Redux(Saga)/Actions/UserAction";
import ProfileLikedAndSavedPostsCard from "../Components/ProfileLikedAndSavedPostsCard";

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
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          validity: "15min",
          token: UserDataFromResponse.jwToken,
        })
      );
      if (UserDataFromResponse._id === params.bloggerId) {
        navigate("/myProfile");
      }
    } else {
      const jwToken = JSON.parse(localStorage.getItem("blogApp"));
      if (jwToken) {
        if (jwToken.hasOwnProperty("validity")) {
          dispatch(verifyUserAuthStart(jwToken.token));
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
    dispatch(
      getBloggerDataStart({ token: jwToken.token, bloggerId: params.bloggerId })
    );
  }, [params.bloggerId]);
  // handling its response
  const [bloggerData,setBloggerData] = useState({});
  useEffect(()=>{
    if(bloggerDataResponse.hasOwnProperty('userName')){
      setBloggerData(bloggerDataResponse);
    }
  },[bloggerDataResponse])

  return (
    <>
      <div className="container-fluid BloggerProfilePage">
        {
          bloggerData.hasOwnProperty('userName') ? (
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
                <button>Follow</button>
              </div>
            </div>
            <div className="row d-flex postFollowersAndFollowingContainer">
              <div className="col-4">
                <h4 className="h4">
                  <span>{bloggerData.myPosts.length}</span>&nbsp;Posts
                </h4>
              </div>
              <div className="col-4">
                <h4 className="h4">
                  <span>{bloggerData.Followers.length}</span>&nbsp;Followers
                </h4>
              </div>
              <div className="col-4">
                <h4 className="h4">
                  <span>{bloggerData.Followings.length}</span>&nbsp;Following
                </h4>
              </div>
            </div>
            <div className="row NameAndBio">
              <div className="col-12">
                <h2 className="h2">{bloggerData.Name}</h2>
              </div>
              <div className="col-12">
                <pre>
                 {
                  bloggerData.Biography
                 }
                </pre>
              </div>
            </div>
          </div>
        </div>
        {}
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
            {
              bloggerData.myPosts.length>0 ? bloggerData.myPosts.map((item,index)=>(
                 <ProfilePostCard key={index}  data={item} />
              )) : (
                <>no posts</>
              )
            }
          </div>
        </div>
            </>
          ) : (
            <>
            No PRofile
            </>
          )
        }
      </div>
    </>
  );
}
