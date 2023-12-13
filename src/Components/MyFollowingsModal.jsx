import React from "react";
import Following from "./Following";

export default function MyFollowingsModal({ followings }) {
  return (
    <>
      <div
        className="modal fade commentSectionModal" // gived same class in everymodal due to same theme and repeating css!
        id="myFollowings"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              height: "90vh",
            }}
          >
            <div className="modal-header">
              <h5
                className="modal-title h5 confirmationModalheading"
                id="exampleModalLabel"
              >
                Following
              </h5>
              <button
                type="button"
                className="bi bi-twitter-x text-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body confirmationModal">
              {followings.length > 0 ? (
                followings.map((item, index) => (
                  <Following key={index} data={item} />
                ))
              ) : (
                <>No Followings</>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
