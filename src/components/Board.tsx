import * as React from 'react';
import { useState, useEffect } from 'react';
import APIService from './APIService';
import { useParams } from 'react-router-dom';
import { User } from '../models/User';
import { TaskList } from '../models/TaskList';
import { Group } from '../models/GroupList';
import { Board } from '../models/BoardList';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Board.css';
import { MultiSelect } from 'primereact/multiselect';

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
    const [groups, setGroups] = useState<Group[] | null>(null)
    const [newboard, setNewBoard] = useState<Partial<Board>>({
        pk: 0,
        title: '',
        description: '',
        list_image: '',
        group_set: [],
});
    const [file, setFile] = useState<string>();
    const { pk } = useParams();
    const apiService = new APIService();
    const navigate = useNavigate()

    const handleClickNull = () => {
        navigate(`/task/`, { replace: true })
      }

    useEffect(() => {
        apiService.getMyGroupList()
            .then(response => {
                setGroups(response.data.data)
            })
            .catch(error => console.error(error))
        apiService.getUser()
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error(error));
        if (pk) {
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
        }
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleClick = (pk: number) => {
        navigate(`/task/${pk}`)
    }
    const handleInputChangeNew = (e: any) => {
        const { name, value } = e.target;
        if (name === 'list_image' && e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(URL.createObjectURL(selectedFile));
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event) {
                    setNewBoard({ ...newboard, list_image: selectedFile });
                }
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setNewBoard({ ...newboard, [name]: value });
        }
    };

    const handleSubmitNew = (e: any) => {
        e.preventDefault();
        const boardTitle = newboard.title || "Untitled Task";
        apiService.addNewList(newboard, newboard?.list_image).then(response => {
            handleEditToggle();
            notifySuccess(boardTitle);
            navigate('/myboards');
        }).catch(error => {
            console.error(error)
            notifyError(boardTitle);
            navigate('/myboards');
        })
    };

    const handleImageClick = () => {
        document.getElementById('fileInput')?.click();
    };

    var imageBasePath = window.location.protocol + "//" + window.location.host;
    var img = imageBasePath + '/bgpngtransparent.png'

    if (!board) {
        return (
            <div className="container mt-5">
            <div className="d-inline" >
                <input
                    type="file"
                    className="form-control visually-hidden"
                    id="fileInput"
                    name="list_image"
                    accept=".png, .jpeg, .jpg"
                    onChange={handleInputChangeNew}
                    disabled={!isEditing}
                />
                <img
                    style={{ height: 80, width: 80, objectFit: 'cover' }}
                    src={file || img}
                    alt="Board Image"
                    className="img clickable-image rounded-circle grey-on-hover"
                    onClick={handleImageClick}
                />
            </div>
            <h1 className="d-inline" style={{marginLeft: 15}}>Board Information</h1>
            <form onSubmit={handleSubmitNew}>
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
                        value={newboard?.title}
                        onChange={handleInputChangeNew}
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
                        value={newboard?.description}
                        onChange={handleInputChangeNew}
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
                        value={newboard?.notes}
                        onChange={handleInputChangeNew}
                        disabled={!isEditing}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="assignee" className="form-label">
                            Groups
                        </label>
                    <br />
                    <MultiSelect
                        value={newboard?.group_set}
                        onChange={(e) => handleInputChangeNew(e)}
                        options={groups ? groups?.map(group => ({ title: group.title, pk: group.pk })) : []}
                        optionLabel="title"
                        optionValue="pk"
                        placeholder="Select Groups"
                        dataKey="pk"
                        id="group_set"
                        name="group_set"
                        disabled={!isEditing}
                        filter
                        />
                    </div>

                <button type="button" className="btn btn-outline-secondary shadow-sm border-0" onClick={handleEditToggle}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>

                {isEditing && (
                    <button type="submit" className="btn btn-outline-primary shadow-sm border-0">
                        Save Changes
                    </button>
                )}
            </form>
            </div>
        );
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'list_image' && e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(URL.createObjectURL(selectedFile));
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
                    style={{ height: 80, width: 80, objectFit: 'cover' }}
                    src={file || board?.list_image}
                    alt="Board Image"
                    className="img clickable-image rounded-circle grey-on-hover"
                    onClick={handleImageClick}
                />
            </div>
            <h1 className="d-inline" style={{marginLeft: 15}}>Board Information</h1>
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
                    <label htmlFor="notes" className="form-label">
                        Notes
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

                <div className="mb-3">
                    <label htmlFor="assignee" className="form-label">
                            Groups
                        </label>
                    <br />
                    <MultiSelect
                        value={board.group_set}
                        onChange={(e) => handleInputChange(e)}
                        options={groups ? groups?.map(group => ({ title: group.title, pk: group.pk })) : []}
                        optionLabel="title"
                        optionValue="pk"
                        placeholder="Select Groups"
                        dataKey="pk"
                        id="group_set"
                        name="group_set"
                        disabled={!isEditing}
                        filter
                        />
                    </div>

                <button type="button" className="btn btn-outline-secondary shadow-sm border-0" onClick={handleEditToggle}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>

                {isEditing && (
                    <button type="submit" className="btn btn-outline-primary shadow-sm border-0">
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
            <div className="my-2">
                <button type="button" className="btn btn-outline-success shadow-sm border-0" onClick={() => handleClickNull()}>Add Task</button>
            </div>
        </div>
    );
};

export default BoardDetail