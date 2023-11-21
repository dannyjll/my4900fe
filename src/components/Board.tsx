import * as React from 'react';
import { useState, useEffect } from 'react';
import APIService from './APIService';
import { useParams } from 'react-router-dom';
import { User } from '../models/User';
import { TaskList } from '../models/TaskList';
import { Board } from '../models/BoardList';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Board.css';

const BoardDetail = () => {
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
    const [isEditing, setIsEditing] = useState(false);
    const [user, setData] = useState<User | null>(null);
    const [tasks, setTasks] = useState<TaskList | null>(null);
    const [board, setBoard] = useState<Board>()
    const [file, setFile] = useState<string>();
    const { pk } = useParams();
    const apiService = new APIService();
    const navigate = useNavigate()

    useEffect(() => {
        apiService.getUser()
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error(error));
        apiService.getTasksFromListPK(pk)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => console.error(error));
        apiService.getList(pk)
            .then(response => {
                setBoard(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleClick = (pk: number) => {
        navigate(`/task/${pk}`)
    }

    if (!board) {
        return <div>Loading...</div>;
    }
    const handleImageClick = () => {
        document.getElementById('fileInput')?.click();
    };
    
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'list_image' && e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event) {
                setBoard({ ...board, list_image: selectedFile });
                }   
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setBoard({ ...board, [name]: value });
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        apiService.updateList(board, board?.list_image).then(response => {
            handleEditToggle();
            notifySuccess(board.title);
            navigate('/myboards');
        }).catch(error => {
            console.error(error)
            notifyError(board.title);
            navigate('/myboards');
        })
    };

    const renderCardContent = (task: any, index: number) => (
        <>
            <p className="card-text">{task?.description}</p>
            <ul className="list-group">
                <li className="list-group-item">
                    <strong>Completion Status:</strong> {task?.completion_status ? 'Completed' : 'Incomplete'}
                </li>
                <li className="list-group-item">
                    <strong>Due Date:</strong> {task?.due_date.substring(0, 10)}
                </li>
                <li className="list-group-item">
                    <strong>Notes:</strong> {task?.notes}
                </li>
                <li className="list-group-item">
                    <strong>Difficulty:</strong> {task?.difficulty}
                </li>
            </ul>
        </>
    );

    const completedTasks = tasks?.data.filter(task => task.completion_status);
    const incompleteTasks = tasks?.data.filter(task => !task.completion_status);

    return (
        <div className="container mt-5">
            <div className="d-inline" >
                    <input
                        type="file"
                        className="form-control visually-hidden"
                        id="fileInput"
                        name="list_image"
                        accept=".png, .jpeg, .jpg"
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    <img
                        style={{ height: 80, width: 80, objectFit: 'cover'}}
                        src={board?.list_image} // Replace with the default image URL
                        alt="Board Image"
                        className="img-fluid clickable-image rounded-circle grey-on-hover"
                        onClick={handleImageClick}
                    />
                </div>
            <h1 className="d-inline">Board Information</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter board title"
                        name="title"
                        value={board?.title}
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
                        placeholder="Enter board description"
                        name="description"
                        value={board?.description}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="notes"
                        rows={3}
                        placeholder="Enter board notes"
                        name="notes"
                        value={board?.notes}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    ></textarea>
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
            <div className="container mt-5">
                <h1 className="mb-4">Tasks</h1>
                <div className="row">
                    <div className="col-lg-6">
                        <span className="border-right">
                            <h3>Incomplete Tasks</h3>
                            {incompleteTasks?.map((task, index) => (
                                <div key={task?.pk} className="card mb-3 border-0 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title" onClick={() => handleClick(task?.pk)}>{task?.title}</h5>
                                        <div>
                                            {renderCardContent(task, index)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </span>
                    </div>
                    <div className="col-lg-6 border-left">
                        <h3>Completed Tasks</h3>
                        {completedTasks?.map((task, index) => (
                            <div key={task?.pk} className="card mb-3 border-0 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title" onClick={() => handleClick(task?.pk)}>{task?.title}</h5>
                                    <div>
                                        {renderCardContent(task, index)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardDetail