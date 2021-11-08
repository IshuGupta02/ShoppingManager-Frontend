import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./components/login";
import HomePage from "./components/home";
import FormPage from "./components/form";
import History from "./components/history";
import Authenticate from "./components/authenticate.js";
import AllNotifications from "./components/notification.js";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/shopAPIs/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // 'Accept': 'application/json'
  },
});
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.xsrfCookieName = "csrftoken";
axiosInstance.defaults.xsrfHeaderName = "X-CSRFToken";

function App(props) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const checkLoginStatus = async () => {
    const response = await axios
      .get("http://127.0.0.1:8000/shopAPIs/check_login", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.loggedin === true) {
          setLoggedIn(true);
        } else if (loggedIn === true && res.data.loggedin === false) {
          setLoggedIn(false);
        } else {
          setLoggedIn(false);
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    if (response.data.hasOwnProperty("loggedIn")) {
      setDone(true);
    }
  };
  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/history"
          render={(props) => {
            return (
              <History
                {...props}
                loginStatus={loggedIn}
                checkLoginStatus={checkLoginStatus}
                axiosInstance={axiosInstance}
                done={done}
              />
            );
          }}
        />

        <Route
          exact
          path="/cart"
          render={(props) => {
            return (
              <HomePage
                {...props}
                loginStatus={loggedIn}
                checkLoginStatus={checkLoginStatus}
                axiosInstance={axiosInstance}
                done={done}
              />
            );
          }}
        />
        <Route
          exact
          path="/form"
          render={(props) => {
            return (
              <FormPage
                {...props}
                loginStatus={loggedIn}
                checkLoginStatus={checkLoginStatus}
                axiosInstance={axiosInstance}
                done={done}
              />
            );
          }}
        />
        <Route
          exact
          path="/notif"
          render={(props) => {
            return (
              <AllNotifications
                {...props}
                loginStatus={loggedIn}
                checkLoginStatus={checkLoginStatus}
                axiosInstance={axiosInstance}
                done={done}
              />
            );
          }}
        />
        <Route
          exact
          path="/"
          render={(props) => {
            return (
              <LoginPage
                {...props}
                loginStatus={loggedIn}
                checkLoginStatus={checkLoginStatus}
                axiosInstance={axiosInstance}
                done={done}
              />
            );
          }}
        />
        <Route
          exact
          path="/google/auth/"
          render={(props) => {
            return (
              <Authenticate
                {...props}
                loginStatus={loggedIn}
                checkLoginStatus={checkLoginStatus}
                axiosInstance={axiosInstance}
                done={done}
              />
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
