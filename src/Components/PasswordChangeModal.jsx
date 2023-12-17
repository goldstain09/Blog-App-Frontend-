import React, { useEffect, useState } from "react";
import "./SCSS/PasswordChangeModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordStart } from "../Redux(Saga)/Actions/UserAction";

export default function PasswordChangeModal() {
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );

  //initial formdata
  const initialFormData = {
    currentPassword: "",
    newPassword: "",
  };

  // formdata state
  const [formData, setFormData] = useState(initialFormData);
  // for confirmation of password
  const [password1, setPassword1] = useState("");
  const { currentPassword, newPassword } = formData;

  // empty passwords error
  const [emptyCurrentPassword, setEmptyCurrentPassword] = useState(false);
  const [emptyPassword1, setEmptyPassword1] = useState(false);
  const [passwordDoesntMatching, setPasswordDoesntMatching] = useState(false);
  // wrong password error
  const [wrongPassword, setWrongPassword] = useState(false);

  //input change
  const inputChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //changePassword
  const changePassword = (e) => {
    e.preventDefault();
    if (currentPassword !== "" && currentPassword.length >= 8) {
      if (password1 !== "" && password1.length >= 8) {
        if (password1 === newPassword) {
          const jwToken = JSON.parse(localStorage.getItem("blogApp"));
          const finalData = {
            token: jwToken.token,
            currentPassword: currentPassword,
            newPassword: newPassword,
          };
          dispatch(changePasswordStart(finalData));
        } else {
          setPasswordDoesntMatching(true);
        }
      } else {
        setEmptyPassword1(true);
      }
    } else {
      setEmptyCurrentPassword(true);
    }
  };

  // handling response
  //if successfully changed
  const [successfullyChanged, setSuccessfullyChanged] = useState(false);
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      if (UserDataFromResponse.hasOwnProperty("passwordUpdated")) {
        setSuccessfullyChanged(true);
        setFormData(initialFormData);
        setPassword1("");
        localStorage.setItem(
          "blogApp",
          JSON.stringify({
            token: UserDataFromResponse.jwToken,
            validity: "15 minutes",
          })
        );
        delete UserDataFromResponse.passwordUpdated;
      } else if (UserDataFromResponse.hasOwnProperty("wrongPassword")) {
        setWrongPassword(true);
        localStorage.setItem(
          "blogApp",
          JSON.stringify({
            token: UserDataFromResponse.jwToken,
            validity: "15 minutes",
          })
        );
        delete UserDataFromResponse.wrongPassword;
      }
    }
  }, [
    UserDataFromResponse,
    setSuccessfullyChanged,
    setFormData,
    setPassword1,
    setWrongPassword,
  ]);
  return (
    <>
      <div
        className="modal fade commentSectionModal" // gived same class in everymodal due to same theme and repeating css!
        id="PasswordChangeModal"
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
              {successfullyChanged ? (
                <>
                  <h5 className="modal-title h5" id="exampleModalLabel">
                    Success
                  </h5>
                  <button
                    type="button"
                    className="bi bi-twitter-x text-light"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </>
              ) : (
                <>
                  <h5 className="modal-title h5" id="exampleModalLabel">
                    Change your password!
                  </h5>
                  <button
                    type="button"
                    className="bi bi-twitter-x text-light"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </>
              )}
            </div>
            <div className="modal-body PasswordChangeModal">
              {successfullyChanged ? (
                <>
                  <div className="row">
                    <div className="col-12 text-center">
                      <h3 className="h3 text-success mt-5">SUCCESS</h3>
                      <h5 className="h5 text-secondary mt-3">
                        Your password is changed successfully!
                      </h5>
                      <button
                        className="btn btn-outline-dark"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          setSuccessfullyChanged(false);
                        }}
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col-12">
                      <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        name="currentPassword"
                        onChange={(e) => {
                          inputChange(e);
                          setEmptyCurrentPassword(false);
                          setWrongPassword(false);
                        }}
                      />
                      {emptyCurrentPassword && (
                        <p className="text-danger">
                          Please enter your current password!
                        </p>
                      )}
                      {wrongPassword && (
                        <p className="text-danger">Wrong Password!</p>
                      )}
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        placeholder="New Password"
                        value={password1}
                        onChange={(e) => {
                          setPassword1(e.target.value);
                          setEmptyPassword1(false);
                        }}
                      />
                      {emptyPassword1 && (
                        <p className="text-danger">
                          Please enter a password with minimum length "8"!
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={newPassword}
                        name="newPassword"
                        onChange={(e) => {
                          inputChange(e);
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
                      <button id="changeBtn" onClick={changePassword}>
                        Change Password
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
