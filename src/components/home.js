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
// import {ExpandMoreIcon} from '@mui/icons-material';
import { Redirect } from "react-router-dom";
import { Divider, Grid } from "@mui/material";
import './style1.css'


class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      expanded:0,
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
      url: "http://127.0.0.1:8000/shopAPIs/items",
      method: "GET",
      withCredentials: true,
    }).then((res) => {
      console.log("done");
      console.log(res.data);
      return res.data;
    });
    this.setState({ items: response });
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
    // const headers={
    //   'X-CSRFToken':
    // }
    this.props.axiosInstance({
      url: "http://127.0.0.1:8000/shopAPIs/items/"+id+"/",
      method: "PATCH",
      data:data,
      withCredentials: true,
      // headers:headers,
    }).then((res) => {
      console.log("done");
      console.log(res.data);
      // return res.data;
    });
     this.fetchResponse();
  }

  render() {
    console.log("Before render: ", this.props.loginStatus);
    if (this.props.loginStatus === true) {
      return (
          <div>
            <Grid>
            {
              this.state.items.map((item, index)=>{
                return(
                  <Card className='card-display-2' key ={index}>
                    <Box className='card-display-1'>
                    <CardMedia
                      component="img"
                      sx={{ width: 200 }}
                      image={item.image}
                      alt="Display Picture"
                    />
                    <Box sx={{width:800}}>
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
                        <strong> Category : </strong> {item.category}
                        </Typography>
                      </Box>
                      <Box sx={{display:'flex'}} >
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
                         <Switch
                          checked={item.availability_notif_enabled}
                          onChange={()=>this.handleANoChange(item.id,item.availability_notif_enabled)}
                          inputProps={{ 'aria-label': 'Availability Notif' }}
                          label='Availability Notif'
                        />
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
                  //"availability_notif_enabled":false,"price_notif_enabled":false}
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
