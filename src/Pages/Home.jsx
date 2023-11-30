import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./SCSS/Home.scss";
import HomeTop from "../Components/HomeTop";
import HomeFeatureConatiner from "../Components/HomeFeatureConatiner";
import HomeFounder from "../Components/HomeFounder";
import HomePageBlogs from "./HomePageBlogs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyUserAuthStart } from "../Redux(Saga)/Actions/UserAction";

export default function Home() {
  // what to show according to user auhtorised or not
  const [nottAuthorised, setNottAuthorised] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  const authorised = useSelector((state) => state.userReducer.authorised);
  // user authorisation
  useEffect(() => {
    if (authorised.hasOwnProperty("authorised")) {
      if (authorised.authorised === false) {
        setNottAuthorised(true);
        // alert (your token is expired please login)!
      } else {
        setNottAuthorised(false);
      }
    }
  }, [authorised]);
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
    } else {
      const tokenInfo = JSON.parse(localStorage.getItem("blogApp"));
      if (tokenInfo) {
        if (tokenInfo.hasOwnProperty("validity")) {
          dispatch(verifyUserAuthStart(tokenInfo.token));
        } else {
          setNottAuthorised(true);
        }
      }
    }
  }, [UserDataFromResponse]);
  return (
    <>
      <Header />
      {nottAuthorised ? (
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
