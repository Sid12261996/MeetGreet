import React, {Component} from 'react';
import './Start.css';
import { connect } from 'react-redux';
import Tabs from '../Tabs/Tabs';
import Helmet from "react-helmet";
import Sidebar from '../Sidebar/Sidebar';
import PostService from "../../services/post-services";
import auth from "../../auth/auth";
import ImageService from "../../services/image-service";
import $ from 'jquery';
import userService from "../../services/user-services";
import store from "../../Store/stores/user-store";
import env from "../../environment";
import baseService from "../../services/base-service";
import * as moment from "moment";
import DefaultPic from '../Images/Profile/ProfileCircle.png';
import CropModel from "../Profile/Components/CropModel/CropModel";
import { Bar } from "react-chartjs-2";

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postText: '',
            posts: '',
            imgGetUrl: '',
            currentDate: new Date(),
            showModel: false,
            ImageType: null,
            src: null,
            userData: null,
            imgUpload: null,
            statusCode: 1,
            commentsBox : 1,
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [25, 19, 3, 5, 12, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        };

        //BINDING FUNCTIONS
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {      //WILL RUN ON PAGE RELOAD
        let userData = store.getState().root.user;
        const ImageFetch = `${env.ImageBaseUrl}images/`;
        baseService.axios();

        PostService.getAllPosts(`${userData._id}`)      //POSTS API HIT
            .then((result) => {
                this.setState({
                    ...this.state,
                    posts: result.data.data,
                    imgGetUrl: ImageFetch,
                    userData: userData
                });
            }, error => {
                console.log(error);
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cropImageName === "default") {
            $('.statusPic').css({'border':'1px dashed rgba(127,127,127,0.6)'});
            $('.statusPic').hover(()=>{
                $('.statusPic').css({'border':'none'});
            },()=>{
                $('.statusPic').css({'border':'1px dashed rgba(127,127,127,0.6)'});
            });
        }
        else {
            $('.statusPic').css({'border':'1px dashed rgba(111,173,56,1)'});
            $('.statusPic').hover(()=>{
                $('.statusPic').css({'border':'none'});
                $('.image-post-icon').css({'color':'rgba(127,127,127,0.6)'});
            });

            $('.statusPic').css({'border':'1px dashed rgba(111,173,56,1)'});
            $('.image-post-icon').css({'color':'rgba(111,173,56,1)'});
            $('.statusPic').hover(()=>{
                $('.statusPic').css({'border':'none'});
                $('.image-post-icon').css({'color':'rgba(255,255,255,1)'});
            },()=>{
                $('.statusPic').css({'border':'1px dashed rgba(111,173,56,1)'});
                $('.image-post-icon').css({'color':'rgba(111,173,56,1)'});
            });
        };
    }

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

    handlePostSubmit = () => {
        document.getElementById('postinputbutton').click();
    }

    onPostChange = (e) => {     //POST CHANGE FUNCTION
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({...this.state, src: reader.result, ImageType: 3 })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
        this.setState({
            ...this.state,
            showModel: true
        });
    }

    handleSubmit = (e) => {     //POST SUBMIT FUNCTION
        e.preventDefault();
        let myPost = $('#statusBox').val();
        let userData = this.state.userData;
        let files = this.props.cropImage;
        let fileName = this.props.cropImageName;
        var formObj = new File([files] , fileName);
        let formData = new FormData();
        formData.append('file', formObj);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };

        if(fileName === "default"){
            PostService.createPost(userData._id, {title: myPost, imageUrl: "default"}).then(()=>{
                userService.fetchData(userData._id).then((currentUser) => {
                    auth.updateAuthencity(true, currentUser, () => {
                        this.props.userData(currentUser.data.data);
                        document.getElementById('statusBox').value = "";
                        window.location.reload(false);
                    });
                    this.setState({
                        ...this.state,
                        postText: ''
                    });
                    this.props.cropData();
                },err=>{
                    console.log(err);
                })
            },error=>{
                console.log(error);
            })
        }
        else {
            ImageService.upload(formData, config).then(Imgcreate => {
                PostService.createPost(userData._id, {
                    title: myPost,
                    imageUrl: this.state.imgGetUrl + Imgcreate.data
                }).then(() => {
                    userService.fetchData(userData._id).then((currentUser) => {
                        auth.updateAuthencity(true, currentUser, () => {
                            this.props.userData(currentUser.data.data);
                        });

                        this.setState({
                            ...this.state,
                            postText: ''
                        });
                        this.props.cropData();
                        document.getElementById('statusBox').value = "";
                        window.location.reload(false);
                    }, er => {
                        console.log(er);
                    });
                }, err => {
                    console.log(err)
                });
            }, error => {
                console.log(error)
            });
        }
    };

    hideModel = () => {
        this.setState({
            ...this.state,
            showModel : false
        });
    };

    handleStatus = (id) => {
        if( id === 1 ){
            $('.statusTab1').css({'border-left':'2px solid #ad3a6e', 'color':'#000'});
            $('.statusTab2').css({'border-left':'2px solid #fff', 'color':'rgba(127,127,127,1)'});
            this.setState({
                ...this.state,
                statusCode: 1
            });
        }
        if( id === 2) {
            $('.statusTab2').css({'border-left':'2px solid #ad3a6e', 'color':'#000'});
            $('.statusTab1').css({'border-left':'2px solid #fff', 'color':'rgba(127,127,127,1)'});
            this.setState({
                ...this.state,
                statusCode: 2
            });
        }
    }

    handleCommentBox = (index) => {
        if (this.state.commentsBox === 1) {
            let elem = document.getElementsByClassName('commentsBox')[index].style;
            let elem2 = document.getElementsByClassName('comment')[index].style;
            let elem3 = document.getElementsByClassName('commentMapping')[index].style;
            elem.height = '0';
            elem.transitionDelay = 'height .2s'
            elem.transition = '.2s';
            elem.transitionTimingFunction = 'ease-out'
            elem3.display = 'none';
            this.setState({
                ...this.state,
                commentsBox : 2
            });
        }
        else {
            let elem = document.getElementsByClassName('commentsBox')[index].style;
            let elem2 = document.getElementsByClassName('comment')[index].style;
            let elem3 = document.getElementsByClassName('commentMapping')[index].style;
            elem.height = '350px';
            elem.transition = '.2s';
            elem.transitionTimingFunction = 'ease-out';
            elem3.animation = 'fade .4s ease-in forwards';
            elem3.display = 'flex';
            this.setState({
                ...this.state,
                commentsBox : 1
            });
        }
    }

    render() {
        const posts = this.state.posts;
        return (
            <div>

                {/* SCREEN TITLE */}
                <Helmet>
                    <title>Start</title>
                </Helmet>

                <CropModel src={this.state.src} crop={this.state.crop} show={this.state.showModel} onHide={() => this.hideModel()} userdata={this.state.userData} imageType={this.state.ImageType}  />
                {/* START SCREEN */}
                <div className="start">
                    <div className="mainContent">
                        <div className="post-container">
                            <div className="stickyColumn">
                                <div className="stickySmall">
                                    <div className="stickyPeople">
                                        <div className="stickyHead">
                                            <span>Someone Familiar?</span>
                                            <span className="stickyLink">See More</span>
                                        </div>
                                        <div className="stickyBody">
                                            <div className="stickyRow">
                                                <div className="familiarBox">
                                                    <div className="familiarHead">
                                                        <div className="familiarPic1"></div>
                                                        <span>Jacob Defroz</span>
                                                    </div>
                                                    <div className="familiarBody">

                                                    </div>
                                                </div>
                                                <div className="familiarBox">
                                                    <div className="familiarHead">
                                                        <div className="familiarPic2"></div>
                                                        <span>Jacob Defroz</span>
                                                    </div>
                                                    <div className="familiarBody">

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="stickyRow">
                                                <div className="familiarBox">
                                                    <div className="familiarHead">
                                                        <div className="familiarPic3"></div>
                                                        <span>Jacob Defroz</span>
                                                    </div>
                                                    <div className="familiarBody">

                                                    </div>
                                                </div>
                                                <div className="familiarBox">
                                                    <div className="familiarHead">
                                                        <div className="familiarPic4"></div>
                                                        <span>Jacob Defroz</span>
                                                    </div>
                                                    <div className="familiarBody">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stickyStats">
                                        <div className="statsHead">
                                            <span>Station Details:</span>
                                        </div>
                                        <div className="statsBody">
                                            <Bar
                                                data={this.state.data}
                                                options={{ maintainAspectRatio: false }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="toolBoxWrapper">
                                <div className="ToolBox">
                                    <div className="ToolBoxIn">
                                        <div className="TB1">
                                            <div className="statusTab1" onClick={()=>{this.handleStatus(1)}}>
                                                <i className="fas fa-quote-right">
                                                </i>
                                                <h5>Status</h5>
                                            </div>
                                            <div className="statusTab2" onClick={()=>{this.handleStatus(2)}}>
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
                                                {
                                                    this.state.statusCode === 1 ? (<div className="statusBg"></div>) :
                                                        (
                                                                <div className="statusPic" onClick={this.handlePostSubmit}>
                                                                    <i className="fas fa-image image-post-icon"></i>
                                                                    <form autoComplete="off" encType="multipart/form-data" id="coverForm">
                                                                    <input type="file" id="postinputbutton" name="file" accept="image/jpeg" onChange={this.onPostChange} />
                                                                    </form>
                                                                </div>
                                                        )
                                                }
                                            </div>
                                        </div>
                                        <div className="TB3">
                                            <div className="statusField">
                                                <textarea name="status" id="status" cols="30" placeholder="What you wanna say?" id="statusBox">
                                                </textarea>
                                            </div>
                                            <div className="postBtn">
                                                <button className="postItBtn" onClick={this.handleSubmit}>POST</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="postWrapper">
                                <div className="post">
                                    {
                                        posts && posts.map((post,index) => {
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
                                                            post.imageUrl === "default" ? (<div className='hideTitle'></div>) : (<div className='postDesc'><p>{post.title}</p></div>)
                                                        }
                                                    <div className="postBody">
                                                        <div className="authorPost">
                                                            <div className="commentsBox">
                                                                <div className="commenting">
                                                                    <div className="commentBody">
                                                                        {
                                                                            post.interactions.comments.map(comment => {
                                                                                return(
                                                                                    <div className="commentMapping" key={comment._id}>
                                                                                        {/*REAL PROFILE WILL BE HERE*/}
                                                                                        <div className="commentProfile"></div>
                                                                                        <span>Simon Baker:</span>
                                                                                        <span>{comment.comment}</span>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="commentFooter"></div>
                                                                </div>
                                                            </div>
                                                            {
                                                                post.imageUrl === "default" ? (<div className='postTitleImg'><p>{post.title}</p></div>) : (<img src={post.imageUrl} alt="Post" />)
                                                            }
                                                        </div>
                                                        <div className="authorActions">
                                                            <div className="like"><i className="fas fa-thumbs-up"></i></div>
                                                            <div className="dislike"><i className="fas fa-thumbs-down"></i></div>
                                                            <div className="report"><i className="fas fa-exclamation-triangle"></i></div>
                                                            <div className="comment" onClick={()=>{this.handleCommentBox(index)}}><i className="fas fa-comment"></i></div>
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

const mapStateToProps = (state) => {
    const {user,token} = state.root;
    const {cropImage, cropImageName} = state.profile;
    return {user,cropImage,cropImageName,token}
}

const mapDispatchToProps = (dispatch) => {
    return(
        {
            userData: (currentUser,token) => {dispatch({type: 'USERS_DATA', user: currentUser, token: token})},
            cropData: () => {dispatch({type: 'CROP_DATA', cropImageName: "default"})}
        }
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Start);
