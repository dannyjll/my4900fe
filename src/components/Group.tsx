import * as React from 'react';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import { User, UserList } from '../models/User';
import { Group } from '../models/GroupList';
import { Board, BoardList } from '../models/BoardList';
import APIService from './APIService'
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GroupDetail = () => {
    const notifySuccess = (title: string) => toast.success(`Group: '${title}' was successfully updated!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyError = (title: string) => toast.error(`Group: '${title}' failed to update.`, {
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
    const [group, setGroup] = useState<Group>({
        pk: 0,
        title: '',
        users: [],
        lists: [],
    });

    const [titleError, setTitleError] = useState('');
    const [userSetError, setUserError] = useState('');
    const isButtonDisabled = !(userSetError.length < 1 && titleError.length < 1 );

    const [newgroup, setNewGroup] = useState<Partial<Group>>({
        pk: 0,
        title: '',
        users: [],
        lists: [],
    });

    useEffect(() => {
        if (pk) {
            apiService.getGroup(pk).then(response => {
                setGroup(response.data)
                document.title = response.data?.title
            }
            ).catch(response =>
                console.error(response.error))
        }
    else {
        setTitleError('Validate your title');
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

        if (name === 'title') {
            if (value.trim() === '' || value.length > 200) {
                setTitleError('Validate your title (maximum 200 characters)');
            } else {
                setTitleError('');
            }
        }
        

        if (name === 'completion_status') {
            value = e.target.checked
        }

        setGroup({ ...group, [name]: value });
    };

    const handleNewInputChange = (e: any) => {
        let { name, value } = e.target;

        if (name === 'title' && (value.trim() === '' || value.length > 200)) {
            setTitleError('Validate your title');
        } else {
            setTitleError('');
        }

        if (name === 'completion_status') {
            value = e.target.checked
        }

        setNewGroup({ ...newgroup, [name]: value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        apiService.updateGroup(group).then(response => {
            handleEditToggle();
            notifySuccess(group.title);
        }).catch(error => {
            notifyError(group.title);
        })
    };

    const handleSubmitNew = (e: any) => {
        e.preventDefault();
        const groupTitle = newgroup.title || "Untitled Task";
        apiService.addNewGroup(newgroup).then(response => {
            handleEditToggle();
            notifySuccess(groupTitle);
            navigate('/group/' + response.data.pk);
        }).catch(error => {
            notifyError(groupTitle);
        })
    };

    if (group.pk == 0) {
        return (
            <div className="container mt-5">
                <h1>Group Information</h1>
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
                    <label htmlFor="assignee" className="form-label">
                        Users
                    </label>
                    <br />
                    <MultiSelect
                        value={newgroup.users}
                        onChange={(e) => handleNewInputChange(e)}
                        options={users ? users?.map(user => ({ username: user.username, pk: user.pk })) : []}
                        optionLabel="username"
                        optionValue="pk"
                        placeholder="Select Users"
                        className={`form-control-sm`}
                        dataKey="pk"
                        id="users"
                        name="users"
                        disabled={!isEditing}
                        filter
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="assignee" className="form-label">
                        Boards
                    </label>
                    <br />
                    <MultiSelect
                        value={newgroup.lists}
                        onChange={(e) => handleNewInputChange(e)}
                        options={boards ? boards?.map(board => ({ title: board.title, pk: board.pk })) : []}
                        optionLabel="title"
                        optionValue="pk"
                        placeholder="Select Boards"
                        className={`form-control-sm`}
                        dataKey="pk"
                        id="lists"
                        name="lists"
                        disabled={!isEditing}
                        filter
                    />
                </div>

                    <button type="button" className="btn btn-outline-secondary shadow-sm border-0" onClick={handleEditToggle}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>

                    {isEditing && (
                        <button type="submit" disabled={isButtonDisabled} className="btn btn-outline-primary shadow-sm border-0">
                            Save Changes
                        </button>
                    )}
                </form>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1>Group Information</h1>
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
                        value={group?.title}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="assignee" className="form-label">
                        Users
                    </label>
                    <br />
                    <MultiSelect
                        value={group.users}
                        onChange={(e) => handleInputChange(e)}
                        options={users ? users?.map(user => ({ username: user.username, pk: user.pk })) : []}
                        optionLabel="username"
                        optionValue="pk"
                        placeholder="Select Users"
                        className={`form-control-sm`}
                        dataKey="pk"
                        id="users"
                        name="users"
                        disabled={!isEditing}
                        filter
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="assignee" className="form-label">
                        Boards
                    </label>
                    <br />
                    <MultiSelect
                        value={group.lists}
                        onChange={(e) => handleInputChange(e)}
                        options={boards ? boards?.map(board => ({ title: board.title, pk: board.pk })) : []}
                        optionLabel="title"
                        optionValue="pk"
                        placeholder="Select Boards"
                        className={`form-control-sm`}
                        dataKey="pk"
                        id="lists"
                        name="lists"
                        disabled={!isEditing}
                        filter
                    />
                </div>

                <button type="button" className="btn btn-outline-secondary shadow-sm border-0" onClick={handleEditToggle}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>

                {isEditing && (
                    <button type="submit" disabled={isButtonDisabled} className="btn btn-outline-primary shadow-sm border-0">
                        Save Changes
                    </button>
                )}
            </form>
        </div>
    );
};
export default GroupDetail;
