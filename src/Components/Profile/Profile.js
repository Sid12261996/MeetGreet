import React, {Component} from 'react';
import Tabs from '../Tabs/Tabs';
import Sidebar from "../Sidebar/Sidebar";
import DefaultPic from '../Images/Profile/ProfileCircle.png';
import 'react-image-crop/dist/ReactCrop.css';
import './Profile.css';
import $ from 'jquery';
import Helmet from 'react-helmet';
import env from "../../environment";
import userService from "../../services/user-services";
import AlbumModel from "./Components/AlbumModel/AlbumModel";
import CropModel from './Components/CropModel/CropModel'

export default class Profile extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            ProfilePic: "",
            CoverPic: "",
            ImageUpload: '',
            userData: {},
            Loader: false,
            showModel : false,
            showCModel: false,
            src: null,
            DOBView: true
        }
    }

    componentDidMount() {
        const URL = `${env.ImageBaseUrl}`;
        userService.fetchData(this.props.match.params.id).then( result => {
            console.log(result.data.data);
            this.setState({
                ...this.state,
                ProfilePic: URL,
                userData: result.data.data
            });
        },error=> {
            console.log(error);
        });
    }

    //Profile Input Initialize
    handleSubmit = () => {
        document.getElementById('profileinputbutton').click();
    };

    // Profile Pic Update
    onChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({...this.state, src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        };
        this.setState({
            ...this.state,
            showCModel: true
        })
    };

    handleAbout = () => {
        $('.about').css({'display':'flex'});
        $('.aboutHeading').css({ 'border-bottom' : '2px solid #ad3a6e', 'background-color' : '#FAFAFA', 'cursor': 'default', 'opacity' : '1'});
        $('.photos').css({'display':'none'});
        $('.photosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.videos').css({'display':'none'});
        $('.videosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.feeds').css({'display':'none'});
        $('.feedsHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
    };

    handlefeeds = () => {
        $('.feeds').css({'display':'flex'});
        $('.feedsHeading').css({ 'border-bottom' : '2px solid #ad3a6e', 'background-color' : '#FAFAFA', 'cursor': 'default', 'opacity' : '1'});
        $('.photos').css({'display':'none'});
        $('.photosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.videos').css({'display':'none'});
        $('.videosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.about').css({'display':'none'});
        $('.aboutHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
    };

    handlePhotos = () => {
        $('.about').css({'display':'none'});
        $('.aboutHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.photos').css({'display':'flex'});
        $('.photosHeading').css({ 'border-bottom' : '2px solid #ad3a6e', 'background-color' : '#FAFAFA', 'cursor': 'default', 'opacity' : '1'});
        $('.videos').css({'display':'none'});
        $('.videosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.feeds').css({'display':'none'});
        $('.feedsHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
    };

    handleVideos = () => {
        $('.about').css({'display':'none'});
        $('.aboutHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.photos').css({'display':'none'});
        $('.photosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.videos').css({'display':'flex'});
        $('.videosHeading').css({ 'border-bottom' : '2px solid #ad3a6e', 'background-color' : '#FAFAFA', 'cursor': 'default', 'opacity' : '1'});
        $('.feeds').css({'display':'none'});
        $('.feedsHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
    };

    hideModel = () => {
      this.setState({
          ...this.state,
          showModel : false
      });
    };

    hideCModel = () => {
        this.setState({
            ...this.state,
            showCModel : false
        });
    };

    handleView = () => {
      if(this.state.DOBView === true){
          $('.fa-eye').css({'display': 'none'});
          $('.fa-eye-slash').css({'display': 'flex'});
          this.setState({
              ...this.state,
              DOBView: false
          });
      }
      else {
          $('.fa-eye').css({'display': 'flex'});
          $('.fa-eye-slash').css({'display': 'none'});
          this.setState({
              ...this.state,
              DOBView: true
          });
      }
    };

    //Function Not Available
    handleNotAvailable = () => {
        alert('This feature is currently unavailable.');
    };

    render() {
        let userData = this.state.userData;      //GETTING USER DETAILS
        console.log(this.state.userData);
        return (
            <div>
                <AlbumModel show={this.state.showModel} onHide={() => this.hideModel()} />
                <CropModel src={this.state.src} crop={this.state.crop} show={this.state.showCModel} onHide={() => this.hideCModel()} userdata={this.state.userData}/>
                {/* SCREEN TITLE */}
                <Helmet>
                    <title>Profile</title>
                </Helmet>

                {/* PROFILE SCREEN */}
                <div className="profile">   {/* PROFILE DIV 100% WIDTH */}
                    <div className="profileContent">    {/* INSIDE DIV WITH 100% - 100px WIDTH */}
                        {/* PROFILE SCREEN LEFT PART */}
                        <div className="profileLeft">
                            <div className="userWrapper">
                            <div className="userDetails">
                                <div className="userInfo">
                                    <div className="userProfile">
                                        {/* PROFILE PIC CIRCLE DIV */}
                                        <div className="solarProfile">
                                            <img id="profilePic" src={`${userData.ImageUrl}` !== "default" ? `${this.state.ProfilePic}images/${userData.ImageUrl}` : `${DefaultPic}`}/>
                                            <form autoComplete="off" encType="multipart/form-data" id="DPForm">
                                                <div className="choose-propic" onClick={this.handleSubmit}>
                                                    <i className="fas fa-pencil-alt mainDP"></i>
                                                    <input type="file" id="profileinputbutton" name="file"
                                                           onChange={(e) => {
                                                               this.onChange(e)
                                                           }}/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="user">
                                        <div className="userData">
                                            <h1>{userData.Name}</h1>
                                            <h3>Profession</h3>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="headingInfo">
                                    <h3 className="aboutHeading" onClick={this.handleAbout}>ABOUT</h3>
                                    <h3 className="feedsHeading" onClick={this.handlefeeds}>FEEDS</h3>
                                    <h3 className="photosHeading" onClick={this.handlePhotos}>PHOTOS</h3>
                                    <h3 className="videosHeading" onClick={this.handleVideos}>VIDEOS</h3>
                                </div>
                            </div>
                            <div className="userContent">
                                <div className="about">
                                    <div className="mostViewed">
                                        <div className="mostViewedCard">
                                            <div className="mostViewedHeading">
                                                <h5>Most Viewed Posts</h5>
                                            </div>
                                            <div className="mostViewedContent">
                                                <div className="contentRow">
                                                    <div className="viewedData"></div>
                                                    <div className="viewedData"></div>
                                                </div>
                                                <div className="contentRow">
                                                    <div className="viewedData"></div>
                                                    <div className="viewedData"></div>
                                                </div>
                                                <div className="contentRow">
                                                    <div className="viewedData"></div>
                                                    <div className="viewedData"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="aboutRight">
                                        <div className="dataCards dataCards1">
                                            <div className="meHeading">
                                                <h5>Me</h5>
                                            </div>
                                            <div className="meContent">
                                                <div className="contentDetails">
                                                    <div className="workPlace">
                                                        <h5>Workplace:</h5>
                                                    </div>
                                                    <div className="DOB">
                                                        <h5>Date of Birth:</h5>
                                                    </div>
                                                </div>
                                                <div className="contentAnsShow">
                                                    <div className="workPlaceAns">
                                                        <h5>Update Settings</h5>
                                                    </div>
                                                    <div className="DOBAns">
                                                        <h5>Update Settings</h5>
                                                    </div>
                                                </div>
                                                <div className="dateVisible">
                                                    <i className="fas fa-eye-slash" onClick={this.handleView}></i>
                                                    <i className="fas fa-eye" onClick={this.handleView}></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dataCards dataCards2">
                                            <div className="friendsContent">
                                                <div className="friendsHeading"><h5>Friends</h5></div>
                                                <div className="friendsNumber"><h2>184</h2></div>
                                            </div>
                                            <div className="twoFriends">
                                                <div className="friend1">
                                                    <div className="friends1Pic"></div>
                                                    <h5>Amanda Cerny</h5>
                                                </div>
                                                <div className="friend2">
                                                    <div className="friends2Pic"></div>
                                                    <h5>Galga Dot</h5>
                                                </div>
                                            </div>
                                            <div className="viewBtn">
                                                <h5 onClick={this.handleNotAvailable}>View All</h5>
                                            </div>
                                        </div>
                                        <div className="dataCards dataCards3">
                                            <div className="stationHeading"><h5>Station</h5></div>
                                            <div className="stationContent"><h5>You dont have any station yet.</h5></div>
                                            <div className="stationBtn">
                                                <h5 onClick={this.handleNotAvailable}>Create</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="feeds">
                                    <h5>Under Development.</h5>
                                </div>
                                <div className="photos">
                                    <div className="addPAlbum" onClick={this.handleNotAvailable}>
                                        <i className="fas fa-plus"></i>
                                        <p className='addBtn'>ADD</p>
                                    </div>
                                    <div className="photosHolder">
                                        <img id="profileAlbum" src={`${userData.ImageUrl}` !== "default" ? `${this.state.ProfilePic}images/${userData.ImageUrl}` : `${DefaultPic}`} alt="ProfileAlbum" onClick={() => {this.setState({...this.state, showModel : true})}} />
                                        <span className="black-trans" onClick={ () => {this.setState({...this.state, showModel : true})}}> </span>
                                        <span className="transparent"><p>Profile Pics</p></span>
                                    </div>
                                </div>
                                <div className="videos">
                                    <div className="addPAlbum" onClick={this.handleNotAvailable}>
                                        <i className="fas fa-plus"></i>
                                        <p className='addBtn'>ADD</p>
                                    </div>
                                    <div className="videosHolder" onClick={this.handleNotAvailable}>
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
                        </div>
                    </div>
                    {/* SIDEBAR */}
                    <Sidebar/>
                </div>
                {/* TABSBAR */}
                <Tabs/>
            </div>
        )
    }
}
