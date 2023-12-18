import React from "react";
import "./SCSS/Footer.scss";
import Logo from "../Media/Logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const navigate = useNavigate();
  const authorised = useSelector(
    (state) => state.userReducer.authorised.authorised
  );
  return (
    <>
      <div className="container-fluid Footerr">
        <div className="row d-flex">
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <img src={Logo} alt="Logo" className="w-25" />
            <p>
              "Are you a keyboard? Because you've got all the right keys to make
              my blog post go viral!"
            </p>
          </div>
          <div className="col col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
            <h4 className="h4">Start Blogging</h4>
            {authorised ? (
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  navigate("/myProfile");
                }}
              >
                Profile
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
          <div className="col col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
            <h4 className="h4">Contact</h4>
            <div>
              <a target="_new" href="https://github.com/goldstain09">
                <p>
                  <i className="bi bi-github"></i>
                </p>
              </a>
              <a target="_new" href="https://www.linkedin.com/in/sujalrajput/">
                <p>
                  <i className="bi bi-linkedin"></i>
                </p>
              </a>
              <a
                target="_new"
                href="mailto:rajputsujal992@gmail.com?subject=Your%20Subject&body=Hello..."
              >
                <p>
                  <i className="bi bi-envelope-at"></i>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
