import React from "react";
import BlogCard from "../Components/BlogCard";
import './SCSS/TagsPage.scss';
import Footer from "../Components/Footer";

export default function TagsPage() {
  return (
    <>
      <div className="container-fluid TagPage">
        <div className="container">
          <h1>
            <i class="bi bi-tags-fill"> </i>Lifestyle
          </h1>
          <h6 className="h6">Here's related posts to this tag...</h6>
          <div className="row d-flex">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
