import React from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import BlogReadPage from "./Pages/BlogReadPage";
import TagsPage from "./Pages/TagsPage";
import BloggerProfilePage from "./Pages/BloggerProfilePage";
import MyProfilePage from "./Pages/MyProfilePage";
import CategoryPage from "./Pages/CategoryPage";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogReadPage />} />
          <Route path="/myProfile" element={<MyProfilePage />} />
          <Route path="/bloggerProfile" element={<BloggerProfilePage />} />
          <Route path="/tagPage" element={<TagsPage />} />
          <Route path="/categoryPage" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
