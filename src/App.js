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
import Search from './Components/Search/Search';
import api from './api';
import Profile from './Components/Profile/Profile';
import Signup from './Components/Signup/Signup';
import CompanyPage from './Components/CompanyPage/CompanyPage';
import JobPageCompany from './Components/JobPage/JobPageCompany';

function App() {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);
  const [company, setCompany] = useState({});
  useEffect(() => {
    handleFetchInfoUser();
  },[])

  const handleFetchInfoUser = () =>{
    if(localStorage.getItem('token') != null){
      const token = localStorage.getItem('token');

      api.get('/auth/check/',{
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(response => {
        var type = response.data;
        console.log(response)
        if(type === "user") {
          logUser(token)
          console.log("user")
        } else if (type === "company"){
          logCompany(token)
          console.log("empresa")
        }
      })

    }
  }

  const logUser = (token) => {
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

const logCompany = (token) => {
      api.get('/company/', {
        headers: {
          'Authorization': "Bearer " + token
        }
      }).then( response => {
        setCompany(response.data);
        setLogged(true);
    }).catch((error) => {
        console.log(error);
    }) 
}

var handleJobPage = () => {
  if(Object.keys(company).length !== 0){
    return <JobPageCompany/>
  } else {
    return <JobPage />
  }
}

  return (
    <Router>
      <AuthContext.Provider value={{user, logged, setUser, setLogged, company, setCompany, handleFetchInfoUser}}>
      <Routes>
        <Route path='/' element={<LandPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/job/' element={handleJobPage()}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/companyPage' element={<CompanyPage/>} />
      </Routes>
    </AuthContext.Provider>
    </Router>
  )
}



export default App;
