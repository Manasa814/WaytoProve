import React, { Component } from 'react';
import "../../styles/common.css"
import "../../styles/userregister.css"
import "../../bootstrap/css/bootstrap.min.css";
import Contact from '../contact'
import leftArrow from '../../res/left_arrow_white.png'
import photo from '../../res/profile.png'
import { Button , Input ,Col , Row, Form ,FormGroup , Label} from 'reactstrap';

class EditProfile extends Component {
    render() {
        return (
                <div className="editprofile-main">
                    <div className="editprofile-heading">
                        <img src={leftArrow} className='left-arrow' onClick={this.onBackClick}/>
                        <span className='register-title-span'>
                        <h2 className='register-title'>waytoprove</h2>
                        </span>
                </div>
                    
                <div className="editprofile-content">
                <div className="editprofile-heading">
                    <center><h4>Edit Profile</h4></center>
                </div>

                {/* <div className="profile-form"> */}
                    <Form action="">

                    <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="name">Name *</label>
                            <Input type="text" className="name" id="name" placeholder="Enter your name" required autoFocus></Input>
                        </div>
                    </div>
                </div><br />

                    {/* <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="age">Age*</label>
                                <Input type="no" className="age" id="age" placeholder="Enter your age"></Input>
                            </div>
                        </div>
                    </div><br /> */}

                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                    <label for="gender">Gender:</label>&nbsp;
                    <input type="radio" className="male" 
                    id="male" name='gender' value='male'/>&nbsp;
                    <label for="male">Male</label>&nbsp; &nbsp;
                    <input type="radio" className="female" 
                    id="female" name='gender' value='female'/>&nbsp;
                    <label for="female">Female</label>&nbsp; &nbsp;
                    <input type="radio" className="others" 
                    id="others" name='gender' value='others'/>&nbsp; 
                    <label for="others">Others</label><br/> 
                    </div>
                    </div>
                    </div><br />

                    {/* <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
			            <label for="email">Email *</label>
			             <Input type="email" className="email"    
                         id="email" placeholder="Enter the email ID" required ></Input>
                         </div>
                         </div>
                         </div><br /> */}

                    <div class="container">
                         <div class="row">
                            <div class="col-sm-6">
			            <label for="phone">Phone Number *</label>
			             <Input type="number" className="phone"    
                         id="phone" placeholder="Enter the phone number"></Input>
                         <span className='error-span' style={{color:'red'}} id='phone-error'></span>
                         </div>
                         </div>
                         </div><br />

                         <div class="container">
                        <div className="register-buttons">
                        <Row form>
                        <Col md={4}>
                        <Button color="success"  type="button" 
                        className="register-btn" id="register" 
                        value="register" >Register</Button>
                        </Col>
                        <Col md={8}>
                            <Button color="danger" type="reset"
                            className="reset-btn" id="reset" value="reset">Clear</Button><br/>
                        </Col>
                        </Row>
                        </div>
                        </div>
                       
                    </Form>

                    </div>
                    <Contact style={{ padding: '20px', 
                    marginTop: '20px', 
                    verticalAlign: 'bottom',
                    backgroundColor: 'black',
                    color: 'white',
                    height: '100%',
                    width: '100%'}}/>

            </div>
        )
    }
}

export default EditProfile;