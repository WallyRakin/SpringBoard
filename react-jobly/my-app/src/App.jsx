import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { api } from './api.js';
import Navbar from './Navbar';
import Login from './Login';
import SignUp from './SignUp';
import Logout from './Logout';
import UpdateProfile from './UpdateProfile';
import Search from './Search';
import CompanyList from './CompanyList.jsx';
import CompanyInfo from './CompanyInfo.jsx';
import JobList from './JobList.jsx';
import './App.css';

function App() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserData = async () => {
    try {
      const res = await api.getUserInfo();
      console.log('data', res)
      setUserInfo(res.data.user);
    } catch (error) {
      console.error('Failed to fetch user info', error);
      setToken(null);
    }
  };

  useEffect(() => {
    localStorage.setItem('token', token);
    api.token = token;

    fetchUserData();
  }, [token]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await api.getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    };

    const fetchJobs = async () => {
      try {
        const data = await api.getJobs();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      }
    };

    fetchCompanies();
    fetchJobs();
  }, []);

  return (
    <Router>
      <div>
        <Navbar token={token} userInfo={userInfo} />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<SignUp setToken={setToken} />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route path="/profile" element={<UpdateProfile userInfo={userInfo} setUserInfo={setUserInfo} />} />
          <Route path="/companies" element={<Search userInfo={userInfo} data={companies} List={CompanyList} />} />
          <Route path="/companies/:handle" element={<CompanyInfo userInfo={userInfo} data={jobs} fetchUserData={fetchUserData} />} />
          <Route path="/jobs" element={<Search userInfo={userInfo} List={JobList} data={jobs} fetchUserData={fetchUserData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
