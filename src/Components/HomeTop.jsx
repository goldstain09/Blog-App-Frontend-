import React from "react";
import "./SCSS/HomeTop.scss";

export default function HomeTop() {
  return (
    <>
      <div className="container-fluid home-top">
        <div className="container">
          <h1 className="h1">Welcome,</h1>
          <h2>You can <span>POST</span> your</h2>
          <h3><font>Blogs</font> for <span>free</span> here!!</h3>
          <button>Get Started!</button>
        </div>
      </div>
    </>
  );
}
