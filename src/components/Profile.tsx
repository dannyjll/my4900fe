import * as React from 'react';
import { useState, useEffect } from 'react';
import APIService from './APIService';
import { User } from '../models/User';
import { useParams } from 'react-router-dom';
import { Profile } from '../models/ProfileList';
import { toast } from 'react-toastify';

const ProfileDetail = () => {
  const [userdata, setData] = useState<User | null>(null);
  const [file, setFile] = useState<string>();
  const [bioError, setBioError] = useState('');
  const [user, setUser] = useState<User | null>(null)
  const apiService = new APIService();
  const [isEditing, setIsEditing] = useState(false);
  const { pk } = useParams();
  const [profile, setProfile] = useState<Profile>({
    pk: 0,
    bio: '',
    user: 0,
    private: false,
    image: '',
  });
  const isButtonDisabled = !(bioError.length < 1);

  const notifySuccess = (user: any) => toast.success(`'${user}' was successfully updated!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const notifyError = (user: any) => toast.error(`'${user}' failed to update.`, {
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
    if (pk) {
      apiService.getProfile(pk)
        .then(response => {
          setProfile(response.data);
        })
        .catch(error => console.error(error));
      apiService.getUserFromProfilePK(pk)
        .then(response => {
          setUser(response.data);
          document.title = response.data.username + "'s Profile"
        })
        .catch(error => console.error(error));
    }
    else {
      apiService.getMyProfile()
        .then(response => {
          setProfile(response.data);
        })
        .catch(error => console.error(error))
      document.title = "My Profile"
    }
  }, [pk]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: any) => {

    let { name, value } = e.target;

    if (name === 'bio') {
      if (value.trim() === '' || value.length > 1000) {
        setBioError('Validate your bio');
      } else {
        setBioError('');
      }
    }

    if (name === 'private') {
      value = e.target.checked
    }

    if (name === 'image' && e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(URL.createObjectURL(selectedFile));
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event) {
          setProfile({ ...profile, image: selectedFile });
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleImageClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    apiService.updateProfile(profile, profile?.image).then(response => {
      handleEditToggle();
      notifySuccess(userdata?.username);
    }).catch(error => {
      console.error(error)
      notifyError(userdata?.username);
    })
  };

  if (!pk) {
    return (
      <div className="container mt-5">
        <h1 className="mb-4">Welcome to {userdata?.username}'s profile!</h1>
        <div className="row">
          <div className="container">
            <div className="card border-0 shadow-sm">
              <div className="row">
                <div className="col-lg-5 border-right m-2">
                  <div className="d-inline" >
                    <input
                      type="file"
                      className="form-control visually-hidden "
                      id="fileInput"
                      name="image"
                      accept=".png, .jpeg, .jpg"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    <img
                      style={{ height: 250, width: 250, objectFit: 'cover' }}
                      src={file || profile?.image}
                      alt="Profile"
                      className="img clickable-image img-responsive rounded-circle grey-on-hover"
                      onClick={handleImageClick}
                    />

                  </div>
                </div>
                <div className="col-lg-5 border-left m-2">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label">
                        Biography
                      </label>
                      <textarea
                        className={`form-control ${bioError ? 'is-invalid' : ''}`}
                        id="bio"
                        rows={3}
                        placeholder="Enter your bio"
                        name="bio"
                        value={profile?.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="private" className="form-label">
                        Private
                      </label>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="private"
                        name="private"
                        checked={profile?.private}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        style={{ marginLeft: "10px" }}
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
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome to {user?.username}'s profile!</h1>
      <div className="row">
        <div className="container">
          <div className="card border-0 shadow-sm">
            <div className="row">
              <div className="col-lg-5 border-right m-2">
                <div className="d-inline" >
                  <img
                    style={{ height: 300, width: 300, objectFit: 'cover' }}
                    src={profile?.image}
                    alt="Profile"
                    className="img rounded-circle"
                  />
                </div>
              </div>
              <div className="col-lg-5 border-left m-2">
                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">
                    Biography
                  </label>
                  <textarea
                    className={`form-control ${bioError ? 'is-invalid' : ''}`}
                    id="bio"
                    rows={3}
                    placeholder="Enter your bio"
                    name="bio"
                    value={profile?.bio}
                    disabled={true}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="private" className="form-label">
                    Private
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="private"
                    name="private"
                    checked={profile?.private}
                    disabled={true}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail