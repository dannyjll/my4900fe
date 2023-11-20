import * as React from 'react';
import { useState, useEffect, memo } from 'react';
import APIService from './APIService';
import { User } from '../models/User';
import { Link } from 'react-router-dom';

const myGroups = () => {
  const [userdata, setData] = useState<User | null>(null);
  const apiService = new APIService();

  useEffect(() => {
    apiService.getUser()
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error(error));
  }, [apiService]);

  return (
    <div>
        test
    </div>
  )
}

export default myGroups