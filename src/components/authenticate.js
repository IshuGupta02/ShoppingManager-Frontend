import React from "react";
import { Redirect } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { style } from "../styles/login.css.js";
import Typography from "@mui/material/Typography";

import axios from "axios";
function Authenticate(props) {
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const params = {
      code: queryParams.get("code"),
      scope: queryParams.get("scope"),
      authuser: queryParams.get("authuser"),
      prompt: queryParams.get("prompt"),
    };
    const urlParams = new URLSearchParams(params).toString();
    axios
      .get("http://127.0.0.1:8000/shopAPIs/google_oauth?" + urlParams, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        props.checkLoginStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!props.loginStatus) {
    return (
      <div style={style}>
        <Typography textAlign="center" component="p" variant="h6">
          Authenticating with shoppingBackend...
        </Typography>{" "}
        <CircularProgress />
      </div>
    );
  } else {
    return <Redirect to="/form" />;
  }
}

export default Authenticate;
