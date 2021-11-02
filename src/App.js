import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./components/login";
import HomePage from "./components/home";
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
  const checkLoginStatus = async () => {
    const response = await axios("http://127.0.0.1:8000/shopAPIs/check_login", {
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    if (response.data.loggedIn === true) {
      setLoggedIn(true);
    } else if (loggedIn === true && response.data.loggedIn === false) {
      setLoggedIn(false);
    } else {
      setLoggedIn(false);
    }
  };
  React.useEffect(checkLoginStatus, []);

  return (
    <BrowserRouter>
      <Switch>
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
              />
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
