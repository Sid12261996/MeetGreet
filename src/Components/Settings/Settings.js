import React, { Component } from 'react';
import Tabs from '../Tabs/Tabs';
import Sidebar from "../Sidebar/Sidebar";
import Helmet from 'react-helmet';
import './Settings.css';
import $ from 'jquery';

export default class Settings extends Component {

    onFirstClick = () => {
            $('.rightUp').css({'height':'80%'});
            $('.first').css({'width':'80%','height':'100%','background-color':'#fff'});
            $('.second').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
            $('.rightDown').css({'height':'20%'});
            $('.third').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
            $('.fourth').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
    }

    onSecondClick = () => {
        $('.rightUp').css({'height':'80%'});
        $('.first').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.second').css({'width':'80%','height':'100%','background-color':'#fff'});
        $('.rightDown').css({'height':'20%'});
        $('.third').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.fourth').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
    }

    onThirdClick = () => {
        $('.rightUp').css({'height':'20%'});
        $('.first').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.second').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.rightDown').css({'height':'80%'});
        $('.third').css({'width':'80%','height':'100%','background-color':'#fff'});
        $('.fourth').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
    }

    onFourthClick = () => {
        $('.rightUp').css({'height':'20%'});
        $('.first').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.second').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.rightDown').css({'height':'80%'});
        $('.third').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)'});
        $('.fourth').css({'width':'80%','height':'100%','background-color':'#fff'});
    }


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
                                    </div>
                                    <div className='second' onClick={this.onSecondClick}>
                                        <h4>Security</h4>
                                    </div>
                                </div>
                                <div className='rightDown'>
                                    <div className='third' onClick={this.onThirdClick}>
                                        <h4>Privacy</h4>
                                    </div>
                                    <div className='fourth' onClick={this.onFourthClick}>
                                        <h4>Help Center</h4>
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
