import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./SCSS/Home.scss";
import HomeTop from "../Components/HomeTop";
import HomeFeatureConatiner from "../Components/HomeFeatureConatiner";
import HomeFounder from "../Components/HomeFounder";
import HomePageBlogs from "./HomePageBlogs";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllBloggersDataStart,
  verifyUserAuthStart,
} from "../Redux(Saga)/Actions/UserAction";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

export default function Home() {
  const dispatch = useDispatch();
  const {
    UserDataFromResponse,
    verifyUserLoading,
    verifyUserError,
    getAllBloggersDataLoading,
    getAllBloggersDataError,
  } = useSelector((state) => state.userReducer);

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
  }, [UserDataFromResponse, setNottAuthorised, dispatch]);
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
      {(verifyUserLoading || getAllBloggersDataLoading) && (
        <Loading message={"Fetching data!"} />
      )}

      {verifyUserError !== "" && <Error errorMessage={verifyUserError} />}
      {getAllBloggersDataError !== "" && (
        <Error errorMessage={getAllBloggersDataError} />
      )}
    </>
  );
}

// import LoadingBar from 'react-top-loading-bar'

// const [progress, setProgress] = useState(0)

{
  /* <LoadingBar
color='#f11946'
progress={progress}
onLoaderFinished={() => setProgress(0)}
/> */
}
