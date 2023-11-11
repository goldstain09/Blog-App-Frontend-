import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { Provider } from "react-redux";
import Store from "./Redux(Saga)/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
