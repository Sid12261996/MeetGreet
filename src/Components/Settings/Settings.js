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
		$('.first').css({'width':'80%','height':'100%','background-color':'#fff','cursor':'default'});
		$('.second').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});
		$('.rightDown').css({'height':'20%'});
		$('.third').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});
		$('.fourth').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});

		settingsService.HideDiv('.settings-heading1','.settings-data1');
		settingsService.HideDivRevert('.settings-data2','.settings-heading2');
		settingsService.HideDivRevert('.settings-data3','.settings-heading3');
		settingsService.HideDivRevert('.settings-data4','.settings-heading4');
	};

	onSecondClick = () => {
		const settingsService = new SettingsService();

		$('.rightUp').css({'height':'80%'});
		$('.first').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});
		$('.second').css({'width':'80%','height':'100%','background-color':'#fff','cursor':'default'});
		$('.rightDown').css({'height':'20%'});
		$('.third').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});
		$('.fourth').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});

		settingsService.HideDiv('.settings-heading2','.settings-data2');
		settingsService.HideDivRevert('.settings-data1','.settings-heading1');
		settingsService.HideDivRevert('.settings-data3','.settings-heading3');
		settingsService.HideDivRevert('.settings-data4','.settings-heading4');
	};

	onThirdClick = () => {
		const settingsService = new SettingsService();

		$('.rightUp').css({'height':'20%'});
		$('.first').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});
		$('.second').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});
		$('.rightDown').css({'height':'80%'});
		$('.third').css({'width':'80%','height':'100%','background-color':'#fff','cursor':'default'});
		$('.fourth').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});

		settingsService.HideDiv('.settings-heading3','.settings-data3');
		settingsService.HideDivRevert('.settings-data2','.settings-heading2');
		settingsService.HideDivRevert('.settings-data1','.settings-heading1');
		settingsService.HideDivRevert('.settings-data4','.settings-heading4');
	};

	onFourthClick = () => {
		const settingsService = new SettingsService();

		$('.rightUp').css({'height':'20%'});
		$('.first').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});
		$('.second').css({'width':'80%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});
		$('.rightDown').css({'height':'80%'});
		$('.third').css({'width':'20%','height':'100%','background-color':'rgba(127,127,127,0.5)','cursor':'pointer'});
		$('.fourth').css({'width':'80%','height':'100%','background-color':'#fff','cursor':'default'});

		settingsService.HideDiv('.settings-heading4','.settings-data4');
		settingsService.HideDivRevert('.settings-data2','.settings-heading2');
		settingsService.HideDivRevert('.settings-data3','.settings-heading3');
		settingsService.HideDivRevert('.settings-data1','.settings-heading1');
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
										{/*<h4>Personal</h4>*/}
										<div className="settings-heading1">
											<h4>Personal</h4>
										</div>
										<div className="settings-data1">
											<div className="SHeading">
												<h4>Personal</h4>
											</div>
										</div>
									</div>
									<div className='second' onClick={this.onSecondClick}>
										<div className="settings-heading2">
											<h4>Security</h4>
										</div>
										<div className="settings-data2">
											<div className="SHeading">
												<h4>Security</h4>
											</div>
										</div>
									</div>
								</div>
								<div className='rightDown'>
									<div className='third' onClick={this.onThirdClick}>
										<div className="settings-heading3">
											<h4>Privacy</h4>
										</div>
										<div className="settings-data3">
											<div className="SHeading">
												<h4>Privacy</h4>
											</div>
										</div>
									</div>
									<div className='fourth' onClick={this.onFourthClick}>
										<div className="settings-heading4">
											<h4>Help Center</h4>
										</div>
										<div className="settings-data4">
											<div className="SHeading">
												<h4>Help Center</h4>
											</div>
										</div>
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
