//Author:Manasa
import React ,{ Component } from 'react';
import "../bootstrap/css/bootstrap.min.css"
import Navigation from './navigation.jsx'
import Login from './forms/login'
import Register from './forms/register.jsx'
import AddEvents from './forms/addevent.jsx'

class App extends Component
{

    constructor(props){
        super(props)
        console.log(this.props.data)
        if(!this.props.data.isLoggedin)
            this.state = {
                currentPage : this.loginPage()
            }
        else{
            this.state = {
                currentPage : this.loadNavigationPage(this.props.data.userType,
                     this.props.data.userEmail)
            }
        }   
    }
    
    onTriggerLogin = () =>{
        this.setState({currentPage : this.loginPage()})
    }

    onRegisterClick = () => {
        this.setState({currentPage : this.registerPage()})
    }

    onTriggerNavigation = (userType,userEmail) => {
        this.setState({currentPage : this.loadNavigationPage(userType,userEmail)})
    }

    render()
    {
        return this.state.currentPage
    }

    loadNavigationPage = (type,email) =>{
        return <div id='navigation'>
            <Navigation data={{logout : this.onTriggerLogin.bind(this),
                userType:type,
                emailId:email}}/>
            </div>
    }

    loginPage(){
        return ( <div id='login'>
                <Login data={{login : this.onTriggerNavigation.bind(this),
                             register : this.onRegisterClick.bind(this)}}/>
                </div>)
    }
    registerPage(){
        return (
            <div id='register'>
            <Register data={{goBack : this.onTriggerLogin.bind(this)}}/>
            </div>
        )
    }
} 

export default App;