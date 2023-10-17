import React, {useState} from "react";
import { Button } from "@mui/material";
import "./Participants.css";
import api from "../../api";
import ModalError from "../Modals/ModalError";


export default function ParticipantsList(props) {
    const [showError, setShowError] = useState(false);

    const handleOpenCurriculum = () =>{
        console.log(props)
        const token = localStorage.getItem("token")
        api.get("/job/"+ props.job + "/applicant/" + props.participant.email +"/curriculum/", {
            responseType: "blob",
            headers:{
                Authorization: "Bearer " + token
            }
        })
        .then(response => {
            console.log(response)
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, "_blank");
        }).catch(err => {
            setShowError(true);
        })
    }

    return (
        <div className="participant">
            <div className="participant-name">{props.participant.userName}</div>
            <div className="participant-email">{props.participant.email}</div>
            <div><Button onClick={handleOpenCurriculum} variant="outlined">Ver Curriculo</Button></div>
            {showError && <ModalError closeError={setShowError} errorMsg="usuário não possuir curriculo no banco de dados"/>}
        </div>
    )
}