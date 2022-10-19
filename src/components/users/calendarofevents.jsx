import React from "react";
import ReactDOM from "react-dom"
import "../../styles/listings.css"

class CalendarOfEvents extends React.Component{
    render(){
        return(
            <div id="list-container-events">
                <p>Event Name:</p>
                <p>Start Time :</p>
                <p>End Time:</p>
            </div>
        )
    }
}

export default CalendarOfEvents;