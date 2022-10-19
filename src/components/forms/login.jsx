import React ,{ Component } from 'react';
import "../../bootstrap/css/bootstrap.min.css"
import "../../styles/login.css"
import "../../styles/common.css"
import $ from '../../jquery'
// import bg from '../../res/web_pic1.jpg'
import Contact from '../contact'
import icon from '../../res/login.png'
import photo from '../../res/yakshagana.jpg'
import photo1 from '../../res/painting.jpg'
import photo2 from '../../res/crafts.jpg'
import photo3 from '../../res/bharathanatyam.jpg'
import photo4 from '../../res/choir.jpg'
import photo5 from '../../res/cookery.jpg'
import photo6 from '../../res/technology.jpg'

import { Button , Input ,Col , Row, Form ,FormGroup , Label} from 'reactstrap';

class Login extends Component
{
    constructor(props){
        super(props)
    }


    loginslideshow(){
        setInterval(function() { 
            $('#slideshow > div:first')
            .fadeOut(2000)
            .next()
            .fadeIn(4000)
            .end()
            .appendTo('#slideshow');
          }, 5000);
    }

    onLoginClick = () =>{
        $('.error-span').text('')
        let formData = {
            emailId : $('#email').val(),
            password : $('#password').val(),
        }
        if(formData.emailId === '' || formData.password === ''){
            $('.error-span').text("Enter your Email ID/password")
            if(formData.emailId === ''){
                $('#email').val('').focus()
            }else{
                $('#password').val('').focus()
            }
        }else{
            var type = $("[name='user-type']:checked").val()
            fetch('/authenticate',{
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({formData : formData, type : type})
            }).then(res => res.json()).then(result => {
                console.log(result)
                if(!result.authentication){
                    $('.error-span').text("Invalid credentials, Please try again")
                    $('#email').val('').focus()
                    $('#password').val('')
                }else{
                    document.cookie = 'currentUser='+formData.emailId
                    document.cookie = 'userType='+type
                    console.log("line 65:",document.cookie)
                    this.props.data.login(type,formData.emailId)
                }
            })
        }
    }


    render(){
        return (
            <div className="main">
                <div className="heading">
                    <span className='login-title-span'>
                    <h2 className='login-title'>waytoprove</h2>
                    <button className='register-button' value='Register' 
                    onClick={this.props.data.register}>Register</button>
                    </span>
                </div>
                    <div className='login-content'>

                    <div id="slideshow" onLoad={this.loginslideshow()}>
                        <div>
                                <img  className="photo6" src={photo6}/>
                         </div>
                        <div>
                             <img className="photo" src={photo}/>
                         </div>
                         
                         <div>
                                <img  className="photo2" src={photo2}/>
                         </div>
                         <div>
                                <img  className="photo3" src={photo3}/>
                         </div>
                         <div>
                                <img  className="photo4" src={photo4}/>
                         </div>
                        
                         <div>
                                <img  className="photo5" src={photo5}/>
                         </div>
                         <div>
                                <img  className="photo1" src={photo1}/>
                         </div>
                     </div>
                     <div className="login-discription">
                             <h4>Success is not final; failure is not fatal: It is the courage to continue that counts.</h4>
                        </div>
    
                            <form className='login-form'>
                            <div className='login-heading'>
                            <img  className="login-icon" src={icon}/>
                            {/* <h4>Login</h4> */}
                            <p>Login in to your account</p>
                            </div>
                               
                                     <div class="row">
                                            <div class="col-sm-12">
                                                <label for="email"> Email</label>
                                                 <Input type="email" className="email"   
                                                id="email" size='30' placeholder="Enter the email" required autoFocus></Input>
                                                </div>
                                        </div><br/>
    
                                       
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <label for="password"> Password</label>
                                                 <Input type="password" className="password"   
                                                id="password" size='30' placeholder="Enter the password" required ></Input>
                                                <span className='error-span' style={{color:'red'}}></span>
                                                </div>
                                        </div><br/>
    
                                    
                                I am a/an&nbsp;
                                <span className='login-radio-buttons'>
                                <input type='radio' name='user-type' value='users' 
                                id='user-radio' defaultChecked/>
                                <label for='user-radio'> &nbsp;User</label>    
                                </span> &nbsp;
                                <span className='login-radio-buttons'> 
                                <input type='radio' name='user-type' value='organisation' 
                                id='organizer-radio'/>
                                <label for='organizer-radio'> &nbsp;Organisation</label>
                                </span>
                            <br/><br/>
                            <Row form>
                            <Col >
                            <Button color="success"  type="button" 
                            className="login" id="login" 
                            value="Login" onClick={this.onLoginClick}>Login</Button>
                            </Col>
                            <Col >
                                <Button color="danger" type="reset" 
                                className="clear" id="clear" value="clear">Clear</Button><br/>
                            </Col>
                         </Row>
                               
                            </form>
                    </div>
                
                <Contact style={{ padding: '20px',  
                                    verticalAlign: 'bottom',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    height: '100%',
                                    width: '100%'}}/>
                </div>)
    }
}
export default Login