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
import { getAllBloggersDataStart, verifyUserAuthStart } from "../Redux(Saga)/Actions/UserAction";

export default function Home() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );

  // what to show according to user is authorised or not
  const [nottAuthorised, setNottAuthorised] = useState(false);

  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          validity: "15min",
          token: UserDataFromResponse.jwToken,
        })
      );
      setNottAuthorised(false);
    } else {
      const jwToken = JSON.parse(localStorage.getItem("blogApp"));
      if (jwToken) {
        if (jwToken.hasOwnProperty("validity")) {
          dispatch(verifyUserAuthStart(jwToken.token));
          dispatch(getAllBloggersDataStart(jwToken.token));

        }
      } else {
        setNottAuthorised(true);
      }
    }
  }, [UserDataFromResponse]);
  // -----------------------------------------------------------------------------

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
