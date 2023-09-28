import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import SignInContainer from "@/containers/SignIn";
import SignUpContainer from "@/containers/SignUp";
import AppContainer from "@/containers/AppContainer";
import Header from "@/components/layout/Header.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Toaster />
      <Switch>
        <Route exact path="/sign_in" component={SignInContainer} />
        <Route exact path="/sign_up" component={SignUpContainer} />
        <Route exact path="/" component={AppContainer} />
      </Switch>
    </Router>
  </React.StrictMode>,
);
