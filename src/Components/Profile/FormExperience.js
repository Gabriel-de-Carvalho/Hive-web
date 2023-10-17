import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import { Box, TextField, FormGroup, FormControlLabel, Switch, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import api from "../../api";
import Collapse from '@mui/material/Collapse';

export default function FormExperience(props) {
    const [currentJobCheckBox, setCurrentJobCheckBox] = useState(true);
    const [experienceInfo, setExperienceInfo] = useState({});
    const [renderAddExperience, setRenderAddExperience] = useState(false);

    const [functionNameValidate, setFunctionNameValidate] = useState(false);
    const [companyNameValidate, setCompanyNameValidate] = useState(false);
    const [beginDateValidate, setBeginDateValidate] = useState(false);
    const [endDateValidate, setEndDateValidate] = useState(false)

    const [validForm, setValidForm] = useState(false);

    const [validationFormFields, setValidationFormFields] = useState({
        functionName: false,
        companyName: false,
        endDate: false,
    })

    const [functionName, setFunctionName] = useState(false);

    function onChangeCurrentJob() {
        setCurrentJobCheckBox(!currentJobCheckBox)
        console.log(!currentJobCheckBox)
    }

    function requestNewExperience() {
        if (validateForm()) {
            var token = localStorage.getItem("token");
            setExperienceInfo(Object.assign(experienceInfo, { "currentJob": !currentJobCheckBox }))
            if (token !== undefined && token !== "") {
                api.put("/user/experience/", experienceInfo, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then(response => {
                    props.setExperiences(response.data)
                    setRenderAddExperience(false);
                });
            }
        }

    }

    const validateForm = () => {
        console.log(experienceInfo);
        if (functionNameValidate) {
            return false;
        }
        if (companyNameValidate) {
            return false;
        }
        if (beginDateValidate) {
            return false;
        }
        if (endDateValidate) {
            return false;
        }

        return true;
    }

    const handleFunctionNameChange = (event) => {
        const value = event.target.value;
        console.log(value)
        if (typeof value === "undefined" || value === "") {
            setFunctionNameValidate(true);
        } else {
            setFunctionNameValidate(false);
            setExperienceInfo(Object.assign(experienceInfo, { "jobTitle": value }))
        }
    }

    const handleCompanyNameChange = (event) => {
        const value = event.target.value;
        if (typeof value === "undefined" || value === "") {
            setCompanyNameValidate(true);
        } else {
            setCompanyNameValidate(false);
            setExperienceInfo(Object.assign(experienceInfo, { "companyId": value }))
        }
    }

    const handleDateBeginChange = (value) => {
        console.log(value)
        if (typeof value === "undefined" || value === null) {
            setBeginDateValidate(true);
        } else {
            setBeginDateValidate(false);
            setExperienceInfo(Object.assign(experienceInfo, { "dateInit": value }))
        }
    }

    const handleDateEndChange = (value) => {
        if ((typeof value === "undefined" || value === null) && currentJobCheckBox) {
            setEndDateValidate(true);
        } else {
            setEndDateValidate(false);
            setExperienceInfo(Object.assign(experienceInfo, { "dateEnd": value }))
        }
    }


    const formAddExperience = () => {
        return <div className="form-experience">
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    label="Nome do função realizada"
                    id="outlined-start-adornment"
                    fullWidth
                    onChange={handleFunctionNameChange}
                    error={functionNameValidate}
                    helperText="Campo de função exercida não pode ser vazio"
                    sx={{ m: 1 }}
                />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    label="Nome da Empresa"
                    id="outlined-start-adornment"
                    fullWidth
                    onChange={handleCompanyNameChange}
                    error={companyNameValidate}
                    helperText="Nome da empresa não pode ser vazio"
                    sx={{ m: 1 }}
                />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="data de inicio"
                        format="DD/MM/YYYY"
                        error={beginDateValidate}
                        onChange={handleDateBeginChange}
                        sx={{ m: 1, width: '25ch' }}
                        slotProps={{
                            textField: {
                                error: beginDateValidate,
                            },
                        }}
                    />
                    {!currentJobCheckBox && <DatePicker
                        label="data de termino"
                        format="DD/MM/YYYY"
                        onChange={handleDateEndChange}
                        sx={{ m: 1, width: '25ch' }}
                        slotProps={{
                            textField: {
                                error: endDateValidate,
                            },
                        }}
                        helperText="se não é o emprego atual, insira uma data de termino"
                        hiden
                    />}
                </LocalizationProvider>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />}
                        checked={currentJobCheckBox}
                        onChange={onChangeCurrentJob}
                        label="Emprego atual" />
                </FormGroup>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    multiline
                    label="descrição das atividades realizadas"
                    fullWidth
                    onChange={(value) => setExperienceInfo(Object.assign(experienceInfo, { "jobDesc": value.target.value }))}
                    sx={{ m: 1 }}
                />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Button variant="contained" sx={{ m: 1 }} onClick={requestNewExperience}>Adicionar</Button>
            </Box>
        </div>
    }

    const handleFormRender = () => {
        setRenderAddExperience(!renderAddExperience)
    }


    return (
        <div>
            <div onClick={handleFormRender} className="new-experience-button"><FontAwesomeIcon icon={faPlus} /> adicionar experiencia</div>
            <Collapse in={renderAddExperience}>{formAddExperience()}</Collapse>
        </div>
    )
}