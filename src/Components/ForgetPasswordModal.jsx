import React, { useEffect, useState } from "react";
import "./SCSS/ForgetPasswordModal.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  forgetChangePasswordStart,
  notAuthorised,
} from "../Redux(Saga)/Actions/UserAction";

export default function ForgetPasswordModal() {
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );

  // password chnge states
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  // password input value
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState(""); // for confirmation
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [passwordDoesntMatching, setPasswordDoesntMatching] = useState(false);
  // successfully changed
  const [successfullyChanged, setSuccessfullyChanged] = useState(false);

  // updatePassword function
  const updatePassword = (e) => {
    e.preventDefault();
    if (password1 !== "" && password1.length >= 8) {
      if (password === password1 && password.length >= 8) {
        const jwToken = JSON.parse(localStorage.getItem("blogApp"));
        const finalData = {
          token: jwToken.token,
          newPassword: password,
        };
        dispatch(forgetChangePasswordStart(finalData));
      } else {
        setPasswordDoesntMatching(true);
      }
    } else {
      setEmptyPasswordError(true);
    }
  };
  // handling response
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      if (UserDataFromResponse.hasOwnProperty("forgetPasswordUpdated")) {
        setSuccessfullyChanged(true);
        localStorage.setItem(
          "blogApp",
          JSON.stringify({
            token: UserDataFromResponse.jwToken,
            validity: "15 minutes",
          })
        );
        delete UserDataFromResponse.forgetPasswordUpdated;
        setPassword("");
        setPassword1("");
      }
    }
  }, [UserDataFromResponse, setPassword, setPassword1, setSuccessfullyChanged]);

  // otp states--
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showErrorBtn, setShowErrorBtn] = useState(false);
  const [otpInputField, setOtpInputField] = useState("");
  const [emptyOtpInputField, setEmptyOtpInputField] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  // i didn't created a action for sending otp or their response becoz where i have to manage whole state for otp and here manage all in single function__
  const sendOtp = async (e) => {
    e.preventDefault();
    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
    setShowLoading(true);
    try {
      document.getElementById("sendOtpBtn").setAttribute("disabled", "");
      const Response = await axios.get(
        `/v1/UserApi/changePasswordOtpVerification/${UserDataFromResponse.Email}`,
        {
          headers: {
            Authorization: `Bearer ${jwToken.token}`,
          },
        }
      );
      if (Response) {
        if (Response.hasOwnProperty("Unauthorized")) {
          dispatch(notAuthorised(false));
        } else {
          if (Response.data.hasOwnProperty("message")) {
            switch (Response.data.otpSent) {
              case true:
                setMessage(Response.data.message);
                setOtp(Response.data.otpInfo.otp);
                localStorage.setItem(
                  "blogApp",
                  JSON.stringify({
                    token: Response.data.jwToken,
                    validity: "15 minutes",
                  })
                );
                setShowErrorBtn(false);
                setShowOtpInput(true);
                setShowLoading(false);
                break;
              case false:
                setShowLoading(false);
                setMessage(Response.data.message);
                seterrorMessage(Response.data.errorMessage);
                setShowErrorBtn(true);
                setShowOtpInput(false);
                break;
            }
          }
        }
      } else {
        throw Error("Network issues! Please try again later!");
      }
    } catch (error) {
      seterrorMessage(error.message);
    }
  };

  return (
    <>
      <div
        className="modal fade commentSectionModal" // gived same class in everymodal due to same theme and  for ignore repeating css!
        id="ForgetPasswordModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              height: "fit-content",
            }}
          >
            {successfullyChanged ? (
              <>
                <div className="modal-header">
                  <h5
                    className="modal-title h5 ForgetPasswordModalheading"
                    id="exampleModalLabel"
                  >
                    Success!
                  </h5>
                  <button
                    type="button"
                    className="bi bi-twitter-x text-light"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body forgetpasswordchngesuccess">
                  <div className="row">
                    <div className="col-12 text-center">
                      <h2 className="h2 text-success">
                        Your password is updated successfully!
                      </h2>
                    </div>
                    <div className="col-12 text-center">
                      <button
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          setMessage("");
                          setOtp("");
                          setOtpInputField("");
                          setShowErrorBtn(false);
                          setShowOtpInput(false);
                          seterrorMessage("");
                          setSuccessfullyChanged(false);
                          setShowPasswordInputs(false);
                        }}
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {showPasswordInputs ? (
                  <>
                    <div className="modal-header">
                      <h5
                        className="modal-title h5 ForgetPasswordModalheading"
                        id="exampleModalLabel"
                      >
                        Change your password here!
                      </h5>
                      <button
                        type="button"
                        className="bi bi-twitter-x text-light"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body forgetChangePassword">
                      <div className="row text-center">
                        <div className="col-12">
                          <input
                            type="password"
                            placeholder="New Password"
                            value={password1}
                            onChange={(e) => {
                              e.preventDefault();
                              setPassword1(e.target.value);
                              setEmptyPasswordError(false);
                            }}
                          />
                          {emptyPasswordError && (
                            <p className="text-danger">
                              Please enter your new password!
                            </p>
                          )}
                        </div>
                        <div className="col-12">
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={password}
                            onChange={(e) => {
                              e.preventDefault();
                              setPassword(e.target.value);
                              setPasswordDoesntMatching(false);
                            }}
                          />
                          {passwordDoesntMatching && (
                            <p className="text-danger">
                              Password doesn't matching!
                            </p>
                          )}
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            disabled={false}
                            onClick={updatePassword}
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="modal-header">
                      <h5
                        className="modal-title h5 ForgetPasswordModalheading"
                        id="exampleModalLabel"
                      >
                        Forget?
                      </h5>
                      <button
                        type="button"
                        className="bi bi-twitter-x text-light"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body ForgetPasswordModal">
                      <div className="row">
                        <p className="text-light" style={{ fontWeight: "100" }}>
                          We'll send an One Time Password to this email! after
                          that you have to fill that OTP below, and then you'll
                          be able to change your password!
                        </p>
                        <div className="col-12 text-center">
                          {UserDataFromResponse.hasOwnProperty("jwToken") && (
                            <h6 className="h6 text-secondary mt-4">
                              {UserDataFromResponse.Email}
                            </h6>
                          )}
                        </div>
                        <div className="col-12 text-center mt-2">
                          <button id="sendOtpBtn" onClick={sendOtp}>
                            Send OTP
                          </button>
                          {message.length !== "" && errorMessage === "" && (
                            <p className="text-success">{message}</p>
                          )}
                          {message.length !== "" && errorMessage !== "" && (
                            <p className="text-danger">{message}</p>
                          )}
                          {showLoading && (
                            <>
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="row mt-5">
                        {showOtpInput && (
                          <>
                            <div className="col-12 text-center mt-2">
                              <input
                                type="text"
                                value={otpInputField}
                                placeholder="Enter OTP here!"
                                onChange={(e) => {
                                  setOtpInputField(e.target.value);
                                  setEmptyOtpInputField(false);
                                }}
                              />
                              {emptyOtpInputField && (
                                <p className="text-danger">Wrong OTP!</p>
                              )}
                            </div>
                            <div className="col-12 text-center mt-5">
                              <button
                                onClick={() => {
                                  if (otpInputField === otp) {
                                    setShowPasswordInputs(true);
                                  } else {
                                    setEmptyOtpInputField(true);
                                  }
                                }}
                              >
                                Verify
                              </button>
                            </div>
                          </>
                        )}
                        {showErrorBtn && (
                          <>
                            <div className="col-12 text-center mt-2">
                              <h6 className="h6 text-danger">{errorMessage}</h6>
                            </div>
                            <div className="col-12 text-center mt-2">
                              <button
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                  document
                                    .getElementById("sendOtpBtn")
                                    .removeAttribute("disabled");
                                  setMessage("");
                                  setOtp("");
                                  setShowErrorBtn(false);
                                  setShowOtpInput(false);
                                  seterrorMessage("");
                                }}
                              >
                                Close
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
