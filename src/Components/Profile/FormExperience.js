import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import { Box, TextField, FormGroup, FormControlLabel, Switch, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import api from "../../api";

export default function FormExperience(){
    const [currentJobCheckBox, setCurrentJobCheckBox] = useState(true);
    const [experienceInfo, setExperienceInfo] = useState({});

    function onChangeCurrentJob() {
        setCurrentJobCheckBox(!currentJobCheckBox)
        setExperienceInfo(Object.assign(experienceInfo, {"currentJob": currentJobCheckBox}))
    }

    function requestNewExperience(){
        var token = localStorage.getItem("token");
        if(token !== undefined && token !== ""){
            api.put("/user/experience/", experienceInfo,{
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(response => console.log(response));
        }

    }

    return (
        <div>
            <div><FontAwesomeIcon icon={faPlus}/> adicionar experiencia</div>
                    <div className="form-experience">
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField
                                label="Nome do função realizada"
                                id="outlined-start-adornment"
                                fullWidth
                                onChange={(value) => setExperienceInfo(Object.assign(experienceInfo, {"jobTitle": value.target.value}))}
                                sx={{ m: 1}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField
                                    label="Nome da Empresa"
                                    id="outlined-start-adornment"
                                    fullWidth
                                    onChange={(value) => setExperienceInfo(Object.assign(experienceInfo, {"companyId": value.target.value}))}
                                    sx={{ m: 1}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="data de inicio"
                                    format="DD/MM/YYYY"
                                    onChange={(value) => setExperienceInfo(Object.assign(experienceInfo, {"dateInit": value}))}
                                    sx={{ m: 1, width: '25ch' }}
                                />
                                {!currentJobCheckBox && <DatePicker 
                                                        label="data de termino"
                                                        format="DD/MM/YYYY"
                                                        onChange={(value) => setExperienceInfo(Object.assign(experienceInfo, {"dateEnd": value}))}
                                                        sx={{ m: 1, width: '25ch' }}
                                                        hiden
                                                    />}
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormGroup>
                                <FormControlLabel control={<Switch defaultChecked />} 
                                checked={currentJobCheckBox}  
                                onChange = {onChangeCurrentJob} 
                                label="Emprego atual" />
                            </FormGroup>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}> 
                            <TextField 
                                multiline
                                label="descrição das atividades realizadas"
                                fullWidth
                                onChange={(value) => setExperienceInfo(Object.assign(experienceInfo, {"jobDesc": value.target.value}))}
                                sx={{m: 1}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Button variant="contained" sx={{m:1}} onClick={requestNewExperience}>Adicionar</Button>
                        </Box>
                    </div>
        </div>
    )
}