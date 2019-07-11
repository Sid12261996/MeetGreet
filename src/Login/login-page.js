import React from 'react';
import './login.css';
import mg02 from './Img/mg02.png';
import a from './Img/1.jpg';
import b from './Img/2.jpg';
import c from './Img/3.jpg';
import d from './Img/4.jpg';

function Login() {
  return (
    <div>

    <div class="modal fade" id="showModal" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
    	<div class="modal-content">
    	<div class="modal-header">
    	<span class="Sup"><h5>SignUp</h5></span>
    	<button type="button" class="close" data-dismiss="modal"  aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    	<form action="Register.php" method="post">
    		<div class="modal-body text-center">
    			<table align="center" cellpadding="8px">
    				<tr>
    				<td>First Name</td>
    				</tr>
    				<tr>
    				<td><input type="text" name="firstname" required /></td>
    				</tr>
    				<tr>
    				<td>Last Name</td>
    				</tr>
    				<tr>
    				<td><input type="text" name="lastname" required /></td>
    				</tr>
    				<tr>
    				<td>Email</td>
    				</tr>
    				<tr>
    				<td><input type="email" name="username" required /></td>
    				</tr>
    				<tr>
    				<td>Password</td>
    				</tr>
    				<tr>
    				<td><input type="password" name="password" required /></td>
    				</tr>
            <tr>
    				<td>Confirm Password</td>
    				</tr>
    				<tr>
    				<td><input type="password" name="Cpassword" required /></td>
    				</tr>

    			</table>
    		</div>

    		<div class="modal-footer">
    			<input id="bg3" type="submit" value="Register" name="submit" />
    		</div>

    	</form>
    </div>
    </div>
    </div>

    <nav class="navbar navbar-expand-md navbar-light" id="logo">
	<a class="navbar-brand mx-auto" href="http://192.168.43.239/MG/Home.php">
	<img class="LogoMG2" src={mg02} alt="Logo" />
	</a>
</nav>


<div class="body-container container-fluid padding">
	<div class="row flex-row-reverse padding">

	<div class="col-md-8 order-last">
    <div class="rotating-box">
    <div class="single-rb">
      <div class="front-side">
        <img src={a} alt="" />
      </div>
      <div class="back-side">
        <img src={b} alt="" />
      </div>
      <div class="left-side">
        <img src={c} alt="" />
      </div>
      <div class="right-side">
        <img src={d} alt="" />
      </div>
      <div class="top-side">
        <img src="" alt="" />
      </div>
      <div class="bottom-side">
        <img src="" alt="" />
      </div>
    </div>
  </div>
	</div>

	<div class="signin col-md-4 order-first" align="center">
		<form class="sign" action="Validation.php" method="post">
		<span class="JOC"><h1>Sign In</h1></span>
			<table align="center" cellpadding="8px">
				<tr>
				<td>Username</td>
				<td><input type="text" name="username" required /></td>
				</tr>
				<tr>
				<td>Password</td>
				<td><input type="password" name="password" /></td>
				</tr>
				<tr>
				<td></td>
				<td><input class="bg2" type="submit" value="Login" />
				<span class="forgot"><a href="">Forgot Password?</a></span>
				</td>
				</tr>

			<tr colspan="2">
			<td>
			<span class="social-signin-text">Or SignIn using:</span>
			</td>
			<td>
			<div class="social-signin">

				<a href="#"><i class="fab fa-google-plus-g"></i></a>

			</div>
			</td>
			</tr>
			</table>
		</form>
		<div class="NotAMem">
		<p>Not a member yet?</p>
		<button class="bg" type="button" data-toggle="modal" data-target="#showModal">Sign Up</button>
		</div>
	</div>
	</div>
</div>

<div class="container-fluid col-md-12" align="center">
	<span class="JOC"><h3>Join our <span class="Us">Community</span></h3></span>
	<div class="social">
				<a href="#"><i class="fab fa-facebook"></i></a>
				<a href="#"><i class="fab fa-twitter"></i></a>
				<a href="#"><i class="fab fa-youtube"></i></a>
				<a href="#"><i class="fab fa-google-plus-g"></i></a>
				<a href="#"><i class="fab fa-instagram"></i></a>
	</div>
</div>

<footer class="footer">
<div class="container-fluid padding">
<div class="row text-center padding">
	<div class="col-md-4">
  <hr class="light" />
		<h5>MeetGreet</h5>
		<hr class="light" />
    <div class="footer-items">
		<p><a href="">About MeetGreet</a></p>
		<p><a href="">Features</a></p>
		<p><a href="">Security</a></p>
  </div>
	</div>
	<div class="col-md-4">
	<hr class="light" />
		<h5>DOWNLOAD</h5>
		<hr class="light" />
    <div class="footer-items">
		<p><a href="">Windows</a></p>
		<p><a href="">Android</a></p>
		<p>Linux (Currently N/A)</p>
		<p>Mac (Currently N/A)</p>
		<p>IPhone & IPad (Currently N/A)</p>
  </div>
	</div>
	<div class="col-md-4">
	<hr class="light" />
		<h5>Service Provided</h5>
		<hr class="light" />
    <div class="footer-items">
		<p><a href="">Team Support</a></p>
		<p>City, State, 122001</p>
		<p>City, State, 122001</p>
		<p>City, State, 122001</p>
  </div>
	</div>
	<div class="col-12">
		<hr class="light" />
		<h5><a class="js-scroll-trigger" href="#logo">&copy; MeetGreet.com</a></h5>
	</div>

</div>
</div>
</footer>

</div>
  );
}

export default Login;
