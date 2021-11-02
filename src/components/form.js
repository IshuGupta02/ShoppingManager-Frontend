import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

function FormPage(props) {
  const [url, setUrl] = React.useState("");

  const fetchData = (e) => {
    e.preventDefault();
    props.axiosInstance
      .get(`http://127.0.0.1:8000/shopAPIs/fetch_item?url=${url}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
      </div>
    );
  } else {
    return <p>Checking login status...</p>;
  }
}

export default FormPage;
