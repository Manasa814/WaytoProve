import React, { Component } from "react";
import profilepic from '../../res/profile.png'
import SavedEvents from "./savedevents";
import Achievements from './achievements'
import savedImage from '../../res/saveactiveblack.png'
import stageImage from '../../res/stage.png'
import '../../styles/profile.css'
import $  from '../../jquery'
import { Button ,Input,  Col , Row} from 'reactstrap';

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            profileData : {},
            savedEvents : [],
            content : this.loadProfile()
        }

        console.log(props)
        fetch('/getuserdata/userdata',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailId : this.props.data})
            })
            .then(res => res.json())
            .then(value => {
                console.log(value)
                $('#name').val(value.firstName + ' ' + value.lastName)
                $('#dob').val(value.dateOfBirth)
                $('#age').val(value.age)
                $('#gender').val(value.gender)
                $('#email').val(value.emailId)
                $('#interests').val(value.interests.toString())
                $('#phone').val(value.mobileNo)
                $('#address').val(value.address)
                this.setState({profileData : value})
                fetch('/getmyeventsdata/savedEvents',{
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({emailId : this.props.data})
                    }).then(res => res.json())
                    .then(value => {
                        console.log(value)
                        this.setState({savedEvents : value})
                    })
            })
    }


    componentDidMount(){
        fetch('/getuserdata/userdata',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailId : this.props.data})
            })
            .then(res => res.json())
            .then(value => {
                $('#name').val(value.firstName + ' ' + value.lastName)
                $('#dob').val(value.dateOfBirth)
                $('#age').val(value.age)
                $('#gender').val(value.gender)
                $('#email').val(value.emailId)
                $('#interests').val(value.interests.toString())
                $('#phone').val(value.mobileNo)
                $('#address').val(value.address)
                this.setState({profileData : value})
            })
    }

    render(){
        fetch('/getuserdata/userdata',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailId : this.props.data})
            })
            .then(res => res.json())
            .then(value => {
                $('#name').val(value.firstName + ' ' + value.lastName)
                $('#dob').val(value.dateOfBirth)
                $('#age').val(value.age)
                $('#gender').val(value.gender)
                $('#email').val(value.emailId)
                $('#interests').val(value.interests.toString())
                $('#phone').val(value.mobileNo)
                $('#address').val(value.address)
                this.setState({profileData : value})
        })
       return this.state.content
    }

    updateProfileState = (event) =>{
        console.log(event)
        var obj
        switch(event){
            case 'profile':
                obj = this.loadProfile()
                break;
            case 'saved':
                obj = <div id='saved-events'>
                    <SavedEvents goBack= {this.updateProfileState.bind(this)} 
                    data={this.state.savedEvents}/>
                    </div>
                break;
            case 'achievements':
                obj = <div id='saved-events'>
                        <Achievements goBack= {this.updateProfileState.bind(this)} 
                        data={{emailId : this.props.data}}/>
                    </div>
                break;
        }
        this.setState({content : obj})    
    }

    loadSavedEvents = () => {
        // return (
        //     // <div id='saved-events'>
        //     //     <SavedEvents goBack= {this.updateProfileState.bind(this)} 
        //     //     data={this.state.SavedEvents}/>
        //     // </div>
        // )
    }

    loadProfile = () => {
        return (<div className='profile-content'>
        <div className='cover'>
            <img src={profilepic} style={
                {backgroundColor : 'white'}
            } id='profilepic' alt='profilepc'/>
        </div>
        <br/><br/>
        <div className='bar1'>
            <div className='bar1-span'>

             
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <label for="name">Name: </label>
                        <Input type="text" className="name" id="name" 
                        placeholder="Enter the name" disabled></Input>
                        </div>
                        </div>
                        </div><br />
            

            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <label for="dob">DOB: </label>
                        <Input type="date" className="dob" id="dob" 
                        placeholder="Enter the date of birth" disabled></Input>
                        </div>
                        </div>
                        </div><br />

               <div class="container">
                   <div class="row">
                       <div class="col-sm-6">
                           <label for="age">Age: </label>
                           <Input type="number" classname="age" id="age" 
                           placeholder="Enter the age" disabled></Input>
                           </div>
                           </div>
                           </div><br />
           
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="gender">Gender: </label>
                            <Input type="text" classname="gender" id="gender" disabled></Input>
                            </div>
                            </div>
                            </div><br />
                
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="email">Email: </label>
                            <Input type="email" className="email" id="email" 
                            placeholder="Enter your email" disabled></Input>
                            </div>
                            </div>
                            </div><br />
                            
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="phone">Phone number: </label>
                            <Input type="number" className="phone" id="phone" 
                            placeholder="Enter the phone number" disabled></Input>
                            </div>
                            </div></div><br />

                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="address">Address: </label>
                            <Input type="textarea" className="address" id="address" 
                            placeholder="Enter the address" disabled></Input>
                            </div>
                            </div>
                            </div><br />

                 <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="interests">Interests :</label>
                            <Input type="text" className="interests" id="interests" 
                            placeholder="Enter the interest" disabled></Input>
                            </div>
                            </div>
                            </div><br />
        </div>
        </div>
        <div className='bar2'>
            <span className='bar2-span'>
            <img src={savedImage} width='30px' height='30px'  
            alt='saved' onClick={() => this.updateProfileState('saved')}/>
            <h6><b>Saved</b></h6>
            </span>
            <span  className='bar3-span'>
            <img src={stageImage} width='30px' height='30px' 
            alt='achievements' onClick={() => this.updateProfileState('achievements')}/>
            <h6><b>Achievements</b></h6>
            </span>
            
           
        </div>
    </div>)
    }
}
export default Profile