import * as React from 'react';
import { useState, useEffect, memo } from 'react';
import APIService from './APIService';
import { User } from '../models/User';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState<User | null>(null);
  const apiService = new APIService();

  useEffect(() => {
    apiService.getUser()
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
      <div className="container">
        <h1 className="my-5">Welcome {data?.username} to HoneyDo</h1>
        <div className="container mt-5">
          <div className="container mt-5">
            <div className="jumbotron">
              <h1 className="display-4">Benefits of Task Management</h1>
              <p className="lead">
                A well-organized task management program can significantly improve your productivity
                and efficiency. Below are the key benefits:
              </p>
              <hr className="my-4" />
              <ul className="list-group">
                <li className="list-group-item">Efficient Time Management</li>
                <li className="list-group-item">Prioritization of Tasks</li>
                <li className="list-group-item">Clear Communication</li>
                <li className="list-group-item">Improved Collaboration</li>
                <li className="list-group-item">Goal Achievement</li>
              </ul>
              <p className="mt-3">
                Embrace the power of task management to enhance your workflow and achieve your goals.
              </p>
            </div>
          </div>
          <h1 className="my-5">Task Management Features</h1>
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="text-center">
                <h5>My Groups</h5>
                <p>Manage your task groups.</p>
                <Link to="/mygroups" className="btn btn-primary">Go to My Groups</Link>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="text-center">
                <h5>My Boards</h5>
                <p>Organize tasks on boards.</p>
                <Link to="/myboards" className="btn btn-primary">Go to My Boards</Link>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="text-center">
                <h5>My Tasks</h5>
                <p>View and manage your tasks.</p>
                <Link to="/mytasks" className="btn btn-primary">Go to My Tasks</Link>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="text-center">
                <h5>My Profile</h5>
                <p>View and update your profile.</p>
                <Link to="/myprofile" className="btn btn-primary">Go to My Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default memo(Home);