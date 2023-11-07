import React from "react";
import BlogCard from "../Components/BlogCard";
import CategoryHeader from "../Components/CategoryHeader";
import "./SCSS/HomePageBlog.scss";

export default function HomePageBlog() {
  return (
    <>
      <CategoryHeader />
      <div className="container-fluid HomePageBlogSection">
        <div className="container">
          <div className="row d-flex">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>
    </>
  );
}
