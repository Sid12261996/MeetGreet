import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Tabs from '../Tabs/Tabs';
import Sidebar from "../Sidebar/Sidebar";
import ProfilePic from '../Images/profile.jpg'; //Temporary
import './Profile.css';
import $ from 'jquery';
import userStore from "../../Store/stores/user-store";
import Helmet from 'react-helmet';

export default class Profile extends Component {

    componentDidMount(){
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
    };

    render() {
        console.log(this.props);
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
                            {/* PROFILE SCREEN LEFT PART */}
                        <div className="profileLeft">
                            <div className="userDetails">
                                <div className="userInfo">
                                    <div className="userProfile">
                                        {/* PROFILE PIC CIRCLE DIV */}
                                        <div className="solarProfile">
                                            <img id="profilePic" src={ProfilePic} alt="Profile"/>
                                            <div className="choose-propic" onClick={this.handleSubmit}>
                                                <i className="far fa-edit mainDP"></i>
                                                <form autoComplete="off" encType="multipart/form-data">
                                                    <input type="file" id="profileinputbutton" name="file" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user">
                                        <h1>{userData.Name}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="userData">
                                <div className="white">
                                    
                                </div>
                            </div>
                        </div>

                        {/* PROFILE SCREEN RIGHT PART*/}
                        <div className="profileRight">
                            <div className="statusHighLight">
                                <h3>My Life My Rules Hahaha...</h3>
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
