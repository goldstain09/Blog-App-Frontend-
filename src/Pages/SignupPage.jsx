import React, { useState } from "react";
import "./SCSS/SignupPage.scss";

export default function SignupPage() {
  return (
    <>
      <div className="container-fluid signUp">
        <form className="container">
          <h2 className="h2">Create your Blogger Account!</h2>
          <div className="row d-flex">
            <div className="col-6">
              <input
                type="text"
                className=" form-control"
                placeholder="UserName"
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className=" form-control"
                placeholder="Full Name"
              />
            </div>
            <div className="col-6">
              <input
                type="email"
                className=" form-control"
                placeholder="Email"
              />
            </div>
            <div className="col-6">
              <label className="form-control-label">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                className=" form-control"
                placeholder="Profile Picture"
                // onChange={(event) => {
                //   setimage(event.target.files[0]);
                // }}
              />
            </div>
            <div className="col-6">
              <textarea
                type="text"
                rows={4}
                className=" form-control"
                placeholder="Type your Biography"
              />
            </div>
            <div className="col-6">
              <input
                type="password"
                className=" form-control"
                placeholder="Password"
              />
              <input
                type="password"
                className=" form-control"
                placeholder="Confirm Password"
              />
            </div>
            <div className="col-12 text-center">
              <button type="submit">Create Account</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
