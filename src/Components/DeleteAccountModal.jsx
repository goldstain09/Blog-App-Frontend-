import React, { useCallback, useEffect, useState } from "react";
import "./SCSS/DeleteAccountModal.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  checkPasswordForDeleteAccountStart,
  deleteUserAccountStart,
  notAuthorised,
} from "../Redux(Saga)/Actions/UserAction";
import { deleteObject, listAll, ref } from "firebase/storage";
import storage from "../Utils/Firebase.Storage";
import { useNavigate } from "react-router-dom";

export default function DeleteAccountModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );

  // if user gives confirmation
  const [confirm, setConfirm] = useState(false);

  // after user confirm then user enter their password so
  const [password, setPassword] = useState("");
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  // function for calling the action and or a sending rqst for checking password
  const continueFunc = (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      const jwToken = JSON.parse(localStorage.getItem("blogApp"));
      const finalData = {
        token: jwToken.token,
        password: password,
      };
      dispatch(checkPasswordForDeleteAccountStart(finalData));
    } else {
      setEmptyPasswordError(true);
    }
  };

  // if password is correct then continue
  const [continuee, setContinuee] = useState(false);
  // handling response of it
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      if (UserDataFromResponse.hasOwnProperty("passwordCorrect")) {
        setContinuee(true);
      } else if (UserDataFromResponse.hasOwnProperty("passwordIncorrect")) {
        setWrongPassword(true);
      }
    }
  }, [UserDataFromResponse, setWrongPassword, setContinuee]);

  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);
  // delete dp and post images
  const deleteImagesFromStorage = useCallback(async (UserDataFromResponse) => {
    try {
      // post images delete from storage
      const AllPostsImageFolder = ref(
        storage,
        `/postImages/${UserDataFromResponse._id}`
      );
      // here taking help from gpt to know how to delete all images from one folder bcz on account delete its compulsory to delete all post images and profile picture also
      const result = await listAll(AllPostsImageFolder);
      const deleteFilePromises = result.items.map((item) => deleteObject(item));
      await Promise.all(deleteFilePromises);
      // await deleteObject(AllPostsImageFolder);
      localStorage.removeItem("blogApp");
      try {
        // profile picture delete from storage
        const ProfilePicture = ref(
          storage,
          `/profilePictures/${UserDataFromResponse._id}'s_DP`
        );
        await deleteObject(ProfilePicture);
        setDeletedSuccessfully(true);
      } catch (error) {
        if (
          error.message ===
          `Firebase Storage: Object 'profilePictures/${UserDataFromResponse._id}'s_DP' does not exist. (storage/object-not-found)`
        ) {
          setDeletedSuccessfully(true);
        } else {
          setDeletedSuccessfully(true);
        }
      }
    } catch (error) {
      if (
        error.message ===
        `Firebase Storage: Object 'postImages/${UserDataFromResponse._id}' does not exist. (storage/object-not-found)`
      ) {
        try {
          // profile picture delete from storage
          const ProfilePicture = ref(
            storage,
            `/profilePictures/${UserDataFromResponse._id}'s_DP`
          );
          await deleteObject(ProfilePicture);
          setDeletedSuccessfully(true);
        } catch (error) {
          if (
            error.message ===
            `Firebase Storage: Object 'profilePictures/${UserDataFromResponse._id}'s_DP' does not exist. (storage/object-not-found)`
          ) {
            setDeletedSuccessfully(true);
          } else {
            setDeletedSuccessfully(true);
          }
        }
      } else {
        setDeletedSuccessfully(true);
      }
    }
  },[setDeletedSuccessfully])
  // handling response of account deleted successfully
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("accountDeleted")) {
      if (UserDataFromResponse.accountDeleted) {
        deleteImagesFromStorage(UserDataFromResponse);
      }
    }
  }, [UserDataFromResponse, deleteImagesFromStorage]);
  return (
    <>
      <div
        className="modal fade commentSectionModal" // gived same class in everymodal due to same theme and repeating css!
        id="DeleteAccountModal"
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
              <h5
                className="modal-title h5 DeleteAccountModalheading"
                id="exampleModalLabel"
              >
                {!deletedSuccessfully && (
                  <>{continuee ? "Final Step!" : "Are you sure!"}</>
                )}
              </h5>
              <button
                type="button"
                className="bi bi-twitter-x text-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {deletedSuccessfully ? (
              <>
                <div className="modal-body DeleteAccountModal">
                  <div className="row">
                    <div className="col-12 text-center">
                      <h5
                        className="h5 text-light"
                        style={{ fontWeight: "100" }}
                      >
                        Account Deleted!
                      </h5>
                      <button
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          navigate("/signup");
                          dispatch(notAuthorised(false));
                        }}
                      >
                        Okay!!!
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {continuee ? (
                  <>
                    <div className="modal-body DeleteAccountModal">
                      <div className="row">
                        <div className="col-12 text-center">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              const jwToken = JSON.parse(
                                localStorage.getItem("blogApp")
                              );
                              dispatch(deleteUserAccountStart(jwToken.token));
                            }}
                          >
                            Delete My Account!
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {confirm ? (
                      <>
                        <div className="modal-body DeleteAccountModal">
                          <div className="row">
                            <div className="col-12">
                              <h5
                                className="h5 text-secondary"
                                style={{ fontWeight: "300" }}
                              >
                                Okay! If you really want to delete your account
                                then enter your password to continue!
                              </h5>
                            </div>
                            <div className="col-12 text-center">
                              <input
                                type="password"
                                placeholder="Enter your password!"
                                value={password}
                                onChange={(e) => {
                                  e.preventDefault();
                                  setPassword(e.target.value);
                                  setEmptyPasswordError(false);
                                  setWrongPassword(false);
                                }}
                              />
                              {emptyPasswordError && (
                                <p className="text-danger">
                                  Please enter your correct password!
                                </p>
                              )}
                              {wrongPassword && (
                                <p className="text-danger">Wrong Password!</p>
                              )}
                            </div>
                            <div className="col-12 text-center">
                              <button onClick={continueFunc}>Continue</button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="modal-body DeleteAccountModal">
                          <div className="row text-center">
                            <div className="col-6">
                              <button
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                No! Back
                              </button>
                            </div>
                            <div className="col-6">
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  setConfirm(true);
                                }}
                              >
                                Yes!
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
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
