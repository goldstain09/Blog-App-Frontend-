import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

export default function Loading({ message }) {
  const [mssg, setMssg] = useState("");
  useEffect(() => {
    setMssg(message);
  }, [message, setMssg]);
  return (
    <>
      <div
        className="text-center"
        style={{
          width: "100%",
          height: "100vh",
          background: "#00000065",
          paddingTop: "45vh",
          zIndex: "1",
          position: "fixed",
          left: "0",
          top: "0",
          backdropFilter: "blur(10px)",
        }}
      >
        <PulseLoader color="red" />
        <h5 className="h5 text-center text-light">
          {mssg + " "} Just a sec...
        </h5>
      </div>
    </>
  );
}
