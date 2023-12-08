import React, { useEffect, useState } from "react";
import "./SCSS/AddEmailModal.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserEmailStart,
  notAuthorised,
} from "../Redux(Saga)/Actions/UserAction";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle";

export default function AddEmailModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );

  // email input value
  const [email, setEmail] = useState("");
  // empty email error
  const [emptyEmailError, setEmptyEmailError] = useState(false);

  // otp sent or not message
  const [message, setMessage] = useState("");
  const [errormessage, seterrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSendingLoading, setOtpSendingLoading] = useState(false);

  //its for error and otp input field
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showErrorBtn, setShowErrorBtn] = useState(false);

  // submit function
  const getOTP = async (e) => {
    e.preventDefault();
    try {
      if (email !== "" && email.includes("@") && email.includes(".")) {
        setOtpSendingLoading(true);
        const token = JSON.parse(localStorage.getItem("blogApp")).token;
        document.getElementById("otpSendBtn").style.display = "none";
        document.getElementById("emailInput").setAttribute("disabled", "");
        const response = await axios.get(
          `http://localhost:8080/v1/UserApi/AddEmailOtpVerification/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response) {
          if (response.data.hasOwnProperty("Unauthorized")) {
            dispatch(notAuthorised(false));
          } else {
            if (response.data.hasOwnProperty("OtpSent")) {
              setOtpSendingLoading(false);
              if (response.data.OtpSent) {
                setMessage(response.data.message);
                setOtp(response.data.otpInfo.otp);
                localStorage.setItem(
                  "blogApp",
                  JSON.stringify({
                    token: response.data.jwToken,
                    validity: "15 minutes",
                  })
                );
                setShowOtpInput(true);
                setShowErrorBtn(false);
              } else {
                setMessage(response.data.message);
                seterrorMessage(response.data.errorMessage);
                setShowErrorBtn(true);
                setShowOtpInput(false);
                // navigate('/myProfile');
              }
            }
          }
        } else {
          throw Error("Network Issue! Please try again later!");
        }
      } else {
        setEmptyEmailError(true);
      }
    } catch (error) {
      seterrorMessage(error.message);
      setShowErrorBtn(true);
    }
  };

  // otp correction check function
  const [otpInputValue, setOtpInputValue] = useState("");
  const [emptyOtpInputField, setEmptyOtpInputField] = useState(false);
  const [wrongOtp, setwrongOtp] = useState(false);
  const [addedSuccessfully, setaddedSuccessfully] = useState(false);
  const verifyOtp = (e) => {
    e.preventDefault();
    if (otpInputValue !== "") {
      if (otpInputValue === otp) {
        const jwToken = JSON.parse(localStorage.getItem("blogApp"));
        document.getElementById("otpInputField").setAttribute("disabled", "");
        document.getElementById("verifyBtn").setAttribute("disabled", "");
        const finalData = {
          token: jwToken.token,
          Email: email,
        };
        dispatch(addUserEmailStart(finalData));
      } else {
        setwrongOtp(true);
      }
    } else {
      setEmptyOtpInputField(true);
    }
  };

  // handling response of email added!!
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("emailUpdated")) {
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          token: UserDataFromResponse.jwToken,
          validity: "15 minutes",
        })
      );
      delete UserDataFromResponse.emailUpdated;
      setaddedSuccessfully(true);
    }
  }, [UserDataFromResponse]);

  return (
    <>
      <div
        className="modal fade commentSectionModal"
        id="EmailModal"
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
            <div className="modal-header">
              <h5 className="modal-title h5" id="exampleModalLabel">
                Add your Email!
              </h5>
              <button
                type="button"
                className="bi bi-twitter-x text-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {addedSuccessfully ? (
              <>
                <div className="modal-body">
                  <div className="row mt-5 ">
                    <div className="col-8">
                      <p className="text-success p-2">
                        Your email is added successfully!
                      </p>
                    </div>
                    <div className="col-4 text-end">
                      <button
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        className="btn btn-outline-danger"
                        onClick={() => {
                          setaddedSuccessfully(false);
                          setEmail("");
                          setOtpInputValue("");
                          setMessage("");
                          seterrorMessage("");
                          setOtp("");
                          setOtpSendingLoading(false);
                          setShowOtpInput(false);
                          setShowErrorBtn(false);
                        }}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="modal-body emailModal">
                <div className="row emailInputContainer">
                  <div className="col-9">
                    <input
                      className="w-100"
                      id="emailInput"
                      type="text"
                      placeholder="Enter your email!"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmptyEmailError(false);
                      }}
                    />
                    {emptyEmailError && (
                      <p className="text-danger">Please enter a valid email!</p>
                    )}
                    {showOtpInput && message.length > 0 && (
                      <p className="text-success">{message}</p>
                    )}
                    {showErrorBtn && message.length > 0 && (
                      <p className="text-danger">{message}</p>
                    )}
                  </div>
                  <div className="col-3">
                    <button
                      id="otpSendBtn"
                      className="w-100"
                      onClick={(e) => {
                        getOTP(e);
                      }}
                    >
                      Send OTP
                    </button>
                  </div>
                  {otpSendingLoading && (
                    <div className="col-12 text-center mt-5">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </div>
                {showOtpInput && (
                  <div className="row otpInputContainer">
                    <div className="col-12">
                      <input
                        type="text"
                        id="otpInputField"
                        value={otpInputValue}
                        onChange={(e) => {
                          setOtpInputValue(e.target.value);
                          setEmptyOtpInputField(false);
                          setwrongOtp(false);
                        }}
                      />
                      {emptyOtpInputField && (
                        <p className="text-danger">Please enter the OTP!</p>
                      )}
                      {wrongOtp && (
                        <p className="text-danger">
                          Please enter the valid OTP!
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <button id="verifyBtn" onClick={verifyOtp}>
                        Verify
                      </button>
                    </div>
                  </div>
                )}
                {showErrorBtn && (
                  <div className="row otpInputContainer">
                    <div className="col-12">
                      <h6 className="text-danger h6">{errormessage}</h6>
                    </div>
                    <div className="col-12">
                      <button
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => navigate("/myProfile")}
                        className="btn btn-outline-danger"
                      >
                        Try again after sometime!
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
