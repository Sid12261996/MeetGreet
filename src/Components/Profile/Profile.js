import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Tabs from '../Tabs/Tabs';
import Sidebar from "../Sidebar/Sidebar";
import ProfilePic from '../Images/profile.jpg'; //Temporary
import './Profile.css';
import userStore from "../../Store/stores/user-store";
import Helmet from 'react-helmet';

export default class Profile extends Component {

    componentDidMount(){
        this.handleFix(2,1);
    }

    constructor(props){
        super(props);
        this.state = {
            ProfilePic: "",
            BackPic: ""
        }
    }

    //Profile Input Initialize
    handleSubmit = () => {
        document.getElementById('profileinputbutton').click();
    }

    //Button fixing positions on Load
    handleFix = (a,b) => {
        var elmnt = document.getElementById('bigCircle');
        elmnt.style.top = a + "%";
        elmnt.style.left = b + "%";
    }

    //Moving buttons function
    handleMove = () => {
        var elmnt = document.getElementById('bigCircle');
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        dragMouseDown();

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            if(elmnt.offsetTop - pos2 > 0 && elmnt.offsetLeft - pos1 > 0){
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
            else if(elmnt.offsetTop - pos2 < 0 && elmnt.offsetLeft - pos1 < 0) {
                elmnt.style.top = 0 + "px";
                elmnt.style.left = 0 + "px";
            }
            else if(elmnt.offsetTop - pos2 < 0 && elmnt.offsetLeft - pos1 > 0) {
                elmnt.style.top = 0 + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
            else if(elmnt.offsetTop - pos2 > 0 && elmnt.offsetLeft - pos1 < 0) {
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = 0 + "px";
            }
          }
        
          function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
          }

    }

    render() {
        let userData = userStore.getState().root.user;      //GETTING USER DETAILS
        return (
            <div>
                {/* SCREEN TITLE */}
                <Helmet>
                    <title>Profile</title>
                </Helmet>

                {/* PROFILE SCREEN */}
                <div className="profile">   {/* PROFILE DIV 100% WIDTH */}
                    <div className="profileContent">    {/* INSIDE DIV WITH 100% - 100px WIDTH */}
                            {/* PROFILE PIC CIRCLE DIV */}
                            <div className="solarProfile">
                                <img id="profilePic" src={ProfilePic} alt="Profile"/>
                                <div className="choose-propic" onClick={this.handleSubmit}>
                                    <i className="fas fa-edit"></i>
                                    <form autoComplete="off" encType="multipart/form-data">
                                        <input type="file" id="profileinputbutton" name="file" />
                                    </form>
                                </div>
                            </div>

                            {/* PROFILE SCREEN LEFT PART */}
                        <div className="profileContainer">
                            <div id="bigCircle" >
                                <div className="dropdown mediumCircleButton">
                                    <div className="mediumSquare" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></div>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link className="dropdown-item" to="#">Choose Cover</Link>
                                        <Link className="dropdown-item" to="#">Block</Link>
                                        <Link className="dropdown-item" to="#">Report</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROFILE SCREEN RIGHT PART*/}
                        <div className="profileDetails">
                            <div className="profileBox">
                                <h1>{userData.Name}</h1>
                            </div>
                        </div>
                    </div>
                    {/* SIDEBAR */}
                    <Sidebar />
                </div>
                {/* TABSBAR */}
                <Tabs />
            </div>
        )
    }
}
