import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import "./CropModel.css";
import ReactCrop from "react-image-crop";
import ImageService from "../../../../services/image-service";
import userService from "../../../../services/user-services";
import auth from '../../../../auth/auth';

class CropModel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crop: {
                unit: '%',
                width: 100,
                height: 100,
                aspect: 4 / 4,
            },
            croppedImageUrl: '',
            fileName: ''
        }
    }

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({...this.state, crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({...this.state, croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                // blob.name = fileName;
                // window.URL.revokeObjectURL(this.fileUrl);
                // this.fileUrl = window.URL.createObjectURL(blob);
                this.setState({
                    ...this.state,
                    fileName: fileName
                });
                resolve(blob);
            }, 'image/jpeg');
        });
    }

    changeProfileDP = () => {
        let userData = this.props.user;
        let files = this.state.croppedImageUrl;
        let fileName = this.state.fileName;
        var formObj = new File([files] , fileName);
        let formData = new FormData();
        formData.append('file', formObj);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        if (this.props.imageType === 1) {
            ImageService.upload(formData, config).then(DPUrl => {
                ImageService.ProfilePic(userData._id, DPUrl.data).then(() => {
                    userService.fetchData(userData._id).then((currentUser) => {
                        auth.updateAuthencity(true, currentUser, () => {
                            this.props.userdata(currentUser.data.data);
                            this.props.onHide();
                            window.location.reload(false);
                        });
                    }, er => {
                        console.log(er);
                    });
                }, error => {
                    console.log(error);
                });
            }, err => {
                console.log(err);
            });
        }
        if (this.props.imageType === 2) {
            ImageService.upload(formData, config).then(CPUrl => {
                ImageService.CoverPic(userData._id, CPUrl.data).then(() => {
                    userService.fetchData(userData._id).then((currentUser) => {
                        auth.updateAuthencity(true, currentUser, () => {
                            this.props.userdata(currentUser.data.data);
                            this.props.onHide();
                            window.location.reload(false);
                        });
                    }, er => {
                        console.log(er);
                    });
                }, error => {
                    console.log(error);
                });
            }, err => {
                console.log(err);
            });
        }
        if (this.props.imageType === 3) {
            this.props.cropData(files,fileName);
            this.props.onHide();
        }
    };

    //Function Not Available
    handleNotAvailable = () => {
        alert('This feature is currently unavailable.');
    };
    render() {
        const { src } = this.props;
        const { crop } = this.state;
        return (
            <Modal
                {...this.props}
                show={this.props.show}
                size="lg"
                // onHide={() => setShow(false)}
                dialogClassName="modal-90w"
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="cropModelHeader">
                            <h3>Crop Image</h3>
                            <i className="fas fa-times" onClick={this.props.onHide}></i>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modelCBody">
                    {src && (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            locked
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                            className="CropBlock"
                        />
                    )}
                    <div className="modalCropBtn">
                        <button onClick={this.changeProfileDP}>Done</button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state.root;
    return {user}
}

const mapDispatchToProps = (dispatch) => {
    return(
        {
            userData: (currentUser) => {dispatch({type: 'USERS_DATA', user: currentUser})},
            cropData: (file,fileName) => {dispatch({type: 'CROP_DATA', cropImage: file, cropImageName: fileName})}
        }
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(CropModel);