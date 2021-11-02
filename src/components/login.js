import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function LoginPage(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: "100%",
    width: "50%",
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
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrftoken,
        },
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
    // cookies.set("sessionid", res["sessionid"]);
    // cookies.set("csrftoken", res["csrftoken"]);

    if (!res.hasOwnProperty("error")) {
      props.history.push("/cart");
    } else {
      alert(`Some error occured: ${res["error"]}`);
    }
  };
  React.useEffect(props.checkLoginStatus, []);
  if (props.loginStatus === true) {
    return <Redirect to="/cart" />;
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
            <Button type="submit" variant="contained">
              Log In
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
              }}
              variant="contained"
              color="secondary"
            >
              Authenticate with google
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
