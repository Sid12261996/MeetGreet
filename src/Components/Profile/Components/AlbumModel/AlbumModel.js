import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import "./AlbumModel.css";

class AlbumModel extends Component {

    //Function Not Available
    handleNotAvailable = () => {
        alert('This feature is currently unavailable.');
    };
    render() {
        return (
            <Modal
                {...this.props}
                show={this.props.show}
                size="xl"
                // onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                className="modelAlbum"
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="modelHeadWrapper">
                            <span><h1 className='modelHead'>Add Photos</h1></span>
                            <div className="headButtons">
                                <h3 className="ModelBrowseBtn" onClick={this.handleNotAvailable}>Browse</h3>
                                <h3 className="ModelDoneBtn" onClick={this.props.onHide}>Done</h3>
                                <i className="fas fa-times" onClick={this.props.onHide}></i>
                            </div>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modelBody">

                </Modal.Body>
            </Modal>
        );
    }
}

export default AlbumModel;