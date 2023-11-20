import * as React from 'react';
import { useState, useEffect, memo } from 'react';
import APIService from './APIService';
import { User } from '../models/User';
import { TaskList, Task } from '../models/TaskList';
import { Link } from 'react-router-dom';

const MyTasks = () => {
  const [user, setData] = useState<User | null>(null);
  const [tasks, setTasks] = useState<TaskList | null>(null);
  const apiService = new APIService();

  useEffect(() => {
    apiService.getUser()
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error(error));
      apiService.getMyTasks()
      .then(response => {
          setTasks(response.data);
        })
      .catch(error => console.error(error));  
  }, []);

  const renderCardContent = (task: any, index: number) => (
    <>
      <p className="card-text">{task.description}</p>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Completion Status:</strong> {task.completion_status ? 'Completed' : 'Incomplete'}
        </li>
        <li className="list-group-item">
          <strong>Due Date:</strong> {task.due_date}
        </li>
        <li className="list-group-item">
          <strong>Notes:</strong> {task.notes}
        </li>
        <li className="list-group-item">
          <strong>Difficulty:</strong> {task.difficulty}
        </li>
        {/* Add more attributes as needed */}
      </ul>
    </>
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Tasks</h1>
      <div className="row">
        {tasks?.data.map((task, index) => (
          <div key={task.pk} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <div>
                  {renderCardContent(task, index)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks