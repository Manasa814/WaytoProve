import React ,{ Component } from 'react';
import reactDOM from 'react-dom';
import "../../bootstrap/css/bootstrap.min.css";
import "../../styles/common.css"
import $ from '../../jquery.js'

import "../../styles/addevents.css"
import { Button , Input ,Col , Row, Form ,FormGroup , Label} from 'reactstrap';
import "../../styles/common.css";
import swal from 'sweetalert';


class AddEvent extends Component
{
    constructor(props){
        super(props)
        
        this.now = new Date()
        //console.log(this.now.getFullYear()+ '/' + (this.now.getMonth()+1) + '/' (this.now.getDate()+2))
        //this.minimumDate = 
    }

     
    onCheckGender() {
        if($(".gender").is(':checked')){
            console.log("Hello")
         $(".select-gender").attr('hidden',false)
         }else{
            $(".select-gender").attr('hidden',true)
        }
    }


        onCheckAge() {
            if($(".age").is(':checked')){
            $(".select-age").attr('hidden',false)
            }else{
            $(".select-age").attr('hidden',true)
            }
        }

        isEventNameValid(eventName){
            if(eventName === ''){
                $('#name-error').text("Enter the Event Name")
                $('#event-name').focus()
                return false
            }
            return true
        }

        isEventDescriptionValid( eventDescription){
            if( eventDescription === ''){
                $('#desc-error').text("Enter the Event Description")
                $('#event-desc').focus()
                return false
            }
            return true
        }

        isStartDateValid(eventStartDate){
            var now = new Date()
            var today = now.getFullYear()+'/'+ (now.getMonth()+1) + '/' + (now.getDate()+2)
            if( eventStartDate === ''){
                $('#startdate-error').text("Enter the event Start date")
                $('#start-time').focus()
                return false
            }
            // }else if((new Date(eventStartDate) - new Date(today)) < 0){
            //     $('#startdate-error').text("Scheduling must be done before two days")
            //     $('#start-time').focus()
            //     return false
            // }
            return true
        }

        isAgeValid(selectAge){
            
            //     if(selectAge === ''){
            //         $('#age-error').text("Enter your age")
            //         $('#age').focus()
            //         return false
            //     }
            //     if( selectAge < 5){
            //         $('#age-error').text("Sorry, age must be above 4 years")
            //         $('#age').focus()
            //         return false
                
            // }
            
            return true
        }
        

        isEndDateValid(eventEndDate){
            if( eventEndDate === ''){
                $('#enddate-error').text("Enter the final date to apply")
                $('#end-date').focus()
                return false
            }
            return true
        }

        isStartTimeValid(eventStartTime){
            if( eventStartTime === ''){
                $('#starttime-error').text("Enter the event Start time")
                $('#start-time').focus()
                return false
            }
            return true
        }

        isEndTimeValid(eventEndTime){
            if( eventEndTime === ''){
                $('#endtime-error').text("Enter the Event end time")
                $('#end-time').focus()
                return false
            }
            return true
        }

        isVenueValid(eventVenue){
            if( eventVenue === ''){
                $('#eventvenue-error').text("Enter the Event Venue")
                $('#venue').focus()
                return false
            }
            return true
        }


        
            onEventFormSubmit = () =>{

            $('.error-span').text("")
           
           let formData = {
                   eventName : $('#event-name').val(),
                   eventDescription : $("#event-desc").val(),
                   eventStartDate: $("#start-date").val(),
                   eventLastDate: $("#final-date").val(),
                   eventStartTime: $("#start-time").val(),
                   eventEndTime: $("#end-time").val(),
                   eventCategory : $("#category").val(),
                   eventVenue :$("#venue").val(),
                   eventHost : this.props.data,
                   applicants : [],
                   eventResults : [],
                   eventStatus : 'Scheduled'
                } 
                 // var selectGender = $(".gender").is(':checked')
                  var isEventNameValid = this.isEventNameValid(formData.eventName)
                  var isEventDescriptionValid=this.isEventDescriptionValid(formData. eventDescription)
                  var eventCategory= $("#category").val()
                  var isStartDateValid=this.isStartDateValid(formData.eventStartDate)
                  var isEndDateValid=this.isEndDateValid(formData.eventEndDate)
                  var isStartTimeValid=this.isStartTimeValid(formData.eventStartTime)
                  var isEndTimeValid=this.isEndTimeValid(formData.eventEndTime)
                  var isVenueValid=this.isVenueValid(formData.eventVenue)
                  

                   if(isEventNameValid && isEventDescriptionValid &&
                     eventCategory && isStartDateValid && isEndTimeValid &&
                     isEndDateValid && isStartTimeValid && isVenueValid)
                   {
                        fetch('/addevents',{
                             method: "POST",
                                headers: {
                                'Content-Type': 'application/json'
                        },
                            body: JSON.stringify(formData)})
                            .then(res => res.json())
                            .then(() => {
                                $('#register').prop('disabled',false)
                                swal("", "You added the event successfully", "success")
                                .then((value)=>{
                               // this.props.data.goBack()
                                    $('#register-addevent').prop('disabled',false)
            
                                     $('#register-addevent').prop('disabled',false)
                            })  
                         })   
                   }
                  
         }


    componentDidMount(){

        // console.log('hello prashanth')
        // let today = new Date(),
        // day = today.getDate(),
        // month = today.getMonth()+1, //January is 0
        // year = today.getFullYear();
        //     today = year+'-'+month+'-'+(day+2);
        //     $('#start-date').attr('min',today)
    }
    setMinDate(){
       
    }

    render(){
        return (<div className="addevent-main">
            
    
             <div className="addEvent-content">  
                    <div className="addEvent-heading">
                        <center><h4>CREATE A NEW EVENT</h4></center>
                    </div>
                    <Form action="" >
                        <div class="container">        
                            <div class="row">
                                <div class="col-sm-6">
			                         <label for="event-name">Enter Name*</label>
			                         <Input type="text" className="event-name"   
                                     id="event-name" placeholder="Enter event name" required></Input>
                                     <span className="error-span" style={{color:'red'}} id='name-error'></span>
                                </div>
                            </div><br/>
                                 
                            <div class="row">
                                <div class="col-sm-6">
			                         <label for="event-desc">Enter Description*</label>
			                         <Input type="textarea" className="event-desc"   
                                     id="event-desc" placeholder="Enter the description" minLength="20" maxLength="200" required></Input>
                                      <h6>Description sholud contain minimum of 20 and maximum of 200 characters </h6>
                                      <span className="error-span" style={{color:'red'}} id='desc-error'></span> 
                                </div>
                            </div><br/>
                            <FormGroup>
                            <div class="row">
                                <div class="col-sm-6">
                                 <Label for="category">Category</Label>
                                    <Input type="select" name="category" id="category">
                                     <option>Sports</option>
                                     <option>Music</option>
                                     <option>Cookery</option>
                                     <option>Dance</option>
                                     <option>Art and crafts</option>
                                     <option>Technology</option>
                                     <option>Literature</option>
                                     <option>Others</option>

                                    </Input>
                                    
                                    </div>
                            </div><br/>
                            </FormGroup>

                            <div class="row">
                                <div class="col-sm-6">
			                         <label for="start-date">Event Date*</label>
			                         <Input type="date" className="start-date" 
                                     id="start-date" placeholder="Enter event date" required></Input>
                                      <span className="error-span" style={{color:'red'}} id='startdate-error'></span>
                                </div>
                            </div><br/>

                            <div class="row">
                                <div class="col-sm-6">
			                         <label for="final-date">Final date to apply*</label>
			                         <Input type="date" className="final-date"   
                                     id="final-date"  placeholder="Enter the final date to apply" required></Input>
                                      <span className="error-span" style={{color:'red'}} id='enddate-error'></span>
                                </div>
                            </div><br/>

                            

                            <div class="row">
                                <div class="col-sm-6">
			                         <label for="start-time">Event Start Time*</label>
			                         <Input type="time" className="start-time"   
                                     id="start-time" placeholder="Enter event start time" required></Input>
                                      <span className="error-span" style={{color:'red'}} id='starttime-error'></span>
                                </div>
                            </div><br/>

                            <div class="row">
                                <div class="col-sm-6">
			                         <label for="end-time">Event End Time*</label>
			                         <Input type="time" className="end-time"   
                                     id="end-time" placeholder="Enter event end time" required></Input>
                                      <span className="error-span" style={{color:'red'}} id='endtime-error'></span>
                                </div>
                            </div><br/>

                            <div class="row">
                                <div class="col-sm-6">
			                         <label for="venue">Event Venue*</label>
			                         <Input type="text-area" className="venue"   
                                     id="venue" placeholder="Enter event the venue" required></Input>
                                      <span className="error-span" style={{color:'red'}} id='eventvenue-error'></span>
                                </div>
                            </div><br/>

                            <div className="register-buttons-addevent">
                                 <Row form>
                                    <Col md={4}>
                                        <Button color="success" type='button'
                                         className="register-addevent" id="register-addevent" 
                                        value="register-addevent" onClick= {() => this.onEventFormSubmit()}>Add Event</Button>
                                    </Col>
                                <Col md={8}>
                                <Button color="danger" type="reset" 
                                className="reset-addevent" id="reset-addevent" value="reset-addevent" onClick={$(".error-span").text("")}>Clear</Button><br/>
                                    </Col>
                                 </Row>
                            </div>
                       
                            
                    </div>
                 </Form>
                 
                 </div>
                
            </div>
         
        );
        }
}

export default AddEvent