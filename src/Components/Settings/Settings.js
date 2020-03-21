import React, { Component } from 'react';
import Tabs from '../Tabs/Tabs';
import Sidebar from "../Sidebar/Sidebar";
import SettingsService from '../../services/settings-service';
import Helmet from 'react-helmet';
import './Settings.css';
import $ from 'jquery';

export default class Settings extends Component {

    onFirstClick = () => {
        const settingsService = new SettingsService();
            $('.rightUp').css({'height':'80%'});
            settingsService.DataShift('.first','80%','100%','#fff');
            // $('.first').css({'width':'80%','height':'100%','background-color':'#fff'});
            $('.second').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
            $('.rightDown').css({'height':'20%'});
            $('.third').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
            $('.fourth').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
            // $('.settings-heading1').css({'display':'none'});
            // $('.settings-data1').css({'display':'flex'});
    };

    onSecondClick = () => {
        $('.rightUp').css({'height':'80%'});
        $('.first').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.second').css({'width':'80%','height':'100%','background-color':'#fff'});
        $('.rightDown').css({'height':'20%'});
        $('.third').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.fourth').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        // $('.settings-heading2').css({'display':'none'});
        // $('.settings-data2').css({'display':'flex'});
    };

    onThirdClick = () => {
        $('.rightUp').css({'height':'20%'});
        $('.first').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.second').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.rightDown').css({'height':'80%'});
        $('.third').css({'width':'80%','height':'100%','background-color':'#fff'});
        $('.fourth').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        // $('.settings-heading3').css({'display':'none'});
        // $('.settings-data3').css({'display':'flex'});
    };

    onFourthClick = () => {
        $('.rightUp').css({'height':'20%'});
        $('.first').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.second').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.rightDown').css({'height':'80%'});
        $('.third').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.fourth').css({'width':'80%','height':'100%','background-color':'#fff'});
        // $('.settings-heading4').css({'display':'none'});
        // $('.settings-data4').css({'display':'flex'});
    };


    render() {
        return (
            <div>
                <Helmet>
                <title>Settings</title>
                </Helmet>
                <div className='settings'>
                    <div className='settingContent'>
                        <div className='settingRight'>
                            <div className='rightContent'>
                                <div className='rightUp'>
                                    <div className='first' onClick={this.onFirstClick}>
                                        <h4>Personal</h4>
                                        {/*<div className="settings-heading1">*/}
                                        {/*    <h4>Personal</h4>*/}
                                        {/*</div>*/}
                                        {/*<div className="settings-data1">*/}
                                        {/*    Data*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className='second' onClick={this.onSecondClick}>
                                        <h4>Security</h4>
                                        {/*<div className="settings-heading2">*/}
                                        {/*    <h4>Security</h4>*/}
                                        {/*</div>*/}
                                        {/*<div className="settings-data2">*/}
                                        {/*    Data*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                <div className='rightDown'>
                                    <div className='third' onClick={this.onThirdClick}>
                                        <h4>Privacy</h4>
                                        {/*<div className="settings-heading3">*/}
                                        {/*    <h4>Privacy</h4>*/}
                                        {/*</div>*/}
                                        {/*<div className="settings-data3">*/}
                                        {/*    Data*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className='fourth' onClick={this.onFourthClick}>
                                        <h4>Help Center</h4>
                                        {/*<div className="settings-heading4">*/}
                                        {/*    <h4>Help Center</h4>*/}
                                        {/*</div>*/}
                                        {/*<div className="settings-data4">*/}
                                        {/*    Data*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SIDEBAR */}
                    <Sidebar />
                </div>
                <Tabs />
            </div>
        )
    }
}
