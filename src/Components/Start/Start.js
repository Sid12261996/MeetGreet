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
                            <div className="post">
                                <div className="post-head">
                                    <div className="post-pic"></div>
                                    <h6>Friend1</h6>
                                </div>
                                <div className="post-desc">
                                    <p>This is some content related to the Media.</p>
                                </div>
                                <div className="post-body">
                                    <div className="post-left">
                                        <img src={Post} alt="Post"/>
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
                                    <p>This is some content related to the Media.</p>
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
