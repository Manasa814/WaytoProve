import React from "react";
import ReactDOM from "react-dom"
import "../../styles/listings.css"

class MyeventListOrg extends React.Component{



    render(){
        return(
            <div id="list-container">
                <p>{'Event Name: '+this.props.data.eventName}</p>
                <p>{' Date: '+this.props.data.eventStartDate}</p>
                <p>{' Start time: '+this.props.data.eventStartTime}</p>
                <p>{' End time: '+this.props.data.eventEndTime}</p>
                <p>{' Event Venue: '+this.props.data.eventVenue}</p>
                <p>{' Status: '+this.props.data.eventStatus}</p>
                <p>{() => {
                    if(this.props.data.results == undefined)
                        return 'Results: ' + 'Yet to update'
                    else
                        return 'Results: ' + this.props.data.results
                }}</p>
            </div>
        )
    }
}

export default  MyeventListOrg;
