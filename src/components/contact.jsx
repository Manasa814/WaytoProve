//Author: Prashanth S
import React, { Component } from "react";
import "../styles/contact.css"
import facebook from "../res/facebook.png"
import twitter from "../res/twitter.png"
import instagram from "../res/instagram.png"
class Contact extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var onSocialHandleClick = (content) => { 
            switch(content){
                case 'facebook':
                    window.open("https://www.facebook.com")
                    break;
                case 'twitter':
                    window.open("https://www.twitter.com")
                    break;
                case 'instagram':
                    window.open("https://www.instagram.com")
                    break;
            }
        }
        return(<div style={this.props.style}>
            <h4>Contact us</h4>
            <span className='socialhandles'>
                <img src={facebook} className='images' onClick={()=>onSocialHandleClick('facebook')}/> 
                <img src={instagram} className='images' onClick={()=>onSocialHandleClick('instagram')}/> 
                <img src={twitter} className='images' onClick={()=>onSocialHandleClick('twitter')}/> 
            </span><br/><br/>
            <h5 style={{display:'flex'}}>Mail:<a style={{padding:'0',marginLeft:'5px'}} href='mailto:waytoprove@gmail.com'>waytoprove@gmail.com</a></h5>
        </div>)
    }
}
export default Contact