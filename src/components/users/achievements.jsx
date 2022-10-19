import React, { Component } from "react";
// import Calendar from 'react-calendar';
import nocontent from '../../res/nocontent.png'
import MyAchievementsList from './myachievementslistings'
import leftArrow from '../../res/backblack.png'
import $  from '../../jquery'
import goldmedal from '../../res/goldmedal.png'
import silvermedal from '../../res/silvermedal.png'
import bronzemedal from '../../res/bronzemedal.png'



class Achievements extends Component{
    constructor(props){
        super(props)
        console.log(props)
       this.state = {
           data : []
       }
        fetch('/getmyeventsdata/achievementsdata',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({emailId : this.props.data.emailId})
        }).then(res => res.json())
        .then(value => {
            console.log(this.state.data)
            this.setState({data : value})
        })
    }

    componentDidMount(){
        $('saved-events').focus()
        fetch('/getmyeventsdata/achievementsdata',{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({emailId : this.props.data.emailId})
            }).then(res => res.json())
            .then(value => {
                console.log(this.state.data)
                this.setState({data : value})
            })
    }

    noContentFound(){
        return <div className='saved-event-content'>
             <div style={{display : "flex", alignItems:'center',textAlign:'center' ,verticalAlign : 'center'}}>
                        <img src={leftArrow} width='30px' height='30px' 
                        style={{margin : '20px',cursor : 'pointer'}} onClick={() => this.props.goBack('profile')}/>
                        <h2 style={{margin:'20px'}}>Achievements</h2>
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
                    <div style={{display : "flex", alignItems:'center',textAlign:'center' 
                    ,verticalAlign : 'center'}}>
                        <img src={leftArrow} width='30px' height='30px' 
                        style={{margin : '20px',cursor : 'pointer'}} 
                        onClick={() => this.props.goBack('profile')}/>
                        <h2 style={{margin:'20px'}}>Achievements</h2>
                    </div>
                    
                    <hr width='100%'/>
                    {this.state.data.map(event => {
                        return <MyAchievementsList data={event} emailId={this.props.data.emailId} />
                    })}
                </div>)
    }
}
export default Achievements
