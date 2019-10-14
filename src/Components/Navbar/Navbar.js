import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import env from '../../environment'

class Navbar extends Component{
    render(){
    return(
        <div>
            <nav className="navbar navbar-expand-md navbar-light" id="logo">
                <Link className="navbar-brand mx-auto" to={'/'}>
                    <img className="LogoMG2" src= {`${env.logo}`} alt="Logo" />
                </Link>
            </nav>
        </div>
        )
    }
}

export default Navbar;
