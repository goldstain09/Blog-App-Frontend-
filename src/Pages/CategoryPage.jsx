import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserAuthStart } from "../Redux(Saga)/Actions/UserAction";
import { getAllPostsDataStart } from "../Redux(Saga)/Actions/PostAction";

export default function CategoryPage() {
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
        let categoryPosts = getAllPostsDataResponse.filter(
          (item) =>
            item.postCategory.toLowerCase() === params.category.toLowerCase()
        );
        setCatgoryPosts(categoryPosts);
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
  }, [UserDataFromResponse, params.category]);
  // -----------------------------------------------------------------------------
  const [categoryPosts, setCatgoryPosts] = useState([]);

  return (
    <>
      <div className="container-fluid TagPage">
        <div className="container">
          <h1>
            <i className="bi bi-collection"></i> {params.category}
          </h1>
          <h6 className="h6">Here's related posts to this Category...</h6>
          <div className="row d-flex">
            {categoryPosts.length > 0 ? (
              categoryPosts.map((item, index) => (
                <BlogCard data={item} key={index} />
              ))
            ) : (
              <>No Posts Related to this category!!</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
