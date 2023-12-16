import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import "./SCSS/TagsPage.scss";
import Footer from "../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserAuthStart } from "../Redux(Saga)/Actions/UserAction";
import { getAllPostsDataStart } from "../Redux(Saga)/Actions/PostAction";

export default function TagsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  const getAllPostsDataResponse = useSelector(
    (state) => state.postReducer.getAllPostsDataResponse
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
      if (getAllPostsDataResponse.length > 0) {
        // everthing in this logic i did myself and
        // here i filtered posts that in which posts that tag exist!!
        let tagsPosts = getAllPostsDataResponse.filter((item) => {
          let itemsBooleanArray = item.postTags.map((item) => {
            if (item.toLowerCase() !== params.tag.toLowerCase()) {
              return false;
            } else {
              return true;
            }
          });
          if (itemsBooleanArray.every((item) => item !== true)) {
            return false;
          } else {
            return true;
          }
        });
        setTagsPost(tagsPosts);
      }
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
  }, [UserDataFromResponse, params.tag]);
  // -----------------------------------------------------------------------------

  const [tagsPost, setTagsPost] = useState([]);
  return (
    <>
      <div className="container-fluid TagPage">
        <div className="container">
          <h1>
            <i className="bi bi-tags-fill"> </i>
            {params.tag}
          </h1>
          <h6 className="h6">Here's related posts to this tag...</h6>
          <div className="row d-flex">
            {tagsPost.length > 0 ? (
              tagsPost.map((item, index) => (
                <BlogCard key={index} data={item} />
              ))
            ) : (
              <>No related posts to this tag</>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
