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
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import {ExpandMoreIcon} from '@mui/icons-material';
import { Redirect } from "react-router-dom";
import Moment from 'react-moment';
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
      expanded:0,
      filter:'',
      searchParam:['title','category'],
      deleteId:-1,
      open : false,
      comment_content:[],
      notif_content:[],
      notif_d_id:-1,
      comment_d_id:-1,
      notif_e_id:-1,
      comment_e_id:-1,
      curItemC:-1,
      curItemN:-1,
      add_comment:'',
      add_notif:'',
      notif_time:''
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

  handleItemDelete= async (id) =>{
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/"+id+"/",
            method: "DELETE",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": response.data.csrftoken,
            },
          })
          .then((res) => {
            this.setState({deleteId:-1})
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

  addComment = async (a,id) =>{
    const data={
      comment_content:a,
      assoc_item:id
    }
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/comments/",
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
            this.setState({add_comment:''})
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

  editComment= async (a,id) =>{
    const data={
      comment_content: a
    }
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
            this.setState({add_comment:'',comment_e_id:-1})
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addNotif = async (a,t,id) =>{
    console.log(t)
    const data={
      notif_content: a,
      assoc_item:id,
      notif_time:t
    }
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/notifications/",
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
            this.setState({add_notif:'',notif_time:''})
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

  editNotif= async (a,t,id) =>{
    const data={
      notif_content: a,
      notif_time:t,
    }
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
            this.setState({add_notif:'',notif_e_id:-1,notif_time:''})
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
              (item1[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(filter.toLowerCase()) > -1)
          );
        });
      });
      console.log("Filtered Data is: ", filteredData);
      return (
          <div>
            <Dialog
                open={this.state.deleteId>0}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete the item?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={()=>this.setState({deleteId:-1})}>Disagree</Button>
                <Button onClick={()=>this.handleItemDelete(this.state.deleteId)}autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
             {/* comment_content:[],
            notif_content:[],
            notif_d_id:-1,
            comment_d_id:-1,
            notif_e_id:-1,
            comment_e_id:-1,
            curItem:-1, */}
            <Dialog
                open={this.state.curItemN>0}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > <DialogTitle id="alert-dialog-title">
                Notifications
              </DialogTitle>
              <DialogContent>
                {
                  this.state.notif_content.map((notif)=>{
                    return(
                      <DialogContentText id="alert-dialog-description">
                        {notif.notif_content},
                        <Moment format="YYYY/MM/DD">
                        {notif.notif_time}
                      </Moment>
                      <Button color='error' onClick={()=>this.deleteNotif(notif.id)}>Delete</Button>
                      <Button color='success' onClick={()=>this.setState({notif_e_id:notif.id,add_notif:notif.notif_content,notif_time:notif.notif_time})}>Edit</Button>
                      </DialogContentText>
                    )
                  })
                }
                {this.state.notif_content.length==0?('No Notifications'):('')}
              </DialogContent>
             
              <TextField value={this.state.add_notif} onChange={(e)=>this.setState({add_notif:e.target.value})}>
              </TextField>
              <TextField
                  id="datetime-local"
                  label="Due-Date"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.notif_time}
                  variant="outlined"
                  color="secondary"
                  style={{ width: 400 }}
                  onChange={(e)=>this.setState({notif_time:e.target.value})}
                />
              {this.state.notif_e_id>-1?(
              <Button onClick={()=>this.editNotif(this.state.add_notif,this.state.notif_time,this.state.notif_e_id)}>Edit</Button>
              ):(
              <Button onClick={()=>this.addNotif(this.state.add_notif,this.state.notif_time,this.state.curItemN)}>Add</Button>
              )}
              <DialogActions>
                <Button onClick={()=>this.setState({curItemN:-1})}>Close Menu</Button>
              </DialogActions>
            </Dialog>
            <Dialog
                open={this.state.curItemC>0}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > <DialogTitle id="alert-dialog-title">
                Comments
              </DialogTitle>
              <DialogContent>
                {
                  this.state.comment_content.map((comment)=>{
                    return(
                      <DialogContentText id="alert-dialog-description">
                        {comment.comment_content},
                        <Moment fromNow>
                        {comment.comment_time}
                      </Moment>
                      <Button color='error' onClick={()=>this.deleteComment(comment.id)}>Delete</Button>
                      <Button color='success' onClick={()=>this.setState({comment_e_id:comment.id,add_comment:comment.comment_content})}>Edit</Button>
                      </DialogContentText>
                    )
                  })
                }
                {this.state.comment_content.length==0?('No Comments'):('')}
              </DialogContent>
             
              <TextField value={this.state.add_comment} onChange={(e)=>this.setState({add_comment:e.target.value})}>
              </TextField>
              {this.state.comment_e_id>-1?(
              <Button onClick={()=>this.editComment(this.state.add_comment,this.state.comment_e_id)}>Edit</Button>
              ):(
              <Button onClick={()=>this.addComment(this.state.add_comment,this.state.curItemC)}>Add</Button>
              )}
              <DialogActions>
                <Button onClick={()=>this.setState({curItemC:-1})}>Close Menu</Button>
              </DialogActions>
            </Dialog>
            <Box className='flex-box'>
              <Box sx={{display:'flex', width:'30%'}}>
              <Button sx={{margin:'1%'}} href='./history'  variant="outlined"  startIcon={<HistoryIcon />}>
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
                        <Button sx={{margin:'1%'}} onClick={()=>this.setState({deleteId:item.id})} variant="outlined" color='error' startIcon={<DeleteIcon />}>
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
                    <Divider sx={{color:'#696362'}}></Divider>
                    </Box>
                    {/* {this.state.expanded} */}
                    <Button onClick={()=>this.setState({curItemC:item.id,comment_content:item.item_comments})}>Comments</Button>
                    <Button onClick={()=>this.setState({curItemN:item.id,notif_content:item.item_notifs})}>Notifications</Button>
                    
                  </Card>
                )
              })
            }
            </Grid>
          </div>
      );
    } else {
      return <p>Checking login status...</p>;
    }
  }
}

export default HomePage;
