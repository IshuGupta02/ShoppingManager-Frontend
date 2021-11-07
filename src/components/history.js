import * as React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Feed, Card, Menu, Button, Confirm } from "semantic-ui-react";
import Typography from "@mui/material/Typography";
import Moment from "react-moment";
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      items: [{ key: "name", active: true, name: "HISTORY" }],
      log_id_delete:"",
      deletelog:false,
      deletelog1:false

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
      console.log(res);
      this.setState({ logs: res.data.history_actions });
      console.log("done");
    });

    console.log(this.state.logs);
  
  };

  render() {
    if (this.props.loginStatus === true) {
      return (
        <div style={{ width: "100vw" }}>
          <Menu items={this.state.items} inverted style={{align:'right'}} />

          <Button negative 
            onClick={()=>{
              console.log("clicked");
              
              this.setState({
                  deletelog1:true
              });

          }
          }
          > Clear All 
          </Button>

          <Confirm
            open={this.state.deletelog1}
            onCancel={this.notDeleteLog1}
            onConfirm={()=>{this.deleteLog1()}}
          />

          <Feed
            size="large"
            className="ui divided items"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {this.state.logs.map((log) => {
              return (
                <Feed.Event
                  key={log.id}
                  style={{
                    padding: "20px",
                    justifyContent: "center",
                    borderBottom: "0.5px solid black",
                  }}
                >
                
                {((JSON.parse(log.history_log).object)==='Item')?(<Feed.Label image={JSON.parse(log.history_log).data.image} />):(<Feed.Label image='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />)

                }                

                {((JSON.parse(log.history_log).object)==='Item')?(<Feed.Content
                    // date={JSON.parse(log.history_log).data.adddedOn}
                    // summary={
                    //   JSON.parse(log.history_log).info +
                    //   JSON.parse(log.history_log).object
                    // }
                    // // extraText={JSON.parse(log.history_log)}
                    // extraText={JSON.parse(log.history_log).data.title}
                  >

                    <Feed.Date>

                    <Typography component="span" variant="h6">
                      <Moment format="MMMM Do, h:mm a">
                      {JSON.parse(log.history_log).data.adddedOn}
                      </Moment>
                    </Typography>

                    </Feed.Date>
                    <Feed.Summary>
                    {
                      JSON.parse(log.history_log).info +
                      JSON.parse(log.history_log).object
                    }
                    </Feed.Summary>

                    <Feed.Extra>
                    {JSON.parse(log.history_log).data.title}

                    </Feed.Extra>

                  </Feed.Content>):(

                  <Feed.Content>
                    {((JSON.parse(log.history_log).object)==='Notifications')?( <Feed.Date>

                      <Typography component="span" variant="h6">
                        <Moment format="MMMM Do, h:mm a">
                          {JSON.parse(log.history_log).data.notif_time}
                        </Moment>
                      </Typography>
                    
                    </Feed.Date>):(<Feed.Date>

                      <Typography component="span" variant="h6">
                        <Moment format="MMMM Do, h:mm a">
                        {JSON.parse(log.history_log).data.comment_time}
                        </Moment>
                      </Typography>
                    
                    </Feed.Date>)}
                    
                   
                    <Feed.Summary>
                    {
                      JSON.parse(log.history_log).info +
                      JSON.parse(log.history_log).object
                    }
                    </Feed.Summary>

                    

                    
                    {((JSON.parse(log.history_log).object)==='Notifications')?(<Feed.Extra>
                    {JSON.parse(log.history_log).data.notif_content}

                    </Feed.Extra>):(<Feed.Extra>
                    {JSON.parse(log.history_log).data.comment_content}

                    </Feed.Extra>)}

                  </Feed.Content>

                  )

                  }


                  <Button color='red' size='mini' basic onClick={()=>{
                      console.log("clicked");
                      // console.log(this.state.log_id_delete);
                      // console.log(this.state.deletelog);

                      this.setState({
                          log_id_delete:log.id
                      })
                      
                      this.setState({
                          deletelog:true
                      });

                      // console.log(this.state.log_id_delete);
                      // console.log(this.state.deletelog);

                      

                  }
                  }> Delete 
                  </Button>

                  <Confirm
                    open={this.state.deletelog}
                    onCancel={this.notDeleteLog}
                    onConfirm={()=>{this.deleteLog(this.state.log_id_delete)}}
                  />

                  
                  
                </Feed.Event>
              );
            })}
          </Feed>
        </div>
      );
    } else {
      return <p>Checking login status...</p>;
    }
  }

  notDeleteList= ()=>{
    this.setState({
      deletelog:false
    })

  }


  async deleteLog(log_id){

    console.log("deleting")
    let token="";

    const res1= await axios.get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        token= response.data.csrftoken

      })
      .catch(err =>{
        console.log("some error occured")
      })

    const response= await axios({url:'http://127.0.0.1:8000/shopAPIs/logs/'+log_id+'/' ,
    method:'DELETE', 
    withCredentials:true, 
    headers: {"Content-Type": "application/json", 'X-CSRFToken': token }})
    .then(console.log("done"))
    .catch(err => {
        console.log("error occured")
    })

    console.log(response);

    await this.componentDidMount();

    this.setState({
        deletelog:false
    })

  }

  notDeleteList1= ()=>{
    this.setState({
      deletelog1:false
    })

  }


  async deleteLog1(){

    console.log("deleting")
    let token="";

    this.setState({
      deletelog1:false
    })

    for(let i=0; i<this.state.logs.length; i=i+1){

      const res1= await axios.get("http://127.0.0.1:8000/shopAPIs/csrf_token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        token= response.data.csrftoken

      })
      .catch(err =>{
        console.log("some error occured")
      })

    const response= await axios({url:'http://127.0.0.1:8000/shopAPIs/logs/'+this.state.logs[i].id+'/' ,
    method:'DELETE', 
    withCredentials:true, 
    headers: {"Content-Type": "application/json", 'X-CSRFToken': token }})
    .then(console.log("done"))
    .catch(err => {
        console.log("error occured")
    })

    console.log(response);

    }

    this.componentDidMount()

    

  }

}
export default History;
