import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormGroup, FormControlLabel, Pagination } from "@mui/material";
import "./companyPage.css";
import AuthContext from "../../Context/UserContext";
import api from "../../api";
import {InputAdornment} from "@mui/material";
import JobCard from "../../JobCard/JobCard";

export default function OpenJobsCompanyPage() {

    const [opportunityModal, setOpportunityModal] = useState(false);
    const [newJobOpportunity, setNewJobOpportunity] = useState({});
    const [incomeNegotiable, setIncomeNegotiable] = useState(true);
    const [jobList, setJobList] = useState([]);

    const [errorMsg, setErrorMsg] = useState(false);
    const [functionNameValidate, setFunctionNameValidate] = useState(false);
    const [jobDescriptionValidate, setJobDescriptionValidate] = useState(false);
    const [jobModalityValidate, setJobModalityValidate] = useState(false);
    const [jobExperienceValidate, setJobExperienceValidate] = useState(false);
    const [incomeValidate, setIncomeValidate] = useState(false);
    const [jobTypeValidate, setJobTypeValidate] = useState(false);

    const [newJobInfoValue, setNewJobInfoValue] = useState({
        "jobTitle": "",
        "jobDesc": "",
        "modality": "",
        "seniority": "",
        "income": "",
        "typeOfJob": "",
        "negotiable": false
    })

    const [jobModalErrorMsgs, setJobModalErrorMsgs] = useState({
        "jobTitle": "",
        "jobDesc": "",
        "modality": "",
        "seniority": "",
        "income": "",
        "typeOfJob": "",
        "negotiable": false,
    })

    const [page, setPage] = useState(0);
    const [countPages, setCountPages] = useState(0);

    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth.company) {
            console.log(auth)
            const token = localStorage.getItem("token")
            api.get("/job/company", {
                headers:{
                    Authorization: "Bearer " + token
                }
            })
                .then(response => {
                    setJobList(response.data.jobs.content);
                    setCountPages(response.data.totalPages);
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
        Object.assign(newJobOpportunity, { "negotiable": incomeNegotiable })
    }

    const handleNewJobRequest = () => {
        console.log(jobModalErrorMsgs)
        if (validateForm()) {
            
            setErrorMsg(false);
            if (Object.keys(newJobOpportunity).length !== 0) {
                const token = localStorage.getItem("token");
                api.post("/job/", newJobOpportunity, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then(response => {
                    console.log(response);
                    setNewJobOpportunity({});
                    setOpportunityModal(false);
                })

            }
        } else {
            setErrorMsg(true);
        }

    }

    const handleListingRendering = () => {
        if (jobList.length !== 0) {
            return <div className="job-list">
                {jobList.map(job => <JobCard props={job} />)}
            </div>
        } else {
            return <div>
                <p>Não há vagas cadastradas para essa empresa</p>
            </div>
        }
    }

    const handleNewJobInfoChange = (e) => {
        const {name, value} = e.target;
        if(name === "negotiable"){
            setNewJobInfoValue({...newJobInfoValue, [name]: !newJobInfoValue.negotiable})
        } else {
            setNewJobInfoValue({...newJobInfoValue, [name]: value})
        }

    }

    const validateForm = () => {
        const newErrors = {
            jobTitle: newJobInfoValue.jobTitle === '' ?  "Nome da função não pode ser vázio" : "",
            jobDesc: newJobInfoValue.jobDesc === '' ? "Descrição da função não pode ser vázia": "",
            modality: newJobInfoValue.modality === ''? "escolha uma modalidade válida" : "",
            seniority: newJobInfoValue.seniority === '' ? "escolha a experiencia desejada" : "",
            income: newJobInfoValue.income === '' ? "insira um valor válido de salário" : "",
            typeOfJob: newJobInfoValue.typeOfJob === '' ? "Escolha um tipo de trabalho válido": ""
        }

        setJobModalErrorMsgs(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    }

    const handlePageChange = (event, value) => {
        setPage(value-1);
    }

    return (
        <div>
            <Header />
            <div className="open-job-list">
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
                <h2>Lista de vagas em aberto:</h2>
                <div className="list-jobs">
                    {handleListingRendering()}
                </div>
                <div>
                <Pagination count={countPages} page={page + 1} onChange={handlePageChange} sx={{ display: "flex", justifyContent: "center", alignContent: "center", mt: 2}} />
                </div>
            </div>
            <Modal
                open={opportunityModal}
                onClose={handleOpportunityModalClose}
            >
                <Box sx={style}>

                    <Box sx={{ display: "flex", ml: 1 }}>
                        {errorMsg && <span className="error-msg">É preciso preencher todos os campos destacados*</span>}
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="nome da função"
                            fullWidth
                            sx={{ m: 1 }}
                            name="jobTitle"
                            value={newJobInfoValue.jobTitle}
                            error={!!jobModalErrorMsgs.jobTitle}
                            helperText={jobModalErrorMsgs.jobTitle}
                            onChange={handleNewJobInfoChange}
                            variant="outlined"

                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Descrição da oportunidade"
                            multiline
                            fullWidth
                            sx={{ m: 1 }}
                            variant="outlined"
                            rows={4}
                            name="jobDesc"
                            value={newJobInfoValue.jobDesc}
                            error={!!jobModalErrorMsgs.jobDesc}
                            helperText={jobModalErrorMsgs.jobDesc}
                            onChange={handleNewJobInfoChange}
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
                                name="modality"
                                error={!!jobModalErrorMsgs.modality}
                                helperText={jobModalErrorMsgs.modality}
                                onChange={handleNewJobInfoChange}
                            >
                                <MenuItem value={""}></MenuItem>
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
                                name="seniority"
                                error={!!jobModalErrorMsgs.seniority}
                                helperText={jobModalErrorMsgs.seniority}
                                onChange={handleNewJobInfoChange}
                            >
                                <MenuItem value={""}></MenuItem>
                                <MenuItem value={"junior"}>Júnior</MenuItem>
                                <MenuItem value={"pleno"}>Pleno</MenuItem>
                                <MenuItem value={"senior"}>Senior</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Salário inicial"
                            sx={{ m: 1, width: '43ch' }}
                            variant="outlined"
                            rows={4}
                            name="income"
                            value={newJobInfoValue.income}
                            error={!!jobModalErrorMsgs.income}
                            helperText={jobModalErrorMsgs.income}
                            onChange={handleNewJobInfoChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                              }}
                        />
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked />}
                                onChange={handleNewJobInfoChange}
                                checked={incomeNegotiable}
                                value={newJobInfoValue.negotiable}
                                name="negotiable"
                                label="Salário Negociavel"
                                sx={{ m: 1 }} />
                        </FormGroup>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <FormControl
                            sx={{ m: 1, width: '43ch' }}
                        >
                            <InputLabel id="type-job">Tipo de trabalho</InputLabel>
                            <Select
                                labelId="type-job"
                                id="type-job-select"
                                label="Tipo de trabalho"
                                name="typeOfJob"
                                error={!!jobModalErrorMsgs.typeOfJob}
                                helperText={jobModalErrorMsgs.typeOfJob}
                                onChange={handleNewJobInfoChange}
                            >
                                <MenuItem value={""}></MenuItem>
                                <MenuItem value={"Presencial"}>Presencial</MenuItem>
                                <MenuItem value={"Remoto"}>Remoto</MenuItem>
                                <MenuItem value={"Híbrido"}>Híbrido</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Button
                            variant="contained"
                            sx={{ m: 1 }}
                            onClick={handleNewJobRequest}>
                            Cadastrar oportunidade
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}