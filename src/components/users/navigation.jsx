import React, { Component } from "react";
import Contact from '../contact'
import UserHome from './userhome'
import UserEvents from './myevents'
import UserProfile from './profile'
import UserNotifications from './notifications'
import UserCalendar from './calendar'
import "../../bootstrap/css/bootstrap.min.css"
import "../../styles/navbar.css"
import "../../styles/common.css"
import "../../styles/listings.css"
import $ from '../../jquery'
import activeHome from '../../res/home.png'
import logout from '../../res/logoutwhite.png'
import home from '../../res/homewhite.png'
import profile from '../../res/profilewhite.png'
import activeNotification from '../../res/notification.png'
import activeProfile from '../../res/profile.png'
import activeEvents from '../../res/event.png'
import eventIcon from '../../res/eventwhite.png'
import activeCalendar from '../../res/calendar.png'
import calendar from '../../res/calendarwhite.png'
import notification from '../../res/notificationwhite.png'
import navicon from '../../res/navbar.png'
import {confirmAlert} from 'react-confirm-alert'
import '../../styles/alert-dialog.css'
var Route = require("react-router-dom").Route
var HashRouter = require("react-router-dom").HashRouter
var NavLink = require("react-router-dom").NavLink

class UserNavigation extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeHomeImage : activeHome,
            activeProfileImage : profile,
            activeCalendarImage : calendar,
            activeEventsImage : eventIcon,
            activeNotificationImage : notification,
            contactMargin : '100px',
            data : {}
        }
        console.log('14:',this.props.data)
        // fetch('/geteventdata',{
        //     method : 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({emailId : this.props.data.userEmail})
        //     })
        //     .then(res => res.json())
        //     .then(value => {
        //         this.pushToClass(value)
        // })
    }
    
    pushToClass = (data) => {
        console.log(data)
        this.setState({data : data})
    }

    onHeadingClick = () => {
      $('.sidebar').toggle("300", () => {
        if(this.state.contactMargin === '100px')
            this.setState({contactMargin : '0px'})
        else
            this.setState({contactMargin : '100px'})
      })
      
    }
    getContent = (active) =>{
        let obj;
        switch(active){
            case 'home':
                obj = {activeHomeImage : activeHome,
                    activeProfileImage : profile,
                    activeCalendarImage : calendar,
                    activeEventsImage : eventIcon,
                    activeNotificationImage : notification}
                break
            case 'profile':
                obj = {activeHomeImage : home,
                    activeProfileImage : activeProfile,
                    activeCalendarImage : calendar,
                    activeEventsImage : eventIcon,
                    activeNotificationImage : notification}
                break
            case 'events':
                obj = {activeHomeImage : home,
                    activeProfileImage : profile,
                    activeCalendarImage : calendar,
                    activeEventsImage : activeEvents,
                    activeNotificationImage : notification}
                break
            case 'calendar':
                obj = {activeHomeImage : home,
                    activeProfileImage : profile,
                    activeCalendarImage : activeCalendar,
                    activeEventsImage : eventIcon,
                    activeNotificationImage : notification}
                break
            case 'notification':
                obj = {activeHomeImage : home,
                    activeProfileImage : profile,
                    activeCalendarImage : calendar,
                    activeEventsImage : eventIcon,
                    activeNotificationImage : activeNotification}
                break        
        }
        this.setState(obj)
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
            <div className='main'>
            <div className="heading"><img src={navicon} className="navbar" onClick={this.onHeadingClick}/>
            <h2 className='title'>waytoprove</h2>
                <span style={{cursor:'pointer',display:'block',
                    justifyContent:'center', position: 'absolute',
                    right: '0px',marginRight:'50px', alignContent:'center',
                    textAlign:'center', fontWeight:'normal'}} onClick={()=>this.onLogoutClick()}>
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
                            {/* <NavLink to="/calendar" onClick={(e) =>this.getContent('calendar')}><div>
                                <img width="30px" height="30px"src={this.state.activeCalendarImage}/>
                                <br/>Calendar</div></NavLink><br/> */}
                            {/* <NavLink to="/notifications" onClick={(e) =>this.getContent('notification')}><div>
                                <img width="30px" height="30px"src={this.state.activeNotificationImage}/>
                                <br/>Notifications</div></NavLink><br/> */}
                            <NavLink to="/profile" onClick={(e) =>this.getContent('profile')}><div>
                                <img width="30px" height="30px"src={this.state.activeProfileImage}/>
                                <br/>Profile</div></NavLink>
                        </center>
                    </div>
                    <div className="nav-content">
                            <Route exact path="/"  
                            render={() => <UserHome data={this.props.data.userEmail}/>}/>
                            <Route path="/myevents" 
                            render={() => <UserEvents data={this.props.data.userEmail}/>}/>
                            <Route path="/profile" 
                            render={() => <UserProfile data={this.props.data.userEmail} value={this.state.data}/>}/>
                            <Route path="/notifications" component={UserNotifications}/>
                            <Route path="/calendar" component={UserCalendar}/>
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
 }
 export default UserNavigation