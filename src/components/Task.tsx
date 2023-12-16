import * as React from 'react';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import { Task } from '../models/TaskList';
import { User, UserList } from '../models/User';
import { Board, BoardList } from '../models/BoardList';
import APIService from './APIService'
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
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
    const [users, setUsers] = useState<User[] | null>(null)
    const [boards, setBoards] = useState<Board[] | null>(null);
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

    const [newtask, setNewTask] = useState<Partial<Task>>({
        title: '',
        description: '',
        completion_status: false,
        due_date: '',
        notes: '',
        user: 0,
        list: 0,
        difficulty: 0,
    });
    
    const [titleError, setTitleError] = useState('');
    const [assigneeError, setAssigneeError] = useState('');
    const [dateError, setDateError] = useState('');
    const [boardError, setBoardError] = useState('');
    const [notesError, setNotesError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [difficultyError, setDifficultyError] = useState('');
    const isButtonDisabled = !(assigneeError.length < 1 && titleError.length < 1 
        && dateError.length < 1 && boardError.length < 1 
        && notesError.length < 1 && descriptionError.length < 1 && difficultyError.length < 1);

    const handleDueDateChange = (date: any) => {
        setTask({ ...task, due_date: date.toISOString() });
    };

    const handleNewDueDateChange = (date: any) => {
        setNewTask({ ...newtask, due_date: date.toISOString() });
    };

    useEffect(() => {
        if (pk) {
        apiService.getTask(pk).then(response => {
            setTask(response.data)
        }
        ).catch(response =>
            console.error(response.error))
        }
        apiService.getAllUsers().then(response => {
            setUsers(response.data)
        }
        ).catch(response =>
            console.error(response.error))
        apiService.getMyListList().then(response => {
            setBoards(response.data.data)
        }
        ).catch(response =>
            console.error(response.error))
    }, []);

    const handleInputChange = (e: any) => {
        let { name, value } = e.target;
        if (name === 'title' && (value.trim() === '' || value.length > 100)) {
            setTitleError('Validate your title');
        } else {
            setTitleError('');
        }
        if (name === 'description' && ((value.trim() === '' || value.length > 1000))) {
            setDescriptionError('Validate your description');
        } else {
            setDescriptionError('');
        }
        if (name === 'notes' && (value.trim() === '' || value.length > 1000)) {
            setNotesError('Validate your notes');
        } else {
            setNotesError('');
        }
        if (name === 'user' && (value.length < 1)) {
            setAssigneeError('Validate your assignee');
        } else {
            setAssigneeError('');
        }
        if (name === 'board' && (value.length < 1)) {
            setBoardError('Validate your board');
        } else {
            setBoardError('');
        }
        if (name === 'due_date' && (value.length < 1)) {
            setDateError('Validate your board');
        } else {
            setDateError('');
        }
        if (name === 'difficulty' && (value.length < 1 || value < 1 || value > 10 )) {
            setDifficultyError('Validate your assignee');
        } else {
            setDifficultyError('');
        }
        if (name === 'completion_status') {
            value = e.target.checked
        }
        setTask({ ...task, [name]: value });
    };

    const handleNewInputChange = (e: any) => {
        let { name, value } = e.target;
        if (name === 'title' && (value.trim() === '' || value.length > 100)) {
            setTitleError('Validate your title');
        } else {
            setTitleError('');
        }
        if (name === 'description' && ((value.trim() === '' || value.length > 1000))) {
            setDescriptionError('Validate your description');
        } else {
            setDescriptionError('');
        }
        if (name === 'notes' && (value.trim() === '' || value.length > 1000)) {
            setNotesError('Validate your notes');
        } else {
            setNotesError('');
        }
        if (name === 'user' && (value.length < 1)) {
            setAssigneeError('Validate your assignee');
        } else {
            setAssigneeError('');
        }
        if (name === 'board' && (value.length < 1)) {
            setBoardError('Validate your board');
        } else {
            setBoardError('');
        }
        if (name === 'due_date' && (value.length < 1)) {
            setDateError('Validate your board');
        } else {
            setDateError('');
        }
        if (name === 'difficulty' && (value.length < 1 || value < 1 || value > 10 )) {
            setDifficultyError('Validate your assignee');
        } else {
            setDifficultyError('');
        }
        if (name === 'completion_status') {
            value = e.target.checked
        }
        setNewTask({ ...newtask, [name]: value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        apiService.updateTask(task).then(response => {
            handleEditToggle();
            notifySuccess(task.title);
            navigate('/board/' + task.list);
        }).catch(error => {
            notifyError(task.title);
        })
    };

    const handleSubmitNew = (e: any) => {
        e.preventDefault();
        const taskTitle = newtask.title || "Untitled Task";
        apiService.addNewTask(newtask).then(response => {
            handleEditToggle();
            notifySuccess(taskTitle);
            navigate('/board/' + newtask.list);
        }).catch(error => {
            notifyError(taskTitle);
        })
    };

    if (task.pk == 0) {
        return (
            <div className="container mt-5">
                <h1>Task Information</h1>
                <form onSubmit={handleSubmitNew}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className={`form-control ${titleError ? 'is-invalid' : ''}`}
                            id="title"
                            placeholder="Enter task title"
                            name="title"
                            onChange={handleNewInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className={`form-control ${descriptionError ? 'is-invalid' : ''}`}
                            id="description"
                            rows={3}
                            placeholder="Enter task description"
                            name="description"
                            onChange={handleNewInputChange}
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
                            onChange={handleNewInputChange}
                            disabled={!isEditing}
                            style={{ marginLeft: "10px" }}
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
                                className={`form-control ${dateError ? 'is-invalid' : ''}`}
                                id="due_date"
                                name="due_date"
                                onChange={handleNewDueDateChange}
                            />
                        </div>}

                        <div>
                            <label htmlFor="due_date" className="form-label">
                                Selected Date:
                            </label>
                            <p>{newtask?.due_date}</p>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="notes" className="form-label">
                            Notes
                        </label>
                        <textarea
                            className={`form-control ${notesError ? 'is-invalid' : ''}`}
                            id="notes"
                            rows={3}
                            placeholder="Enter notes"
                            name="notes"
                            onChange={handleNewInputChange}
                            disabled={!isEditing}
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="difficulty" className="form-label">
                            Difficulty
                        </label>
                        <input
                            type="number"
                            className={`form-control ${difficultyError ? 'is-invalid' : ''}`}
                            id="difficulty"
                            placeholder="Enter difficulty"
                            name="difficulty"
                            onChange={handleNewInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="assignee" className="form-label">
                            Assignee
                        </label>
                    <br />
                    <Dropdown
                        value={newtask.user}
                        onChange={(e) => handleNewInputChange(e)}
                        options={users ? users?.map(user => ({ username: user.username, pk: user.pk })) : []}
                        optionLabel="username"
                        optionValue="pk"
                        placeholder="Select a user"
                        dataKey="pk"
                        id="user"
                        name="user"
                        disabled={!isEditing}
                        filter
                        />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="board" className="form-label">
                            Board
                        </label>
                    <br />
                    <Dropdown
                        value={newtask.list}
                        onChange={(e) => handleNewInputChange(e)}
                        options={boards ? boards?.map(list => ({ title: list.title, pk: list.pk })) : []}
                        optionLabel="title"
                        optionValue="pk"
                        placeholder="Select a board"
                        dataKey="pk"
                        id="list"
                        name="list"
                        disabled={!isEditing}
                        filter
                        />
                    </div>

                    <button type="button" className="btn btn-secondary" onClick={handleEditToggle}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>

                    {isEditing && (
                        <button type="submit" className="btn btn-primary" disabled={isButtonDisabled}>
                            Save Changes
                        </button>
                    )}
                </form>
            </div>
        );
    }

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
                        className={`form-control ${titleError ? 'is-invalid' : ''}`}
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
                        className={`form-control ${descriptionError ? 'is-invalid' : ''}`}
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
                        style={{ marginLeft: "10px" }}
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
                            className={`form-control ${titleError ? 'is-invalid' : ''}`}
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
                        className={`form-control ${notesError ? 'is-invalid' : ''}`}
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
                        className={`form-control ${difficultyError ? 'is-invalid' : ''}`}
                        id="difficulty"
                        placeholder="Enter difficulty"
                        name="difficulty"
                        value={task?.difficulty}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="assignee" className="form-label">
                            Assignee
                        </label>
                    <br />
                    <Dropdown
                        value={task.user}
                        onChange={(e) => handleInputChange(e)}
                        options={users ? users?.map(user => ({ username: user.username, pk: user.pk })) : []}
                        optionLabel="username"
                        optionValue="pk"
                        placeholder="Select a user"
                        dataKey="pk"
                        id="user"
                        name="user"
                        disabled={!isEditing}
                        filter
                        />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="board" className="form-label">
                            Board
                        </label>
                    <br />
                    <Dropdown
                        value={task.list}
                        onChange={(e) => handleInputChange(e)}
                        options={boards ? boards?.map(list => ({ title: list.title, pk: list.pk })) : []}
                        optionLabel="title"
                        optionValue="pk"
                        placeholder="Select a board"
                        dataKey="pk"
                        id="list"
                        name="list"
                        disabled={!isEditing}
                        filter
                        />
                    </div>


                <button type="button" className="btn btn-outline-secondary shadow-sm border-0" onClick={handleEditToggle}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>

                {isEditing && (
                    <button type="submit" className="btn btn-outline-primary shadow-sm border-0" disabled={isButtonDisabled}>
                        Save Changes
                    </button>
                )}
            </form>
        </div>
    );
};
export default TaskDetail;
