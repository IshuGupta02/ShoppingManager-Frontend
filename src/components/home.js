import * as React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: {} };
    this.fetchResponse = this.fetchResponse.bind(this);
  }

  async componentDidMount() {
    await this.props.checkLoginStatus();
    if (this.props.loginStatus === false) {
      this.props.history.push("/");
    } else {
      this.fetchResponse();
    }
  }
  fetchResponse = async () => {
    const response = await axios({
      url: "http://127.0.0.1:8000/items",
      method: "POST",
      withCredentials: true,
    }).then((res) => {
      console.log("done");
      return res.data;
    });
    this.setState({ items: response });
  };
  render() {
    console.log("Before render: ", this.props.loginStatus);
    if (this.props.loginStatus === true) {
      return <div></div>;
    } else {
      return <p>Checking login status...</p>;
    }
  }
}

export default HomePage;
