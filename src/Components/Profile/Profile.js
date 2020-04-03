import React, {Component} from 'react';
import Tabs from '../Tabs/Tabs';
import Sidebar from "../Sidebar/Sidebar";
import DefaultPic from '../Images/Profile/ProfileCircle.png';
import AlbumPic from '../Images/AlbumDummy.png'; //Temporary
import './Profile.css';
import $ from 'jquery';
import userStore from "../../Store/stores/user-store";
import Helmet from 'react-helmet';
import env from "../../environment";
import ImageService from "../../services/image-service";
import auth from '../../auth/auth';
import userService from "../../services/user-services";

export default class Profile extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            ProfilePic: "",
            CoverPic: "",
            ImageUpload: '',
            userData: {}
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
        let userData = this.state.userData;
        let files = e.target.files[0];
        let formData = new FormData();
        formData.append('file', files);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        ImageService.upload(formData, config).then(DPUrl => {
            ImageService.ProfilePic(userData._id, DPUrl.data).then(() => {
                $('#DPForm').submit(() => {
                    this.preventDefault();
                });
                userService.fetchData(userData._id).then((currentUser) => {
                    $('.solarProfile').css({'box-shadow' : '0 0 8px rgba(173,58,110,0.8)'});
                    auth.updateAuthencity(true, currentUser, () => {
                        userStore.dispatch({type: 'USERS_DATA', result: currentUser.data.data});
                        console.log(userStore.getState().root.user);
                        $('.solarProfile').css({'box-shadow' : '0 0 5px rgba(127,127,127,0.5)'});
                        $('.choose-propic').load(`${userService.LoadUrl}${this.props.match.path}`, null, null);
                    });
                }, er => {
                    console.log(er);
                });
            }, error => {
                console.log(error);
            });
        }, err => {
            console.log(err);
        });
    };

    handleAbout = () => {
        $('.about').css({'display':'flex'});
        $('.aboutHeading').css({ 'border-bottom' : '2px solid #ad3a6e', 'background-color' : '#FAFAFA', 'cursor': 'default'});
        $('.photos').css({'display':'none'});
        $('.photosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer'});
        $('.videos').css({'display':'none'});
        $('.videosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer'});
    };

    handlePhotos = () => {
        $('.about').css({'display':'none'});
        $('.aboutHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer'});
        $('.photos').css({'display':'flex'});
        $('.photosHeading').css({ 'border-bottom' : '2px solid #ad3a6e', 'background-color' : '#FAFAFA', 'cursor': 'default'});
        $('.videos').css({'display':'none'});
        $('.videosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer'});
    };

    handleVideos = () => {
        $('.about').css({'display':'none'});
        $('.aboutHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer'});
        $('.photos').css({'display':'none'});
        $('.photosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer'});
        $('.videos').css({'display':'flex'});
        $('.videosHeading').css({ 'border-bottom' : '2px solid #ad3a6e', 'background-color' : '#FAFAFA', 'cursor': 'default'});
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
                                            <img id="profilePic" src={`${userData.ImageUrl}` !== "default" ? `${this.state.ProfilePic}images/${userData.ImageUrl}` : `${DefaultPic}`} alt="Profile"/>
                                            <form autoComplete="off" encType="multipart/form-data" id="DPForm">
                                                <div className="choose-propic" onClick={this.handleSubmit}>
                                                    <i className="far fa-edit mainDP"></i>
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
                                            <h5>Profession</h5>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="headingInfo">
                                    <h3 className="aboutHeading" onClick={this.handleAbout}>ABOUT</h3>
                                    <h3 className="photosHeading" onClick={this.handlePhotos}>PHOTOS</h3>
                                    <h3 className="videosHeading" onClick={this.handleVideos}>VIDEOS</h3>
                                </div>
                            </div>
                            <div className="userContent">
                                <div className="about">About</div>
                                <div className="photos">
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                    <div className="photosHolder">
                                        Album
                                    </div>
                                </div>
                                <div className="videos">
                                    <div className="videosHolder">
                                        Album
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
                    <Sidebar/>
                </div>
                {/* TABSBAR */}
                <Tabs/>
            </div>
        )
    }
}
