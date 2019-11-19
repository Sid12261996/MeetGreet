import React, { Component } from 'react';
import Tabs from '../Tabs/Tabs';
import Helmet from 'react-helmet';
import './Settings.css';
import UserImg from '../Images/1.png';

export default class Settings extends Component {
    render() {
        return (
            <div>
                <Helmet>
                <title>Settings</title>
                </Helmet>
                <div className="row m-0">
                    <div className="col-3 settingTab">
                        <div className="col-lg-12 searchcol">
                            <input type="text" placeholder="Find a setting" className="settingSearchInput" />
                        </div>
                        <div className="col-lg-12 SettingTabhead">
                            <h3 className="m-0">Setting Options</h3>
                        </div>
                        <div className="nav flex-column" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className="nav-link SettingTaboptions active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Personal Info</a>
                            <a className="nav-link SettingTaboptions" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                            <a className="nav-link SettingTaboptions" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                            <a className="nav-link SettingTaboptions" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                        </div>
                    </div>
                    <div className="col-9 settingField">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <div className="row m-0">
                                    <div className="col-lg-12">
                                        <h3 className="m-0 mt-2 mb-4">Personal Info</h3>
                                    </div>
                                    <div className="col-lg-12 mb-5 userImageCol">
                                        <img src={UserImg} className="SettingUserImg" />
                                        <div className="imageOverlay"><b>Edit</b></div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label className="userSettingLabels">Your Name:</label>
                                        <input type="text" defaultValue="Name" className="userSettingInputs" />
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label className="userSettingLabels">Email:</label>
                                        <input type="email" defaultValue="any@gmail.com" className="userSettingInputs" />
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label className="userSettingLabels">Mobile:</label>
                                        <input type="number" defaultValue="965085509" className="userSettingInputs" />
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label className="userSettingLabels">Website:</label>
                                        <input type="text" defaultValue="https://ss.dev.com" className="userSettingInputs" />
                                    </div>
                                    <div className="col-lg-12 text-center mt-4 mb-3">
                                        <button className="btn btn-success">Save</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">Coming Soon...</div>
                            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">Coming Soon...</div>
                            <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">Coming Soon...</div>
                        </div>
                    </div>
                </div>
                <Tabs />
            </div>
        )
    }
}
