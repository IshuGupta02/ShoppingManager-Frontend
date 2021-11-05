import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

//header-logout,view history, notif
//comment-add , del, modify
//search-category, name, date
//notif-add, del, modify

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FormPage(props) {
  const [url, setUrl] = React.useState("");
  const [item, setItem] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const fetchData = (e) => {
    e.preventDefault();
    if (url === "") {
      setErr("error");
      setMsg("Url cannot be empty!");
      handleClick();
      return;
    }
    props.axiosInstance
      .get(`http://127.0.0.1:8000/shopAPIs/fetch_item?url=${url}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.hasOwnProperty("error")) {
          console.log(res.data.item);
          setItem(res.data.item);
        } else {
          setErr("error");
          setMsg(res.data.error);
          handleClick();
        }
      })
      .catch((error) => {
        console.log(error);
        setErr("error");
        setMsg("Invalid url!");
        handleClick();
      });
  };
  React.useEffect(async () => {
    if (item !== null && item !== undefined) {
      await createItem();
      handleClick();
    }
  }, [item]);
  const createItem = async () => {
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/",
            method: "POST",
            data: item,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": response.data.csrftoken,
            },
          })
          .then((res) => {
            console.log("done");
            setErr("success");
            setMsg(`${res.data.title} added to your cart!`);
          })
          .catch((error) => {
            setErr("error");
            setMsg("Could not fetch item! Refresh or Try again...");
          });
      })
      .catch((error) => {
        console.log(error);
        setErr("error");
        setMsg("Could not fetch item! Refresh or Try again...");
      });
  };
  React.useEffect(async () => {
    await props.checkLoginStatus();
    if (props.loginStatus === false) {
      props.history.push("/");
    }
  }, [props.loginStatus]);

  if (props.loginStatus === true) {
    const ariaLabel = { "aria-label": "description" };
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            justifyContent: "center",
          }}
          noValidate
          autoComplete="off"
          onSubmit={fetchData}
        >
          <Input
            placeholder="Enter the url of the item you wish to add..."
            inputProps={ariaLabel}
            sx={{ width: 400 }}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <Button variant="outlined" disableElevation type="submit">
            Fetch
          </Button>
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            mt: 2,
          }}
          onClick={(e) => {
            props.history.push("/cart");
          }}
          disableElevation
        >
          View Cart
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={err} sx={{ width: "100%" }}>
            {msg}
          </Alert>
        </Snackbar>
      </div>
    );
  } else {
    return <p>Checking login status...</p>;
  }
}

export default FormPage;
