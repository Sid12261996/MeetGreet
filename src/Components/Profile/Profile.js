import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Tabs from '../Tabs/Tabs';
import Sidebar from "../Sidebar/Sidebar";
import ProfilePic from '../Images/profile.jpg'; //Temporary
import './Profile.css';
import {Route, Switch, BrowserRouter, NavLink } from 'react-router-dom';
import $ from 'jquery';
import userStore from "../../Store/stores/user-store";
import Helmet from 'react-helmet';
import Album from './Components/Album/Album';
import Friends from './Components/Friends/Friends';
import About from './Components/About/About';
import NotFound from "../404/NotFound";

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

    handleStatus = () => {
        $('.fa-edit').css({'box-shadow':'inset -3px -3px 7px rgba(255,255,255,0.8),inset 3px 3px 5px rgba(94, 104, 121, 0.288)','color': 'black'});
        $('.profileBox3').css({'height':'60%', 'transition':'.5s'});
        $('.profileBox2').css({'display':'flex', 'height':'20%' , 'transition':'.5s'});
        $('.StatusEdt').css({'visibility':'visible', 'transition-delay':'.4s'});
        $('.TwoBox').css({'height':'90%' , 'transition':'.5s'});
        $('.AlbumBox').css({'height':'0%' , 'transition':'.5s'});
        $('.AlbumHeading, .AlbumContent').css({'visibility':'hidden', 'transition-delay':'.0s'});
    };

    handleCrossStatus = () => {
        $('.fa-edit').css({'box-shadow':'none','color': '#3f3f3f'});
        $('.profileBox3').css({'height':'80%', 'transition':'.5s'});
        $('.profileBox2').css({'height':'0%' , 'transition':'.5s'});
        $('.StatusEdt').css({'visibility':'hidden', 'transition-delay':'.0s'});
        $('.TwoBox').css({'height':'60%' , 'transition':'.5s'});
        $('.AlbumBox').css({'height':'30%' , 'transition':'.5s'});
        $('.AlbumHeading, .AlbumContent').css({'visibility':'visible', 'transition-delay':'.4s'});
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
                                <div className="profileBox1">
                                    <div className="Name">
                                        <h1>{userData.Name}</h1>
                                    </div>
                                    <div className="Status">
                                        <div className="StatusText">
                                            <div className="StatusTextBox">
                                                <h6>This space is for status only.</h6>
                                            </div>
                                            <div className="StatusEditBtn">
                                                <i className="far fa-edit" onClick={this.handleStatus}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profileBox2">
                                    <div className="StatusEdt">
                                        <div className="StatusHeading">
                                            <h5>Status</h5>
                                            <i className="fas fa-times" onClick={this.handleCrossStatus}></i>
                                        </div>
                                        <div className="StatusInput">
                                            <div className="StatusBox">
                                                <textarea name=""status cols="30" rows="2" maxLength="50" contentEditable="true"></textarea>
                                            </div>
                                            <div className="StatusButton">
                                                <button className="StatusBtn">Done</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profileBox3">
                                    <div className="TwoBox">
                                        <div className="TwoBoxHeading">
                                            <div className="AboutHeading">
                                                <h5>About</h5>
                                            </div>
                                            <div className="FriendsHeading">
                                                <h5>Friends</h5>
                                            </div>
                                        </div>
                                        <div className="TwoBoxContent">
                                            <div className="AboutContent">
                                                <ul>
                                                    <li><h6>3 July 2020</h6></li>
                                                    <li><h6>Single</h6></li>
                                                    <li><h6>Something</h6></li>
                                                    <li><h6>Something</h6></li>
                                                </ul>
                                            </div>
                                            <div className="FriendsContent">
                                                <div className="FriendsBoxes">
                                                    <div className="FriendsRow1">
                                                        <div className="Friend"><h5>1</h5></div>
                                                        <div className="Friend"><h5>2</h5></div>
                                                        <div className="Friend"><h5>3</h5></div>
                                                    </div>
                                                    <div className="FriendsRow2">
                                                        <div className="Friend"><h5>4</h5></div>
                                                        <div className="Friend"><h5>5</h5></div>
                                                        <div className="Friend"><h5>6</h5></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="AlbumBox">
                                        <div className="AlbumHeading">
                                            <h5>Albums</h5>
                                        </div>
                                        <div className="AlbumContent">
                                            <div className="Albums"><i className="fas fa-plus"></i></div>
                                            <div className="Albums">DP</div>
                                            <div className="Albums">Cover</div>
                                        </div>
                                    </div>
                                </div>
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
