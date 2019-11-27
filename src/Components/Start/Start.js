import React, { Component } from 'react';
import './Start.css';
import userStore from "../../Store/stores/user-store";
import Tabs from '../Tabs/Tabs';
import Welcome from '../Welcome/Welcome';
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
        this.getMeta = this.getMeta.bind(this);
    }


    componentDidMount(){      //WILL RUN ON PAGE RELOAD

        $(document).ready(() => {
           return <Welcome />
        });

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

    getMeta(url,index){   
        var img = new Image();
        img.addEventListener("load", function(){
            if(this.naturalWidth > this.naturalHeight){
                document.getElementsByClassName('posty')[index].style.width = "100%";
                document.getElementsByClassName('posty')[index].style.height = "400px";
                document.getElementsByClassName('posty')[index].style.filter = "blur(0px)";
            }
            else if(this.naturalWidth < this.naturalHeight){
                if(this.naturalWidth > 673){
                    document.getElementsByClassName('posty')[index].style.width = '300px';
                    document.getElementsByClassName('posty')[index].style.height = "400px";
                    document.getElementsByClassName('posty')[index].style.filter = "blur(0px)";
                }
                else{
                    document.getElementsByClassName('posty')[index].style.width = this.naturalWidth+'px';
                    document.getElementsByClassName('posty')[index].style.height = "400px";
                    document.getElementsByClassName('posty')[index].style.filter = "blur(0px)";
                }
            }
            else if(this.naturalHeight === this.naturalWidth){
                document.getElementsByClassName('posty')[index].style.width = "400px";
                document.getElementsByClassName('posty')[index].style.height = "400px";
                document.getElementsByClassName('posty')[index].style.filter = "blur(0px)";
            }
        });
        img.src = url;
    }

    render() {
        const posts = this.state.posts;                     //GETTING POSTS FROM STATE
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
                                <form autoComplete="off" onSubmit={this.handleSubmit} encType="multipart/form-data">

                                    <div className="generatePost">
                                        <input autoComplete="off" type="text" id="postText" placeholder="What's on your mind?"/>
                                        <div className="choose-pic" onClick={()=>{document.getElementById('fileinputbutton').click()}}>
                                            <h6>Image</h6>  
                                            <input type="file" id="fileinputbutton" name="file" onChange={(e)=>{this.onChange(e)}} required/>   
                                        </div>
                                    </div>

                                    <button type="submit" className="post-btn">POST</button>
                                </form>
                            </div>

                            {

                                posts && posts.reverse().map((post,index)=>{            //POSTS MAPPING AND DISPLAYING
                                    return(
                                        <div className="post" key={post._id}>   
                                            <div className="post-head">
                                                <div className="post-pic"></div>
                                                <h6>{post.authorName}</h6>
                                            </div>
                                            <div className="post-desc">
                                                <p>{post.title}</p>
                                            </div>                                            
                                            <div className="post-body">
                                            {
                                                this.getMeta(post.imageUrl,index)
                                            }
                                                <div className="post-left">
                                                    <img className="posty" src={post.imageUrl} alt="Post1" />
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
