import React from "react";
import "../../styles/listings.css"
import $ from '../../jquery'
import bronzemedal from '../../res/bronzemedal.png'
import goldmedal from '../../res/goldmedal.png'
import silvermedal from '../../res/silvermedal.png'

class MyAchievementsList extends React.Component{

    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            medal : bronzemedal
        }
    }

    componentDidMount(){
        let index = this.props.data.eventResults.indexOf(this.props.emailId)
        var obj
        switch(index){
            case 0:
                obj = {medal : goldmedal}
                break;
            case 1:
                obj = {medal : silvermedal}
                break;
            case 2:
                obj = {medal : bronzemedal}
                break;
        }
        this.setState(obj)
    }

    render(){
        return(
            <div id="list-container">
                <div style={{display : 'flex'}}>
                <div style={{flexGrow : '1'}}>
                <p id='event-name'>{'Event Name: '+this.props.data.eventName}</p>
                <p id='event-date'>{'Event Date: '+ this.props.data.eventStartDate}</p>
                <p id='event-venue'>{'Event Venue: '+ this.props.data.eventVenue}</p>
                {/* <p id='event-host'>{'Organiser: '+ this.props.eventHost.userEmail}</p> */}
                <p id='event-status'>{'Event Status: '+ this.props.data.eventStatus}</p>
                </div>
                <div style={{flexGrow : '1',alignContent:'center',textAlign:'center'}}>
                <img src={this.state.medal} style={{width:'100px',height:'100px'}}/>
                </div>
                </div>
            </div>
        )
    }
}

export default MyAchievementsList;