import nocontent from '../../res/nocontent.png'
import React, { Component } from "react";
import MyEventList from './myeventlisting';

class MyEvents extends Component{
    constructor(props){
        super(props)
       this.state = {
           data : []
       }
        console.log(11,props.data)
        fetch('/getmyeventsdata/userdata',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({emailId : props.data})
        }).then(res => res.json())
        .then(value => {
            this.setState({data : value})
        })
    }
    
    noContentFound(){
        return <div className='home-content'>
        <center><img className='nocontent-img' src={nocontent}/></center>
        <center><p>Sorry, you have not current events</p></center>
        </div>
    }

    render(){
        if(this.state.data.length == 0)
                return this.noContentFound()
        else
                return(<div id='my-events' style={{height : '100vh'}}>
                    <h2 style={{margin:'20px'}}>My Events</h2>
                    <hr width='100%'/>
                    {this.state.data.map(event => {
                        return <MyEventList data={event}/>
                    })}
                </div>)
    }
}
export default MyEvents