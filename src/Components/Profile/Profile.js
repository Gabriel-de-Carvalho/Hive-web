import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/UserContext";
import Header from "../Header/Header";
import api from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import Experience from "../Experience/Experience";
import FormExperience from "./FormExperience";
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from "@mui/material";

export default function Profile(){
    var auth = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [renderExperiences, setRenderExperiences] = useState(false);
    const [editSession, setEditSession] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        api.get('/user/', {
            headers: {
              'Authorization': "Bearer " + token
            }
          }).then( response => {
            setUser(response.data)
            if(response.data.experiences !== undefined && response.data.experiences !== null){
                setRenderExperiences(true);
            }
            
        }).catch((error) => {
             console.log(error);
        })
    }, [])

    const handleChange = (value, property) => {
        var userChanged = user;
        userChanged = Object.assign(user, {property: value});
    }

    const textFieldChange = (property) => {
        return <TextField 
            onChange={e => handleChange(e.target.value, property)}
            value={user[property]}
        />
    }
    
    return (
        <div>
            <Header/>
            <div className="profile-page">
                <div className="profile-info">
                    <div className="profile-photo">
                            <FontAwesomeIcon icon={faCamera} />
                        </div>
                    <div className="profile-personal-info">
                        <div className="edit-icon"> <EditIcon /></div>
                    <p>nome: {editSession ? textFieldChange(): user.user}</p>
                    <p>email: {user.email}</p>
                    <p>função: {user.currentJob}</p>
                    </div>
                    <div className="profile-personal-bio">
                        <p>Sobre mim:</p>
                        <p>{user.bio}</p>
                    </div>
                </div>
                <div className="profile-experiences">
                    <FormExperience/>
                    {renderExperiences && user.experiences.map(experience => <Experience experience={experience}/>)}
                </div>
            </div>
        </div>
    )
}