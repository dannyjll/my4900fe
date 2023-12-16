import { auto } from '@popperjs/core';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const imageBasePath = window.location.protocol + "//" + window.location.host;
    const img = imageBasePath + '/bgpngtransparent.png';
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const navigate = useNavigate();

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const logout = () => {
        localStorage.clear();
        navigate("/", { replace: true });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
            <img className="img-thumbnail img-fluid mx-auto d-block" src={img} style={{ width: 40 }} alt="HoneyDo Logo" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}/>
            <div className={`navbar-collapse ${isNavCollapsed ? 'collapse justify-content-end' : 'justify-content-end'} `} id="navbarNavDropdown" style={{ transition: 'height 0.5s ease' }} >
                <ul className={`navbar-nav ${isNavCollapsed ? '' : 'text-center'}`}>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mygroups">Groups</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/myboards">Boards</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mytasks">Tasks</Link>
                    </li>
                    {isAuthenticated === 'true' ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/myprofile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/auth" onClick={logout}>Logout</Link>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/auth">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
