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

    const [formExperienceInfo, setFormExperienceInfo] = useState({
        jobTitle: "",
        dateInit: "",
        jobDesc: "",
        currentJob: true,
        dateEnd: "",
        companyId: ""
    })

    const [formExperienceErrorMsg, setFormExperienceErrorMsg] = useState({
        jobTitle: "",
        dateInit: "",
        jobDesc: "",
        dateEnd: "",
        companyId: ""
    })

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

    const onChangeValues = (e) => {
        const {value, name} = e.target
        if(name ==="currentJob") {
            setFormExperienceInfo({...formExperienceInfo, [name]: !formExperienceInfo.currentJob})
        } else {
            setFormExperienceInfo({...formExperienceInfo, [name]: value})
        }
        
    }


    const validateForm = () => {
        const newErrors = {
            jobTitle: formExperienceInfo.jobTitle === '' ? "Nome da função não pode ser vazio" : '',
            dateInit: formExperienceInfo.dateInit === '' ? "Escolha uma data válida de inicio": '',
            jobDesc: formExperienceInfo.jobDesc === '' ? "Adicione uma descrição das atividades feitas durante o trabalho": '',
            dateEnd: (formExperienceInfo.dateEnd === '' && formExperienceInfo.currentJob === true) ? "Escolha uma data válida de termino": '',
            companyId: formExperienceInfo.companyId === '' ? "É precisa informar a empresa" : ""
        }

        setFormExperienceErrorMsg(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    }


    function requestNewExperience() {
        if (validateForm()) {
            var token = localStorage.getItem("token");
            if (token !== undefined && token !== "") {
                api.put("/user/experience/", formExperienceInfo, {
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
                    sx={{ m: 1 }}
                    name="jobTitle"
                    error={!!formExperienceErrorMsg.jobTitle}
                    helperText={formExperienceErrorMsg.jobTitle}
                    onChange={onChangeValues}
                    value={formExperienceInfo.jobTitle}
                />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    label="Nome da Empresa"
                    id="outlined-start-adornment"
                    fullWidth
                    sx={{ m: 1 }}
                    name="companyId"
                    error={!!formExperienceErrorMsg.companyId}
                    helperText={formExperienceErrorMsg.companyId}
                    onChange={onChangeValues}
                    value={formExperienceInfo.companyId}
                />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="data de inicio"
                        format="DD/MM/YYYY"
                        error={!!formExperienceErrorMsg.dateInit}
                        helperText={formExperienceErrorMsg.dateInit}
                        onChange={(value) => setFormExperienceInfo({...formExperienceInfo, "dateInit": value})}
                        name="dateInit"
                        sx={{ m: 1, width: '25ch' }}
                        slotProps={{
                            textField: {
                                error: !!formExperienceErrorMsg.dateInit,
                            },
                        }}
                    />
                    {formExperienceInfo.currentJob && <DatePicker
                        label="data de termino"
                        format="DD/MM/YYYY"
                        sx={{ m: 1, width: '25ch' }}
                        error={!!formExperienceErrorMsg.dateEnd}
                        helperText={formExperienceErrorMsg.dateEnd}
                        onChange={(value) => setFormExperienceInfo({...formExperienceInfo, "dateEnd": value})}
                        name="dateEnd"
                        slotProps={{
                            textField: {
                                error: !!formExperienceErrorMsg.dateEnd,
                            },
                        }}
                        hiden
                    />}
                </LocalizationProvider>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />}
                        checked={formExperienceInfo.currentJob}
                        onClick={onChangeValues}
                        value={formExperienceInfo.currentJob}
                        name="currentJob"
                        label="Emprego atual" />
                </FormGroup>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    multiline
                    label="descrição das atividades realizadas"
                    fullWidth
                    sx={{ m: 1 }}
                    name="jobDesc"
                    error={!!formExperienceErrorMsg.jobDesc}
                    helperText={formExperienceErrorMsg.jobDesc}
                    onChange={onChangeValues}
                    value={formExperienceInfo.jobDesc}
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