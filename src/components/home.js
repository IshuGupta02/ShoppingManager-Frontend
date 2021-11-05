import * as React from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {InputAdornment} from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import Select from '@mui/material/Select';
// import {ExpandMoreIcon} from '@mui/icons-material';
import { Redirect } from "react-router-dom";
import { Divider, Grid, TextField } from "@mui/material";
import './style1.css'


class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      expanded:0,
      filter:'a',
      searchParam:['title','category']
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
      console.log("done");
      console.log(res.data);
      return res.data;
    });
    this.setState({ items: response.cart_items });
    console.log(this.state.items)
  };

  handleAccordionChange(id){
    if(this.state.expanded!=id){
      this.setState({expanded:id})
    }else{
      this.setState({expanded:-1})
    }
    return
  }

  handleANoChange= async (id,a) =>{
    const data={
      availability_notif_enabled:!a
    }
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/"+id+"/",
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
            console.log(error)
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePNoChange= async (id,a) =>{
    const data={
      price_notif_enabled:!a
    }
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/"+id+"/",
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
            console.log(error)
          });
      })
      .catch((error) => {
        console.log(error);
      });
      this.fetchResponse();
  }

  handleCChange= async (id,a) =>{
    const data={
      category:a
    }
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/"+id+"/",
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
            console.log(error)
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePChange= async (id,a) =>{
    const data={
      priority:a
    }
    axios
      .get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.csrftoken);
        this.props
          .axiosInstance({
            url: "http://127.0.0.1:8000/shopAPIs/items/"+id+"/",
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
            console.log(error)
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    
    if (this.props.loginStatus === true) {
      const { filter, data, items, searchParam } = this.state;
      const lowercasedFilter = filter.toLowerCase();
      // const searchParam = ['title'];
      const filteredData = items.filter(item1 => {
        return searchParam.some((newItem) => {
          return (
              item1[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(filter.toLowerCase()) > -1
          );
      });
      });
      return (
          <div className='flex-box'>
            <TextField
              sx={{alignSelf:'center'}}
              defaultValue=''
              placeholder='Search by name/category'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                 )
              }}
              onChange={(e)=>this.setState({filter:e.target.value})}
            />
            {/* {JSON.stringify(filteredData)} */}
            <Grid>
            {
              filteredData.map((item, index)=>{
                return(
                  <Card className='card-display-2' key ={index}>
                    {/* {JSON.stringify(item)} */}
                    <Box className='card-display-1'>
                    <CardMedia
                      component="img"
                      sx={{ width: '18%' }}
                      image={item.image}
                      alt="Display Picture"
                    />
                    <Box sx={{width:'82%'}} className='outBox'>
                      <Box sx={{display:'flex'}} >
                        <Typography sx={{margin:'1% 0% 0% 1%'}} component="div" variant="h4">
                        <strong> {item.title} </strong> 
                        </Typography>
                        <Chip
                          sx={{alignSelf:'center',marginLeft:'2%'}}
                          label="Visit Site"
                          component="a"
                          href={item.apiLink}
                          variant="outlined"
                          clickable
                          color='primary'
                        />
                      </Box>
                      <Typography sx={{margin:'1% 0% 0% 1%', color:'#909090'}} component="div" variant="h5">
                       <strong> Price : </strong> Rs. {item.price}
                      </Typography>
                      <Box>
                        <Typography sx={{margin:'1% 0% 0% 1%', color:'#909090'}} component="div" variant="h5">
                        <strong> Added-On : </strong> {item.adddedOn}
                        </Typography>
                        <Typography sx={{margin:'1% 0% 0% 1%', color:'#909090'}} component="div" variant="h5">
                        <strong> Category : </strong> 
                        <input className='input-1' value={item.category} onBlur={(e)=>this.handleCChange(item.id,e.target.value)}></input>
                        </Typography>
                      </Box>
                      <Box sx={{display:'flex'}} className='box-flex' >
                      <Typography sx={{margin:'1% 0% 0% 1%', color:'#909090'}} component="div" variant="h5">
                        <strong> Priority : </strong>
                        <Select
                          value={item.priority}
                          label="Priority"
                          onChange={(e)=>this.handlePChange(item.id,e.target.value)}
                        >
                          <MenuItem value={0}>0</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                        </Select>
                        </Typography>
                        {item.availability_status?(
                          <Chip
                            sx={{margin:'1% 0% 0% 1%'}}
                            label="Available"
                            color='success'
                            clickable
                          />
                        ):(
                          <Chip
                            sx={{margin:'1% 0% 0% 1%'}}
                            label="Not available"
                            color='error'
                            clickable
                          />
                        )}
                        <Box>
                        <FormControlLabel
                          className='switches-1'
                          sx={{fontSize:'2em'}}
                          control={
                            <Switch
                              checked={item.availability_notif_enabled}
                              onChange={()=>this.handleANoChange(item.id,item.availability_notif_enabled)}
                              inputProps={{ 'aria-label': 'Availability Notif' }}
                            />
                          }
                          label=''
                        />
                         Availability Notif
                         <br></br>
                         <FormControlLabel
                          className='switches-1'
                          sx={{fontSize:'2em'}}
                          control={
                            <Switch
                              checked={item.price_notif_enabled}
                              onChange={()=>this.handlePNoChange(item.id,item.price_notif_enabled)}
                              inputProps={{ 'aria-label': 'Availability Notif' }}
                            />
                          }
                          label=''
                        />
                         Price Notif
                         </Box>
                      </Box>
                    </Box>
                    <Divider sx={{color:'#696362'}}></Divider>
                    </Box>
                    {/* {this.state.expanded} */}
                    <Accordion expanded={this.state.expanded === item.id} onChange={()=>this.handleAccordionChange(item.id)}>
                      <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{color:'#636363'}} component="div" variant="h6">
                          <strong>Comments</strong>  
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {
                          item.item_comments.map((comment, index)=>{
                            return(
                              <Typography key={index}>
                                {comment}
                              </Typography>
                            )
                          })
                        }
                        {item.item_comments.length==0?('No Comments'):('')}
                      </AccordionDetails>
                    </Accordion>
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
