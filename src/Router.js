import React from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import BlogReadPage from "./Pages/BlogReadPage";
import TagsPage from "./Pages/TagsPage";
import BloggerProfilePage from "./Pages/BloggerProfilePage";
import MyProfilePage from "./Pages/MyProfilePage";
import CategoryPage from "./Pages/CategoryPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import EditProfilePage from "./Pages/EditProfilePage";
import AddPostPage from "./Pages/AddPostPage";
import MyBlog from "./Pages/MyBlog";
import EditPostPage from "./Pages/EditPostPage";
import SearchPage from "./Pages/SearchPage";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/editProfile" element={<EditProfilePage />} />
          <Route path="/myProfile" element={<MyProfilePage />} />
          <Route path="/myBlog/:postId" element={<MyBlog />} />
          <Route path="/editPost/:postId" element={<EditPostPage />} />
          <Route path="/addPost" element={<AddPostPage />} />
          <Route path="/editPost" element={<AddPostPage />} />
          <Route path="/bloggerProfile/:bloggerId" element={<BloggerProfilePage />} />
          <Route path="/blog/:postId" element={<BlogReadPage />} />
          <Route path="/tagPage/:tag" element={<TagsPage />} />
          <Route path="/categoryPage/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
