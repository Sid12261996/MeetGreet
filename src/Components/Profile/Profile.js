import React, { Component } from 'react';
import Tabs from '../Tabs/Tabs';
import Sidebar from "../Sidebar/Sidebar";
import AlbumPic from '../Images/AlbumDummy.png'; //Temporary
import './Profile.css';
import $ from 'jquery';
import userStore from "../../Store/stores/user-store";
import Helmet from 'react-helmet';
import env from "../../environment";
import ImageService from "../../services/image-service";

export default class Profile extends Component {

    componentDidMount(){
        const URL = `${env.ImageBaseUrl}`;
        this.setState({
            ...this.state,
            ProfilePic: URL
        });
    }

    constructor(props){
        super(props);
        this.state = {
            ProfilePic: "",
            BackPic: "",
            ImageUpload: ''
        }
    }

    //Profile Input Initialize
    handleSubmit = () => {
        document.getElementById('profileinputbutton').click();
    };

    // handlePicSubmit = () => {
    //
    // };

    // Profile Pic Update
    onChange = (e) => {
        alert("This feature is unavailable");
    };

    //Function Not Available
    handleNotAvailable = () => {
        alert('This feature is currently unavailable.');
    };

    render() {
        let userData = userStore.getState().root.user;      //GETTING USER DETAILS
        console.log(userData);
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
                                            <img id="profilePic" src={`${this.state.ProfilePic}images/${userData.ImageUrl}`} alt="Profile"/>
                                            <form autoComplete="off" encType="multipart/form-data" onSubmit={this.handlePicSubmit} id="DPForm">
                                            <div className="choose-propic" onClick={this.handleSubmit}>
                                                <i className="far fa-edit mainDP"></i>
                                                    <input type="file" id="profileinputbutton" name="file" onChange={(e)=>{this.onChange(e)}} />
                                            </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="user">
                                        <div className="userData">
                                            <h1>{userData.Name}</h1>
                                            <h5>Profession</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="userContent">
                                <div className="contentBox">
                                    <div className="contentBox2">
                                        <div className="contentLeft">
                                            <div className="contentLeftHeading"><h5>About</h5></div>
                                            <div className="contentLeftData"></div>
                                        </div>
                                        <div className="contentRight">
                                            <div className="Right1">
                                                <div className="contentRightPhotos"><h5>Photos</h5></div>
                                                <div className="contentRightPData">
                                                    <div className="album"><img src={AlbumPic} alt="AlbumPic"/></div>
                                                    <div className="album"><img src={AlbumPic} alt="AlbumPic"/></div>
                                                    <div className="album"><img src={AlbumPic} alt="AlbumPic"/></div>
                                                    <div className="album"><img src={AlbumPic} alt="AlbumPic"/></div>
                                                    <div className="album"><img src={AlbumPic} alt="AlbumPic"/></div>
                                                </div>
                                            </div>
                                            <div className="Right2">
                                                <div className="contentRightVideos"><h5>Videos</h5></div>
                                                <div className="contentRightVData">
                                                    <div className="album"><img src={AlbumPic} alt="AlbumPic"/></div>
                                                    <div className="album"><img src={AlbumPic} alt="AlbumPic"/></div>
                                                    <div className="album"><img src={AlbumPic} alt="AlbumPic"/></div>
                                                    <div className="album"><img src={AlbumPic} alt="AlbumPic"/></div>
                                                    <div className="album"><img src={AlbumPic} alt="AlbumPic"/></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="contentEnd">
                                            <div className="contentPlus1">
                                                <i className="fas fa-plus" onClick={this.handleNotAvailable}></i>
                                            </div>
                                            <div className="contentPlus2">
                                                <i className="fas fa-plus" onClick={this.handleNotAvailable}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROFILE SCREEN RIGHT PART*/}
                        <div className="profileRight">
                            <div className="coverPic">
                                <div className="statusHighLight" onClick={this.handleNotAvailable}>
                                    <h3>My Life My Rules Hahaha...</h3>
                                </div>
                            </div>
                            <div className="Feeds">
                                <h1>Your Feeds</h1>
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
