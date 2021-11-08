import React from "react";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

function Notification(props) {
  const [page, setPage] = React.useState(1);
  const [notifs, setNotifs] = React.useState(null);
  const [count, setCount] = React.useState(1);
  const [checkingNotifs, setCheckingNotifs] = React.useState(true);
  const handleChange = (event, value) => {
    setPage(value);
    setCheckingNotifs(!checkingNotifs);
  };
  const getNotifs = async () => {
    const resp = await axios
      .get(`http://127.0.0.1:8000/shopAPIs/notifs?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setNotifs(resp["results"]);
    setCount(
      resp["count"] % 5
        ? Math.floor(resp["count"] / 5) + 1
        : Math.floor(resp["count"] / 5)
    );
  };
  React.useEffect(async () => {
    if (checkingNotifs) {
      getNotifs();
    }
  }, [checkingNotifs]);
  React.useEffect(async () => {
    setCheckingNotifs(false);
  }, [notifs]);

  if (props.loginStatus === true) {
    return (
      <Container>
        {notifs !== null ? (
          !checkingNotifs ? (
            notifs.map((notif, index) => {
              return (
                <Paper elevation={3} key={index} sx={{ mt: 0.5, mb: 0.5 }}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="view site"
                        color="secondary"
                        href={notif.assoc_item.apiLink}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={notif.assoc_item.title}
                        src={notif.assoc_item.image}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={notif.assoc_item.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {notif.ext_notif_info}
                          </Typography>
                          {`— ${notif.ext_notif_content}`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Paper>
              );
            })
          ) : (
            <CircularProgress />
          )
        ) : (
          <CircularProgress />
        )}
        <Pagination count={count} page={page} onChange={handleChange} />
      </Container>
    );
  } else {
    if (props.done === true) {
      props.history.push("/");
    } else {
      return <p>Checking login status...</p>;
    }
  }
}

export default Notification;
