import * as React from 'react';
import { useState, useEffect } from 'react';
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

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstnameError, setFirstNameError] = useState('');
  const [lastnameError, setLastNameError] = useState('');

  const isButtonDisabled = !(usernameError.length < 1 && passwordError.length < 1 && emailError.length < 1 && firstnameError.length < 1 && lastnameError.length < 1);

  useEffect(() => {
    setUsernameError('Validate your username');
    setPasswordError('Validate your password');
    setEmailError('Validate your email');
    setFirstNameError('Validate your firstname');
    setLastNameError('Validate your lastname');
    document.title = 'Register'
  }
  )

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === 'username') {
      if (value.trim() === '' || value.length > 150) {
        setUsernameError('Validate your username');
      } else {
        setUsernameError('');
      }
    }

    if (name === 'password') {
      if (value.trim() === '' || value.length < 6) {
        setPasswordError('Validate your password');
      } else {
        setPasswordError('');
      }
    }

    if (name === 'email') {
      if (value.trim() === '' || !value.includes('@') || !value.includes('.com')) {
        setEmailError('Validate your email');
      } else {
        setEmailError('');
      }
    }

    if (name === 'firstname') {
      if (value.trim() === '' || value.length > 150) {
        setFirstNameError('Validate your firstname');
      } else {
        setFirstNameError('');
      }
    }

    if (name === 'lastname') {
      if (value.trim() === '' || value.length > 150) {
        setLastNameError('Validate your lastname');
      } else {
        setLastNameError('');
      }
    }


  };

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
      "last_name": lastname,
    }).then(response => {
      localStorage.clear()
      navigate("/auth", { replace: true })
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
                    className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); handleInputChange(e) }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); handleInputChange(e) }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password:</label>
                  <input
                    type="password"
                    className={`form-control`}
                    name="password2"
                    id="password2"
                    placeholder="Enter your password again"
                    value={password2}
                    onChange={(e) => { setPassword2(e.target.value); handleInputChange(e) }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); handleInputChange(e) }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    className={`form-control ${firstnameError ? 'is-invalid' : ''}`}
                    id="firstname"
                    name="firstname"
                    placeholder="Enter your first name"
                    value={firstname}
                    onChange={(e) => { setFirstName(e.target.value); handleInputChange(e) }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    className={`form-control ${lastnameError ? 'is-invalid' : ''}`}
                    id="lastname"
                    name="lastname"
                    placeholder="Enter your last name"
                    value={lastname}
                    onChange={(e) => { setLastName(e.target.value); handleInputChange(e) }}
                    required
                  />
                </div>
                <button type="submit" disabled={isButtonDisabled} className="btn btn-outline-primary border-0 shadow-sm btn-block mt-2">
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