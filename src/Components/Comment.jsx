import React from "react";
import "./SCSS/Comment.scss";
import founder from "../Media/Founder.jpg";

export default function Comment() {
  return (
    <>
      <div className="row d-flex comment">
        <div className="col-1 commenterDp">
          <img src={founder} alt="" />
        </div>
        <div className="col-8 commenterName">
          <h5 className="h5">Sujal Rajput</h5>
        </div>
        <div className="col-1 likeBtn">
          {/* <button>
            <i className="bi bi-suit-heart"></i>
          </button> */}
          <button>
            <i className="bi bi-suit-heart-fill"></i>
          </button>
        </div>
        <div
          className="col-10 dropdown"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            distinctio quaerat alias,
          </p>
          {/* dropdown */}
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
