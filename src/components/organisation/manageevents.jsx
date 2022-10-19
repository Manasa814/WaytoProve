import React, { Component } from "react";
import "../../styles/common.css";
import '../../styles/organisationhome.css'
import '../../styles/myevents.css'
import $ from '../../jquery.js'
import {confirmAlert} from 'react-confirm-alert'
import '../../styles/alert-dialog.css'
import leftArrow from '../../res/backblack.png'
import { Button , Input ,Col , Row, Form ,FormGroup , Label} from 'reactstrap';

class ManageEvents extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        let list
        list += "<option value=' None'>None</option>"
        let applicants = this.props.data.applicants 
        for(let i=0;i<applicants.length;i++)
            list+="<option value='"+ applicants[i] + "'>" + applicants[i] +"</option>"
        $('#first').html(list)
        $('#second').html(list)
        $('#third').html(list)
        $('#startdate').val(this.props.data.eventStartDate)
        $('#enddate').val(this.props.data.eventLastDate)
        $('#starttime').val(this.props.data.eventStartTime)
        $('#endtime').val(this.props.data.eventEndTime)
    }

    updateEvent = (data) =>{
        console.log(this.props.data._id,data)
        fetch('/events/update',{
            method : 'POST',
            header : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id : this.props.data._id, data : data})
        }).then(res => res.json())
        .then(() => {
                this.props.goBack('home')
        })
    }

    cancelEvent = () =>{
        console.log(this.props.data._id)
        fetch('/events/cancelevent',{
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id : this.props.data._id})})
    }

    addResult = (data) =>{
        console.log(this.props.data._id)
        fetch('/events/addresult',{
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id : this.props.data._id,result : data})})
            .then(res => res.json())
        .then(() => {
                this.props.goBack('home')
        })
    }

    onAddResultClick = () =>{
        var formData = [
            $('#first').val(),
            $('#second').val(),
            $('#third').val()]
        
        confirmAlert({
            customUI: ({onClose}) => {
                return<div id='alert-dialog'>
                            <h5><b>Publish the results? The event will be considered as completed</b></h5>
                            <div id='alert-buttons'>
                            <button className='dialog-confirm-button'
                             onClick = {() => {
                                    this.addResult(formData)
                                    onClose();
                                 }}>Confirm
                            </button>
                            <button className='dialog-cancel-button'
                            onClick={onClose}>Cancel</button>
                            </div>
                        </div>
            }
        })
    }

    onUpdateClick = () =>{
        var formData = {
            eventStartDate : $('#startdate').val(),
            eventLastDate  : $('#enddate').val(),
            eventStartTime :$('#starttime').val(),
            eventEndTime   : $('#endtime').val(),
        }
        confirmAlert({
            customUI: ({onClose}) => {
                return<div id='alert-dialog'>
                            <h5><b>Update any changes?</b></h5>
                            <div id='alert-buttons'>
                            <button className='dialog-confirm-button'
                             onClick = {() => {
                                    this.updateEvent(formData)
                                    onClose();
                                 }}>Confirm
                            </button>
                            <button className='dialog-cancel-button'
                            onClick={onClose}>Cancel</button>
                            </div>
                        </div>
            }
        })
    }

    onCancelClick = () =>{
        confirmAlert({
            customUI: ({onClose}) => {
                return<div id='alert-dialog'>
                            <h5><b>Are you sure that you want to cancel this event?</b></h5>
                            <div id='alert-buttons'>
                            <button className='dialog-confirm-button'
                             onClick = {() => {
                                    this.cancelEvent()
                                    onClose();
                                 }}>Confirm
                            </button>
                            <button className='dialog-cancel-button'
                            onClick={onClose}>Cancel</button>
                            </div>
                        </div>
            }
        })
    }

    

    render(){
        return(
                    <div id='current-events' style={{height : '100vh',width:'100vw'}}>
                    <div style={{display : "flex", alignItems:'center',textAlign:'center' ,verticalAlign : 'center'}}>
                        <img src={leftArrow} width='30px' height='30px' 
                        style={{margin : '20px',cursor : 'pointer'}} 
                        onClick={() => this.props.goBack('home')}/>
                        <h2 style={{margin:'20px'}}>Manage Events</h2>
                        <hr style={{width : '100px'}}></hr>
                         </div>

                         <br/>
                <div className="manageEvent-content1">
                <h5>Cancel Event:</h5>&nbsp; &nbsp; &nbsp;
                        <Button color="warning" type='button'
                           className="cancel-btn" id="cancel" style={{width : '200px'}}
                                value="cancel" onClick={() => this.onCancelClick()} >Cancel</Button>
                         </div>
                     <br/><br/>

                <div className="manageEvent-content">
                            <h5>Update Event Schedule</h5><br/>
                    
                      <div className="container">
                            <div class="row">
                            <div class="col-sm-6">
                            <label for="startdate">Start date: </label>
                            <Input type="date" className="startdate" id="startdate"></Input>
                            </div>
                        </div>
                        </div><br />

                         <div className="container">
                            <div class="row">
                                 <div class="col-sm-6">
                                    <label for="enddate">End Date: </label>
                                <Input type="date" className="enddate" id="enddate"></Input>
                             </div>
                            </div>
                        </div><br />

                     <div className="container">
                            <div class="row">
                                 <div class="col-sm-6">
                                     <label for="starttime">Start Time: </label>
                                     <Input type="time" className="starttime" id="starttime"></Input>
                                 </div>
                             </div>
                    </div><br />

            <div className="container">
                <div class="row">
                    <div class="col-sm-6">
                    <label for="endtime">End Time:</label>
                    <Input type="time" className="endtime" id="endtime"></Input>
            </div>
            </div>
            </div>
                
             <div class="container">   
            <div className="register-buttons">
                     <Row form>

                        <Col md={4}>
                        <Button color="success" type='button'
                        onClick={() =>this.onUpdateClick()}
                        className="register-btn" id="update-btn" 
                        value="register" >Update</Button>
                        </Col>
                        <Col md={8}>
                            <Button color="danger" type="reset" onClick={$(".error-span").text("")}
                            className="reset-btn" id="reset" value="reset">Clear</Button><br/>
                        </Col>
                     </Row>
                     </div>
                   </div>  
                    
            </div>
            <br/>
            <br/>
            



            <div className="manageEvent-content">
                        <h5>Publish Result</h5><br/>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <label for="results">Winner</label>
                        <Input type="select" name="results" id="first"></Input>
                        
                        <label for="results">First Runner Up</label>
                        <Input type="select" name="results" id="second"></Input>
                        <option value=""></option>
                        <label for="results">Second Runner Up</label>
                        <Input type="select" name="results" id="third"></Input>

                        <div className="register-buttons">
                     <Row form>

                        <Col md={4}>
                        <Button color="success" type='button'
                        onClick={() => this.onAddResultClick()}
                        className="register-btn" id="update" 
                        value="register" >Update</Button>
                        </Col>
                        <Col md={8}>
                            <Button color="danger" type="reset" onClick={$(".error-span").text("")}
                            className="reset-btn" id="reset" value="reset">Clear</Button><br/>
                        </Col>
                     </Row>
                     </div>


                    </div>
                </div>
                </div>
                <br/>
               </div>
            </div>
        )
    }
}
export default ManageEvents
