import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

class Navbar extends Component{
    render(){
    return(
        <div>
            <nav className="navbar navbar-expand-md navbar-light" id="logo">
                <Link className="navbar-brand mx-auto">
                    <img className="LogoMG2" src="#" alt="Logo" />
                </Link>
            </nav>
        </div>
        )
    }
}

export default Navbar;