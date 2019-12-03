import React, { Component } from 'react';
import './Index.css';
import {Link} from 'react-router-dom';
import Front1 from '../Images/1.png';
import Front2 from '../Images/2.jpg';
import SignUp from '../SignUp/SignUp';
import Logo from '../Images/mg02col.png';
import userService from "../../services/user-services";
import auth from '../../auth/auth';
import Helmet from 'react-helmet';
import userStore from "../../Store/stores/user-store";
import $ from 'jquery';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            username: null,
            password: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        userService.login({Email: this.state.username, Password: this.state.password}).then(
            result => {
                if (result) {
                    auth.setAuthenticity(true, result, () => {
                        userStore.dispatch({type: 'USERS_DATA', result: result.data.currentUser});
                        this.props.history.push("/start");
                    });
                }
            }, err => {
                document.getElementById("password").value = "";
                $('#password').css('border', '3px solid rgba(187,0,0,0.6)');
                document.getElementById('PassError').innerHTML = err.response.data.message;
                $('#PassError').css({'background-color':'rgba(187,0,0,0.8)','margin':'0 10% 5%','padding':'20px', 'color': '#fff'});
            }
        );
    };
    render() {
        let addModalClose = () => this.setState({addModalShow: false});
        return (
            <div>
                {/* Page Title */}
                <Helmet>
                    <title>Login | MeetGreet</title>
                </Helmet>
                
                {/* First Wrapper */}
                <div className="Index">
                    <div className='IndexLeft'>
                            <div className="rotating-box">
                                <div className="single-rb">
                                    <div className="front-side">
                                        <img src={Front1} alt="Welcome"/>
                                    </div>
                                    <div className="back-side">
                                        <img src="#" alt=""/>
                                    </div>
                                    <div className="left-side">
                                        <img src={Front2} alt="MeetCube2"/>
                                    </div>
                                    <div className="right-side">
                                        <img src="#" alt=""/>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className='IndexRight'>
                        <div className='polyContent'>
                            <div className='UserCredentials'>
                                <div className='SignBox'>
                                    <div className='SignImage'>
                                        <img src={Logo} alt="logo"/>
                                    </div>
                                    <span><p id='PassError'></p></span>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='formGroup'>
                                            <label htmlFor="Email">Email</label>
                                            <input type="email" id='username' onChange={this.handleChange} value={this.state.username} required/>
                                        </div>
                                        <div className='formGroup'>
                                            <label htmlFor="Password">Password</label>
                                            <input type="password" id='password' onChange={this.handleChange} value={this.state.password} required/>
                                        </div>
                                        <div className='formSubmit'>
                                            <input type="submit" className='SubmitButton' value='Login'/>
                                            <span className='forgot'><Link to='#'>Forgot Password?</Link></span>
                                        </div>
                                    </form>
                                    <div className='metaData'>
                                        <div className='formSubmit'>
                                            <label htmlFor="Password">Not a member yet?</label>
                                            <button className="RegisterButton" onClick={() => {
                                            this.setState({addModalShow: true})
                                            }}>Sign Up
                                            </button>
                                            <SignUp show={this.state.addModalShow} onHide={addModalClose}/>
                                            <div className='signinUsing'>
                                                <label>Or SignIn using: </label>
                                                <span className='g-icon'><Link to="#"><i className="fab fa-google-plus-g"></i></Link></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='polygon'></div>
                        </div>
                    </div>
                </div>

                {/* Connect */}
                <div className="container-fluid col-md-12 connect" align="center">
                    <span className="JOC"><h3>Join our <span className="Us">Community</span></h3></span>
                    <div className="social">
                        <Link to="#"><i className="fab fa-facebook"></i></Link>
                        <Link to="#"><i className="fab fa-twitter"></i></Link>
                        <Link to="#"><i className="fab fa-youtube"></i></Link>
                        <Link to="#"><i className="fab fa-instagram"></i></Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="footer">
                    <div className="container-fluid padding">
                        <div className="row text-center padding">
                            <div className="col-md-4">
                                <hr className="light"/>
                                <h5>MeetGreet</h5>
                                <hr className="light"/>
                                <div className="footer-items">
                                    <p><Link to="#">About MeetGreet</Link></p>
                                    <p><Link to="#">Features</Link></p>
                                    <p><Link to="#">Security</Link></p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <hr className="light"/>
                                <h5>Download</h5>
                                <hr className="light"/>
                                <div className="footer-items">
                                    <p><Link to="#">Windows</Link></p>
                                    <p><Link to="#">Android</Link></p>
                                    <p>Linux</p>
                                    <p>Mac</p>
                                    <p>IPhone & IPad</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <hr className="light"/>
                                <h5>Services</h5>
                                <hr className="light"/>
                                <div className="footer-items">
                                    <p><Link to="#">Team Support</Link></p>
                                </div>
                            </div>
                            <div className="col-12">
                                <hr className="light"/>
                                <h5>Copyright &copy; {new Date().getFullYear()} All rights reserved | <a
                                    className="js-scroll-trigger" href="#logo">MeetGreet</a></h5>
                            </div>

                        </div>
                    </div>
                </footer>

            </div>
        )
    }
}

export default Index;