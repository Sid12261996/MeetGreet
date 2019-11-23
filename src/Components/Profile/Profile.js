import React, { Component } from 'react';
import Tabs from '../Tabs/Tabs';
import Sidebar from "../Sidebar/Sidebar";
import ProfilePic from '../Images/profile.jpg';
import './Profile.css';
import Helmet from 'react-helmet';

export default class Profile extends Component {
    handleSubmit = () => {
        document.getElementById('profileinputbutton').click();
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
                        </div>
                        <div className="showProfileData"></div>
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
