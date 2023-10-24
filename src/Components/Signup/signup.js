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
 
    const [signUpInfoUser, setSignUpInfoUser] = useState({
        "user": "",
        "email": "",
        "password": "",
        "birthDate": "",
    })

    const [signUpInfoUserErrorMsg, setSignUpInfoUserErrorMsg] = useState({
        "user": "",
        "email": "",
        "password": "",
        "birthDate": "",
    })

    const [signUpInfoCompany, setSignUpInfoCompany] = useState({
        "companyName": "",
        "companyEmail": "",
        "password": "",
        "siteCompany": "",
        "city": "",
        "state": "",
        "country": "",
        "numberEmployees": ""
    })

    const [signUpInfoCompanyErrorMsg, setSignUpInfoCompanyErrorMsg] = useState({
        "companyName": "",
        "companyEmail": "",
        "password": "",
        "city": "",
        "state": "",
        "country": "",
    })


    const navigate = useNavigate();

    const handleChangeForm = () => {
        setIsCompany(!isCompany);
    }

    const createCompany = () => {
        if(validateForm()){
            localStorage.removeItem("token");
            api.post("/company/", companyInfo).then(response => {
                console.log(response)
                setShowLoadingScreen(true);
                // setTimeout(function() {navigate("/login")}, 5000);
                navigate("/login")
            }).catch(response => setShowError(true));
        }
    }

    const createUser = () => {
        if(validateForm()){
            console.log(isCompany)
            api.post("/user/", userInfo).then(response => {
                console.log(response);
                setShowLoadingScreen(true);
                // setTimeout(function() {navigate("/login")}, 5000);
                navigate("/login")
            }).catch(response => setShowError(true));
        }
    }

    const validateForm = () => {
        if(!isCompany){
            const newErrorMsgs = {
                user: signUpInfoUser.user === "" ? "Insirá um nome válido para a empresa" : "",
                email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpInfoUser.email) === "" ? "Formato inválido de email" : "",
                password: signUpInfoUser.password === "" ? "Senha não pode estar em branco" : "",
                birthDate: signUpInfoUser.birthDate === "" ? "Insira uma cidade" : ""
            }
            setSignUpInfoUserErrorMsg(newErrorMsgs);
            console.log(Object.values(signUpInfoUserErrorMsg).every(error => error === ''))
            return Object.values(signUpInfoUserErrorMsg).every(error => error === '');
        } else {    
            console.log("nao era para entrar aqui")
            const newErrorMsgs = {
                companyName: signUpInfoCompany.companyName === "" ? "Insirá um nome válido para a empresa" : "",
                companyEmail: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpInfoCompany.companyEmail) === "" ? "Formato inválido de email" : "",
                password: signUpInfoCompany.password === "" ? "Senha não pode estar em branco" : "",
                city: signUpInfoCompany.password === "" ? "Insira uma cidade" : "",
                state: signUpInfoCompany.state === "" ? "Insira um Estado" : "",
                country: signUpInfoCompany.country === "" ? "Insira um país" : ""
            }
            setSignUpInfoCompanyErrorMsg(newErrorMsgs);

            return Object.values(signUpInfoCompanyErrorMsg).every(error => error === '');
        }
    }

    const handleOnChangeUserInfo = (e) => {
        const {name, value} = e.target;

        setSignUpInfoUser({...signUpInfoUser, [name]: value})
    }

    const handleOnChangeCompanyInfo = (e) => {
        const {name, value} = e.target;
        
        setSignUpInfoCompany({...signUpInfoCompany, [name]: value})
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
                    onChange={handleOnChangeUserInfo}
                    value={signUpInfoUser.user}
                    error={!!signUpInfoUserErrorMsg.user}
                    helperText={signUpInfoUserErrorMsg.user}
                    name="user"
                    sx={{ m: 1}}
                />
            </Box>
            <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField
                    label="email"
                    id="email"
                    fullWidth
                    required
                    onChange={handleOnChangeUserInfo}
                    value={signUpInfoUser.email}
                    error={!!signUpInfoUserErrorMsg.email}
                    helperText={signUpInfoUserErrorMsg.email}
                    user="email"
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
                    onChange={handleOnChangeUserInfo}
                    value={signUpInfoUser.email}
                    error={!!signUpInfoUserErrorMsg.email}
                    helperText={signUpInfoUserErrorMsg.email}
                    user="email"
                    sx={{ m: 1, width: '25ch' }}
                />
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="data de nascimento"
                        format="DD/MM/YYYY"
                        error={!!signUpInfoUserErrorMsg.birthDate}
                        helperText={signUpInfoUserErrorMsg.birthDate}
                        onChange={(value) => setSignUpInfoUser({...signUpInfoUser, "birthDate": value})}
                        name="birthDate"
                        sx={{ m: 1, width: '25ch' }}
                        slotProps={{
                            textField: {
                                error: !!signUpInfoUserErrorMsg.birthDate,
                            },
                        }}
                    />
                 </LocalizationProvider>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked />} 
                        onChange={handleChangeForm}
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
                onChange={handleOnChangeCompanyInfo}
                value={signUpInfoCompany.companyName}
                error={!!signUpInfoCompanyErrorMsg.companyName}
                helperText={signUpInfoCompanyErrorMsg.companyName}
                name="companyName"
                sx = {{m: 1}}
                />
             </Box>
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                fullWidth
                label="Email da empresa"
                onChange={handleOnChangeCompanyInfo}
                value={signUpInfoCompany.companyEmail}
                error={!!signUpInfoCompanyErrorMsg.companyEmail}
                helperText={signUpInfoCompanyErrorMsg.companyEmail}
                name="companyEmail"
                sx = {{m:1}}
                />
             </Box>
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                fullWidth
                type="password"
                label="Senha da conta"
                onChange={handleOnChangeCompanyInfo}
                value={signUpInfoCompany.password}
                error={!!signUpInfoCompanyErrorMsg.password}
                helperText={signUpInfoCompanyErrorMsg.password}
                name="password"
                sx = {{m:1}}
                />
             </Box>
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                fullWidth
                label="Site da empresa"
                onChange={handleOnChangeCompanyInfo}
                value={signUpInfoCompany.siteCompany}
                name="siteCompany"
                sx = {{m:1}}
                />
             </Box>
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                label="Cidade"
                sx = {{m:1, width: "36ch"}}
                onChange={handleOnChangeCompanyInfo}
                value={signUpInfoCompany.city}
                error={!!signUpInfoCompanyErrorMsg.city}
                helperText={signUpInfoCompanyErrorMsg.city}
                name="city"
                />
                <TextField 
                label="Estado"
                sx = {{m:1, width: "36ch"}}
                onChange={handleOnChangeCompanyInfo}
                value={signUpInfoCompany.state}
                error={!!signUpInfoCompanyErrorMsg.state}
                helperText={signUpInfoCompanyErrorMsg.state}
                name="state"
                />
                <TextField 
                label="País"
                sx = {{m:1, width: "36ch"}}
                onChange={handleOnChangeCompanyInfo}
                value={signUpInfoCompany.country}
                error={!!signUpInfoCompanyErrorMsg.country}
                helperText={signUpInfoCompanyErrorMsg.country}
                name="country"
                />
             </Box>
             <Box sx={{ display: 'flex', flexwrap: 'wrap' }}>
                <TextField 
                label="Quantidade de funcionários"
                sx = {{m:1, width: '45ch'}}
                onChange={handleOnChangeCompanyInfo}
                value={signUpInfoCompany.numberEmployees}
                name="numberEmployees"
                />
             </Box>
             <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked />} 
                        onChange={handleChangeForm}
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