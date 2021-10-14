import React, { useState, useEffect } from 'react';
import FlightHubApi from './API/api';
import Routes from './Routes';
import './App.css';
import UserContext from './Context/UserContext';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  // Login Function
  const login = async (data) => {
    const res = await FlightHubApi.login(data);
    if (res.error) {
      return res;
    }
    setUser(res.user);
    localStorage.setItem(
      'user',
      JSON.stringify({
        token: res.token,
        user: res.user.uuid,
        firstName: res.user.firstName,
      })
    );
    setLoggedIn(true);
    return { login: 'success' };
  };

  // Sign Up Function
  const signUp = async (data) => {
    const res = await FlightHubApi.register(data);
    if (res.error) {
      return res;
    }
    setUser(res.user);
    localStorage.setItem(
      'user',
      JSON.stringify({
        token: res.token,
        user: res.user.uuid,
        firstName: res.user.firstName,
      })
    );
    setLoggedIn(true);
    history.push('/profile');
    return { register: 'success' };
  };

  // Log Out Function
  const logOut = () => {
    setUser({});
    setLoggedIn(false);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const getUser = async (storage) => {
      const { token, user } = storage;
      const res =
        token === null
          ? await FlightHubApi.getUserInfo()
          : await FlightHubApi.getUserInfo(user, token);
      setUser(res);
      setLoggedIn(true);
    };
    if (localStorage.getItem('user')) {
      getUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  return (
    <div className='App'>
      <UserContext.Provider
        value={{ signUp, user, logOut, login, setUser, loggedIn }}
      >
        <Routes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
