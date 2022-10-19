//Author: Prashanth S
import React, { Component } from "react";
import Contact from '../contact'
import Home from './home'
import Events from './myeventsorg'
import Profile from './profile'
import AddEvents from '../forms/addevent'
import "../../bootstrap/css/bootstrap.min.css"
import "../../styles/navbar.css"
import "../../styles/common.css"
import "../../styles/listings.css"
import $ from '../../jquery'
import activeHome from '../../res/home.png'
import logout from '../../res/logoutwhite.png'
import home from '../../res/homewhite.png'
import profile from '../../res/profilewhite.png'
import activeProfile from '../../res/profile.png'
import activeEvents from '../../res/event.png'
import eventIcon from '../../res/eventwhite.png'
import activeCalendar from '../../res/calendar.png'
import calendar from '../../res/calendarwhite.png'
import navicon from '../../res/navbar.png'
import addevents from '../../res/addevent_white.png'
import activeAddEvents from '../../res/addevent.png'
import {confirmAlert} from 'react-confirm-alert'
import '../../styles/alert-dialog.css'
var Route = require("react-router-dom").Route
var HashRouter = require("react-router-dom").HashRouter
var NavLink = require("react-router-dom").NavLink

class OrganisationNavigation extends Component{
    constructor(props){
        super(props)
        console.log('Organisation',props)
        this.userType = props.data.userType
        this.userEmail = props.data.userEmail
        this.state = {
            activeHomeImage : activeHome,
            activeProfileImage : profile,
            activeCalendarImage : calendar,
            activeEventsImage : eventIcon,
            activeAddEventsImage : addevents,
            contactMargin : '100px',
            profileData: {}
        }
        fetch('/getuserdata/organisationdata',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailId : this.userEmail})
            })
            .then(res => res.json())
            .then(value => {
                this.setState({profileData : value})
            })
        
}

    


    onHeadingClick = () => {
      $('.sidebar').toggle("300", () => {
        let obj
        if(this.state.contactMargin === '100px')
            obj = {contactMargin : '0px'} 
        else
            obj = {contactMargin :  '100px'} 
        this.setState(obj)
      })

    }

    onLogoutClick = () =>{
        confirmAlert({
            customUI: ({onClose}) => {
                return<div id='alert-dialog'>
                            <h5><b>Do you want to logout?</b></h5>
                            <div id='alert-buttons'>
                            <button className='dialog-confirm-button'
                             onClick = {() => {
                                    this.logout()
                                    onClose();
                                 }}>Confirm
                            </button>
                            <button className='dialog-cancel-button'
                            onClick={onClose}>Cancel</button>
                            </div>
                        </div>
            }
        })
        
    }

    logout =() =>{
        document.cookie = 'currentUser=;expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        document.cookie = 'userType=;expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        this.props.data.logout()
    }
   

    render(){
        return(
            <div className='organisation-navigation'>
                    <div className="heading"><img src={navicon} className="navbar" onClick={this.onHeadingClick}/>
                    <h2 className='title'>waytoprove</h2>
                        <span style={{cursor:'pointer',display:'block',
                            justifyContent:'center', position: 'absolute',
                            right: '0px',marginRight:'50px', alignContent:'center',
                            textAlign:'center', fontWeight:'normal'}} 
                            onClick={() => this.onLogoutClick()}>
                        <img src={logout} style={{width:'30px', height:'30px'}}  />
                        <p>Logout</p>
                    </span>
                    </div> 
                        <HashRouter>
                        <div className="wrapper">
                            <div className="sidebar">  
                                <center>
                                    <NavLink exact to="/" onClick={(e) => this.getContent('home')}>
                                        <div><img width="30px" height="30px"src={this.state.activeHomeImage}/> 
                                        <br/>Home</div></NavLink><br/>
                                    <NavLink to="/myevents" onClick={(e) =>this.getContent('events')}><div>
                                        <img width="30px" height="30px"src={this.state.activeEventsImage}/>
                                        <br/>My Events</div></NavLink><br/>
                                    <NavLink to="/addevents" onClick={(e) =>this.getContent('addevent')}><div>
                                        <img width="30px" height="30px"src={this.state.activeAddEventsImage}/>
                                        <br/>Add Events</div></NavLink><br/>
                                    <NavLink to="/profile" onClick={(e) =>this.getContent('profile')}><div>
                                        <img width="30px" height="30px"src={this.state.activeProfileImage}/>
                                        <br/>Profile</div></NavLink>
                                </center>
                            </div>
                            <div className="nav-content">
                                    <Route exact path="/" 
                                        render={() => <Home data={this.userEmail}/>}/>
                                    <Route path="/myevents"
                                    render={() => <Events data={this.userEmail}/>}/>
                                    <Route path="/addevents" 
                                    render={() => <AddEvents data={{userType : this.props.data.userType 
                                        ,userEmail : this.userEmail}}/>}/>
                                    <Route path="/profile" 
                                    render={() => <Profile data={this.state.profileData}/>}/>
                            </div>
                        </div>
                    </HashRouter>   
                    <Contact style={{ padding: '20px', 
                                        marginTop: '50px', 
                                        verticalAlign: 'bottom',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        marginLeft: this.state.contactMargin,
                                        height: '100%',
                                        width: '100%'}}/>      
                    </div>
        )
    }

    getContent = (active) =>{
        let obj;
        switch(active){
            case 'home':
                obj = {activeHomeImage : activeHome,
                    activeProfileImage : profile,
                    activeCalendarImage : calendar,
                    activeAddEventsImage : addevents,
                    activeEventsImage : eventIcon}
                break
            case 'profile':
                obj = {activeHomeImage : home,
                    activeProfileImage : activeProfile,
                    activeCalendarImage : calendar,
                    activeAddEventsImage : addevents,
                    activeEventsImage : eventIcon}
                break
            case 'events':
                obj = {activeHomeImage : home,
                    activeProfileImage : profile,
                    activeCalendarImage : calendar,
                    activeAddEventsImage : addevents,
                    activeEventsImage : activeEvents}
                break
            case 'calendar':
                obj = {activeHomeImage : home,
                    activeProfileImage : profile,
                    activeCalendarImage : activeCalendar,
                    activeAddEventsImage : addevents,
                    activeEventsImage : eventIcon}
                break
            case 'addevent':
                    obj = {activeHomeImage : home,
                        activeProfileImage : profile,
                        activeCalendarImage : calendar,
                        activeAddEventsImage : activeAddEvents,
                        activeEventsImage : eventIcon}
                break
        }
        this.setState(obj)
    }

    
 }
 export default OrganisationNavigation