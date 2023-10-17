import React, { useContext, useState } from "react";
import { Box, Modal } from "@mui/material";
import { Button } from "@mui/joy";
import { styled } from '@mui/material/styles';
import "./JobPage.css";
import Header from "../Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import AuthContext from "../../Context/UserContext";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';

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
    const [fileSetted, setFileSetted] = useState(false);
    const { state } = useLocation();
    const userSession = useContext(AuthContext);

    const [fileError, setFileError] = useState(false);
    const [fileErrorMsg, setFileErrorMsg] = useState("");
    const [buttonFileColor, setButtonFileColor] = useState("primary");

    const [loadingButton, setLoadingButton] = useState(false);
    const [sendRequestButton, setSendRequestButton] = useState("primary");

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(auth)
    const handleInscription = () => {
        if (file.name) {
            console.log(file)
            const formData = new FormData();
            formData.append('file', file);
            if (userSession.logged) {
                console.log("entrou")
                setLoadingButton(true);
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
                        setTimeout(() => {
                            setLoadingButton(false);
                            setSendRequestButton("success")
                        }, 2000);
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        } else {
            setButtonFileColor("danger");
            setFileError(true);
            console.log(fileErrorMsg)
            setFileErrorMsg("É necessário selecionar um curriculo")
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setButtonFileColor("primary")
        setFileError(false);
        setFile(file);
        setFileSetted(true);
    }

    const renderUploadFile = () => {
        if (!state.jobInfo.isParticipant) {
            return <Button component="label" variant="solid" color={buttonFileColor} startDecorator={<CloudUploadIcon />}>
                Selecionar Curriculo
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
        } else {
            return ""
        }
    }

    const renderLoggedUser = () => {
        if (auth.logged) {
            
            return <div className="button-applicant-group">
                {renderUploadFile()}
                {fileSetted ? <p>{file.name}</p> : ""}
                {fileError ? <p style={{ color: "red", "margin-top": 0 }}>{fileErrorMsg}</p> : ""}
                {state.jobInfo.isParticipant ? <Button variant="solid" color="success">Você já está inscrito nessa vaga<CheckIcon /></Button> : <Button variant="solid" onClick={handleInscription} color={sendRequestButton} loading={loadingButton}>Inscrever-se na vaga</Button>}
            </div>
        } else {
            return <div className="button-applicant-group">
                <p>inicie a sessão para realizar o cadastro na oportunidade</p>
                <Button variant="solid" onClick={() => navigate("/login")} color='primary' >Login</Button>
            </div>
        }
    }

    return (
        <div>
            <Header />
            <div className="jobPage">
                <div className="jobInfo card">
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
                    {renderLoggedUser()}
                </div>
            </div>
        </div>
    )
}