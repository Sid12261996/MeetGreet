import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Front1 from '../Images/1.png';
import Front2 from '../Images/2.jpg';
import './Home.css';
import SignUp from '../SignUp/SignUp';
import Navbar from '../Navbar/Navbar';
import userService from "../../services/user-services";
import auth from '../../auth/auth';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import userStore from "../../Store/stores/user-store";

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
                if (result) {
                    auth.setAuthenticity(true, result, () => {
                        userStore.dispatch({type: 'USERS_DATA', result: result.data.currentUser});
                        this.props.history.push("/start");
                    });
                }
            }, err => {
                alert(err.response.data.message);
                console.error(err.response.data);
                document.getElementById("password").value = "";
            }
        );
    };

    render() {
        let addModalClose = () => this.setState({addModalShow: false});
        return (
            <div className="wrapper">
                {/* Page Title */}
                <Helmet>
                    <title>Login | MeetGreet</title>
                </Helmet>

                {/* Navbar Starts */}
                <Route exact path="/" component={Navbar}/>

                {/* Home Body */}
                <div className="body-container container-fluid padding">
                    <div className="row flex-row-reverse padding">

                        <div className="col-md-8 order-last">
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
                                            <span className="forgot"><Link to="#">Forgot Password?</Link></span>
                                        </td>
                                    </tr>

                                    <tr colSpan="2">
                                        <td>
                                            <span className="social-signin-text">Or SignIn using:</span>
                                        </td>
                                        <td>
                                            <div className="social-signin">

                                                <Link to="#"><i className="fab fa-google-plus-g"></i></Link>

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
                        <Link to="#"><i className="fab fa-facebook"></i></Link>
                        <Link to="#"><i className="fab fa-twitter"></i></Link>
                        <Link to="#"><i className="fab fa-youtube"></i></Link>
                        <Link to="#"><i className="fab fa-instagram"></i></Link>
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
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        user: (result) => {
            dispatch({type: 'USERS_DATA', result: result})
        }
    }
};

export default connect(null, mapDispatchToProps)(Home);
