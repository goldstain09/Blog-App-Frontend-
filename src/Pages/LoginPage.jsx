import React, { useEffect, useState } from "react";
import "./SCSS/LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAccountStart,
  notAuthorised,
  verifyUserAuthStart,
} from "../Redux(Saga)/Actions/UserAction";

export default function LoginPage() {
  const navigate = useNavigate();
  // dispatch & data getting from store
  const dispatch = useDispatch();
  const authorised = useSelector((state) => state.userReducer.authorised);
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  useEffect(() => {
    // it's for if user account was deleted and he is on edit or login page thenn info from state or store is mandatory to remove!!
    if (UserDataFromResponse.hasOwnProperty("accountDeleted")) {
      if (UserDataFromResponse.accountDeleted) {
        dispatch(notAuthorised(false));
      }
    }
  }, [UserDataFromResponse]);
// -----------------------------------------------------------------------------


  // user Authorization
  useEffect(() => {
    if (authorised.hasOwnProperty("authorised")) {
      if (authorised.authorised) {
        navigate("/");
      }
    }
  }, [authorised]);
  useEffect(() => {
    //if user is already logged in!
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      navigate("/");
    } else {
      const tokenInfo = JSON.parse(localStorage.getItem("blogApp"));
      if (tokenInfo) {
        if (tokenInfo.hasOwnProperty("validity")) {
          dispatch(verifyUserAuthStart(tokenInfo.token));
        }
      }
    }
  }, [UserDataFromResponse]);
// -----------------------------------------------------------------------------


  // initial login data
  const initialFormData = {
    userName: "",
    Password: "",
  };

  // form state
  const [formData, setFormData] = useState(initialFormData);

  //destructuring
  const { userName, Password } = formData;

  //empty errors
  const [emptyUserNameError, setEmptyUserNameError] = useState(false);
  const [ErrorPassword, setErrorPassword] = useState(false); // or length!
  // invalid password and username errors
  const [invalidUserName, setInvalidUserName] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  //inputChange function
  const inputChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // login function
  const login = (e) => {
    e.preventDefault();
    if (userName !== "") {
      if (Password !== "" && Password.length >= 8) {
        dispatch(loginUserAccountStart(formData));
      } else {
        setErrorPassword(true);
      }
    } else {
      setEmptyUserNameError(true);
    }
  };

  // handling response
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      //---(means logged into account)
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          token: UserDataFromResponse.jwToken,
          validity: "15 minutes",
        })
      );
      setFormData(initialFormData);
      navigate("/");
    } else if (UserDataFromResponse.hasOwnProperty("PasswordIsWrong")) {
      setInvalidPassword(true);
    } else if (UserDataFromResponse.hasOwnProperty("userNameIsWrong")) {
      setInvalidUserName(true);
    }
  }, [UserDataFromResponse]);

  return (
    <>
      <div className="container-fluid login">
        <form className="container" onSubmit={login}>
          <h2 className="h2">Login to your Blogger Account!</h2>
          <div className="row d-flex justify-content-center">
            <div className="col-7">
              <input
                type="text"
                className=" form-control"
                placeholder="UserName"
                name="userName"
                value={userName}
                onChange={(e) => {
                  inputChange(e);
                  setEmptyUserNameError(false);
                  setInvalidUserName(false);
                }}
              />
              {emptyUserNameError && (
                <p className="text-danger">Please enter your UserName!</p>
              )}
              {invalidUserName && (
                <p className="text-danger">Please enter a valid UserName!</p>
              )}
            </div>
            <div className="col-7">
              <input
                type="password"
                className=" form-control"
                placeholder="Password"
                name="Password"
                value={Password}
                onChange={(e) => {
                  inputChange(e);
                  setErrorPassword(false);
                  setInvalidPassword(false);
                }}
              />
              {ErrorPassword && (
                <p className="text-danger">
                  Please enter your correct Password!
                </p>
              )}
              {invalidPassword && (
                <p className="text-danger">Wrong Password!</p>
              )}
            </div>
            <div className="col-12 text-center">
              <button type="submit">Login</button>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-12">
              <h6 className="h6 text-center text-light">
                Didn't have account?{" "}
                <Link className="text-danger" to={"/signup"}>
                  Create Account
                </Link>
              </h6>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
