import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './SignUp.css';
import userService from "../../services/user-services";

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            Name : null,
            Email : null,
            Password : null,
            ConfPassword : null,
            Gender : null,
            Dob: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.Password === this.state.ConfPassword){
            userService.register({ Name: this.state.Name, Email: this.state.Email, Password: this.state.Password, Gender : this.state.Gender}).then(
            () => {
                return alert('Registration Success');
            }, err => {
                console.log(err.response.data);
            }
        );
        }
        else{
            alert('Password did not match..!!');
        }
    };

    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header className="modal-head d-flex justify-content-center">
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div className="heading">
                            <h2>Welcome to MeetGreet</h2>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleSubmit}>
                <Modal.Body className="modal-body">
                <table className="TableSection">
                    <tbody className="modal-tbody">
                        <tr>
                            <td className="thead">Name</td>
                            <td><input className="input-field" onChange={this.handleChange} id="Name" type="text" name="Name"/></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="thead">Username</td>
                            <td><input className="input-field" onChange={this.handleChange} id="Email" type="text" name="Email"/></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="thead">Password</td>
                            <td><input className="input-field" onChange={this.handleChange} id="Password" type="password" name="Password" /></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="thead">Confirm Password</td>
                            <td><input className="input-field" onChange={this.handleChange} id="ConfPassword" type="password" name="ConfPassword" /></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td className="p-2">
                            <label className="radio-label"><input className="radio-inline m-2" onChange={this.handleChange} id="GenderM" type="radio" name="Gender" value="Male" />Male</label>
                            <label className="radio-label"><input className="radio-inline m-2" onChange={this.handleChange} id="GenderF" type="radio" name="Gender" value="Female" />Female</label>
                            <label className="radio-label"><input className="radio-inline m-2" onChange={this.handleChange} id="GenderO" type="radio" name="Gender" value="Other" />Other</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                    
                </Modal.Body>
                <Modal.Footer className="modal-footer d-flex justify-content-center">
                    <input type="submit" className="modal-btn" value="Register" />
                </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

export default SignUp;
