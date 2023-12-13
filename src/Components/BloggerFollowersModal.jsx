import React from "react";
import Follower from "./Follower";

export default function BloggerFollowersModal({ followers }) {
  return (
    <>
      <div
        className="modal fade commentSectionModal" // gived same class in everymodal due to same theme and repeating css!
        id="bloggerFollowers"
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
                Followers
              </h5>
              <button
                type="button"
                className="bi bi-twitter-x text-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body confirmationModal">
              {followers.length > 0 ? (
                followers.map((item, index) => (
                  <Follower data={item} key={index} />
                ))
              ) : (
                <>No Followers</>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
