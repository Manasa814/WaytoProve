import React, { Component } from "react";
import MyEventListOrg from './myeventlisting';
import nocontent from '../../res/nocontent.png'

class MyEventsOrg extends Component{
    constructor(props){
        super(props)
        this.state = {
            //content : this.noContentFound(),
            data : []
        }
        console.log(props.data)
        fetch('/getmyeventsdata/organiserdata',{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({emailId : props.data})
            }).then(res => res.json())
            .then(value => {
                console.log(value)
                this.setState({data : value})
        })
    }

    noContentFound(){
        return <div className='events-content'>
        <center><img className='nocontent-img' src={nocontent}/></center>
        <center><p>Sorry, you do not have any current events</p></center>
        </div>
    }

    contentFound(){
        return <div style={{height : '100vh'}}>
                <h2 style={{marginLeft:'500px'}}>Events</h2>
                <hr></hr>
                {this.state.data.map(event => {
                    console.log(event)
                    return <MyEventListOrg data={event}/>
                })}
            </div>
    }
    
    render(){
        if(this.state.data.length > 0)
            return(<div style={{height : '100vh'}}>
                <h2 style={{margin:'20px'}}>Events</h2>
                <hr></hr>
                {this.state.data.map(event => {
                    console.log(event)
                    return <MyEventListOrg data={event}/>
                })}
            </div>)
        else
            return this.noContentFound()
    }
}
export default MyEventsOrg;