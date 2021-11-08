import * as React from "react";
import axios from "axios";
import { Feed, Menu, Confirm } from "semantic-ui-react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Moment from "react-moment";
import Box from "@mui/material/Box";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { TextField } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      items: [{ key: "name", active: true, name: "HISTORY" }],
      log_id_delete: "",
      deletelog: false,
      deletelog1: false,
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
  };

  render() {
    if (this.props.loginStatus === true) {
      return (
        <div style={{ width: "100vw" }}>
          <Box className="flex-box">
            <ButtonGroup>
              <Button
                href="./notif"
                variant="outlined"
                basic
                startIcon={<CircleNotificationsIcon />}
              >
                View Notifications
              </Button>
              <Button
                href="./cart"
                variant="outlined"
                basic
                startIcon={<ShoppingCartIcon />}
              >
                View cart
              </Button>
            </ButtonGroup>

            <Button
              onClick={() => this.handleLogout()}
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
          <Menu items={this.state.items} style={{ align: "right" }} />
          &nbsp;&nbsp;&nbsp;
          <Button
            onClick={() => this.setState({ deletelog1: true })}
            color="error"
            variant="contained"
            startIcon={<ClearIcon />}
          >
            Clear All
          </Button>
          <Confirm
            open={this.state.deletelog1}
            onCancel={()=>{this.notDeleteLog1()}}
            onConfirm={() => {
              this.deleteLog1();
            }}
          />
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
                  {JSON.parse(log.history_log).object === "Item" ? (
                    <Feed.Label
                      image={JSON.parse(log.history_log).data.image}
                    />
                  ) : (
                    <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
                  )}
                  {JSON.parse(log.history_log).object === "Item" ? (
                    <Feed.Content>
                      <Feed.Date>
                        <Typography component="span" variant="h6">
                          <Moment format="MMMM Do, h:mm a">
                            {JSON.parse(log.history_log).data.adddedOn}
                          </Moment>
                        </Typography>
                      </Feed.Date>
                      <Feed.Summary>
                        {JSON.parse(log.history_log).info +
                          JSON.parse(log.history_log).object}
                      </Feed.Summary>
                      <Feed.Extra>
                        {JSON.parse(log.history_log).data.title}
                      </Feed.Extra>
                    </Feed.Content>
                  ) : (
                    <Feed.Content>
                      {JSON.parse(log.history_log).object ===
                      "Notifications" ? (
                        <Feed.Date>
                          <Typography component="span" variant="h6">
                            <Moment format="MMMM Do, h:mm a">
                              {JSON.parse(log.history_log).data.notif_time}
                            </Moment>
                          </Typography>
                        </Feed.Date>
                      ) : (
                        <Feed.Date>
                          <Typography component="span" variant="h6">
                            <Moment format="MMMM Do, h:mm a">
                              {JSON.parse(log.history_log).data.comment_time}
                            </Moment>
                          </Typography>
                        </Feed.Date>
                      )}
                      <Feed.Summary>
                        {JSON.parse(log.history_log).info +
                          JSON.parse(log.history_log).object}
                      </Feed.Summary>
                      {JSON.parse(log.history_log).object ===
                      "Notifications" ? (
                        <Feed.Extra>
                          {JSON.parse(log.history_log).data.notif_content}
                        </Feed.Extra>
                      ) : (
                        <Feed.Extra>
                          {JSON.parse(log.history_log).data.comment_content}
                        </Feed.Extra>
                      )}
                    </Feed.Content>
                  )}
                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      this.setState({ log_id_delete: log.id });
                      this.setState({ deletelog: true });
                    }}
                  >
                    Delete
                  </Button>
                  <Confirm
                    open={this.state.deletelog}
                    onCancel={this.notDeleteLog}
                    onConfirm={() => {
                      this.deleteLog(this.state.log_id_delete);
                    }}
                  />
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

  notDeleteLog = () => {
    this.setState({
      deletelog: false,
    });
  };

  async deleteLog(log_id) {
    console.log("deleting");
    let token = "";

    const res1 = await axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        token = response.data.csrftoken;
      })
      .catch((err) => {
        console.log("some error occured");
      });

    const response = await axios({
      url: "http://127.0.0.1:8000/shopAPIs/logs/" + log_id + "/",
      method: "DELETE",
      withCredentials: true,
      headers: { "Content-Type": "application/json", "X-CSRFToken": token },
    })
      .then(console.log("done"))
      .catch((err) => {
        console.log("error occured");
      });

    console.log(response);

    await this.componentDidMount();

    this.setState({
      deletelog: false,
    });
  }

  notDeleteLog1 = () => {
    this.setState({
      deletelog1: false,
    });
  };

  async deleteLog1() {
    console.log("deleting");
    let token = "";

    this.setState({
      deletelog1: false,
    });

    for (let i = 0; i < this.state.logs.length; i = i + 1) {
      const res1 = await axios
        .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          token = response.data.csrftoken;
        })
        .catch((err) => {
          console.log("some error occured");
        });

      const response = await axios({
        url:
          "http://127.0.0.1:8000/shopAPIs/logs/" + this.state.logs[i].id + "/",
        method: "DELETE",
        withCredentials: true,
        headers: { "Content-Type": "application/json", "X-CSRFToken": token },
      })
        .then(console.log("done"))
        .catch((err) => {
          console.log("error occured");
        });

      console.log(response);
    }

    this.componentDidMount();
  }
}
export default History;
