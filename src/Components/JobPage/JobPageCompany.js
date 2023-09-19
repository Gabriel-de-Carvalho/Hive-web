import React, {useState, useEffect} from "react";
import "./JobPage.css"
import { useLocation } from "react-router-dom";
import api from "../../api";
import Header from "../Header/Header";
import ParticipantsList from "../ParticipantsList/ParticipantsList";
import { Button } from "@mui/material";

export default function JobPageCompany(){
    const { state } = useLocation();
    const [participants, setParticipants] = useState([]);

    useEffect( () =>{
        api.get("/job/"+ state.jobInfo.id +"/participants")
        .then(response => {
            setParticipants(response.data.participants)

        }).catch(responseErr => {
            console.log(responseErr)
        })

    },[])

    const handleParticipantsListing = () => {
        if(participants.length === 0){
            return <div>
                <h2>Não há participants inscritos na vaga ainda</h2>
            </div>
        } else {
            console.log(participants)
            return participants.map(participant => <ParticipantsList participant={participant} job={state.jobInfo.id}/>)
        }
    }

    const handleCloseJob = () => {
        api.put("/job/" + state.jobInfo.id + "/close")
        .then(response => console.log(response.data))
    }

    return (
        <div>
            <Header />
            <div className="jobPage job-company-page">
                <div className="jobInfo job-company-info">
                    <div className="jobInfoTitle job-title-company">
                        <h2>{state.jobInfo.jobTitle}</h2>
                        <h3>{state.jobInfo.companyId}</h3>
                        <p>{state.jobInfo.modality}</p>
                        <p>{state.jobInfo.typeOfJob}</p>
                        <p>Experiência desejada: {state.jobInfo.seniority}</p>
                        <p>Pretensão salárial: R${state.jobInfo.income}</p>
                        <p>{state.jobInfo.negotiable ? "Aberto a negociação" : "Não é possivel negociar o valor"}</p>
                    </div>
                    <p>{state.jobInfo.jobDesc}</p>
                <div>
                    <Button variant="outlined" onClick={handleCloseJob} sx={{background: "red", color:"white"}}>Encerrar Vaga</Button>
                </div>
                </div>
                <div className="participants-job">
                    <h2>Participantes</h2>
                    <div className="participants-list">
                        {handleParticipantsListing()}
                    </div>
                </div>
            </div>
        </div>
    )
}