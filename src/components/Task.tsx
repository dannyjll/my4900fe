import * as React from 'react';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import { Task } from '../models/TaskList';
import APIService from './APIService'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskDetail = () => {
    const notifySuccess = (taskname: string) => toast.success(`Task: '${taskname}' was successfully updated!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyError = (taskname: string) => toast.error(`Task: '${taskname}' failed to update.`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const { pk } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const apiService = new APIService()
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

    const handleDueDateChange = (date: any) => {
        setTask({ ...task, due_date: date.toISOString() });
    };

    useEffect(() => {
        apiService.getTask(pk).then(response => {
            setTask(response.data)
        }
        ).catch(response =>
            console.error(response.error))
    }, []);

    if (!task) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e: any) => {
        let { name, value } = e.target;
        if (name === 'completion_status') {
            value = e.target.checked
        }
        setTask({ ...task, [name]: value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        apiService.updateTask(task).then(response => {
            handleEditToggle();
            notifySuccess(task.title);
            navigate('/mytasks');
        }).catch(error => {
             notifyError(task.title);
             navigate('/mytasks');
            })
    };

    return (
        <div className="container mt-5">
            <h1>Task Information</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter task title"
                        name="title"
                        value={task?.title}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows={3}
                        placeholder="Enter task description"
                        name="description"
                        value={task?.description}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="completionStatus" className="form-label">
                        Completed?
                    </label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="completionStatus"
                        name="completion_status"
                        checked={task?.completion_status}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="due_date" className="form-label">
                        Due Date:
                    </label>
                    {!isEditing ? <div className="col-md-6 my-2"> <p><strong>The calendar will show when you press the edit button.</strong></p>

                    </div> : <div className="col-md-6">
                        <Calendar
                            calendarType='iso8601'
                            className="form-control"
                            id="due_date"
                            name="due_date"
                            onChange={handleDueDateChange}
                            value={task?.due_date}
                        />
                    </div>}

                    <div>
                        <label htmlFor="due_date" className="form-label">
                            Selected Date:
                        </label>
                        <p>{task?.due_date}</p>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                        Notes
                    </label>
                    <textarea
                        className="form-control"
                        id="notes"
                        rows={3}
                        placeholder="Enter notes"
                        name="notes"
                        value={task?.notes}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="difficulty" className="form-label">
                        Difficulty
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="difficulty"
                        placeholder="Enter difficulty"
                        name="difficulty"
                        value={task?.difficulty}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <button type="button" className="btn btn-secondary" onClick={handleEditToggle}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>

                {isEditing && (
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                )}
            </form>
        </div>
    );
};
export default TaskDetail;
