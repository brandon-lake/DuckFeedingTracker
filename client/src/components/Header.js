import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <header className="mt-2">
                <h1>Duck Feeding Tracker</h1>
            </header>
            <nav className="navbar navRow navbar-dark bg-dark justify-content-center" >
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/view">View Feedings</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/add">Add a Feeding</NavLink>
                    </li>
                </ul>
			</nav>
        </div>
    );
};

export default Header;
