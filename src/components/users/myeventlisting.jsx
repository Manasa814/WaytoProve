import React from "react";
import "../../styles/listings.css"
import $ from '../../jquery'

class MyeventList extends React.Component{

    constructor(props){
        super(props)
        console.log(props)
    }

    // componentWillMount(){
    //     console.log(this.props.data)
    //     $('#event-name').text('Event Name: ',this.props.data.eventName)
    //     $('#event-date').text('Event Date: ', this.props.data.eventStartDate)
    //     //$('#event-host').text('Organiser: ', this.props.eventHost.userEmail)
    //     $('#event-status').text('Event Date: ', this.props.data.eventStatus)
    //     // if(this.props.data.results == undefined)
    //     //     $('#event-result').text('Event Name: ','Not available')
    //     // else
    //     //     $('#event-result').text('Event Name: ' + this.props.data.results)
    // }

    render(){
        return(
            <div id="list-container">
                <p id='event-name'>{'Event Name: '+this.props.data.eventName}</p>
                <p id='event-date'>{'Event Date: '+ this.props.data.eventStartDate}</p>
                <p id='event-venue'>{'Event Venue: '+ this.props.data.eventVenue}</p>
                {/* <p id='event-host'>{'Organiser: '+ this.props.eventHost.userEmail}</p> */}
                <p id='event-status'>{'Event Status: '+ this.props.data.eventStatus}</p>
                <p id='event-result'>{() => {
                    if(this.props.data.results == undefined)
                        return 'Event Name: ' + 'Not available'
                    else
                        return 'Event Name: ' + this.props.data.results
                }}</p>
            </div>
        )
    }
}

export default MyeventList;