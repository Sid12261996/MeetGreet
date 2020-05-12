import React, {Component} from 'react';
import './Start.css';
import userStore from "../../Store/stores/user-store";
import Tabs from '../Tabs/Tabs';
import Helmet from "react-helmet";
import Sidebar from '../Sidebar/Sidebar';
import PostService from "../../services/post-services";
import ImageService from "../../services/image-service";
import $ from 'jquery';
import userService from "../../services/user-services";
import auth from "../../auth/auth";
import env from "../../environment";
import baseService from "../../services/base-service";
import * as moment from "moment";
import DefaultPic from '../Images/Profile/ProfileCircle.png';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUpload: '',
            postText: '',
            posts: '',
            imgGetUrl: '',
            currentDate: new Date()
        };

        //BINDING FUNCTIONS
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount() {      //WILL RUN ON PAGE RELOAD
        let userData = userStore.getState().root.user;          //Needs to be Removed At Release
        const ImageFetch = `${env.ImageBaseUrl}images/`;
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
        //Todo: Please remove the above commented lines later if not needed
        return `${toPrint}`;
    };

    onChange = (e) => {
        let files = e.target.files[0];
        this.setState({
            ...this.state,
            imgUpload: files
        });
    };

    render() {
        console.log(userStore.getState().root.user);
        console.log(userStore.getState().root.token);
        console.log(this.state.posts);
        const posts = this.state.posts;
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
                            <div className="FandSColumn">

                            </div>
                            <div className="toolBoxWrapper">
                                <div className="ToolBox">
                                    <div className="ToolBoxIn">
                                        <div className="TB1">
                                            <div className="statusTab1">
                                                <i className="fas fa-quote-right">
                                                </i>
                                                <h5>Status</h5>
                                            </div>
                                            <div className="statusTab2">
                                                <i className="fas fa-images">
                                                </i>
                                                <h5>Photos</h5>
                                            </div>
                                        </div>
                                        <div className="TB2">
                                            <div className="moodBox">
                                                <div className="moodHeading">
                                                    <h5>Moods</h5>
                                                    <i className="fas fa-caret-down">
                                                    </i>
                                                </div>
                                            </div>
                                            <div className="bgBox">
                                                <div className="statusBg">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="TB3">
                                            <div className="statusField">
                                                <textarea name="status" id="status" cols="30" placeholder="What you wanna say?">
                                                </textarea>
                                            </div>
                                            <div className="postBtn">
                                                <button className="postItBtn">POST</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="postWrapper">
                                <div className="post">
                                    {
                                        posts && posts.map(post => {
                                            return(
                                                <div className="postIn" key={post._id}>
                                                    <div className="postHeader">
                                                        <img className="authorPic" src={`${post.authorInfo.ImageUrl}` === "default" ? `${DefaultPic}` : `${this.state.imgGetUrl + post.authorInfo.ImageUrl}`} alt="user"/>
                                                        <div className="statusProPic">
                                                            <div className="authorName">
                                                                <h6>{post.authorName}</h6>
                                                            </div>
                                                            <div className="authorTime">
                                                                <h6>{this.handleDate(post.baseEntity.CreatedAt)} ago</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                        {
                                                            post.imageUrl == "default" ? (<div className='hideTitle'></div>) : (<div className='postDesc'><p>{post.title}</p></div>)
                                                        }
                                                    <div className="postBody">
                                                        <div className="authorPost">
                                                            {
                                                                post.imageUrl == "default" ? (<div className='postTitleImg'><p>{post.title}</p></div>) : (<img src={post.imageUrl} alt="Post" />)
                                                            }
                                                        </div>
                                                        <div className="authorActions">
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
