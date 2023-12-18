import React, { useEffect } from "react";
import "./SCSS/Header.scss";
import Logo from "../Media/Logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const authorised = useSelector(
    (state) => state.userReducer.authorised.authorised
  );
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        document.getElementById("MainHeader").style.background = "black";
      } else {
        document.getElementById("MainHeader").style.background = "#000000d1";
      }
      if (window.scrollY > 25) {
        document.getElementById("MbMainHeader").style.background = "black";
      } else {
        document.getElementById("MbMainHeader").style.background = "#000000d1";
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <>
      <header className="p-2 text-white fixed-top MainHeader" id="MainHeader">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-start justify-content-lg-start">
            <a
              href="/"
              className="d-flex  mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img src={Logo} alt="Logo" />
            </a>

            <ul className="nav col-1 col-md-5 col-lg-2 me-lg-auto mb-2  mb-md-0">
              <li>
                <NavLink to={"/"} className="nav-link px-2 text-light">
                  <i className="bi bi-house"></i>
                </NavLink>
              </li>
            </ul>
            <div className="text-end">
              {UserDataFromResponse.hasOwnProperty("profilePicture") ? (
                <>
                  <Link
                    to={"/search"}
                    className="btn btn-primary searchbtn mx-2"
                  >
                    <i className="bi bi-search"></i>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-danger me-2"
                    onClick={() => {
                      navigate("/myProfile");
                    }}
                  >
                    <img
                      src={UserDataFromResponse.profilePicture}
                      alt="dp"
                      style={{ borderRadius: "50px", width: "1.5rem", height:'1.5rem' }}
                    />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-danger me-2"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign-up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <header className="MobileScreenMainHeader fixed-top" id="MbMainHeader">
        <div className="container-fluid">
          <div className="row d-flex">
            <a className="col-2 mt-2">
              <img src={Logo} alt="Logo" />
            </a>
            <div className="col-2 mt-2">
              <NavLink to={"/"} className="homeIcon">
                <i className="bi bi-house"></i>
              </NavLink>
            </div>
            <div className="col-8 text-end">
              {authorised && (
                <Link to={"/search"} className="btn btn-primary mt-2">
                  <i className="bi bi-search"></i>
                </Link>
              )}
              {UserDataFromResponse.hasOwnProperty("profilePicture") ? (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/myProfile")}
                >
                  <img src={UserDataFromResponse.profilePicture} />
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-primary text-danger loginbtn"
                  style={{ color: "red" }}
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
