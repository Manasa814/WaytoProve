import React, { Component } from "react";
// import Calendar from 'react-calendar';
import nocontent from '../../res/nocontent.png'
import MyEventList from './myeventlisting'
import leftArrow from '../../res/backblack.png'
import $  from '../../jquery'

class SavedEvents extends Component{
    constructor(props){
        super(props)
        console.log(props)
       this.state = {
           data : props.data
       }
    }

    componentDidMount(){
        $('saved-events').focus()
    }

    noContentFound(){
        return <div className='saved-event-content'>
             <div style={{display : "flex", alignItems:'center',textAlign:'center' ,verticalAlign : 'center'}}>
                        <img src={leftArrow} width='30px' height='30px' 
                        style={{margin : '20px',cursor : 'pointer'}} onClick={() => this.props.goBack('profile')}/>
                        <h2 style={{margin:'20px'}}>Saved Events</h2>
                    </div>
                    <hr width='100%'/>
        <center><img className='nocontent-img' src={nocontent}/></center>
        <center><p>Sorry, you have not current events</p></center>
        </div>
    }

    render(){
        console.log(this.state.data)
        if(this.state.data.length == 0)
                return this.noContentFound()
        else
                return(<div id='saved-events' style={{height : '100vh'}}>
                    <div style={{display : "flex", alignItems:'center',textAlign:'center' ,verticalAlign : 'center'}}>
                        <img src={leftArrow} width='30px' height='30px' 
                        style={{margin : '20px',cursor : 'pointer'}} onClick={() => this.props.goBack('profile')}/>
                        <h2 style={{margin:'20px'}}>Saved Events</h2>
                    </div>
                    
                    <hr width='100%'/>
                    {this.state.data.map(event => {
                        return <MyEventList data={event}/>
                    })}
                </div>)
    }
}
export default SavedEvents