import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Moment from "react-moment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import TextField from "@mui/material/TextField";

export class CommentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment_d_id: -1,
      comment_e_id: -1,
      add_comment: "",
    };
  }
  addComment = async (a) => {
    const data = {
      comment_content: a,
      assoc_item: this.props.itemId,
    };
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
            this.props.fetchResponse();
            this.setState({ add_comment: "" });
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

  editComment = async (a, id) => {
    const data = {
      comment_content: a,
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
            this.props.fetchResponse();
            this.setState({ add_comment: "", comment_e_id: -1 });
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
        onClose={this.props.handleCommentClose}
      >
        <DialogTitle id="alert-dialog-title">Comments</DialogTitle>
        <DialogContent>
          {this.props.comments.map((comment) => {
            return (
              <Paper elevation={2} key={comment.id} sx={{ mt: 0.5, mb: 0.5 }}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <ButtonGroup>
                      <IconButton
                        color="success"
                        onClick={() =>
                          this.setState({
                            comment_e_id: comment.id,
                            add_comment: comment.comment_content,
                          })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => this.deleteComment(comment.id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </ButtonGroup>
                  }
                >
                  <ListItemText
                    primary={comment.comment_content}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {<Moment fromNow>{comment.comment_time}</Moment>}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Paper>
            );
          })}
          {this.props.comments.length === 0 ? "No Comments" : ""}
        </DialogContent>
        <DialogContent>
          <TextField
            value={this.state.add_comment}
            onChange={(e) => this.setState({ add_comment: e.target.value })}
            autoFocus
            margin="dense"
            id="name"
            label="Comment"
            fullWidth
          ></TextField>
          {this.state.comment_e_id > -1 ? (
            <Button
              onClick={() =>
                this.editComment(
                  this.state.add_comment,
                  this.state.comment_e_id
                )
              }
              variant="outlined"
              disableElevation
              color="info"
            >
              Edit
            </Button>
          ) : (
            <Button
              onClick={() =>
                this.addComment(this.state.add_comment, this.props.itemId)
              }
              variant="outlined"
              disableElevation
              color="info"
            >
              Add
            </Button>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={this.props.handleCommentClose}>Close Menu</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CommentComponent;
