import React from "react";
import ReactDOM from "react-dom"
import "../../styles/listings.css"
import CalendarOfEvents from './calendarofevents';

class CalendarList extends React.Component{
    render(){
        return(
            <div id="list-container">
                <h4>Date :</h4>
                <CalendarOfEvents/>
                <CalendarOfEvents/>
            </div>
        )
    }
}

export default CalendarList;