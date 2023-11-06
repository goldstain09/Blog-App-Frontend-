import React from "react";
import "./SCSS/Footer.scss";
import Logo from "../Media/Logo.png";

export default function Footer() {
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
            <button className="btn btn-outline-primary">Sign In</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>
          <div className="col col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
            <h4 className="h4">Contact</h4>
            <div>
              <a href="">
                <p>
                  <i class="bi bi-github"></i>
                </p>
              </a>
              <a href="">
                <p>
                  <i class="bi bi-linkedin"></i>
                </p>
              </a>
              <a href="">
                <p>
                  <i class="bi bi-envelope-at"></i>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
