import React, { useEffect, useState } from "react";
import "./SCSS/SignupPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAccountStart,
  notAuthorised,
  verifyUserAuthStart,
} from "../Redux(Saga)/Actions/UserAction";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  //dispatch and state selector
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  useEffect(() => {
    // it's for if user account was deleted and he is on edit or signup page thenn info from state or store is mandatory to remove!!
    if (UserDataFromResponse.hasOwnProperty("accountDeleted")) {
      if (UserDataFromResponse.accountDeleted) {
        dispatch(notAuthorised(false));
      }
    }
  }, [UserDataFromResponse]);
  // -----------------------------------------------------------------------------

  const authorised = useSelector((state) => state.userReducer.authorised);
  // user authorisation
  useEffect(() => {
    if (authorised.hasOwnProperty("authorised")) {
      if (authorised.authorised) {
        navigate("/");
      }
    }
  }, [authorised]);
  useEffect(() => {
    //if user is already signedUp!
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

  //initial form data
  const initialFormData = {
    userName: "",
    Name: "",
    Password: "",
  };

  // state for form data
  const [formData, setFormData] = useState(initialFormData);

  //destructuring input variable values
  const { Name, userName, Password } = formData;
  // for confirm password!
  const [password, setPassword] = useState("");

  // empty input field error
  const [emptyNameError, setEmptyNameError] = useState(false);
  const [emptyUserNameError, setEmptyUserNameError] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [passwordDoesNotMatchingError, setPasswordDoesNotMatchingError] =
    useState(false);

  // handling input change
  const inputChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // dispatching data
  const createAccount = (e) => {
    e.preventDefault();
    if (userName !== "" && userName.length < 30 && !userName.includes(' ')) {
      if (Name !== "" && Name.length < 30) {
        if (Password !== "" && (Password.length > 8 || Password.length === 8)) {
          if (password === Password) {
            // console.log(formData);
            dispatch(createUserAccountStart(formData));
          } else {
            setPasswordDoesNotMatchingError(true);
          }
        } else {
          setEmptyPassword(true);
        }
      } else {
        setEmptyNameError(true);
      }
    } else {
      setEmptyUserNameError(true);
    }
  };

  // handling error of userName is already in use...!!
  const [userNameAlreadyInUse, setUserNameAlreadyInUse] = useState(false);
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      //---(means account is created!)
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          token: UserDataFromResponse.jwToken,
          validity: "15 minutes",
        })
      );
      setFormData(initialFormData);
      setPassword("");
      navigate("/");
    } else {
      if (UserDataFromResponse.hasOwnProperty("userNameIsUnique")) {
        setUserNameAlreadyInUse(true);
      }
    }
  }, [UserDataFromResponse]);

  return (
    <>
      <div className="container-fluid signUp">
        <form className="container" onSubmit={createAccount}>
          <h2 className="h2">Create your Blogger Account!</h2>
          <div className="row d-flex justify-content-center">
            <div className="col-7">
              <input
                type="text"
                className=" form-control"
                placeholder="UserName [0-30 letters only]"
                name="userName"
                value={userName}
                onChange={(e) => {
                  inputChange(e);
                  setEmptyUserNameError(false);
                  setUserNameAlreadyInUse(false);
                }}
              />
              {emptyUserNameError && (
                <p className="text-danger">
                  Please enter any username you want to showcase on your
                  profile!
                </p>
              )}
              {userNameAlreadyInUse && (
                <p className="text-danger">
                  This username is already in use! Try different one.
                </p>
              )}
            </div>
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                name="Name"
                value={Name}
                placeholder="Full Name [0-30 letters only]"
                onChange={(e) => {
                  inputChange(e);
                  setEmptyNameError(false);
                }}
              />
              {emptyNameError && (
                <p className="text-danger">Please enter your full name!</p>
              )}
            </div>
            <div className="col-7">
              <input
                type="password"
                value={password}
                className=" form-control"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="col-7">
              <input
                type="password"
                className=" form-control"
                name="Password"
                placeholder="Confirm Password"
                value={Password}
                onChange={(e) => {
                  inputChange(e);
                  setEmptyPassword(false);
                  setPasswordDoesNotMatchingError(false);
                }}
              />
              {emptyPassword && (
                <p className="text-danger">
                  Please enter a strong password [minLength:8,include:(Symbol,
                  i.e. @,#,$,%,&)]!
                </p>
              )}
              {passwordDoesNotMatchingError && (
                <p className="text-danger">
                  Password you entered doesn't matching!
                </p>
              )}
            </div>
            <div className="col-12 text-center">
              <button type="submit">Create Account</button>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-12">
              <h6 className="h6 text-center text-light">
                Already have account?{" "}
                <Link className="text-danger" to={"/login"}>
                  Login
                </Link>
              </h6>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
