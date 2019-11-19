import React, { Component } from 'react';
import './Start.css';
import userStore from "../../Store/stores/user-store";
import Tabs from '../Tabs/Tabs';
import Helmet from "react-helmet";
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import env from '../../environment.json';
import $ from 'jquery';

class Start extends Component {

    constructor(props){
        super(props);
        this.state = {
            imgUpload: '',
            posts: '',
            postText : ''
        };

        //BINDING FUNCTIONS
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount(){      //WILL RUN ON PAGE RELOAD
        let userData = userStore.getState().root.user;

        axios.get(`${env.ApiMonthLink}posts/${userData._id}`)         //POSTS API HIT
        .then((result)=>{
            this.setState({
                ...this.state,
                posts : result.data.data
            })
        },error => {
            console.log(error);
        });

    }

    handleSubmit = (e) => {     //POST SUBMIT FUNCTION
        e.preventDefault();
        let myPost = $('#postText').val();       //POST CHANGE FUNCTION
        this.setState({
            ...this.state,
            postText : myPost
        });

        let userData = userStore.getState().root.user;                  
        let formData = new FormData();
        formData.append('file',this.state.imgUpload);
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }

        // POST CREATE HIT
        axios.post('https://meetgreet-upload.herokuapp.com/upload',formData,config).then(Imgcreate=>{
            axios.post(`${env.ApiMonthLink}posts/${userData._id}/create`,
            {title: this.state.postText, imageUrl : "https://meetgreet-upload.herokuapp.com/images/"+Imgcreate.data}).then(()=>{
                document.getElementById('postText').value = "";
                alert('Post Created Successfully');
                window.location.reload(false);
            },error=>{console.log(error)});
        },err=>{console.log(err)});
    };

    onChange = (e) => {
        let files = e.target.files[0];
        this.setState({
            ...this.state,
            imgUpload : files
        });
    };

    render() {

        let userData = userStore.getState().root.user;      //GETTING USER DETAILS
        const posts = this.state.posts;                     //GETTING POSTS FROM STATE
        return (
            <div>

                {/* SCREEN TITLE */}
                <Helmet>
                    <title>Start</title>
                </Helmet>

                {/* WELCOME SCREEN */}
                <div className="welcome">
                    <div className="welcome-content">
                        <h1>{userData.Name}</h1>
                        <h1>{userData.Email}</h1>
                    </div>
                </div>

                {/* START SCREEN */}
                <div className="start">
                    <div className="mainContent">
                        <div className="post-container">

                            {/* CREATE POST TOOLBAR */}
                            <div className="create-toolbar">
                                <form autocomplete="off" onSubmit={this.handleSubmit} encType="multipart/form-data">

                                    <div className="generatePost">
                                        <input autocomplete="off" type="text" id="postText" placeholder="What's on your mind?"/>

                                        <div className="choose-pic" onClick={()=>{document.getElementById('fileinputbutton').click()}}>
                                            <h6>Image</h6>  
                                            <input type="file" id="fileinputbutton" name="file" onChange={(e)=>{this.onChange(e)}}/>   
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                            </div>

                            {

                                posts && posts.reverse().map(post=>{            //POSTS MAPPING AND DISPLAYING
                                    return(
                                        <div className="post" key={post._id}>   
                                            <div className="post-head">
                                                <div className="post-pic"></div>
                                                <h6>{post.author}</h6>
                                            </div>
                                            <div className="post-desc">
                                                <p>{post.title}</p>
                                            </div>
                                            <div className="post-body">
                                                <div className="post-left">
                                                    <img src={post.imageUrl} alt="Post1"/>
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
                    <Sidebar />
                </div>
                {/* TABSBAR */}
                <Tabs />
            </div>
        )
    }
}

export default Start;
