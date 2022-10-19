import React from 'react';
import '../../styles/common.css'
import '../../styles/organizerregister.css'
import $ from '../../jquery.js'
import "../../bootstrap/css/bootstrap.min.css";
import { Button ,Input,  Col , Row , Label} from 'reactstrap';
import swal from 'sweetalert';


class Organiser extends React.Component {
    constructor(){
        super()
    }
    
    // hasDigit(name){
    //     let pattern = '/^[A-Za-z]+$/'
    //     if(name.match(pattern))
    //         return false
    //     return true
    // }

    
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

    isPhoneNoValid(mobileNo){
        if(mobileNo.length != 10){
            $('#phone-error').text("Enter a valid phone number")
            return false
        }
        return true
    }

    isEmailIdValid(emailID){
        let re = /\S+@\S+\.\S+/;
        if(!re.test(emailID)){
            $('#email-error').text("Enter a valid email ID")
            return false
        }
        return true
    }
    
    isOrganisationNameValid(organisationName){
        if(organisationName === ''){
            $('#organisation-error').text("Enter a valid name")
            return false
        }
        return true
    }
    
    isEmailRegistered(formData){
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
                fetch('/organisationregister',{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)})
                .then(res => res.json())
                .then(() => {
                    $('#register').prop('disabled',false)
                    swal("", "You are register successfully", "success")
                    .then((value)=>{
                   // this.props.data.goBack()
                   $('#register').prop('disabled',false)

                         $('#register').prop('disabled',false)
                })  
             })    
       }
   })  
}

    isTermsConditionValid(termscondition){
        if(termscondition == ''){
            $('#terms-error').text("you must accept to the terms and conditions")
            return false
        }
        return true
    }

    onOrganisationRegisterSubmit = () => {
        $('.error-span').text("")
        console.log()
            let formData = {
                organizationCategory:$('#category').val(),
                organisationName : $('.organisation').val(),
                emailId : $('#email').val(),
                mobileNo : $('#phone').val(),
                address : $("#address").val(),
                password : $("#password").val(),
            }
        console.log(formData)
        let termscondition = $('#terms-condition').is(':checked')
        var confirmPassword = $("#con-password").val()
        let isOrgNameValid = this.isOrganisationNameValid(formData.organisationName)
        let isEmailValid = this.isEmailIdValid(formData.emailId)
        let isPhoneValid = this.isPhoneNoValid(formData.mobileNo)
        let isPasswdValid = this.isPasswordValid(formData.password,confirmPassword)
        let isTermsAccepted = this.isTermsConditionValid(termscondition)

       if(isOrgNameValid && isEmailValid && isPhoneValid && isTermsAccepted && isPasswdValid){
            this.isEmailRegistered(formData)
       }
        

    }

    //  registerAlert(){
    //      swal("", "You are register successfully", "success").then((value)=>{this.onOrganisationRegisterSubmit()
    //      });
    //  }


    render() {
        return (
            <div className="organiser-register-main">
                    <div className='organiser-heading'>
                        <h4>Create Organisation Account</h4>
                    </div>
                    <div className="organiser-form">
                        <form action="">
                        <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                            
                        <label htmlFor="category">Category *</label>
                            <Input type="select" name="category" id="category">
                             <option>School</option>
                             <option>College</option>
                             <option>Others</option>
                            </Input>
                        </div>
                        </div>
                        </div><br/>
                        <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                        <label htmlFor="organization">Organisation/Institution Name *</label>&nbsp;
                        <Input type="text" className="organisation" id="organisation" placeholder="Enter the name"></Input>
                        <span className="error-span" style={{color:'red'}} id='organisation-error'></span>
                        </div>
                        </div></div>
                        <br />

                        <div class="container">
                        <div class="row">
                        <div class="col-sm-6">
                        <label htmlFor="email">Email * </label>&nbsp;
                        <Input type="email" className="email" id="email" placeholder="Enter your email"></Input>
                        <span className="error-span" style={{color:'red'}} id='email-error'></span>
                        </div>
                        </div></div><br />

                        

                        <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                        <label htmlFor="phone">Phone No *</label>&nbsp;
                        <Input type="number" className="phone" id="phone" placeholder="Enter phone number"></Input>
                        <span className="error-span" style={{color:'red'}} id='phone-error'></span>
                        </div>
                        </div></div><br/>

                        <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                        <label htmlFor="address">Address *</label>
                        <Input type="textarea" className="address" id="address" placeholder="Enter the address"></Input>
                        </div>
                        </div></div><br/>

                        <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                        <label htmlFor="password">Password *</label>&nbsp;
                        <Input type="password" className="password" 
                        id="password" placeholder="Enter your password"></Input>
                        <span id="password-error" style={{color:'red'}} className="error-span"></span>
                        </div>
                        </div></div><br/>

                        <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                        <label htmlFor="con-pass">Confirm Password *</label>&nbsp;
                        <Input type="password" className="con-pass" 
                        id="con-pass" placeholder="Confirm password"></Input>
                        <span style={{color:'red'}} className='error-span' id='con-pass-error'></span>
                        
                        </div>
                        </div></div><br/>

                        <div class="container">
                        <Label terms-condition >
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input type="checkbox" 
                                className="terms-condition" id="terms-condition" 
                                value="terms-condition"/> I agree for all the terms and conditions.
                                </Label><br/>
                                <span style={{color:'red'}} className='error-span' id='terms-error'></span>
                        </div>

                        <div class="container">
                        <div className="register-buttons">
                        <Row form>
                        <Col md={4}>
                        <Button color="success"  type="button" 
                        onClick={() => this.onOrganisationRegisterSubmit()}
                        className="register-btn" id="register" 
                        value="register" >Register</Button>
                        </Col>
                        <Col md={8}>
                            <Button color="danger" type="reset" onClick={$(".error-span").text("")} 
                            className="reset-btn" id="reset" value="reset">Clear</Button><br/>
                        </Col>
                        </Row>
                        </div>
                        </div>
                    </form>
                    </div>
            </div>
        );
    }

}

export default Organiser;