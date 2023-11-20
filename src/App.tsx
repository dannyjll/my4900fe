import './App.css';
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import * as React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MyTasks from './components/MyTasks';
import MyBoards from './components/MyBoards';
import MyProfile from './components/MyProfile';
import MyGroups from './components/MyGroups';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { authTest } from './util/authguard';

const App = () => {
  const [data, setData] = useState(false);
  let interval: number;
    useEffect(() => {
        interval = window.setInterval(()=>setData(authTest()), 1);
        return () => clearInterval(interval);
    })
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/auth" element={ <Auth/> } />
        <Route path="/mytasks" element={ <MyTasks/> } />
        <Route path="/myboards" element={ <MyBoards/> } />
        <Route path="/mygroups" element={ <MyGroups/> } />
        <Route path="/myprofile" element={ <MyProfile/> } />
      </Routes>
    </Router>
  );
};

export default App;
