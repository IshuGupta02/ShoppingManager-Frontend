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
import Box from "@mui/material/Box";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { TextField } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClearIcon from "@mui/icons-material/Clear";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Reminders from "./reminders.js";
// import Box from "@mui/material/Box";

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
      // <div style={{width:'100vw'}}>
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
                            {notif.ext_notif_info.concat(" status")}
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

      // </div>
      
    );
  } else {
    if (props.done === true) {
      props.history.push("/");
    } else {
      return <p>Checking login status...</p>;
    }
  }
}

function AllNotifications(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Container>
      <Box className="flex-box">
            <ButtonGroup>
              <Button
                href="./history"
                variant="outlined"
                basic
                startIcon={<CircleNotificationsIcon />}
              >
                View History
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

        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Cart Updates" />
          <Tab label="Reminders" />
        </Tabs>
      </Container>
      {value === 0 ? <Notification {...props} /> : <Reminders {...props} />}
    </Box>
  );
}
export default AllNotifications;
