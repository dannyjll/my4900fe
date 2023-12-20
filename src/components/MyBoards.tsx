import * as React from 'react';
import { useState, useEffect } from 'react';
import APIService from './APIService';
import { User } from '../models/User';
import { BoardList } from '../models/BoardList';
import { useNavigate } from 'react-router-dom';

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
    if (pk) {
    navigate(`/board/${pk}`, { replace: false })
    }
  }
  const handleClickNull = () => {
    navigate(`/board/`, { replace: false })
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Boards</h1>
      <div className="row">
        {Array.isArray(boards?.data) && (boards?.data?.length || 0) > 0 ? (
          boards?.data.map((board) => (
            <div key={board.pk} className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    {board.list_image ? (
                      <div>
                      <img
                        src={board.list_image}
                        className="card-image rounded-circle d-inline"
                        alt="List"
                        style={{ height: 50, width: 50, objectFit: 'cover', }}
                      />
                      </div>
                    ) : (
                      <div>
                      <img
                        src="placeholder-image-url"
                        alt="Placeholder"
                        className="board-placeholder-image rounded-circle"
                        style={{ height: 50, width: 50, objectFit: 'cover' }}
                      />
                      </div>
                    )}
                    <h4 className="card-title ml-3 mb-0" onClick={() => handleClick(board.pk)}>{board.title}</h4>
                  </div>
                  <p className="card-description mt-2">{board.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No boards available</p>
          </div>
        )}
      </div>
      <button type="button" className="btn btn-outline-success shadow-sm border-0" onClick={() => handleClickNull()}>Add Board</button>
    </div>
  );
}
export default MyBoards