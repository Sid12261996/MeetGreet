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
        // this.getBase64 = this.getBase64.bind(this);
        this.getImage = this.getImage.bind(this);
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
        // console.log(this.state);         // NOT NECESSARY

        
        let userData = userStore.getState().root.user;                  
        
        // POST CREATE HIT
        const formData = new FormData();
        formData.append('file',this.state.imgUpload);

        // formData.file = this.state.imgUpload;
        axios.post('https://meetgreet-upload.herokuapp.com/upload',formData).then(Imgcreate=>{
            console.log(Imgcreate);
            // axios.post(`${env.ApiMonthLink}posts/${userData._id}/create`,
            // {title: this.state.postText, imageUrl : "https://meetgreet-upload.herokuapp.com/images/"+Imgcreate}).then(()=>{
            //     alert('Post Created Successfully');
            // },error=>{console.log("Create API didnt work "+ error)});
        },err=>{console.log("Python API didnt work "+ err)});
    };

    handleChange = (e) => {        //POST CHANGE FUNCTION
        this.setState({
            ...this.state,
            [e.target.id] : e.target.value
        });
    };


    // TO GET IMAGE USING BASE64
    // getBase64(e) {
    //     var file = e.target.files[0]
    //     let reader = new FileReader()
    //     if(e.target.files[0]){
    //         reader.readAsDataURL(file)
    //     reader.onload = () => {
    //       this.setState({
    //           ...this.state,
    //         imgUpload: reader.result
    //       });
    //     };
    //     reader.onerror = function (error) {
    //       console.log('Error: ', error);
    //     }
    //     }
    //   }

    getImage(e){        //POST IMAGE VALUE FUNCTION
        var src = e.target.files[0];
        // var tarr = src.replace("C:\\fakepath\\", ""); 
        // var file = URL.createObjectURL(e.target.files[0]);
        // if(file){ 
            this.setState({
                ...this.state,
                imgUpload : src
            });
        // }
        // let files = e.target.files;
        // let reader = new FileReader();
        // reader.readAsDataURL(files[0]);
        // reader.onload = (e) => {
        //     this.setState({
        //         ...this.state,
        //         imgUpload: e.target.result
        //     })
        // }
    }

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
                                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                    <label htmlFor="postText">Whats on your mind..</label>
                                    <input type="text" id="postText" onChange={this.handleChange} />
                                    <div className="choose-pic" onClick={()=>{document.getElementById('fileinputbutton').click()}}>
                                        <h6>Choose Image</h6>  
                                        <input type="file" onChange={this.getImage} id="fileinputbutton" name="file"/>   
                                    </div>
                                    <input type="submit"/>
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
