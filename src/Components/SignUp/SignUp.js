import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div className="heading">
                            <h1>Sign Up</h1>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleSubmit}>
                <Modal.Body>
                <table className="TableSection">
                    <tbody>
                        <tr>
                            <td className="Namediv">Name</td>
                            <td><input type="text" name="Name"/></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td><input type="text" name="Username"/></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" name="Password" /></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Confirm Password</td>
                            <td colSpan={2}><input type="password" name="ConfPassword" /></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td className="p-2"><label className="radio-inline m-2"><input type="radio" name="optradio" />Male</label>
                            <label className="radio-inline m-2"><input type="radio" name="optradio" />Female</label>
                            <label className="radio-inline m-2"><input type="radio" name="optradio" />Other</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                    
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <input type="submit" varient="warning" className="btn btn-warning" />
                </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

export default SignUp;