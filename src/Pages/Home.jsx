import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./SCSS/Home.scss";
import HomeTop from "../Components/HomeTop";
import HomeFeatureConatiner from "../Components/HomeFeatureConatiner";
import HomeFounder from "../Components/HomeFounder";
import HomePageBlogs from "./HomePageBlogs";

export default function Home() {
  const [nott, setnott] = useState(false);

  return (
    <>
      <Header />
      {nott ? (
        <>
          <HomeTop />
          <HomeFeatureConatiner />
          <HomeFounder />
        </>
      ) : (
        <>
        <HomePageBlogs />
        </>
      )}

      <Footer />
    </>
  );
}
