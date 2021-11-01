import * as React from 'react'
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class HomePage extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            
        };
        
    }

    async componentDidMount(){

        const response= await axios({url:'http://127.0.0.1:8000/items' ,method:'POST', withCredentials:true} ).then(console.log("done"));
           
    }

    render(){
        return(
            <div>

            </div>
        );
    }


}

export default HomePage;