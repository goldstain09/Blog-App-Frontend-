import React, { useEffect } from "react";
import "./SCSS/Header.scss";
import Logo from "../Media/Logo.png";

export default function Header() {
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

            <ul className="nav col-1 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {/* <li>
                <a href="#" className="nav-link px-2 text-secondary">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  About
                </a>
              </li> */}
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input
                type="search"
                className="form-control form-control-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="text-end">
              <button type="button" className="btn btn-outline-danger me-2">
                Login
              </button>
              <button type="button" className="btn btn-danger">
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>

      <header className="MobileScreenMainHeader fixed-top" id="MbMainHeader">
        <div className="container-fluid">
          <div className="row d-flex">
            <a href="" className="col-2">
              <img src={Logo} alt="Logo" />
            </a>
            <div className="col-8"></div>
            <div className="col-2">
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <i class="bi bi-app-indicator"></i>
              </button>
            </div>
          </div>
          <div className="row">
            <form className="col-10 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input
                type="search"
                className="form-control form-control-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </header>

      <div
        className="offcanvas offcanvas-start HeaderNavbarCanvas"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <img src={Logo} alt="logo" />
          </h5>
          <button
            type="button"
            className="text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i class="bi bi-arrow-90deg-left"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <button type="button" className="btn btn-outline-danger me-2">
            Login
          </button>
          <button type="button" className="btn btn-danger">
            Sign-up
          </button>
        </div>
      </div>
    </>
  );
}
