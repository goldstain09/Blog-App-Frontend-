import React, { useEffect } from "react";
import "./SCSS/CategoryHeader.scss";

export default function CategoryHeader() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        document.getElementById("CategoryHeader").style.background = "black";
      } else {
        document.getElementById("CategoryHeader").style.background =
          "#000000d1";
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <>
      <ul
        className="nav fixed-top justify-content-center categoriesHeader"
        id="CategoryHeader"
      >
        <li className="nav-item py-1">
          <a className="nav-link active" aria-current="page" href="#">
            ALL BLOGS
          </a>
        </li>
        <li className="nav-item  py-1">
          <a className="nav-link" href="#">
            FASHION BLOGS
          </a>
        </li>
        <li className="nav-item  py-1">
          <a className="nav-link" href="#">
            PERSONAL BLOGS
          </a>
        </li>
        <li className="nav-item  py-1">
          <a className="nav-link" href="#">
            LIFESTYLE BLOGS
          </a>
        </li>
        <li className="nav-item  py-1">
          <a className="nav-link" href="#">
            SPORT BLOGS
          </a>
        </li>
        <li className="nav-item  py-1">
          <a className="nav-link" href="#">
            FITNESS BLOGS
          </a>
        </li>
        <li className="nav-item  py-1">
          <a className="nav-link" href="#">
            MARKETING BLOGS
          </a>
        </li>
        <li className="nav-item  py-1">
          <a className="nav-link" href="#">
            PARENTING BLOGS
          </a>
        </li>
      </ul>
    </>
  );
}
