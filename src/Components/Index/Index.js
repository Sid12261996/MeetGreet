import React, { Component } from 'react';
import './Index.css';
import {Link} from 'react-router-dom';
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
            password: null,
            loginError: ''
        }
    }

    handleChange = (e) => {
        $('#PassError').css({'display':'none'});
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
                        userStore.dispatch({type: 'USERS_DATA', result: result.data.currentUser, token: result.data.token});
                        let userData = userStore.getState().root.user;
                        this.props.history.push(`/${userData._id}/start`);
                    });
                }
            }, err => {
                document.getElementById("password").value = "";
                this.setState({
                    ...this.state,
                    loginError: err.response.data.message
                });
                $('#PassError').css({'display':'flex','animation' : 'slideError 5s ease-in forwards'});
            }
        );
    };
    render() {
        let addModalClose = () => this.setState({addModalShow: false});
        return (
            <div className="IndexHolder">
                {/* Page Title */}
                <Helmet>
                    <title>Login | MeetGreet</title>
                </Helmet>
                
                {/* First Wrapper */}
                <div className="Index">
                    <span><p id='PassError'>{this.state.loginError}</p></span>
                    <div className='IndexLeft'>
                            {/*To be filled*/}
                            <h1>Stay Tuned....</h1>
                    </div>
                    <div className='IndexRight'>
                        <div className='polyContent'>
                            <div className='UserCredentials'>
                                <div className='SignBox'>
                                    <div className='SignImage'>
                                        <img src={Logo} alt="logo"/>
                                    </div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='formGroup'>
                                            <label htmlFor="Email">Email</label>
                                            <input type="email" id='username' onChange={this.handleChange} value={this.state.username != null ? this.state.username : ""} required/>
                                        </div>
                                        <div className='formGroup'>
                                            <label htmlFor="Password">Password</label>
                                            <input type="password" id='password' onChange={this.handleChange} value={this.state.password != null ? this.state.password : ""} required/>
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
                            <div className='polygon'/>
                        </div>
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
