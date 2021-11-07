import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Moment from "react-moment";
import { Divider, Grid, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import "../styles/style1.css";
import CommentComponent from "./itemUtils/comments.js";
import NotificationComponent from "./itemUtils/notifications.js";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      expanded: 0,
      filter: "",
      searchParam: ["title", "category"],
      deleteId: -1,
      open: false,
      comment_content: [],
      notif_content: [],
      curItemC: -1,
      curItemN: -1,
      priority:-1,
      temp:false,
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
      return res.data;
    });
    this.setState({ items: response.cart_items });
    console.log(this.state.items);
  };

  handleAccordionChange(id) {
    if (this.state.expanded !== id) {
      this.setState({ expanded: id });
    } else {
      this.setState({ expanded: -1 });
    }
  }

  handleANoChange = async (id, a) => {
    const data = {
      availability_notif_enabled: !a,
    };
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/" + id + "/",
            method: "PATCH",
            data: data,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": response.data.csrftoken,
            },
          })
          .then((res) => {
            this.fetchResponse();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handlePNoChange = async (id, a) => {
    const data = {
      price_notif_enabled: !a,
    };
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/" + id + "/",
            method: "PATCH",
            data: data,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": response.data.csrftoken,
            },
          })
          .then((res) => {
            this.fetchResponse();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    this.fetchResponse();
  };

  handleCChange = async (id, a) => {
    console.log("Patching item number,", id, a);
    const data = {
      category: a,
    };
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/" + id + "/",
            method: "PATCH",
            data: data,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": response.data.csrftoken,
            },
          })
          .then((res) => {
            this.fetchResponse();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handlePChange = async (id, a) => {
    const data = {
      priority: a,
    };
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/" + id + "/",
            method: "PATCH",
            data: data,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": response.data.csrftoken,
            },
          })
          .then((res) => {
            this.fetchResponse();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleItemDelete = async (id) => {
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/" + id + "/",
            method: "DELETE",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": response.data.csrftoken,
            },
          })
          .then((res) => {
            this.setState({ deleteId: -1 });
            this.fetchResponse();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleCommentClose = () => {
    this.setState({ curItemC: -1 });
  };
  handleNotificationClose = () => {
    this.setState({ curItemN: -1 });
  };

  handleLogout = async () => {
    await axios({
      url: "http://127.0.0.1:8000/shopAPIs/log_out",
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push("/");
      });
  };

  render() {
    if (this.props.loginStatus === true) {
      const { filter, data, items, searchParam, priority } = this.state;
      const lowercasedFilter = filter.toLowerCase();
      // const searchParam = ['title'];
      const filteredData = items.filter((item1) => {
        return searchParam.some((newItem) => {
          return (
            item1[newItem]
              .toString()
              .toLowerCase()
              .includes(lowercasedFilter)&&(item1['priority']==priority||priority==-1)
          );
        });
      });
      console.log("Filtered Data is: ", filteredData);
      return (
        <React.Fragment>
          <div>
            <Box className="flex-box">
              <ButtonGroup>
                <Button
                  href="./history"
                  variant="outlined"
                  startIcon={<HistoryIcon />}
                >
                  View History
                </Button>
                <Button
                  href="./notif"
                  variant="outlined"
                  startIcon={<CircleNotificationsIcon />}
                >
                  View Notifications
                </Button>
              </ButtonGroup>
              <TextField
                sx={{ alignSelf: "center" }}
                defaultValue=""
                placeholder="Search by Name/Category"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => this.setState({ filter: e.target.value })}
              />
              <Typography
                sx={{ ml: "1%" , alignSelf:'center'}}
                component="div"
                variant="h6"
              > Priority Filter:
              </Typography>
               <FormControl >
                  <Select
                    onChange={(e) =>
                      {this.setState({priority:e.target.value});this.setState({temp:!this.state.temp})}
                    }
                    defaultValue={-1}
                  >
                    <MenuItem value={-1}>All</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                  </Select>
                </FormControl>
              <Button
                onClick={() => this.handleLogout()}
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </Box>
            <Grid>
              {filteredData.map((item, index) => {
                return (
                  <Paper className="card-display-2" key={index} elevation={3}>
                    {/* {JSON.stringify(item)} */}
                    <Box className="card-display-1">
                      <Box sx={{ width: "18%" }}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt="Display Picture"
                        />
                      </Box>

                      <Box sx={{ width: "82%" }} className="outBox">
                        <Box sx={{ display: "flex" }}>
                          <Box
                            sx={{
                              display: "flex",
                              width: "90%",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{ ml: "1%" }}
                              component="div"
                              variant="h5"
                            >
                              <strong> {item.title} </strong>
                            </Typography>
                            <Chip
                              sx={{ ml: "2%" }}
                              label="Visit Site"
                              component="a"
                              href={item.apiLink}
                              size="small"
                              variant="outlined"
                              clickable
                              color="primary"
                            />
                          </Box>
                          <Button
                            sx={{ margin: "1%" }}
                            onClick={() => this.setState({ deleteId: item.id })}
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </Box>
                        <div style={{ marginLeft: "1%", marginTop: "1%" }}>
                          <Typography
                            sx={{
                              color: "rgb(24 29 33)",
                              fontWeight: "bold",
                            }}
                            component="span"
                            variant="h6"
                          >
                            Price :&nbsp;
                          </Typography>
                          <Typography component="span" variant="h6">
                            Rs.&nbsp;{item.price}
                          </Typography>
                        </div>
                        <Box>
                          <div style={{ marginLeft: "1%", marginTop: "1%" }}>
                            <Typography
                              sx={{
                                color: "rgb(24 29 33)",
                                fontWeight: "bold",
                              }}
                              component="span"
                              variant="h6"
                            >
                              Added-On:&nbsp;
                            </Typography>
                            <Typography component="span" variant="h6">
                              <Moment format="MMMM Do, h:mm a">
                                {item.adddedOn}
                              </Moment>
                            </Typography>
                          </div>

                          <div style={{ marginLeft: "1%", marginTop: "1%" }}>
                            <Typography
                              sx={{
                                color: "rgb(24 29 33)",
                                fontWeight: "bold",
                              }}
                              component="span"
                              variant="h6"
                            >
                              Category:&nbsp;
                            </Typography>
                            {
                              (this.state.filter===''&&this.state.priority===-1)?(<input
                                className="input-1"
                                defaultValue={item.category}
                                onBlur={(e) => {
                                  console.log(e);
                                  this.handleCChange(item.id, e.target.value);
                                }}
                              ></input>):(<Typography
                                sx={{
                                  color: "rgb(24 29 33)",
                                }}
                                component="span"
                                variant="h6"
                              >
                                {item.category}
                              </Typography>)
                            }
                            
                          </div>
                        </Box>
                        <Box
                          sx={{ display: "flex", mt: "10px" }}
                          className="box-flex"
                        >
                          <div style={{ marginLeft: "1%", marginTop: "1%" }}>
                            <Typography
                              sx={{
                                color: "rgb(24 29 33)",
                                fontWeight: "bold",
                              }}
                              component="span"
                              variant="h6"
                            >
                              Priority :&nbsp;
                            </Typography>
                            {
                              (this.state.filter===''&&this.state.priority===-1)?(
                                <Box sx={{ minWidth: 60, ml: "1%" }}>
                              <FormControl fullWidth>
                                <Select
                                  id="demo-simple-select"
                                  onChange={(e) =>
                                    this.handlePChange(item.id, e.target.value)
                                  }
                                  defaultValue={item.priority}
                                >
                                  <MenuItem value={0}>0</MenuItem>
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                              ):(<Typography
                                sx={{
                                  color: "rgb(24 29 33)",
                                }}
                                component="span"
                                variant="h6"
                              >
                                {item.priority}
                              </Typography>)
                            }
                            
                          </div>

                          {item.availability_status ? (
                            <Chip
                              sx={{ margin: "1% 0% 0% 1%" }}
                              label="Available"
                              color="success"
                              clickable
                            />
                          ) : (
                            <Chip
                              sx={{ margin: "1% 0% 0% 1%" }}
                              label="Not available"
                              color="error"
                              clickable
                            />
                          )}
                          <Box>
                            <FormControlLabel
                              className="switches-1"
                              sx={{ fontSize: "2em" }}
                              control={
                                <Switch
                                  checked={item.availability_notif_enabled}
                                  onChange={() =>
                                    this.handleANoChange(
                                      item.id,
                                      item.availability_notif_enabled
                                    )
                                  }
                                  inputProps={{
                                    "aria-label": "Availability Notif",
                                  }}
                                />
                              }
                              label=""
                            />
                            Availability Notif
                            <br></br>
                            <FormControlLabel
                              className="switches-1"
                              sx={{ fontSize: "2em" }}
                              control={
                                <Switch
                                  checked={item.price_notif_enabled}
                                  onChange={() =>
                                    this.handlePNoChange(
                                      item.id,
                                      item.price_notif_enabled
                                    )
                                  }
                                  inputProps={{
                                    "aria-label": "Availability Notif",
                                  }}
                                />
                              }
                              label=""
                            />
                            Price Notif
                          </Box>
                        </Box>
                      </Box>
                      <Divider sx={{ color: "#696362" }}></Divider>
                    </Box>
                    {/* {this.state.expanded} */}
                    <Button
                      onClick={() =>
                        this.setState({
                          curItemC: item.id,
                          comment_content: item.item_comments,
                        })
                      }
                    >
                      Comments
                    </Button>
                    <Button
                      onClick={() =>
                        this.setState({
                          curItemN: item.id,
                          notif_content: item.item_notifs,
                        })
                      }
                    >
                      Notifications
                    </Button>
                  </Paper>
                );
              })}
            </Grid>
          </div>
          <Dialog
            open={this.state.deleteId > 0}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={() => {
              this.setState({ deleteId: -1 });
            }}
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete the item?"}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => this.setState({ deleteId: -1 })}
                variant="contained"
                color="success"
              >
                No
              </Button>
              <Button
                onClick={() => this.handleItemDelete(this.state.deleteId)}
                variant="contained"
                color="error"
              >
                Yes, delete this item
              </Button>
            </DialogActions>
          </Dialog>
          <CommentComponent
            {...this.props}
            itemId={this.state.curItemC}
            handleCommentClose={this.handleCommentClose}
            fetchResponse={this.fetchResponse}
            comments={this.state.comment_content}
          />
          <NotificationComponent
            {...this.props}
            itemId={this.state.curItemN}
            handleNotificationClose={this.handleNotificationClose}
            fetchResponse={this.fetchResponse}
            notifications={this.state.notif_content}
          />
        </React.Fragment>
      );
    } else {
      return <p>Checking login status...</p>;
    }
  }
}

export default HomePage;