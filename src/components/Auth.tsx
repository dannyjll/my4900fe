import * as React from 'react';
import { useState } from 'react';
import APIService from './APIService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Auth = () => {
  const apiService = new APIService();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const notifySuccess = (user: any) => toast.success(`Logged in as '${user}'!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const notifyError = (user: any) => toast.error(`Failed to log in as '${user}'.\nPlease validate your credentials.`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    apiService.authenticateLogin({
      "username": username,
      "password": password
    }).then(response => {
      localStorage.clear()
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem('isAuthenticated', 'true');
      notifySuccess(username);
      navigate("/", {replace: true})
    }).catch(error => {
      notifyError(username);})
  };

  return (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-center">Login</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mt-2">
                        <label htmlFor="username">Username:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter your username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label htmlFor="password">Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn border-0 shadow-sm btn-outline-primary btn-block my-2">
                        Login
                      </button>
                    </form>
                    <div className="border-top my-2">
                    <div>
                      <div className="form-group mt-2">
                        <label htmlFor="register">Don't have an account?</label>
                        <br />
                        <button className="btn border-0 shadow-sm btn-outline-success btn-block my-2" onClick={() => navigate('/register')}>
                        Register
                      </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
};

export default Auth;