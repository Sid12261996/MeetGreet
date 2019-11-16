import React, { Component } from 'react';
import './Start.css';
import {connect} from 'react-redux';
import userStore from "../../Store/stores/user-store";
import Tabs from '../Tabs/Tabs';
import Helmet from "react-helmet";
import Sidebar from '../Sidebar/Sidebar';
import Post from '../SamplePosts/post.jpg';
import Post1 from '../SamplePosts/post1.jpg';

class Start extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgUpload: '',
        };

        this.getBase64 = this.getBase64.bind(this);
    }

    getBase64(e) {
        var file = e.target.files[0]
        let reader = new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(file)
        reader.onload = () => {
          this.setState({
            imgUpload: reader.result
          });
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
        }
      }

    render() {

        let userData = userStore.getState().user;
        return (
            <div>
                <Helmet>
                    <title>Start</title>
                </Helmet>
                <div className="welcome">
                    <div className="welcome-content">
                        <h1>{userData.Name}</h1>
                        <h1>{userData.Email}</h1>
                    </div>
                </div>
                <div className="start">
                    <div className="mainContent">
                        <div className="post-container">
                            <div className="create-toolbar">
                                <div className="choose-pic" onClick={()=>{document.getElementById('fileinputbutton').click()}}>
                                    <h3>+</h3>  <input type="file" ref={this.fileInput} onChange={this.getBase64} id="fileinputbutton"/>                                    
                                </div>
                            </div>
                            <div className="post">
                                <div className="post-head">
                                    <div className="post-pic"></div>
                                    <h6>Friend1</h6>
                                </div>
                                <div className="post-desc">
                                    <p>This is some content related to this post.</p>
                                </div>
                                <div className="post-body">
                                    <div className="post-left">
                                        <img src={this.state.imgUpload} alt="Choose Image from the above button."/>
                                    </div>
                                    <div className="post-right">
                                        <div className="like"><i class="fas fa-thumbs-up"></i></div>
                                        <div className="dislike"><i class="fas fa-thumbs-down"></i></div>
                                        <div className="report"><i class="fas fa-exclamation-triangle"></i></div>
                                        <div className="comment"><i class="fas fa-comment"></i></div>
                                        <div className="share"><i class="fas fa-share"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="post">
                                <div className="post-head">
                                    <div className="post-pic"></div>
                                    <h6>Friend2</h6>
                                </div>
                                <div className="post-desc">
                                    <p>This is some content related to this post.</p>
                                </div>
                                <div className="post-body">
                                    <div className="post-left">
                                        <img src={Post1} alt="Post1"/>
                                    </div>
                                    <div className="post-right">
                                        <div className="like"><i class="fas fa-thumbs-up"></i></div>
                                        <div className="dislike"><i class="fas fa-thumbs-down"></i></div>
                                        <div className="report"><i class="fas fa-exclamation-triangle"></i></div>
                                        <div className="comment"><i class="fas fa-comment"></i></div>
                                        <div className="share"><i class="fas fa-share"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Sidebar />
                </div>
                <Tabs />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.root.user
    }
};

export default connect(mapStateToProps)(Start);
