import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';


function FormPage(props) {
  const [url, setUrl] = React.useState("");
  const [item, setItem] = React.useState("");
  const [csrftoken, setCsrftoken]= React.useState("");
  // const [cookies, setCookie] = useCookies(['csrftoken']);

  const fetchData = (e) => {
    
    e.preventDefault();
    props.axiosInstance
      .get(`http://127.0.0.1:8000/shopAPIs/fetch_item?url=${url}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.item);
        setItem(res.data.item)

        console.log(item)

        
        props.axiosInstance.get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data.csrftoken);
            setCsrftoken(response.data.csrftoken);

            props.axiosInstance({url:'http://127.0.0.1:8000/shopAPIs/items/' ,
            method:'POST', 
            data:item , 
            withCredentials:true, 
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken }})
            .then(
              console.log("done")
            
            )
            .catch(err => {
                console.log(err)
            })
            
          })
          .catch((error) => {
            console.log(error);
        })
        
      })
      .catch(err => {
        console.log(err)
      })
      
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
