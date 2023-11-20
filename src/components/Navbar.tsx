import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear();
        navigate("/", {replace: true});
      };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <img className="img-thumbnail img-fluid mx-auto d-block" src="bgpngtransparent.png" style={{ width: 30 }} alt="HoneyDo Logo" />
            <h1 className="navbar-brand">HoneyDo</h1>
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
                        // If user is authenticated, show "Logout" link
                        <li className="nav-item">
                            <Link className="nav-link" to="/auth" onClick={logout}>Logout</Link>
                        </li>
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