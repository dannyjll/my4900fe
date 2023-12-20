import * as React from 'react';
import { useState, useEffect } from 'react';
import APIService from './APIService';
import { User } from '../models/User';
import { TaskList, Task } from '../models/TaskList';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyTasks = () => {
  const [search, setSearch] = useState<string>('');
  const [user, setData] = useState<User | null>(null);
  const [tasks, setTasks] = useState<TaskList | null>(null);
  const apiService = new APIService();
  const navigate = useNavigate()
  const [task, setTask] = useState<Task>({
    pk: 0,
    title: '',
    description: '',
    completion_status: false,
    due_date: '',
    notes: '',
    user: 0,
    list: 0,
    difficulty: 0,
  });

  const notifySuccess = (title: string) => toast.success(`'${title}' was successfully updated!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const notifyError = (title: string) => toast.error(`'${title}' failed to update.`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

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
      document.title = 'My Tasks'
  }, [task]);

  const handleClick = (pk: number) => {
    if (pk) {
      navigate(`/task/${pk}`, { replace: true })
    }
  }

  const handleTaskInputChange = (e: any, task: any) => {
    let { name, value } = e.target;
    if (name === 'completion_status') {
      value = e.target.checked
    }
    apiService.updateTask({ ...task, [name]: value })
      .then(response => {
        notifySuccess(task.title)
        setTask(response.data);
      })
      .catch(error => notifyError(error))
  };

  const handleSearch = (e: any) => {
    let {name, value} = e.target
    if (name === 'search') {
      setSearch(value.toLowerCase())
    }
  } 

  

  const handleClickNull = () => {
    navigate(`/task/`, { replace: true })
  }

  const renderCardContent = (task: any, index: number) => (
    <>
      <p className="card-text">{task.description}</p>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Completed?</strong>
          <input
            type="checkbox"
            className="form-check-input"
            id="completion_status"
            name="completion_status"
            checked={task?.completion_status}
            onChange={(e) => handleTaskInputChange(e, task)}
            style={{ marginLeft: "10px" }}
          />
        </li>
        <li className="list-group-item">
          <strong>Due Date:</strong> {task.due_date.substring(0, 10)}
        </li>
        <li className="list-group-item">
          <strong>Notes:</strong> {task.notes}
        </li>
        <li className="list-group-item">
          <strong>Difficulty:</strong> {task.difficulty}
        </li>
      </ul>
    </>
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Tasks</h1>
      <div className="row">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search for a task" aria-label="Task" name="search" onChange={handleSearch} autoComplete={'off'} />
        </div>
        {Array.isArray(tasks?.data) && (tasks?.data?.length || 0) > 0 ? (
          <>
            <h3>Incomplete Tasks</h3>
            {tasks?.data
              .filter(task => !task.completion_status && task.title.toLowerCase().includes(search))
              .map((task, index) => (
                <div key={task.pk} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title" onClick={() => handleClick(task.pk)}>{task.title}</h5>
                      <div>
                        {renderCardContent(task, index)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
            <h3>Complete Tasks</h3>
            {tasks?.data
              .filter(task => task.completion_status && task.title.toLowerCase().includes(search))
              .map((task, index) => (
                <div key={task.pk} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title" onClick={() => handleClick(task.pk)}>{task.title}</h5>
                      <div>
                        {renderCardContent(task, index)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </>
        ) : (
          <div>
            <p>No tasks available</p>
          </div>
        )}
      </div>
      <button type="button" className="btn btn-outline-success shadow-sm border-0" onClick={() => handleClickNull()}>Add Task</button>
    </div>
  );
}

export default MyTasks