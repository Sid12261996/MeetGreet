import React, {Component} from 'react';
import './Start.css';
import userStore from "../../Store/stores/user-store";
import Tabs from '../Tabs/Tabs';
import Helmet from "react-helmet";
import Sidebar from '../Sidebar/Sidebar';
import env from '../../environment.js';
import PostService from "../../services/post-services";
import ImageService from "../../services/image-service";
import baseService from "../../services/base-service";
import $ from 'jquery';
import userService from "../../services/user-services";
import auth from "../../auth/auth";
import DefaultPic from "../Images/Profile/ProfileCircle.png";
import * as moment from "moment";
import {unitOfTime} from "moment";

class Start extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgUpload: '',
            imgGetUrl: '',
            posts: '',
            postText: '',
            welcome: 0,
            currentDate: new Date()
        };

        //BINDING FUNCTIONS
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getMeta = this.getMeta.bind(this);
    }


    componentDidMount() {      //WILL RUN ON PAGE RELOAD
        let userData = userStore.getState().root.user;          //Needs to be Removed At Release
        const ImageFetch = `${env.ImageBaseUrl}images/`;
        console.log(userStore.getState().root);
        baseService.axios();

        PostService.getAllPosts(`${userData._id}`)      //POSTS API HIT
            .then((result) => {
                this.setState({
                    ...this.state,
                    posts: result.data.data,
                    imgGetUrl: ImageFetch
                });
            }, error => {
                console.log(error);
            });

    }

    handleSubmit = (e) => {     //POST SUBMIT FUNCTION
        e.preventDefault();
        let myPost = $('#postText').val();       //POST CHANGE FUNCTION
        this.setState({
            ...this.state,
            postText: myPost
        });

        let userData = userStore.getState().root.user;
        let formData = new FormData();
        formData.append('file', this.state.imgUpload);
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        };

        // POST CREATE HIT
        ImageService.upload(formData, config).then(Imgcreate => {
            PostService.createPost(userData._id, {
                title: this.state.postText,
                imageUrl: this.state.imgGetUrl + Imgcreate.data
            })
                .then(() => {
                    document.getElementById('postText').value = "";
                    console.log('Done');
                    userService.fetchData(userData._id).then((currentUser) => {
                        auth.updateAuthencity(true, currentUser, () => {
                            userStore.dispatch({type: 'USERS_DATA', result: currentUser.data.data});
                            console.log(userStore.getState().root.user);
                            console.log('Done');
                            $('.post').load(`${userService.LoadUrl}${this.props.match.path}`, null, null);
                        });
                    }, er => {
                        console.log(er);
                    });
                }, err => {
                    console.log(err)
                });
        }, error => {
            console.log(error)
        });
    };

    onChange = (e) => {
        let files = e.target.files[0];
        this.setState({
            ...this.state,
            imgUpload: files
        });
    };

    unitsOfTime = ['years', 'days', 'hours', 'minutes', 'seconds'];
    handleDate(CreatedAt, index = 0) {
        // console.log(this.state.currentDate, CreatedAt, moment(CreatedAt).local());
        const now = moment(this.state.currentDate);
        // let toPrint = now - moment(CreatedAt);
        const unitOfTime = this.unitsOfTime[index];
        let toPrint = now.diff(moment(CreatedAt).local(), unitOfTime).toString() + ' ' + unitOfTime;
        if (toPrint === '0 ' + unitOfTime) {
            index++;
            // console.log('Time is ', toPrint);
            // unitsOfTime.splice(0, 1);
            // console.log(unitsOfTime);
            toPrint = this.handleDate(CreatedAt, index);
        }
        return `${toPrint}`;
    };

    getMeta(url, index) {
        var img = new Image();
        // Todo: Code below has to go in generic utils function
        img.addEventListener("load", function () {
            if (this.naturalWidth > this.naturalHeight) {
                document.getElementsByClassName('posty')[index].style.width = "100%";
                document.getElementsByClassName('posty')[index].style.height = "400px";
                document.getElementsByClassName('posty')[index].style.filter = "blur(0px)";
            } else if (this.naturalWidth < this.naturalHeight) {
                if (this.naturalWidth > 673) {
                    document.getElementsByClassName('posty')[index].style.width = '300px';
                    document.getElementsByClassName('posty')[index].style.height = "400px";
                    document.getElementsByClassName('posty')[index].style.filter = "blur(0px)";
                } else {
                    document.getElementsByClassName('posty')[index].style.width = this.naturalWidth + 'px';
                    document.getElementsByClassName('posty')[index].style.height = "400px";
                    document.getElementsByClassName('posty')[index].style.filter = "blur(0px)";
                }
            } else if (this.naturalHeight === this.naturalWidth) {
                document.getElementsByClassName('posty')[index].style.width = "400px";
                document.getElementsByClassName('posty')[index].style.height = "400px";
                document.getElementsByClassName('posty')[index].style.filter = "blur(0px)";
            }
        });
        img.src = url;
    };

    handleText = () => {
        $('.fa-quote-left').css({'background-color' : '#FAFAFA', 'border-bottom' : '2px solid #AD3A6E', 'opacity' : '1', 'cursor': 'default'});
        $('.text').css({'display': 'flex'});
        $('.fa-images').css({'background-color' : '#FFFFFF', 'border-bottom' : '2px solid #FFFFFF', 'opacity' : '0.4', 'cursor': 'pointer'});
        $('.image').css({'display': 'none'});
        $('.fa-film').css({'background-color' : '#FFFFFF', 'border-bottom' : '2px solid #FFFFFF', 'opacity' : '0.4', 'cursor': 'pointer'});
        $('.video').css({'display': 'none'});
    };

    handleImage = () => {
        $('.fa-images').css({'background-color' : '#FAFAFA', 'border-bottom' : '2px solid #AD3A6E', 'opacity' : '1', 'cursor': 'default'});
        $('.image').css({'display': 'flex'});
        $('.fa-quote-left').css({'background-color' : '#FFFFFF', 'border-bottom' : '2px solid #FFFFFF', 'opacity' : '0.4', 'cursor': 'pointer'});
        $('.text').css({'display': 'none'});
        $('.fa-film').css({'background-color' : '#FFFFFF', 'border-bottom' : '2px solid #FFFFFF', 'opacity' : '0.4', 'cursor': 'pointer'});
        $('.video').css({'display': 'none'});
    };

    handleVideo = () => {
        $('.fa-film').css({'background-color' : '#FAFAFA', 'border-bottom' : '2px solid #AD3A6E', 'opacity' : '1', 'cursor': 'default'});
        $('.video').css({'display': 'flex'});
        $('.fa-quote-left').css({'background-color' : '#FFFFFF', 'border-bottom' : '2px solid #FFFFFF', 'opacity' : '0.4', 'cursor': 'pointer'});
        $('.text').css({'display': 'none'});
        $('.fa-images').css({'background-color' : '#FFFFFF', 'border-bottom' : '2px solid #FFFFFF', 'opacity' : '0.4', 'cursor': 'pointer'});
        $('.image').css({'display': 'none'});
    };

    render() {
        const posts = this.state.posts;                     //GETTING POSTS FROM STATE
        console.log(posts);

        return (
            <div>

                {/* SCREEN TITLE */}
                <Helmet>
                    <title>Start</title>
                </Helmet>

                {/* START SCREEN */}
                <div className="start">
                    <div className="mainContent">
                        <div className="post-container">

                            {/* CREATE POST TOOLBAR */}
                            <div className="create-toolbar">
                                <div className="toolbox-heading">
                                    <i className="fas fa-quote-left" onClick={this.handleText}></i>
                                    <i className="far fa-images" onClick={this.handleImage}></i>
                                    <i className="fas fa-film" onClick={this.handleVideo}></i>
                                </div>
                                <div className="toolbox-wrapper">
                                    <div className="text">
                                        <div className="postTextItems">
                                            <div className="MoodList">
                                                <i className="fas fa-theater-masks"></i>
                                                <div className="MoodStyles">
                                                    <span><i className="far fa-smile-beam"></i></span>
                                                    <span><i className="far fa-sad-tear"></i></span>
                                                    <span><i className="far fa-angry"></i></span>
                                                    <span><i className="far fa-surprise"></i></span>
                                                </div>
                                            </div>
                                            <div className="postTextInput">
                                                <textarea name="textPost" id="textPost" cols="70" rows="2" maxLength="30" placeholder="What you want to say?"></textarea>
                                                <button className="postBtn">POST</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="image">
                                        <div className="postTextItems">
                                            <div className="MoodList">
                                                <i className="fas fa-theater-masks"></i>
                                                <div className="MoodStyles">
                                                    <span><i className="far fa-smile-beam"></i></span>
                                                    <span><i className="far fa-sad-tear"></i></span>
                                                    <span><i className="far fa-angry"></i></span>
                                                    <span><i className="far fa-surprise"></i></span>
                                                </div>
                                            </div>
                                            <div className="postTextInput">
                                                <textarea name="textPost" id="textPost" cols="70" rows="2" maxLength="30" placeholder="Testing.. This is Image.."></textarea>
                                                <button className="postBtn">POST</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="video">
                                        <div className="postTextItems">
                                            <div className="MoodList">
                                                <i className="fas fa-theater-masks"></i>
                                                <div className="MoodStyles">
                                                    <span><i className="far fa-smile-beam"></i></span>
                                                    <span><i className="far fa-sad-tear"></i></span>
                                                    <span><i className="far fa-angry"></i></span>
                                                    <span><i className="far fa-surprise"></i></span>
                                                </div>
                                            </div>
                                            <div className="postTextInput">
                                                <textarea name="textPost" id="textPost" cols="70" rows="2" placeholder="Testing.. This is Video.."></textarea>
                                                <button className="postBtn">POST</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {

                                posts && posts.map((post, index) => {            //POSTS MAPPING AND DISPLAYING
                                    return (
                                        <div className="post" key={post._id}>
                                            <div className="post-head">
                                                <div className="post-head-flex">
                                                    <div className="post-pic">
                                                        <img
                                                            src={`${post.authorInfo.ImageUrl}` === "default" ? `${DefaultPic}` : `${this.state.imgGetUrl + post.authorInfo.ImageUrl}`}
                                                            alt="User Profile Pic"/>
                                                    </div>
                                                    <div className="NameAndTime">
                                                        <h6 className="AuthorName">{post.authorName}</h6>
                                                        <h6 className="PostTime">{this.handleDate(post.baseEntity.CreatedAt)} ago</h6>
                                                    </div>
                                                </div>
                                                <div className="Mood"></div>
                                            </div>
                                            <div className="post-desc">
                                                <div className="div post-desc-box">
                                                    <p>{post.title}</p>
                                                </div>
                                            </div>
                                            <div className="post-body">
                                                {
                                                    this.getMeta(post.imageUrl, index)
                                                }
                                                <div className="post-left">
                                                    <img className="posty" src={post.imageUrl} alt="Post1"/>
                                                </div>
                                                <div className="post-right">
                                                    <div className="like"><i className="fas fa-thumbs-up"></i></div>
                                                    <div className="dislike"><i className="fas fa-thumbs-down"></i></div>
                                                    <div className="report"><i className="fas fa-exclamation-triangle"></i></div>
                                                    <div className="comment"><i className="fas fa-comment"></i></div>
                                                    <div className="share"><i className="fas fa-share"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

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

export default Start;
