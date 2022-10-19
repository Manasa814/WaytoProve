//Author: Prashanth S
import React, { Component } from "react";
import "../../styles/listings.css"
import saveActive from '../../res/saveactive.png'
import save from '../../res/save.png'
import "../../bootstrap/css/bootstrap.min.css";
import unlike from '../../res/like.png'
import likeActive from '../../res/likeactive.png'
import share from '../../res/share.png'
import {confirmAlert} from 'react-confirm-alert'
import '../../styles/alert-dialog.css'

export default class Listings extends Component{
    constructor(props){
        super(props)
        this.state={
            saveImage:save,
            likeImage:unlike,
            likeCount : 0
        }
        console.log(props.data)
        this.eventId = props.data.eventsData._id
        this.eventName = props.data.eventsData.eventName
        this.eventDesc = props.data.eventsData.eventDescription
        this.eventDate = props.data.eventsData.eventStartDate
        this.eventTime = props.data.eventsData.eventStartTime + '-' + props.data.eventsData.eventEndTime
        this.eventLastDate = props.data.eventsData.eventLastDate
        this.savedEvents = props.data.profileData.savedEvents
        this.likedEvents = props.data.profileData.likedEvents
        //this.likeCount = props.data.likeCount
        this.userEmail = props.data.profileData.emailId
        // this.likeCount = props.data.likeCount.length
        
        
        console.log(this.likedEvents,this.savedEvents)
    }

    componentDidMount(){
        var obj,obj1
        if(this.likedEvents.indexOf(this.eventId) == -1){
            console.log(this.likedEvents)
            obj =  unlike
        }else{
            console.log(this.likedEvents)
            obj =  likeActive
        }
        if(this.savedEvents.indexOf(this.eventId) == -1){
            console.log(this.savedEvents)
            obj1 =  save
        }else{
            console.log(this.savedEvents)
            obj1 =  saveActive
        }

        this.setState({likeImage : obj,saveImage : obj1})
        var data = {emailId : this.userEmail, eventId : this.eventId}
        fetch('/usereventslisting/getlikecount',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        }).then(res => res.json())
        .then(value => {
            console.log(value)
            this.setState({likeCount : value.likeCount})
        })
    }

    imageOnClick = (content) =>{
        switch(content){
            case 'save':
                if(this.state.saveImage == save){
                   
                    this.setState({saveImage:saveActive})
                    this.updateToDb('save')
                }else{
                   
                    this.setState({saveImage:save})
                    this.updateToDb('unsave')
                }
            break;
            case 'like':
                if(this.state.likeImage == unlike){
                    this.setState({likeImage:likeActive})
                    this.updateToDb('like')

                }else{
                    this.setState({likeImage:unlike}) 
                    this.updateToDb('unlike')
                }
            break;
            case 'share':
                this.updateToDb('share')
            break;

        }
        
    }

    updateToDb = (event) =>{
        var path = '/usereventslisting/'
        var data = {emailId : this.userEmail, eventId : this.eventId}
        path = path + event
        fetch(path,{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(value => {
            console.log(value)
              switch(event){
                    case 'like':
                    case 'unlike':
                        this.setState({likeCount : value.likeCount})
                        break;
                    case 'share':
                        var html = value.htmlContent;
                        var uri = "data:text/html," + encodeURIComponent(html);
                        window.open(uri);
                    break                   
                }
        })
    }


    onApplyClick = () =>{
        confirmAlert({
            customUI: ({onClose}) => {
                return<div id='alert-dialog'>
                            <h5><b>Do you agree to share your information, to join the event?</b></h5>
                            <div id='alert-buttons'>
                            <button className='dialog-confirm-button'
                             onClick = {() => {
                                    this.updateToDb('apply')
                                    onClose();
                                 }}>Proceed
                            </button>
                            <button className='dialog-cancel-button'
                            onClick={onClose}>Cancel</button>
                            </div>
                        </div>
            }
        })
    }

    render(){
       
        return(
            <div id="list-container">
                    <h5><b>{this.eventName}</b></h5>
                    <p style={{width:'400px'}}>Description: {this.eventDesc}<br/><br/>
                    Date: {this.eventDate}<br/><br/>
                    Time: {this.eventTime}<br/><br/>
                    Last date to apply:{this.eventLastDate}</p>
                    <hr/>
                    <div id="share-save">
                        <span className="options">
                            <center>
                                <img src={this.state.likeImage} alt="save" width='30px' height='30px' 
                                    onClick={()=>this.imageOnClick('like')}/>
                                &nbsp;&nbsp;{this.state.likeCount}
                            </center>
                        </span>
                        
                        <span className="options">
                            <center>
                                <img src={share} alt="share" width='30px' height='30px' 
                                onClick={()=>this.imageOnClick('share')} />
                            </center></span>
                            
                        <span className="options">
                            <center>
                                <img src={this.state.saveImage} alt="save" width='30px' height='30px' 
                                onClick={()=>this.imageOnClick('save')}/>
                           </center></span>
                    </div>
                    <button type='button' id="apply" onClick={() => this.onApplyClick()}>Apply</button>
                </div>
        )
    }
}