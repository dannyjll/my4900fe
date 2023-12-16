import * as React from 'react';
import { useState } from 'react';
import APIService from './APIService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Register = () => {
  const apiService = new APIService();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const navigate = useNavigate()

  const notifySuccess = (title: string) => toast.success(`Account '${title}' was successfully created!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyError = (title: string) => toast.error(`Account '${title}' failed to be created!`, {
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
    apiService.registerUser({
      "username": username,
      "password": password,
      "password2": password2,
      "email": email,
      "first_name": firstname,
      "last_name" : lastname, 
    }).then(response => {
        localStorage.clear()
        navigate("/auth", {replace: true})
        notifySuccess(username)
    }).catch(error => {
        console.error(error)
        notifyError(username)
    })
  };

  return (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-center">Register</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
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
                      <div className="form-group">
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
                      <div className="form-group">
                        <label htmlFor="password2">Confirm Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password2"
                          placeholder="Enter your password again"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="firstname">First Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          placeholder="Enter your first name"
                          value={firstname}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          placeholder="Enter your last name"
                          value={lastname}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block mt-2">
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
};

export default Register;