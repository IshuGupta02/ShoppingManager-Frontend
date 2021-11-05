import * as React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Feed, Card, Menu } from "semantic-ui-react";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      items: [{ key: "name", active: true, name: "HISTORY" }],
    };
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
      url: "http://127.0.0.1:8000/shopAPIs/myinfo",
      method: "GET",
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      this.setState({ logs: res.data.history_actions });
      console.log("done");
    });

    console.log(this.state.logs);
  };

  render() {
    if (this.props.loginStatus === true) {
      return (
        <div style={{ width: "100vw" }}>
          <Menu items={this.state.items} inverted />

          <Feed
            size="large"
            className="ui divided items"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {this.state.logs.map((log) => {
              return (
                <Feed.Event
                  key={log.id}
                  style={{
                    padding: "20px",
                    justifyContent: "center",
                    borderBottom: "0.5px solid black",
                  }}
                >
                  <Feed.Label image={JSON.parse(log.history_log).data.image} />
                  <Feed.Content
                    date={JSON.parse(log.history_log).data.adddedOn}
                    summary={
                      JSON.parse(log.history_log).info +
                      JSON.parse(log.history_log).object
                    }
                    extraText={JSON.parse(log.history_log).data.title}
                    // extraText={log.history_log}
                  ></Feed.Content>
                </Feed.Event>
              );
            })}
          </Feed>
        </div>
      );
    } else {
      return <p>Checking login status...</p>;
    }
  }
}

export default History;
