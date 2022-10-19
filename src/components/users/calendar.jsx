import React, { Component } from "react";
// import Calendar from 'react-calendar';
import CalendarList from './calendarlistings'


class Calendar extends Component{
    constructor(props){
        super(props)
       this.state = {
           data : []
       }
        console.log(11,props.data)
        // fetch('/getmyeventsdata/userdata',{
        // method : 'POST',
        // headers : {
        //     'Content-Type': 'application/json'
        // },
        // body : JSON.stringify({emailId : props.data})
        // }).then(res => res.json())
        // .then(value => {

        //     this.setState({data : value})
        // })
    }

    render(){
        return(<div>
            <h1><center>This is the my calendar page</center></h1>
            <CalendarList/>
            <CalendarList/>

        </div>)
    }
}
export default Calendar