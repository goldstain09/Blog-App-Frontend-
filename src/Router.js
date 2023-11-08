import React from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import BlogReadPage from "./Pages/BlogReadPage";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogReadPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
