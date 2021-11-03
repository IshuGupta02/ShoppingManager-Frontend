import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Redirect } from "react-router-dom";
import GoogleButton from "react-google-button";
import { style, formStyle } from "../styles/login.css.js";
import { REACT_APP_CLIENT_ID } from "../constants/constants.js";

function LoginPage(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const openGoogleLoginPage = () => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    // const redirectUri = "http://127.0.0.1:8000/accounts/google/login/callback/";
    const redirectUri = "http://127.0.0.1:3000/google/auth/";

    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = {
      response_type: "code",
      client_id: REACT_APP_CLIENT_ID,
      redirect_uri: `${redirectUri}`,
      prompt: "select_account",
      access_type: "offline",
      scope,
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${googleAuthUrl}?${urlParams}`;
  };
  const submit = async (e) => {
    console.log("submit is getting called");
    e.preventDefault();
    console.log(username, password);
    let data = {
      username: username,
      password: password,
    };
    const csrftoken = await axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        return response.data["csrftoken"];
      })
      .catch((error) => {
        console.log(error);
      });
    const res = await props.axiosInstance
      .post("http://127.0.0.1:8000/shopAPIs/admin_login", data, {
        headers: {
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      })
      .then((res1) => {
        props.checkLoginStatus();
        return res1.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    console.log(res);

    if (!res.hasOwnProperty("error")) {
      props.history.push("/form");
    } else {
      alert(`Some error occured: ${res["error"]}`);
    }
  };
  React.useEffect(async () => {
    await props.checkLoginStatus();
    console.log("Login page: ", props.loginStatus);
  }, []);
  if (props.loginStatus === true) {
    return <Redirect to="/form" />;
  } else {
    return (
      <div style={style}>
        <h2>Login to ShoppingManager</h2>
        <form onSubmit={submit} style={formStyle}>
          <TextField
            type="text"
            name="username"
            id="fullWidth1"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Username"}
            value={username}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            type="password"
            name="passwd"
            id="fullWidth2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            label={"Password"}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disableElevation
              sx={{
                padding: "10px 16px",
                backgroundColor: "rgb(66, 133, 244)",
                fontSize: "16px",
                borderRadius: "0px",
                textTransform: "none",
                minWidth: "100px !important",
              }}
            >
              Log In
            </Button>
            <GoogleButton
              onClick={(e) => {
                e.preventDefault();
                openGoogleLoginPage();
              }}
            >
              Authenticate with google
            </GoogleButton>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
