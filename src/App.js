import React, { useEffect, useState } from 'react';
import './App.css';
import LandPage from './Components/LandPage/LandPage';
import Login from './Components/Login/Login';
import JobPage from './Components/JobPage/JobPage';
import AuthContext from './Context/UserContext';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './Components/Signup/signup';
import Search from './Components/Search/Search';
import api from './api';
import Profile from './Components/Profile/Profile';

function App() {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('token') != null){
      const token = localStorage.getItem('token');
      api.get('/user/', {
          headers: {
            'Authorization': "Bearer " + token
          }
        }).then( response => {
          setUser(response.data)
          setLogged(true);
          console.log(response)
      }).catch((error) => {
           console.log(error);
      })
    }
  },[])

  return (
    <Router>
      <AuthContext.Provider value={{user, logged}}>
      <Routes>
        <Route path='/' element={<LandPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/job/' element={<JobPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </AuthContext.Provider>
    </Router>
  )
}



export default App;
