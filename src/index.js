import React from 'react'
import ReactDOM from "react-dom";
import Navigation from "./components/users/navigation"
import App from './components/app'
import Organization from './components/forms/organizeregister'
import Register from './components/forms/register'
import AddEvent from './components/forms/addevent'
import Calendar from './components/users/calendarlistings'
import ManageEvents from './components/organisation/manageevents'


var isLoggedin=false
let x = document.cookie
var cookies = x.split(';')


if(cookies.length != 2){
    console.log(cookies)
    isLoggedin = false 
    ReactDOM.render(<App data={{isLoggedin : false}}/>,document.getElementById("root"))
}
else{
    console.log(cookies)
     var cookie1 = cookies[0].split('=')
     var cookie2 = cookies[1].split('=')
     var value = {
         userType : (cookie1[0] === 'userType')? cookie1[1] : cookie2[1],
         userEmail : (cookie2[0] === 'userType')? cookie2[1] : cookie1[1]
     }
     console.log(value)
    ReactDOM.render(<App data={{isLoggedin : true,
                               userType : value.userType,
                                userEmail : value.userEmail}}/>,document.getElementById("root"))
    isLoggedin = true
} 

// ReactDOM.render(<Profile/>,document.getElementById("root"))
//ReactDOM.render(<AddEvent/>,document.getElementById("root"))
//ReactDOM.render(<Calendar />,document.getElementById("root"))
//ReactDOM.render(<ManageEvents />,document.getElementById("root"))

