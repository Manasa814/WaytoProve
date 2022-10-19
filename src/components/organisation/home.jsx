import React, { Component } from "react";
import nocontent from '../../res/nocontent.png'
import '../../styles/organisationhome.css'
import AddEvent from "../forms/addevent";
import HomeListings from './homelisitings'
import ManageEvents from './manageevents'
import { Button } from 'reactstrap';

class OrganisationHome extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            content : this.noContentFound(),
            data :[],
            loadManageEvents : false,
            eventId  : ''
        }
        fetch('/getmyeventsdata/organiserdata',{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({emailId : props.data})
            }).then(res => res.json())
            .then(value => {
                this.setState({data : value})
                //this.pushToClass(value)
            })
    }
    
    pushToClass(events){
        console.log(events)
        var now = new Date()
        let today = now.getFullYear() + '/' + (now.getMonth()+1) + '/' + now.getDate()
        for(let i=0;i<events.length;i++){
            if((new Date(events[i].eventStartDate) - new Date(today)) < 0 ||
                events[i].eventStatus == 'Cancelled' || events[i].eventStatus == 'Completed')
                events.splice(i)
        }
        this.setState({data : events})
    }

    updateHomeState = (event,obj) =>{
        switch(event){
            case 'manageevents':
                this.setState({loadManageEvents : true,event : obj})
                break;
            case 'home':
                this.setState({loadManageEvents : false})
                break;
        }
    }


    render(){
        console.log(this.state.data)
            if(!this.state.loadManageEvents)
                if(this.state.data.length == 0)
                    return this.noContentFound()
                else
                    return this.contentFound()
            else
                return this.loadManageEvents()
    }

    loadManageEvents = () =>{
        return <div>
            <ManageEvents data={this.state.event} goBack={this.updateHomeState.bind(this)}/>
        </div>
    }

    contentFound(){
        return <div id='current-events' style={{height : '100vh'}}>
            <h2 style={{margin:'20px'}}>Current Events</h2>
            <hr style={{width : '100%'}}></hr>
            {
                this.state.data.map(event => {
                        return <HomeListings data={event} goBack={this.updateHomeState.bind(this)}/>
                })
            }
        </div>
    }
    
    noContentFound(){
        return <div className='current-events' style={{height : '100vh',width : '100vw'}}>
        <h2 style={{margin:'20px'}}>Current Events</h2>
        <hr style={{width : '100%'}}></hr>
        <center><img className='nocontent-img' src={nocontent}/></center>
        <center><p>Sorry, you do not have any current events</p></center>
        </div>
    }

    

}
export default OrganisationHome