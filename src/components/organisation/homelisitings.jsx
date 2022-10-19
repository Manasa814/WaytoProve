import { Button } from "bootstrap";
import React from "react";
import ReactDOM from "react-dom"
import "../../styles/listings.css"
import {confirmAlert} from 'react-confirm-alert'
import '../../styles/alert-dialog.css'

class CurrentEventListings extends React.Component{
    constructor(props){
        super(props)
    }
    //style={{color:warning}}
    onManageEventsClick=() => {
        
        // confirmAlert({
        //     customUI: ({onClose}) => {
        //         return<div id='alert-dialog'>
        //                     <h5><b>Are you sure?</b></h5>
        //                     <div id='alert-buttons'>
        //                     <button className='dialog-confirm-button'
        //                      onClick = {() => {
        //                             this.updateSchedule()
        //                             onClose();
        //                          }}>Proceed
        //                     </button>
        //                     <button className='dialog-cancel-button'
        //                     onClick={onClose}>Cancel</button>
        //                     </div>
        //                  </div>
        //     }
        // })
    }

    updateSchedule = () =>{
        fetch('/updateeventstatus',{
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id : this.props.data._id})
        })
    }

    render(){
        return(
            <div id="list-container">
                <p>{this.props.data.eventName}</p>
                <p>{' Date/Time: '+this.props.data.eventStartDate + ' ' 
                +this.props.data.eventStartTime + '-' + this.props.data.eventEndTime}</p>
                <p>{'Status: '+this.props.data.eventStatus}</p>
                <p>{() => {
                    if(this.props.data.results == undefined)
                        return 'Results: ' + 'Yet to update'
                    else
                        return 'Results: ' + this.props.data.results
                }}</p>
                <button id='manageEvents' className='manage-events-button' 
                onClick={() => this.props.goBack('manageevents',this.props.data)}>Manage Event</button>
            </div>
        )
    }
}

export default  CurrentEventListings;
