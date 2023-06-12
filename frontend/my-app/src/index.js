import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App2 from "./App";
import 'typeface-inter';
import "./fonts.css";



ReactDOM.render(
  <React.StrictMode>
    <Route>
      <App2 />
    </Route>
  </React.StrictMode>,
  document.getElementById("root")
);
