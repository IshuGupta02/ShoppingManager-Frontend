import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
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
import Modal from "@mui/material/Modal";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
// import {ExpandMoreIcon} from '@mui/icons-material';
import { Redirect } from "react-router-dom";
import { Divider, Grid, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import ButtonGroup from "@mui/material/ButtonGroup";

import Moment from "react-moment";
import moment from "moment";
import "../styles/style1.css";

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
      comment_content: "",
      notif_content: "",
      notif_d_id: -1,
      comment_d_id: -1,
      notif_e_id: -1,
      comment_e_id: -1,
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
      // console.log("done");
      // console.log(res.data);
      return res.data;
    });
    this.setState({ items: response.cart_items });
    console.log(this.state.items);
  };

  handleAccordionChange(id) {
    if (this.state.expanded != id) {
      this.setState({ expanded: id });
    } else {
      this.setState({ expanded: -1 });
    }
    return;
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
    const data = {
      deleted: true,
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

  addComment = async (id) => {
    const data = {
      comment_content: "",
      assoc_item: id,
    };
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/comments",
            method: "POST",
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

  deleteComment = async (id) => {
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/comments/" + id + "/",
            method: "DELETE",
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

  editComment = async (id) => {
    const data = {
      comment_content: "",
    };
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/comments/" + id + "/",
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

  addNotif = async (id) => {
    const data = {
      notif_content: "",
      assoc_item: id,
      notif_time: "",
    };
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/notifications",
            method: "POST",
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

  deleteNotif = async (id) => {
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/notifications/" + id + "/",
            method: "DELETE",
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

  editNotif = async (id) => {
    const data = {
      notif_content: "",
      notif_time: "",
    };
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/notifications/" + id + "/",
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
      const { filter, data, items, searchParam } = this.state;
      const lowercasedFilter = filter.toLowerCase();
      // const searchParam = ['title'];
      const filteredData = items.filter((item1) => {
        return searchParam.some((newItem) => {
          return (
            item1[newItem]
              .toString()
              .toLowerCase()
              .indexOf(filter.toLowerCase()) > -1 && !item1["deleted"]
          );
        });
      });
      console.log("Filtered Data is: ", filteredData);
      return (
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
                          onClick={() => this.handleItemDelete(item.id)}
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
                          <input
                            className="input-1"
                            defaultValue={item.category}
                            onBlur={(e) => {
                              console.log(e);
                              this.handleCChange(item.id, e.target.value);
                            }}
                          ></input>
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
                  <Accordion
                    expanded={this.state.expanded === item.id}
                    onChange={() => this.handleAccordionChange(item.id)}
                  >
                    <AccordionSummary
                      // expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography
                        sx={{ color: "#636363" }}
                        component="div"
                        variant="h6"
                      >
                        <strong>Comments</strong>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {item.item_comments.map((comment, index) => {
                        return <Typography key={index}>{comment}</Typography>;
                      })}
                      {item.item_comments.length == 0 ? "No Comments" : ""}
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              );
            })}
          </Grid>
        </div>
      );
    } else {
      return <p>Checking login status...</p>;
    }
  }
}

export default HomePage;
