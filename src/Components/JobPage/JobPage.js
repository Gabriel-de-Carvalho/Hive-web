import React, {useContext, useState} from "react";
import { Box, Button, Modal } from "@mui/material";
import "./JobPage.css";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import api from "../../api";
import AuthContext from "../../Context/UserContext";

export default function JobPage(){
    const {state} = useLocation();
    const userSession = useContext(AuthContext);

    const handleInscription = () => {
        if(userSession.logged){
            var token = localStorage.getItem('token');
            api.post("/job/" + state.jobInfo.id + "/participant/", 
            {
                userHive: userSession.user
            }, 
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) =>{
                console.log(response)
            }).catch((error) =>{
                console.log(error)
            })
        }
    }

    console.log(state);

    return (
        <div>
            <Header/>
            <div className="jobPage">
                    <div className="jobInfo">
                        <div className="jobInfoTitle">
                        <h2>{state.jobInfo.jobTitle}</h2>
                        <h3>{state.jobInfo.companyId}</h3>
                        <p>Pretensão salárial: R${state.jobInfo.income}</p>
                        <p>{state.jobInfo.negotiable? "Aberto a negociação" : "Não é possivel negociar o valor"}</p>
                        </div>
                        <p>{state.jobInfo.jobDesc}</p>
                        <div>
                            <Button variant="contained" onClick={handleInscription}>Inscrever-se na vaga</Button>
                        </div>
                    </div>
            </div>
        </div>
    )
}