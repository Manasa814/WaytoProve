import React, { Component } from 'react';
import "../../styles/common.css"
import "../../styles/userregister.css"
import $ from '../../jquery.js'
import "../../bootstrap/css/bootstrap.min.css";
import photo from '../../res/profile.png'
import { Button , Input ,Col , Row, Form ,FormGroup , Label} from 'reactstrap';
import Login from '../app'
import swal from 'sweetalert'
import { event } from 'jquery';

class UserRegister extends Component {
    constructor(){
        super()
        this.emailRegistrationStatus = false
        
    }

    isAlpha(name){
        let pattern = '/^[A-Z a-z]+$/'
        if(name.match(pattern))
            return true
        return false
    }
    
    onCheck(){
        $(".interest").each(function(){
            if(!$(this).is('checked'))
                $("#all").prop('checked',false)  
        })
    }

    onCheckAll(){
        if($("#all").is(':checked')){
            $(".interest").prop('checked',true)
        }else{
            $(".interest").prop('checked',false)
        }
    }

    isPasswordValid(password, confirmPassword){
        let isValid = false
        if(password === ''){
            $('#con-pass-error').text("Please enter a password")
        }else if(password.length < 8){
            $('#password-error').text("Password should be minimum of 8 characters")
        }else if(password === confirmPassword){
            $('#con-pass-error').text("Password does not match")
        }else{
            isValid = true
        }
        return isValid
    }

    isDoBValid(dob, age){
        if(dob === ''){
            $('#dob-error').text("Enter your date of birth")
            return false
        }
        if(age < 5){
            $('#dob-error').text("Sorry, age must be above 4 years")
            return false
        }
        return true
    }

    calculate_age(dob) {
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    isPhoneNoValid(mobileNo){
        if(mobileNo.length != 10){
            $('#phone-error').text("Enter a valid phone number")
            return false
        }
        return true
    }

    isGenderValid(gender){
        if(gender == undefined){
            $('#gender-error').text("Select your gender")
            return false
        }
        return true
    }
    isFirstNameValid(firstName){
        if(this.isAlpha(firstName) || firstName === ''){
            $('#f-name-error').text("Enter a valid name")
            $('#f-name').focus()
            return false
        }
        return true
    }
    isLastNameValid(lastName){
        if(lastName !== '')
            if(this.isAlpha(lastName)){
                $('#l-name-error').text("Enter a valid name")
                $('#l-name').focus()
                return false
            }
        return true
    }

    isEmailRegistered = (formData) =>{
        console.log(formData)
        fetch('/checkemail',{
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({email : formData.emailId})
            }
        ).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.message){
                $('#email-error').text('Email ID already registered')
                $('#email').focus()
            }else{
                console.log(formData)
                fetch('/userregister',{
                    method : "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)})
                    .then(res => res.json())
                    .then(()=>{
                        $('#register').prop('disabled',false)
                        swal("", "You are register successfully", "success")
                        .then((value)=>{
                            //this.props.data.goBack()
                            $('#register').prop('disabled',false)
                        })
                     })
                }
            })  
    }


    isEmailIdValid(emailID){
        let re = /\S+@\S+\.\S+/;
        if(!re.test(emailID)){
            $('#email-error').text('Enter a valid email ID')
            $('#email').focus()
            return false
        }
        return true
    }
    isIntrestsValid(interests){
        if(interests.length < 1){
            $("#interest-error").text('Select anyone of your intrests')
            $("[name='gender']").focus()
            return false
        }  
        return true
    }

    isTermsConditionValid(termscondition){
        if(termscondition == ''){
            $('#terms-error').text("you must accept to the terms and conditions")
            return false
        }
        return true
    }

    onUserFormSubmit = () =>{
        $('#register').prop('disabled',true)
        console.log(this.calculate_age(new Date(1962, 1, 1)));
        $('.error-span').text("")
            let formData = {
                firstName : $('#f-name').val(),
                lastName : $('#l-name').val(),
                emailId : $('#email').val(),
                mobileNo : $('#phone').val(),
                dateOfBirth : $("#dob").val(),
                age : this.calculate_age(new Date($("#dob").val())),
                gender : $("[name='gender']:checked").val(),
                interests : $('.interest:checked').map(function(){
                    return this.value;
                }).get(),
                address : $("#address").val(),
                password : $("#password").val(),
                savedEvents: [],
                likedEvents : [],
                appliedEvents : []
            }
            let termscondition = $('#terms-condition').is(':checked')
            var confirmPassword = $("#con-password").val()
            let isFNameValid = this.isFirstNameValid(formData.firstName)
            let isLNameValid =  this.isLastNameValid(formData.lastName)
            let isEmailValid =  this.isEmailIdValid(formData.emailId)
            let isPhoneValid =  this.isPhoneNoValid(formData.mobileNo)
            let isGenValid = this.isGenderValid(formData.gender)
            let isDOBValid = this.isDoBValid(formData.dob, formData.age)
            let isPasswdValid = this.isPasswordValid(formData.password,confirmPassword)
            let isIntrValid = this.isIntrestsValid(formData.interests)
            let isTermsAccepted = this.isTermsConditionValid(termscondition)
            console.log(isFNameValid,isLNameValid,isEmailValid,isPhoneValid,isGenValid,isDOBValid,isPasswdValid,isIntrValid,isTermsAccepted)
            if(isFNameValid &&  isEmailValid && isPhoneValid
                && isGenValid && isDOBValid && isPasswdValid && isIntrValid && isTermsAccepted){
                    console.log('hello')
                    this.isEmailRegistered(formData) 
                }
    }

    onImageLoad = (event) =>{
            console.log('running')
            $('photo-img').attr('src',URL.createObjectURL(event.target.files[0])) ;
            // output.onload = function() {
            //   URL.revokeObjectURL(output.src) // free memory
            // }
    }

    render() { 
        return (<div className="user-register-content">
                    <div className="register-heading">
                             <h4>Create User Account</h4>
                    </div>
            <form autoComplete='off' id='user-register-form'>
            
            <div class="container">        
            <div class="row">
                 <div class="col-sm-6">
			            <label for="f-name">First Name *</label>
                        <Input type="text" className="f-name"   
                         id="f-name" placeholder="Enter first name" required autoFocus></Input>
                         <span className='error-span' style={{color:'red'}} id='f-name-error'></span>
                         
                </div>
            </div><br/>

            <div class="row">
                 <div class="col-sm-6">
			            <label for="l-name">Last Name</label>
			             <Input type="text" className="l-name"    
                         id="l-name" placeholder="Enter last name"></Input>
                         <span className='error-span' style={{color:'red'}} id='l-name-error'></span>
                </div>
            </div><br/>

            <div class="row">
                 <div class="col-sm-6">
			            <label for="email">Email *</label>
			             <Input type="email" className="email"    
                         id="email" placeholder="Enter the email ID" required ></Input>
                         <span className='error-span' style={{color:'red'}} id='email-error'></span>
                </div>
            </div><br/>

            <div class="row">
                 <div class="col-sm-6">
			            <label for="phone">Phone Number *</label>
			             <Input type="number" className="phone"    
                         id="phone" placeholder="Enter the phone number"></Input>
                         <span className='error-span' style={{color:'red'}} id='phone-error'></span>
                </div>
            </div><br/>

 
                
                <div class="row"> 
                 <div class="col-sm-6">
			            <label for="dob">Date of Birth *</label>
			             <Input type="date" className="dob"    
                         id="dob" placeholder="Enter the Date of Birth" max={this.getCurrentDate}></Input>
                         <span className='error-span' 
                         style={{color:'red'}} id='dob-error'></span><br />
                </div>
            </div><br/>

                    <label for="gender">Gender:</label>&nbsp;
                    <input type="radio" className="Male" 
                    id="male" name='gender' value='Male'/>&nbsp;
                    <label for="male">Male</label>&nbsp; &nbsp;
                    <input type="radio" className="Female" 
                    id="female" name='gender' value='Female'/>&nbsp;
                    <label for="female">Female</label>&nbsp; &nbsp;
                    <input type="radio" className="others" 
                    id="others" name='gender' value='Others'/>&nbsp; 
                    <label for="others">Others</label><br/> 
                    <span className='error-span' id='gender-error' 
                                style={{color:'red'}}></span> <br/><br/>
                    <div class="row">
                 <div class="col-sm-6">
			            <label for="address">Address *</label>
			             <Input type="textarea" className="address"    
                         id="address" placeholder="Enter the Address"></Input>
                </div>
            </div><br/>
                        <label for="interest">Interests *:</label>&nbsp;&nbsp; 
                               <FormGroup check inline>
                                    <FormGroup check inline>
                                    <Label all >
                                    <Input type="checkbox" 
                                    className="all" id="all" onChange={this.onCheckAll}
                                    value="all" /> All
                                    </Label>
                                </FormGroup>
                                    <Label sports>
                                        <Input type="checkbox" className="interest" 
                                        id="sports" value="Sports" onChange={this.onCheck}/> Sports
                                    </Label>
                                </FormGroup>
                        
                                <FormGroup check inline>
                                    <Label dance>
                                    <Input type="checkbox" className="interest" 
                                    id="dance" value="Music" onChange={this.onCheck}/> Music
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label dance>
                                    <Input type="checkbox" className="interest" 
                                    id="dance" value="Dance" onChange={this.onCheck}/> Dance
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label art>
                                    <Input type="checkbox" className="interest" 
                                    id="art" value="Art and Crafts" onChange={this.onCheck}/> Art and Craft
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label tech>
                                    <Input type="checkbox" className="interest" 
                                    id="tech" value="Technology" onChange={this.onCheck}/> Technology
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label literature>
                                    <Input type="checkbox" className="interest" 
                                    id="literature" value="Literature" onChange={this.onCheck}/> Literature
                                    </Label>
                                </FormGroup>

                                <FormGroup check inline>
                                    <Label cookery>
                                    <Input type="checkbox" className="interest" 
                                    id="cookery" value="Cookery" onChange={this.onCheck}/> Cookery
                                    </Label>
                                </FormGroup>

                                
                                <br/>
                                <span className='error-span' id='interest-error' 
                                style={{color:'red'}}></span> <br/><br/>

                                {/* <div class="file-field">
                                    
                                             <span>Add photo :</span>&nbsp;
                                             <input type="file" onChange={(e) =>this.onImageLoad(e)}/>
                                        
                                     <div  id='photo-img'>
                                        <img src={photo} id='photo' alt='photo'/>
                                     </div>
                                         
                                     </div> */}
                                    </div>
                                
                                <div class="row">
                                     <div class="col-sm-6">
			                            <label for="password">Password *</label>
			                                <Input type="password" className="password"    
                                            id="password" placeholder="Enter the password"></Input>
                                            <span className='error-span' id='password-error'style={{color:'red'}}></span>
                                    </div>
                                </div><br/>

                                <div class="row">
                                     <div class="col-sm-6">
			                             <label for="con-pass">Confirm Password *</label>
			                                <Input type="password" className="con-pass"    
                                            id="con-pass" placeholder="Confirm password"></Input>
                                            <span style={{color:'red'}} className='error-span' id='con-pass-error'></span>
                                        </div>
                                 </div><br/>

                
                                    
                                 <Label terms-condition >
                                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input type="checkbox" 
                                    className="terms-condition" id="terms-condition" 
                                    value="terms-condition"/> I agree for all the terms and conditions.
                                    </Label>
                                    <br/>
                                    <span style={{color:'red'}} className='error-span' id='terms-error'></span>


                    <div className="register-buttons">
                     <Row form>

                        <Col md={4}>
                        <Button color="success" type='button'
                        onClick={() => this.onUserFormSubmit()}
                        className="register-btn" id="register" 
                        value="register" >Register</Button>
                        </Col>
                        <Col md={8}>
                            <Button color="danger" type="reset" onClick={$(".error-span").text("")}
                            className="reset-btn" id="reset" value="reset">Clear</Button><br/>
                        </Col>
                     </Row>
                     </div>
                    
          
                     
                </form> 
            </div>
            
        );  
        
    }
}


export default UserRegister;




                        