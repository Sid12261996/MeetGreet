import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './SignUp.css';
import userService from "../../services/user-service";

class SignUp extends Component {
    // constructor(props) {
    //     super(props);
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // userService.register({this.this.state})

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
                            <td><input className="input-field" type="text" name="Name"/></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="thead">Username</td>
                            <td><input className="input-field" type="text" name="Username"/></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="thead">Password</td>
                            <td><input className="input-field" type="password" name="Password" /></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="thead">Confirm Password</td>
                            <td><input className="input-field" type="password" name="ConfPassword" /></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td className="p-2">
                            <label className="radio-label"><input className="radio-inline m-2"type="radio" name="optradio" />Male</label>
                            <label className="radio-label"><input className="radio-inline m-2" type="radio" name="optradio" />Female</label>
                            <label className="radio-label"><input className="radio-inline m-2" type="radio" name="optradio" />Other</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                    
                </Modal.Body>
                <Modal.Footer className="modal-footer d-flex justify-content-center">
                    <input type="submit" className="modal-btn" value="SignUp / Register" />
                </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

export default SignUp;
