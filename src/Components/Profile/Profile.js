import React, { Component } from 'react';
import Tabs from '../Tabs/Tabs';
import Sidebar from "../Sidebar/Sidebar";
import ProfilePic from '../Images/profile.jpg';
import './Profile.css';
import Helmet from 'react-helmet';
import $ from 'jquery';

export default class Profile extends Component {
    componentDidMount(){
        this.handleFix(120,40);
    }

    handleSubmit = () => {
        document.getElementById('profileinputbutton').click();
    }

    handleFix = (a,b) => {
        var elmnt = document.getElementById('moveSquare');
        elmnt.style.top = a + "px";
        elmnt.style.left = b + "px";
    }

    handleMove = () => {
        var elmnt = document.getElementById('moveSquare');
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
        return (
            <div>
                {/* SCREEN TITLE */}
                <Helmet>
                    <title>Profile</title>
                </Helmet>

                {/* PROFILE SCREEN */}
                <div className="profile">
                    <div className="profileContent">
                        <div className="profileContainer">
                            <div className="solarProfile">
                                <img id="profilePic" src={ProfilePic} alt="Profile"/>
                                <div className="choose-propic" onClick={this.handleSubmit}>
                                    <i class="fas fa-edit"></i>
                                    <form autoComplete="off" encType="multipart/form-data">
                                        <input type="file" id="profileinputbutton" name="file" />
                                    </form>
                                </div>
                            </div>
                            <div id="moveSquare" onMouseDown={()=>{this.handleMove()}}></div>
                                <a className="js-scroll-trigger smallSquare" href="#showData"></a>
                            <div class="dropdown mediumSquareButton">
                                <div className="mediumSquare" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></div>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <div className="showProfileData" id="showData"><h1>Some Data</h1></div>
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
