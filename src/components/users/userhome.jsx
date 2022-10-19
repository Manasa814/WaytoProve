import React, { Component } from "react";
import UserListings from './listings'
import "../../styles/userhome.css"
import "../../bootstrap/css/bootstrap.min.css"
import searchicon from '../../res/search.png'
import nocontent from '../../res/sorrysademoji.png'
import '../../styles/organisationhome.css'
import Listings from "./listings";

class Home extends Component{

   constructor(props){
       super(props)
        this.state = {
            value : [],
            profileData :'',
            content : <div></div>,
            eventsData : []
        }
        console.log('19')
        fetch('/geteventdata',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailId : this.props.data})
            })
            .then(res => res.json())
            .then(value => {
                console.log(value)
                this.pushToClass(value)
        })
    }
    componentWillMount(){
        fetch('/geteventdata',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailId : this.props.data,result : ''})
            })
            .then(res => res.json())
            .then(value => {
                console.log(value)
                this.pushToClass(value)
        })
    }

      
    pushToClass = (value) => {
        console.log(value)
        var obj
        console.log(value.eventsData.length)
        if(value.eventsData.length == 0){
            obj = {value : value.eventsData,
                profileData : value.profileData,
                 content : this.noContentFound()}
        } 
        else
            obj = {value : value.eventsData,
                    profileData : value.profileData,
                 content : this.contentFound()}
        this.setState(obj)
        console.log(obj)
        //this.dataFromDb = obj
    }

    contentFound = () =>{
        console.log(this.state.value)
        return(<div className='user-home' >
            
                <h2 style={{margin:'20px'}}>Home</h2>
            <hr width='100%'/>
            {this.state.value.map((eventsData) =>{
                    if(eventsData!=null)
                        if(this.state.profileData.appliedEvents
                            .indexOf(eventsData._id) < 0 && eventsData.eventStatus != 'Cancelled')
                            return (<Listings data={{eventsData,profileData : this.state.profileData}}/>)
            })}
        </div>)
    }

    noContentFound = () =>{
        return <div className='home-content'>
        <center><img className='nocontent-img' src={nocontent}/></center><br/><br/>
        <center><p><b>Sorry, no events match your interests :(</b></p></center>
        </div>
    }

    render(){
        return this.state.content
    }
}
export default Home