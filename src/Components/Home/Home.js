import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './Home.css';
import SignUp from '../SignUp/SignUp';
import Navbar from '../Navbar/Navbar';
import userService from "../../services/user-services";
import auth from '../../services/auth';
import {connect} from 'react-redux';


class Home extends Component {
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
                if(result){
                    auth.login(()=>{
                        this.props.user(result);
                        console.log(this.props);
                        this.props.history.push("/start");
                    });
                }
            }, err => {
                alert(err.response.data.message);
                document.getElementById("password").value = "";
            }
        );
    };

    render() {
        let addModalClose = () => this.setState({addModalShow: false});
        return (
            <div className="wrapper">
            {/* Navbar Starts */}

                <Route exact path="/" component={Navbar} />

            {/* Home Body */}
                <div className="body-container container-fluid padding">
                    <div className="row flex-row-reverse padding">

                        <div className="col-md-8 order-last">
                            <div className="rotating-box">
                                <div className="single-rb">
                                    <div className="front-side">
                                        <img src="#" alt=""/>
                                    </div>
                                    <div className="back-side">
                                        <img src="#" alt=""/>
                                    </div>
                                    <div className="left-side">
                                        <img src="#" alt=""/>
                                    </div>
                                    <div className="right-side">
                                        <img src="#" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="signin col-md-4 order-first" align="center">
                            <form className="sign" onSubmit={this.handleSubmit}>
                                <span className="JOC"><h1>Sign In</h1></span>
                                <table align="center" cellPadding="8px">
                                    <tbody>
                                    <tr>
                                        <td>Username</td>
                                        <td><input className="userinput" type="text" id="username"
                                                   onChange={this.handleChange} value={this.state.username} required/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Password</td>
                                        <td><input className="userinput" type="password" id="password"
                                                   onChange={this.handleChange} value={this.state.password}/></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="spectr">
                                            <input className="bg2" type="submit" value="Login"/>
                                            <span className="forgot"><a href="">Forgot Password?</a></span>
                                        </td>
                                    </tr>

                                    <tr colSpan="2">
                                        <td>
                                            <span className="social-signin-text">Or SignIn using:</span>
                                        </td>
                                        <td>
                                            <div className="social-signin">

                                                <a href="#"><i className="fab fa-google-plus-g"></i></a>

                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </form>
                            <div className="NotAMem">
                                <p>Not a member yet?</p>
                                <button className="bg" onClick={() => {
                                    this.setState({addModalShow: true})
                                }}>Sign Up
                                </button>
                                <SignUp show={this.state.addModalShow} onHide={addModalClose}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid col-md-12" align="center">
                    <span className="JOC"><h3>Join our <span className="Us">Community</span></h3></span>
                    <div className="social">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-youtube"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                <footer className="footer">
                    <div className="container-fluid padding">
                        <div className="row text-center padding">
                            <div className="col-md-4">
                                <hr className="light"/>
                                <h5>MeetGreet</h5>
                                <hr className="light"/>
                                <div className="footer-items">
                                    <p><a href="#">About MeetGreet</a></p>
                                    <p><a href="#">Features</a></p>
                                    <p><a href="#">Security</a></p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <hr className="light"/>
                                <h5>Download</h5>
                                <hr className="light"/>
                                <div className="footer-items">
                                    <p><a href="#">Windows</a></p>
                                    <p><a href="#">Android</a></p>
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
                                    <p><a href="#">Team Support</a></p>
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
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        user : (result) => { dispatch({type: 'USERS_DATA', result : result})}
    }
}

export default connect(null,mapDispatchToProps)(Home);
