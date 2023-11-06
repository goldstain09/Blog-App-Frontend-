import React from "react";
import "./SCSS/HomeFeatureConatiner.scss";
import headingImage from '../Media/featuresHeading.png';

export default function HomeFeatureConatiner() {
  return (
    <>
      <div className="container-fluid home-feature-container">
        <div className="container">
          <div className="row d-flex HeadingDiv">
            <img src={headingImage} alt="" />
          </div>
          <div className="row d-flex">
            <div className="card Features col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
              <div className="card-body">
                <h5 className="card-title">Activities-</h5>
                <h6 className="see_how">-----</h6>
                <p className="card-text">
                You can see your blogs activities, like who is liking, commenting on your blogs!
                </p>
              </div>
            </div>
            <div className="card Features col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
              <div className="card-body">
                <h5 className="card-title">Follow-</h5>
                <h6 className="see_how">-----</h6>
                <p className="card-text">
                You can follow any other creater and take inspiration from their blogs!
                </p>
              </div>
            </div>
            <div className="card Features col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
              <div className="card-body">
                <h5 className="card-title">Comments-</h5>
                <h6 className="see_how">-----</h6>
                <p className="card-text">
                 You can give suggestions to anyone's blog or also give comment, so that they can improve!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
