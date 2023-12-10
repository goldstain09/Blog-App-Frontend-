import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import CategoryHeader from "../Components/CategoryHeader";
import "./SCSS/HomePageBlog.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsDataStart } from "../Redux(Saga)/Actions/PostAction";

export default function HomePageBlog() {
  const dispatch = useDispatch();
  const getAllPostsDataResponse = useSelector(
    (state) => state.postReducer.getAllPostsDataResponse
  );
  useEffect(() => {
    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
    if(jwToken){
      dispatch(getAllPostsDataStart(jwToken.token));      
    }
  }, []);
  // handling response
  const [postsData, setPostsData] = useState([]);
  useEffect(() => {
    if (getAllPostsDataResponse.length > 0) {
      setPostsData(getAllPostsDataResponse);
    }
  }, [getAllPostsDataResponse]);
  return (
    <>
      <CategoryHeader />
      <div className="container-fluid HomePageBlogSection">
        <div className="container">
          <div className="row d-flex">
            {postsData.length > 0 ? (
              postsData.map((item, index) => (
                <BlogCard data={item} key={index} />
              ))
            ) : (
              <>no posts</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
