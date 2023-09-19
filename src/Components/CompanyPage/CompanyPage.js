import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormGroup, FormControlLabel } from "@mui/material";
import "./companyPage.css";
import AuthContext from "../../Context/UserContext";
import api from "../../api";
import JobCard from "../../JobCard/JobCard";

export default function CompanyPage() {

    const [opportunityModal, setOpportunityModal] = useState(false);
    const [newJobOpportunity, setNewJobOpportunity] = useState({});
    const [incomeNegotiable, setIncomeNegotiable] = useState(true);
    const [activeJobsList, setActiveJobsList] = useState(true);
    const [jobList, setJobList ] = useState([]);

    const auth = useContext(AuthContext);

    useEffect(() => {
        if(auth.company){
            console.log(auth)
            api.get("/job/company")
            .then(response => {
                setJobList(response.data)
            })
        }
    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
    };

    const handleOpportunityModalClose = () => {
        setNewJobOpportunity({});
        setOpportunityModal(false);
    }

    const handleIncomeChange = () => {
        setIncomeNegotiable(!incomeNegotiable);
        Object.assign(newJobOpportunity, {"negotiable": incomeNegotiable})
    }

    const handleNewJobRequest = () => {
        console.log("teste")
        if(Object.keys(newJobOpportunity).length !== 0){

            api.post("/job/",newJobOpportunity).then(response => {
                console.log(response);
                setNewJobOpportunity({});
                setOpportunityModal(false);
            })
            
        }
    }

    const handleListingRendering = () => {
        if(jobList.length !== 0) {
            return <div className="job-list">
                {jobList.map(job => <JobCard props={job}/>)}
            </div>
        } else {
            return <div>
                <p>Não há vagas cadastradas para essa empresa</p>
            </div>
        }
    }

    return (
        <div>
            <Header />
            <div className="company-page">
                <div className="company-job-options">
                    <div><Button sx={{borderRadius: 5, background:"green", m: 4}} variant="contained">vagas de emprego em aberto</Button></div>
                    <div><Button sx={{borderRadius: 5, background:"red", m: 4}} variant="contained">vagas de emprego encerradas</Button></div>
                </div>
                <div className="new-job-form">
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ borderRadius: 5 }}
                        onClick={() => setOpportunityModal(true)}
                    >
                        <AddCircleOutlineIcon />
                        <p>adicionar nova oportunidade de emprego</p>
                    </Button>
                </div>
                <div className="list-jobs">
                    {handleListingRendering()}
                </div>
            </div>
            <Modal
                open={opportunityModal}
                onClose={handleOpportunityModalClose}
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="nome da função"
                            fullWidth
                            sx={{ m: 1 }}
                            variant="outlined"
                            onChange={e => Object.assign(newJobOpportunity, { "jobTitle": e.target.value })}

                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Descrição da oportunidade"
                            multiline
                            fullWidth
                            sx={{ m: 1 }}
                            variant="outlined"
                            onChange={e => Object.assign(newJobOpportunity, { "jobDesc": e.target.value })}
                            rows={4}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <FormControl
                            sx={{ m: 1, width: '50ch' }}
                        >
                            <InputLabel id="modality-job">Modalidade</InputLabel>
                            <Select
                                labelId="modality-job"
                                id="modality-job-select"
                                label="Modalidade"
                                onChange={e => Object.assign(newJobOpportunity, { "modality": e.target.value })}
                            >
                                <MenuItem value={"CLT"}>CLT</MenuItem>
                                <MenuItem value={"PJ"}>PJ</MenuItem>
                                <MenuItem value={"Freelancer"}>Freelancer</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, width: '50ch' }}
                        >
                            <InputLabel id="seniority-job">Nivel de Experiência desejada</InputLabel>
                            <Select
                                labelId="seniority-job"
                                id="seniority-job-select"
                                label="Experiencia desejada"
                                onChange={e => Object.assign(newJobOpportunity, { "seniority": e.target.value })}
                            >
                                <MenuItem value={"junior"}>junior</MenuItem>
                                <MenuItem value={"pleno"}>pleno</MenuItem>
                                <MenuItem value={"senior"}>senior</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Salário inicial"
                            sx={{ m: 1, width: '45ch' }}
                            variant="outlined"
                            onChange={e => Object.assign(newJobOpportunity, { "income": e.target.value })}
                            rows={4}
                        />
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked />} 
                            onChange={handleIncomeChange}
                            checked={incomeNegotiable}
                            label="Salário Negociavel" 
                            sx={{ m:1}}/>
                        </FormGroup>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                    <FormControl
                            sx={{ m: 1, width: '45ch' }}
                        >
                            <InputLabel id="type-job">Tipo de trabalho</InputLabel>
                            <Select
                                labelId="type-job"
                                id="type-job-select"
                                label="Tipo de trabalho"
                                onChange={e => Object.assign(newJobOpportunity, { "typeOfJob": e.target.value })}
                            >
                                <MenuItem value={"Presencial"}>Presencial</MenuItem>
                                <MenuItem value={"Remoto"}>Remoto</MenuItem>
                                <MenuItem value={"Híbrido"}>Híbrido</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Button 
                        variant="contained"
                        sx={{m: 1}}
                        onClick={handleNewJobRequest}>
                            Cadastrar oportunidade
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}