import * as React from 'react';
import { useState, useEffect, memo } from 'react';
import APIService from './APIService';
import { User } from '../models/User';
import { Board, BoardList } from '../models/BoardList';
import { Link, useNavigate } from 'react-router-dom';

const MyBoards = () => {
  const [userdata, setData] = useState<User | null>(null);
  const [boards, setBoards] = useState<BoardList | null>(null);
  const apiService = new APIService();
  const navigate = useNavigate()

  useEffect(() => {
    apiService.getUser()
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error(error));
      apiService.getMyListList()
      .then(response => {
          setBoards(response.data);
        })
      .catch(error => console.error(error));  
  }, []);

  const handleClick = (pk: number) => {
    navigate(`/board/${pk}`, {replace: true})
  }

  return (
    <div className="container mt-4">
    <h2 className="mb-4">My Boards</h2>
    <div className="row">
      {boards?.data.map((board) => (
        <div key={board.pk} className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                {board.list_image ? (
                  <img
                    src={board.list_image}
                    className="card-image rounded-circle d-inline"
                    alt="List Image"
                    style={{ objectFit: 'cover', height: '50px', width: '50px'}}
                  />
                ) : (
                  <img
                    src="placeholder-image-url" // Replace with your placeholder image URL
                    alt="Placeholder"
                    className="board-placeholder-image rounded-circle"
                    style={{ objectFit: 'cover', height: '50px', width: '50px'}}
                  />
                )}
                <h4 className="card-title ml-3 mb-0" onClick={()=>handleClick(board.pk)}>{board.title}</h4>
              </div>
              <p className="card-description mt-2">{board.description}</p>
              <p className="card-info">
                <strong>PK:</strong> {board.pk} | <strong>Group Set:</strong>{' '}
                {board.group_set.join(', ')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};
export default MyBoards