import React from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import BlogReadPage from "./Pages/BlogReadPage";
import TagsPage from "./Pages/TagsPage";
import BloggerProfilePage from "./Pages/BloggerProfilePage";
import MyProfilePage from "./Pages/MyProfilePage";
import CategoryPage from "./Pages/CategoryPage";
import MyPost from "./Pages/MyPost";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import EditProfilePage from "./Pages/EditProfilePage";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/myProfile" element={<MyProfilePage />} />
          <Route path="/myPost" element={<MyPost />} />
          <Route path="/bloggerProfile" element={<BloggerProfilePage />} />
          <Route path="/blog" element={<BlogReadPage />} />
          <Route path="/tagPage" element={<TagsPage />} />
          <Route path="/categoryPage" element={<CategoryPage />} />
          <Route path="/editProfile" element={<EditProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
