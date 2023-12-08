import React from "react";
import "./SCSS/HomeFounder.scss";
import founder from "../Media/Founder.jpg";

export default function HomeFounder() {
  return (
    <>
      <div className="container-fluid bg-light">
        <div className="container Founderr">
          <h1 className="h1">Founder-</h1>
          <div className="row d-flex">
            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <img src={founder} alt="" />
            </div>
            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <h2 className="h2">Sujal Rajput</h2>
              <h4 className="h4">MERN Stack Developer (Student)</h4>
              <div>
                <a href="">
                  <p>
                    <i className="bi bi-github"></i>
                  </p>
                </a>
                <a href="">
                  <p>
                    <i className="bi bi-linkedin"></i>
                  </p>
                </a>
                <a href="">
                  <p>
                    <i className="bi bi-envelope-at"></i>
                  </p>
                </a>
                <a href="">
                  <p>
                    <i className="bi bi-instagram"></i>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
