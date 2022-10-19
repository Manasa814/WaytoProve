import React, { Component } from "react";
//import profilepic from '../../res/profilepic.JPG'
import savedImage from '../../res/saveactive.png'
import profilepic from '../../res/organizationprofile.png'
import stageImage from '../../res/stage.png'
import '../../styles/profile.css'
import $  from '../../jquery'
import { Button ,Input,  Col , Row} from 'reactstrap';
class Profile extends Component{
    constructor(props){
        super(props)
        
    }

    componentWillMount(){
        
                console.log(this.props.data)
                //  $('#name').val(this.props.organisationName)
                //  $('#email').val(this.props.emailId)
                //  $('#category').val(this.props.organizationCategory)
                //  $('#phone').val(this.props.mobileNo)
                //  $('#address').val(this.props.address)
    }

    render(){
        return(<div className='profile-content'>
                <div className="cover">
                    <img src={profilepic} id='profilepic' alt='profilepc'/>
                 </div>
               
                <div className='profile-bar1'>
                
                    <div className='profile-span'>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="category">Organization Type: </label>
                                <Input type="text" className="category" id="category" 
                                value={this.props.data.organizationCategory}
                                placeholder="Organiztion Type" disabled></Input>
                                </div>
                                </div>
                                </div><br />

                      <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="name">Organization Name: </label>
                                <Input type="text" className="name" id="name" 
                                placeholder="Organiztion name" 
                                value={this.props.data.organisationName}
                                disabled></Input>
                                </div>
                                </div>
                                </div><br />
                        
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="email">Email: </label>
                                    <Input type="email" className="email" id="email" 
                                     value={this.props.data.emailId}
                                    placeholder="email" disabled></Input>
                                    </div>
                                    </div>
                                    </div><br />
                                    
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="phone">Phone number: </label>
                                    <Input type="number" className="phone" id="phone"
                                     value={this.props.data.mobileNo}
                                      placeholder="Phone number" disabled></Input>
                                    </div>
                                    </div></div><br />
                                    <div class="container">
                                <div class="row">
                                <div class="col-sm-6">
                                    <label for="address">Address: </label>
                                    <Input type="textarea" className="address" id="address"
                                     value={this.props.data.address}
                                      placeholder="Address" disabled></Input>
                                    </div>
                                    </div></div><br/>     
                   
                </div>
                </div>
              
            </div>)
    }
}
export default Profile