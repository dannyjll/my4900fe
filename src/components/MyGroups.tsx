import * as React from 'react';
import { useState, useEffect, memo } from 'react';
import APIService from './APIService';
import { User } from '../models/User';
import { Link, useNavigate } from 'react-router-dom';
import { GroupList, Group } from '../models/GroupList';
import { Board } from '../models/BoardList';

const MyGroups = () => {

  interface Group {
    pk: number,
    title: string,
    users: number[],
    lists: number[],
    usersDetails: [User],
    listsDetails: [Board],
  }

  const [userdata, setData] = useState<User | null>(null);
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [groupDetails, setGroupDetails] = useState<Group[] | null>(null);
  const apiService = new APIService();
  const navigate = useNavigate()



  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await apiService.getUser();
        setData(userResponse.data);

        const groupResponse = await apiService.getMyGroupList();
        const groupList = groupResponse.data.data;

        const groupDetailsPromises = groupList.map(async (group: any) => {
          const userDetailResponse = await apiService.getUsersFromGroup(group.pk);
          const listDetailResponse = await apiService.getListsFromGroup(group.pk);

          return {
            ...group,
            usersDetails: userDetailResponse.data.data,
            listsDetails: listDetailResponse.data.data,
          };
        });

        const resolvedGroupDetails = await Promise.all(groupDetailsPromises);
        setGroups(resolvedGroupDetails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (pk: number) => {
    if (pk) {
      navigate(`/group/${pk}`, { replace: true })
    }
  }
  const handleClickNull = () => {
    navigate(`/group/`, { replace: true })
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Groups</h1>
      <div className="row">
        {Array.isArray(groups) && (groups?.length || 0) > 0 ? (
          groups.map((group, index) => (
            <div key={group.pk} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title" onClick={() => handleClick(group.pk)}>{group.title}</h5>
                  <div>
                    <ul className="list-group">
                      <li className="list-group-item">
                      <div>
                          <strong>Users:</strong>
                          <div>{group.usersDetails.map((user) => <div key={user.pk}>{user.username}</div>)}</div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div>
                          <strong>Lists:</strong>
                          <div>{group.listsDetails.map((board) => <div key={board.pk}>{board.title}</div>)}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No groups available</p>
          </div>
        )}
      </div>
      <button type="button" className="btn btn-outline-success shadow-sm border-0" onClick={() => handleClickNull()}>Add Group</button>
    </div>
  );
};

export default MyGroups