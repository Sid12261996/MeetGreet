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

	handleFirstSubmit = (e) => {
		e.preventDefault();
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
											<div className="SDataWrapper">
												<div className="SData">
													<ul>
														<li>
															<h5>NAME</h5>
															<p>After updating Name, user can change it again after a month.</p>
															<div className="userName">
																<form onSubmit={this.handleFirstSubmit}>
																	<div className="newUserName">
																		<label htmlFor="newName">Full Name</label>
																		<input type="text" name="newName" />
																	</div>
																	<input type="submit" value="OK"/>
																</form>
															</div>
														</li>
														<li>
															<h5>PROFESSION</h5>
															<p>Your Profession that defines you.</p>
															<div className="userProfession">
																<form onSubmit={this.handleFirstSubmit}>
																	<div className="newUserProfession">
																		<label htmlFor="newProfession">Profession</label>
																		<input type="text" name="newProfession" />
																	</div>
																	<input type="submit" value="OK"/>
																</form>
															</div>
														</li>
														<li>
															<h5>NOTIFICATION SETTINGS</h5>
															<p>Under Research.</p>
														</li>
														<li>
															<h5>ADVERTISEMENT SETTINGS</h5>
															<p>Under Research.</p>
														</li>
													</ul>
												</div>
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
											<div className="SDataWrapper">
												<div className="SData">
													<ul>
														<li>
															<h5>EMAIL</h5>
															<p>Your Email is important for security purpose as well as for login.</p>
															<div className="userEmail">
																<form onSubmit={this.handleFirstSubmit}>
																	<div className="newUserEmail">
																		<label htmlFor="newEmail">New Email</label>
																		<input type="text" name="newEmail" />
																	</div>
																	<input type="submit" value="OK"/>
																</form>
															</div>
														</li>
														<li>
															<h5>PASSWORD</h5>
															<p>Password should be of maximum 8 letters including 1 unique letter and 1 number.</p>
															<div className="userPassword">
																<form onSubmit={this.handleFirstSubmit}>
																	<div className="DivPass1">
																		<div className="currentUserPassword">
																			<label htmlFor="currentPassword">Current Password</label>
																			<input type="text" name="currentPassword" />
																		</div>
																	</div>
																	<div className="DivPass2">
																		<div className="newUserPassword">
																			<label htmlFor="newPassword">New Password</label>
																			<input type="text" name="newPassword" />
																		</div>
																	</div>
																	<div className="DivPass2">
																		<div className="newUserCPassword">
																			<label htmlFor="newCPassword">Confirm New Password</label>
																			<input type="text" name="newCPassword" />
																		</div>
																		<input type="submit" value="OK"/>
																	</div>
																</form>
															</div>
														</li>
													</ul>
												</div>
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
											<div className="SDataWrapper">
												<div className="SData">
													<ul>
														<li>
															<h5>Cookie Policy</h5>
															<p>Please visit our Cookie Policy page to know more.</p>
															<button className="HelpButtons" onClick={this.handleFirstSubmit}>View</button>
														</li>
														<li>
															<h5>Terms & Services</h5>
															<p>Please visit our Terms & Services page to know more.</p>
															<button className="HelpButtons" onClick={this.handleFirstSubmit}>View</button>
														</li>
														<li>
															<h5>Data Policy</h5>
															<p>Please visit our Data Policy page to know more.</p>
															<button className="HelpButtons" onClick={this.handleFirstSubmit}>View</button>
														</li>
													</ul>
												</div>
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
