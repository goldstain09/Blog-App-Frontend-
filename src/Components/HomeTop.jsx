import React from "react";
import "./SCSS/HomeTop.scss";
import { Link } from "react-router-dom";

export default function HomeTop() {
  return (
    <>
      <div className="container-fluid home-top">
        <div className="container">
          <h1 className="h1">Welcome,</h1>
          <h2>
            You can <span>POST</span> your
          </h2>
          <h3>
            <font>Blogs</font> here for <span>free</span> !!
          </h3>
          <Link to={"/signup"}>Get Started!</Link>
        </div>
      </div>
    </>
  );
}
