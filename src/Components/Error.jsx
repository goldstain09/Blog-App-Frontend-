import React, { useEffect, useState } from "react";
import icon from "./SCSS/Media/error.png";
import { useNavigate } from "react-router-dom";
import "./SCSS/Error.scss";

export default function Error({ errorMessage }) {
  const navigate = useNavigate();
  const [errmsg, setErrMssg] = useState("Something went wrong!");
  useEffect(() => {
    if (errorMessage !== "") {
      setErrMssg(errorMessage);
    }
  }, [errorMessage, setErrMssg]);
  return (
    <>
      <div
        className="text-center"
        id="ERRORRR"
        style={{
          width: "100%",
          height: "100vh",
          background: "#00000075",
          paddingTop: "15vh",
          zIndex: "1",
          position: "fixed",
          left: "0",
          top: "0",
          backdropFilter: "blur(20px)",
        }}
      >
        <img src={icon} alt="" />
        <h5 className="h5 text-center text-light">
          {errmsg + " Please try again after sometime..."}
        </h5>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          Return to Home...
        </button>
      </div>
    </>
  );
}
