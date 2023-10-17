import React , {useState} from "react";
import Header from "../Header/Header";
import { Box, TextField, Button, Switch, FormGroup, FormControlLabel, CircularProgress } from "@mui/material";
import "./Signup.css"
import { DatePicker, LocalizationProvider,  } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import api from "../../api";
import { useNavigate } from "react-router-dom";
import ModalError from "../Modals/ModalError";


export default function Signup() {
    const [isCompany, setIsCompany] = useState(false);

    const [companyInfo, setCompanyInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();

    

    const createCompany = () => {
        localStorage.removeItem("token");
        api.post("/company/", companyInfo).then(response => {
            console.log(response)
            setShowLoadingScreen(true);
            // setTimeout(function() {navigate("/login")}, 5000);
            navigate("/login")
        }).catch(response => setShowError(true));
    }

    const createUser = () => {
        api.post("/user/", userInfo).then(response => {
            console.log(response);
            setShowLoadingScreen(true);
            // setTimeout(function() {navigate("/login")}, 5000);
            navigate("/login")
        }).catch(response => setShowError(true));

    }

    var formUser =  
        (
            <div className="signup-form">
            <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField
                    label="Nome Completo"
                    id="fullName"
                    fullWidth
                    required
                    onChange={(value) => setUserInfo(Object.assign(userInfo, {user: value.target.value}))}
                    sx={{ m: 1}}
                />
            </Box>
            <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField
                    label="email"
                    id="email"
                    fullWidth
                    required
                    onChange={(value) => setUserInfo(Object.assign(userInfo, {email: value.target.value}))}
                    sx={{ m: 1}}
                />
            </Box>
            <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField
                    label="senha"
                    id="password"
                    fullWidth
                    required
                    type="password"
                    onChange={(value) => setUserInfo(Object.assign(userInfo, {password: value.target.value}))}
                    sx={{ m: 1, width: '25ch' }}
                />
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="data de nascimento"
                        format="DD/MM/YYYY"
                        onChange={(value) => setUserInfo(Object.assign(userInfo, {birthDate: value}))}
                        sx={{ m: 1, width: '25ch' }}
                    />
                 </LocalizationProvider>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked />} 
                        onChange={() => setIsCompany(!isCompany)}
                        checked={isCompany}
                        label={isCompany ? "Cadastar uma pessoa": "Cadastrar uma empresa"} />
                    </FormGroup>
            </Box>
            <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <Button sx={{m:1}} variant="contained" onClick={createUser}>Cadastrar-se</Button>
            </Box>
        </div>
        )


    const formCompany = (
        <div className="signup-form">
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                fullWidth
                label="Nome da empresa"
                onChange={(value) => setCompanyInfo(Object.assign(companyInfo, {companyName: value.target.value}))}
                sx = {{m: 1}}
                />
             </Box>
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                fullWidth
                label="Email da empresa"
                onChange={(value) => {
                    setCompanyInfo(Object.assign(companyInfo, {companyEmail: value.target.value}))
                    console.log(companyInfo)
                }}
                sx = {{m:1}}
                />
             </Box>
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                fullWidth
                type="password"
                label="Senha da conta"
                onChange={(value) => setCompanyInfo(Object.assign(companyInfo, {password: value.target.value}))}
                sx = {{m:1}}
                />
             </Box>
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                fullWidth
                label="Site da empresa"
                onChange={(value) => setCompanyInfo(Object.assign(companyInfo, {siteCompany: value.target.value}))}
                sx = {{m:1}}
                />
             </Box>
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                label="Cidade"
                sx = {{m:1, width: "36ch"}}
                onChange={(value) => setCompanyInfo(Object.assign(companyInfo, {city: value.target.value}))}
                />
                <TextField 
                label="Estado"
                sx = {{m:1, width: "36ch"}}
                onChange={(value) => setCompanyInfo(Object.assign(companyInfo, {state: value.target.value}))}
                />
                <TextField 
                label="País"
                sx = {{m:1, width: "36ch"}}
                onChange={(value) => setCompanyInfo(Object.assign(companyInfo, {country: value.target.value}))}
                />
             </Box>
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                label="Quantidade de funcionários"
                sx = {{m:1, width: '45ch'}}
                onChange={(value) => setCompanyInfo(Object.assign(companyInfo, {numberEmployees: value.target.value}))}
                />
             </Box>
             <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked />} 
                        onChange={() => setIsCompany(!isCompany)}
                        checked={isCompany}
                        label={isCompany ? "Cadastrar uma empresa": "Cadastar uma pessoa"} 
                        sx={{ m:1}}/>
                    </FormGroup>
            </Box>
            <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <Button sx={{m:1}} variant="contained" onClick={createCompany}>Cadastrar-se</Button>
            </Box>
        </div>
    )

    const loadingSuccessScreen = (
        <div className="sucess-loading">
            <div>
                A sua conta foi criada com sucesso, você será redirecionado em segundos...
            </div>
            <div>
                <CircularProgress />
            </div>
        </div>
    )

    

    return (
        <div>
            <Header />
            <div className="signup-page">
                {showLoadingScreen ? loadingSuccessScreen : (isCompany ? formCompany : formUser)}
                {showError && <ModalError closeError={setShowError} errorMsg="usuário ja cadastrado com esse email"/>}
            </div>
        </div>
    )
}