import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import './SignUp.css';
import userService from "../../services/user-services";
import MGLogo from '../Images/mg02col.png';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: null,
            Email: null,
            Password: null,
            ConfPassword: null,
            Gender: null,
            Dob: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.Password === this.state.ConfPassword) {
            userService.register({
                Name: this.state.Name,
                Email: this.state.Email,
                Password: this.state.Password,
                Gender: this.state.Gender
            }).then(
                user => {
                    this.props.onHide();
                    return alert('Registration Success');
                }, err => {
                    console.error(err.response.data.Errors);
                    alert(err.response.data.message);
                }
            );
        } else {
            alert('Password did not match..!!');
        }
    };

    render() {
        return (
            <Modal {...this.props} className="main-modal" centered>
                <Modal.Header className="modal-head d-flex justify-content-center">
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div className="heading">
                            <img src={MGLogo} alt="MeetGreet"/>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <Modal.Body className="modal-body">
                        <table className="TableSection">
                            <tbody className="modal-tbody">
                            <tr>
                                <td className="thead">Full Name</td>
                                <td><input className="input-field" onChange={this.handleChange} id="Name" type="text"
                                           name="Name" autoComplete="Name" required/></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="thead">Email / Phone</td>
                                <td><input className="input-field" onChange={this.handleChange} id="Email" type="text"
                                           name="Email" autoComplete="Email" required/></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="thead">Password</td>
                                <td><input className="input-field" onChange={this.handleChange} id="Password"
                                           type="password" name="Password" autoComplete="Password" required/></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="thead">Confirm Password</td>
                                <td><input className="input-field" onChange={this.handleChange} id="ConfPassword"
                                           type="password" name="ConfPassword" autoComplete="ConfPassword" required/></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="thead">Gender</td>
                                <td>
                                    <label className="radio-label Gender"><input className="radio-inline m-2"
                                                                          onChange={this.handleChange} id="GenderM"
                                                                          type="radio" name="Gender" value="Male"/>
                                                                          <span className="checkmark"></span>Male</label>
                                    <label className="radio-label Gender"><input className="radio-inline m-2"
                                                                          onChange={this.handleChange} id="GenderF"
                                                                          type="radio" name="Gender" value="Female"/>
                                                                          <span className="checkmark"></span>Female</label>
                                    <label className="radio-label Gender"><input className="radio-inline m-2"
                                                                          onChange={this.handleChange} id="GenderO"
                                                                          type="radio" name="Gender" value="Other"/>
                                                                          <span className="checkmark"></span>Other</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </Modal.Body>
                    <Modal.Footer className="modal-footer d-flex justify-content-center">
                        <input type="submit" className="modal-btn" value="Sign Up"/>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

export default SignUp;
