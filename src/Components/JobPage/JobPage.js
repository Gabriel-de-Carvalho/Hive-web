import React, { useContext, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { styled } from '@mui/material/styles';
import "./JobPage.css";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import api from "../../api";
import AuthContext from "../../Context/UserContext";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export default function JobPage() {
    const [file, setFile] = useState({});
    const { state } = useLocation();
    const userSession = useContext(AuthContext);

    const handleInscription = () => {
        const formData = new FormData();
        formData.append('file', file);
        if (userSession.logged) {
            var token = localStorage.getItem('token');
            api.post("/job/" + state.jobInfo.id + "/participant/",
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    }

    const handleFileDownload = () => {
        if (userSession.logged) {
            var token = localStorage.getItem('token');
            api.get("/job/download",
                {   responseType: 'blob',
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then((response) => {
                    console.log(response)
                    const file = new Blob([response.data], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL, "_blank");
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    console.log(state);

    return (
        <div>
            <Header />
            <div className="jobPage">
                <div className="jobInfo">
                    <div className="jobInfoTitle">
                        <h2>{state.jobInfo.jobTitle}</h2>
                        <h3>{state.jobInfo.companyId}</h3>
                        <p>{state.jobInfo.modality}</p>
                        <p>{state.jobInfo.typeOfJob}</p>
                        <p>Experiência desejada: {state.jobInfo.seniority}</p>
                        <p>Pretensão salárial: R${state.jobInfo.income}</p>
                        <p>{state.jobInfo.negotiable ? "Aberto a negociação" : "Não é possivel negociar o valor"}</p>
                    </div>
                    <p>{state.jobInfo.jobDesc}</p>
                    <div className="button-applicant-group">
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Selecionar Curriculo
                            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                        </Button>
                        <Button variant="contained" onClick={handleInscription}>Inscrever-se na vaga</Button>
                        {/* <Button variant="contained" onClick={handleFileDownload}>download</Button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}