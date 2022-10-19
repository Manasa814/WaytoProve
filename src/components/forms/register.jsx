import React, { Component } from 'react';
import UserRegisterForm from './userregister.jsx'
import OrganiserRegisterForm from './organizeregister.jsx'
import Contact from '../contact'
import $ from '../../jquery'
import "../../bootstrap/css/bootstrap.min.css";
//import "../../styles/common.css"
import '../../styles/register.css'
import leftArrow from '../../res/left_arrow_white.png'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeForm : <UserRegisterForm/>,
        }
    }
    
    onBackClick = ()=>{
       this.props.data.goBack()
    }

    
    onRadioChange = (event) =>{
        var form;
        console.log('Hello', event.target.id)
        if(event.target.id === 'user'){
            form = <UserRegisterForm data={{goBack:this.onBackClick.bind(this)}}/>
            $('#user').attr('class','user-type-p-active')
            $('#organiser').attr('class','user-type-p')
        }else{
            form = <OrganiserRegisterForm data={{goBack:this.onBackClick.bind(this)}}/>
            $('#user').attr('class','user-type-p')
            $('#organiser').attr('class','user-type-p-active')
        }
        this.setState({
            activeForm : form
        }) 
    }
    render(){
        return(
            <div className='register-main'>
                <div className="registerform-heading">
                    <img src={leftArrow} className='left-arrow' onClick={this.onBackClick}/>
                    <span className='register-title-span'>
                    <h2 className='register-title'>waytoprove</h2>
                    </span>
                </div>
                <div className='content'>
                    <div className='register-radio-layout'>
                        <b>Register as a/an </b> &nbsp;
                        <div className='user-type'>
                            <p className='user-type-p-active' id='user'
                            onClick={(event)=>this.onRadioChange(event)}>User</p>
                            <p className='user-type-p' id='organiser'
                            onClick={(event)=>this.onRadioChange(event)}>Organisation</p>
                        </div>
                    </div>
                        {this.state.activeForm}
                </div>
                <Contact style={{ padding: '20px', 
                                marginTop: '20px', 
                                verticalAlign: 'bottom',
                                backgroundColor: 'black',
                                color: 'white',
                                height: '100%',
                                width: '100%'}}/>
            </div>
        );
    }
}
export default Register;