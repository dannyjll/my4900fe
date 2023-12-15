import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    var imageBasePath = window.location.protocol + "//" + window.location.host;
    var img = imageBasePath + '/bgpngtransparent.png'
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear();
        navigate("/", { replace: true });
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
            <img className="img-thumbnail img-fluid mx-auto d-block" src={img} style={{ width: 40 }} alt="HoneyDo Logo" />
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav">
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
                        // If user is not authenticated, show "Login" link
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