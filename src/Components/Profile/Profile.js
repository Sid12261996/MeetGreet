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
import AlbumModel from "./Components/AlbumModel/AlbumModel";

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
            showModel : false
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
        this.setState({
            ...this.state,
            Loader: true
        });
        ImageService.upload(formData, config).then(DPUrl => {
            ImageService.ProfilePic(userData._id, DPUrl.data).then(() => {
                $('#DPForm').submit(() => {
                    this.preventDefault();
                });
                if(this.state.Loader === true) {
                    $('.solarProfile').css({'border' : '2px solid rgba(173,58,110,1)'});
                }
                userService.fetchData(userData._id).then((currentUser) => {
                    auth.updateAuthencity(true, currentUser, () => {
                        userStore.dispatch({type: 'USERS_DATA', result: currentUser.data.data});
                        console.log(userStore.getState().root.user);
                        window.location.reload(false);
                        this.setState({
                            ...this.state,
                            Loader: false
                        });
                        if(this.state.Loader === false) {
                            $('.solarProfile').css({'border' : 'none'});
                        };
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
        $('.aboutHeading').css({ 'border-bottom' : '2px solid #ad3a6e', 'background-color' : '#FAFAFA', 'cursor': 'default', 'opacity' : '1'});
        $('.photos').css({'display':'none'});
        $('.photosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.videos').css({'display':'none'});
        $('.videosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
    };

    handlePhotos = () => {
        $('.about').css({'display':'none'});
        $('.aboutHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.photos').css({'display':'flex'});
        $('.photosHeading').css({ 'border-bottom' : '2px solid #ad3a6e', 'background-color' : '#FAFAFA', 'cursor': 'default', 'opacity' : '1'});
        $('.videos').css({'display':'none'});
        $('.videosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
    };

    handleVideos = () => {
        $('.about').css({'display':'none'});
        $('.aboutHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.photos').css({'display':'none'});
        $('.photosHeading').css({ 'border-bottom' : '2px solid #f5f5f5', 'background-color' : '#F5F5F5', 'cursor': 'pointer', 'opacity' : '0.6'});
        $('.videos').css({'display':'flex'});
        $('.videosHeading').css({ 'border-bottom' : '2px solid #ad3a6e', 'background-color' : '#FAFAFA', 'cursor': 'default', 'opacity' : '1'});
    };

    hideModel = () => {
      this.setState({
          ...this.state,
          showModel : false
      });
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
