import React from "react";
import { Button } from "@mui/material";
import "./Participants.css";
import api from "../../api";


export default function ParticipantsList(props) {

    const handleOpenCurriculum = () =>{
        console.log(props)
        api.get("/job/"+ props.job + "/applicant/" + props.participant.email +"/curriculum/", {responseType: "blob"})
        .then(response => {
            console.log(response)
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, "_blank");
        })
    }

    return (
        <div className="participant">
            <div className="participant-name">{props.participant.userName}</div>
            <div className="participant-email">{props.participant.email}</div>
            <div><Button onClick={handleOpenCurriculum} variant="outlined">Ver Curriculo</Button></div>
        </div>
    )
}