import React from "react";
import { useDispatch } from "react-redux";
import { notAuthorised } from "../Redux(Saga)/Actions/UserAction";

export default function LogoutConfirmationModal() {
    const dispatch = useDispatch();
  return (
    <>
      <div
        className="modal fade commentSectionModal" // gived same class in everymodal due to same theme and repeating css!
        id="LogoutConfirmationModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              height:"fit-content"
            }}
          >
            <div className="modal-header">
              <h5
                className="modal-title h5 confirmationModalheading"
                id="exampleModalLabel"
              >
                Please confirm to Log out your account!
              </h5>
              <button
                type="button"
                className="bi bi-twitter-x text-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body confirmationModal">
              <div className="row text-center">
                <div className="col-6">
                  <button
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="btn btn-outline-dark mt-5"
                  >
                    No, I've change my mind!
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-danger mt-5"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("blogApp");
                        dispatch(notAuthorised(false));
                    }}
                  >
                   <i class="bi bi-box-arrow-right"></i>  Yes, I' Confirm!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
