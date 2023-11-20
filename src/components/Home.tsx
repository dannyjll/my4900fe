import * as React from 'react';
import { useState, useEffect, memo } from 'react';
import APIService from './APIService';
import { User } from '../models/User';

const Home = () => {
  const [data, setData] = useState<User | null>(null);
  const apiService = new APIService();

  useEffect(() => {
    apiService.getUser()
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error(error));
  }, []); // Empty dependency array to fetch data on mount

  return (
    <div>Welcome {data?.username}</div>
  );
};

export default memo(Home);