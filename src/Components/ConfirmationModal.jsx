import React from "react";
import { removeUserEmailStart } from "../Redux(Saga)/Actions/UserAction";
import { useDispatch } from "react-redux";
import "./SCSS/ConfirmationModal.scss";

// this modal is used for all types of confirmations!
export default function ConfirmationModal() {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="modal fade commentSectionModal" // gived same class in everymodal due to same theme and repeating css!
        id="confirmationModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      
      >
        <div className="modal-dialog" >
          <div className="modal-content"   style={{
          height: "15rem",
        }}>
            <div className="modal-header">
              <h5 className="modal-title h5 confirmationModalheading" id="exampleModalLabel">Please confirm to remove this email from your account!</h5>
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
                      const jwToken = JSON.parse(
                        localStorage.getItem("blogApp")
                      );
                      dispatch(removeUserEmailStart(jwToken.token));
                    }}
                  >
                    Yes, I' Confirm!
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
