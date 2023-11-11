import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Comment from "./Comment";

export default function Modal({ CommentSection, followers, following }) {
  const [dataToShow, setDataToShow] = useState([]);

  useEffect(() => {
    if (followers.length > 0) {
      setDataToShow(followers);
    } else if (following.length > 0) {
      setDataToShow(following);
    }
  }, [CommentSection, followers, following]);
  return (
    <div
      className="modal fade commentSectionModal"
      id="Modall"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title h5" id="exampleModalLabel">
              {CommentSection.length > 0 && "Comment Section"}
              {followers.length > 0 && "Followers"}
              {following.length > 0 && "Following"}
            </h5>
            <button
              type="button"
              className="bi bi-twitter-x text-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {CommentSection.length > 0
              ? CommentSection.map((item, index) => <Comment />)
              : dataToShow.length > 0 &&
                dataToShow.map((item, index) => <div key={index}>{item}</div>)}
          </div>
          <div className="modal-footer">
            <div className="row">
              <div className="col-10">
                <input
                  placeholder="Add a Comment"
                  type="text"
                  className="w-100"
                />
              </div>
              <div className="col-2">
                <button type="button" className="btn btn-primary">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
