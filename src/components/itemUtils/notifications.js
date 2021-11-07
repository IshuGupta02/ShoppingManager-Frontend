import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Moment from "react-moment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonGroup from "@mui/material/ButtonGroup";
import moment from "moment";

export class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notif_d_id: -1,
      notif_e_id: -1,
      add_notif: "",
      notif_time: moment(new Date()).add(5, "days").format("YYYY-MM-DDTHH:mm"),
    };
  }
  addNotif = async (a, t, id) => {
    console.log(t);
    const data = {
      notif_content: a,
      assoc_item: id,
      notif_time: t,
    };
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
            this.props.fetchResponse();
            this.setState({ add_notif: "", notif_time: "" });
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
            this.props.fetchResponse();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editNotif = async (a, t, id) => {
    const data = {
      notif_content: a,
      notif_time: t,
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
            this.props.fetchResponse();
            this.setState({ add_notif: "", notif_e_id: -1, notif_time: "" });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <Dialog
        open={this.props.itemId > 0}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        scroll={"paper"}
        onClose={this.props.handleNotificationClose}
      >
        {" "}
        <DialogTitle id="alert-dialog-title">Notifications</DialogTitle>
        <DialogContent>
          {this.props.notifications.map((notif) => {
            return (
              <Paper elevation={2} key={notif.id} sx={{ mt: 0.5, mb: 0.5 }}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <ButtonGroup>
                      <IconButton
                        color="success"
                        onClick={() =>
                          this.setState({
                            notif_e_id: notif.id,
                            add_notif: notif.notif_content,
                            notif_time: notif.notif_time,
                          })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => this.deleteNotif(notif.id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </ButtonGroup>
                  }
                >
                  <ListItemText
                    primary={notif.notif_content}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {
                            <Moment format="MMMM Do, h:mm a">
                              {notif.notif_time}
                            </Moment>
                          }
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Paper>
            );
          })}
          {this.props.notifications.length === 0 ? "No Notifications" : ""}
        </DialogContent>
        <DialogContent>
          <TextField
            value={this.state.add_notif}
            onChange={(e) => this.setState({ add_notif: e.target.value })}
            autoFocus
            margin="dense"
            id="name"
            label="Remainder Label"
            fullWidth
          ></TextField>
          <TextField
            id="datetime-local"
            label="Checkout-Date"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mt: 1 }}
            value={this.state.notif_time}
            onChange={(e) => this.setState({ notif_time: e.target.value })}
            fullWidth
          />
          {this.state.notif_e_id > -1 ? (
            <Button
              onClick={() =>
                this.editNotif(
                  this.state.add_notif,
                  this.state.notif_time,
                  this.state.notif_e_id
                )
              }
              variant="outlined"
              disableElevation
              color="info"
              sx={{ mt: 1 }}
            >
              Edit
            </Button>
          ) : (
            <Button
              onClick={() =>
                this.addNotif(
                  this.state.add_notif,
                  this.state.notif_time,
                  this.props.itemId
                )
              }
              variant="outlined"
              disableElevation
              color="info"
              sx={{ mt: 1 }}
            >
              Add
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleNotificationClose}>
            Close Menu
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NotificationComponent;
