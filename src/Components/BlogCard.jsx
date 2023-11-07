import React from "react";
import "./SCSS/BlogCard.scss";
import founder from "../Media/Founder.jpg";

export default function BlogCard() {
  return (
    <>
      <div className="BlogCard col col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 card">
        <div className="row">
          <div className="col-2">
            <img src={founder} alt="PP" />
          </div>
          <div className="col-9 align-content-center">
            <h5 title="Name">Sujal Rajput</h5>
          </div>
          <div className="col-1 dropdown">
            <button
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi h5 bi-three-dots-vertical"></i>
            </button>
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
        {/* Dropdown */}

        {/* ----------------------------------------------------- */}
        <img src={founder} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="row d-flex">
            <div className="col-6">
              <button title="Like">
                <i className="bi bi-suit-heart"></i>
              </button>
              <button className="liked" title="Unlike">
                <i className="bi bi-suit-heart-fill"></i>
              </button>
              <button title="Comment">
                <i className="bi bi-chat"></i>
              </button>
            </div>
            <div className="col-6 text-end">
              <button title="Save">
                <i className="bi bi-bookmark"></i>
              </button>
              <button className="saved" title="Remove from Saved">
                <i className="bi bi-bookmark-fill"></i>
              </button>
            </div>
          </div>
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Read
          </a>
        </div>
      </div>
    </>
  );
}
