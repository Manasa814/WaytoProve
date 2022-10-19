import React, { Component } from "react";
import UserNavigation from './users/navigation'
import OrganisationNavigation from './organisation/navigation'


class Navigation extends Component{
    constructor(props){
        super(props)
    }

    onLogoutClick = () =>{
        this.props.data.logout()
    }

    render(){
       
        var userType = this.props.data.userType
        var userEmail = this.props.data.emailId
        
       

        if(userType === 'users'){
            return <UserNavigation data={{userType: userType, 
                userEmail : userEmail,
                logout : this.onLogoutClick.bind(this)}}/>
        }else{
            return <OrganisationNavigation data={{userType: userType, 
                userEmail : userEmail,
                logout : this.onLogoutClick.bind(this)}}/>
        }
    }

}
export default Navigation