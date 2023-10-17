import { Button, TextField, FormGroup, FormControlLabel, Switch, Box } from "@mui/material";
import React, { useContext, useState } from "react";
import api from "../../api";
import './Login.css'
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/UserContext";
import ModalError from "../Modals/ModalError";

function Login() {
    const [companyEmail, setCompanyEmail] = useState("");
    const [formUser, setFormUser] = useState(true);
    const [showError, setShowError] = useState(false);

    const [loginInfo, setLoginInfo] = useState({
        login: "",
        password: ""
    })

    const [loginErrorMsg, setLoginErrorMsg] = useState({
        login: "",
        password: ""
    })

    const [emailValidateError, setEmailValidateError] = useState(false);
    const [passwordValidateError, setPasswordValidateError] = useState(false);

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    function authenticate() {
        var config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }
        console.log(companyEmail)
        var infoLogin;
        if (validateInfoLogin()) {
            if (formUser) {
                var infoLogin = {
                    userName: loginInfo.login,
                    password: loginInfo.password
                }
                api.post('/auth/signin/user',
                    infoLogin, config
                ).then(response => {
                    localStorage.setItem('token', response.data);
                    auth.handleFetchInfoUser();
                    navigate("/");
                }).catch(err => {
                    setShowError(true);
                })
            } else {
                var infoLogin = {
                    companyEmail: loginInfo.login,
                    password: loginInfo.password
                }
                api.post('/auth/signin/company',
                    infoLogin, config
                ).then(response => {
                    console.log(response)
                    localStorage.setItem('token', response.data);
                    auth.handleFetchInfoUser()
                    navigate("/");
                }).catch(err => {
                    setShowError(true);
                })
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    const validateInfoLogin = () => {
        const newErrorsMsg = {
            login: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInfo.login) ? "Insira um email válido" : "",
            password: loginInfo.password === '' ? "Senha não pode estar vazia" : ""
        }

        setLoginErrorMsg(newErrorsMsg)
        return Object.values(newErrorsMsg).every((error) => error === '');
    }
    const userLoginForm = (
        <div className="form login-fields card">
            <TextField
                required
                id="usernameInfo"
                label="email do usuário"
                variant="filled"
                error={!!loginErrorMsg.login}
                helperText={loginErrorMsg.login}
                onChange={handleChange}
                value={loginInfo.login}
                name="login"
                fullWidth
                sx={{
                    mt: 5,
                    mb: 5,
                }}
            />
            <TextField
                required
                id="password"
                label="Senha"
                variant="filled"
                type="password"
                name="password"
                value={loginInfo.password}
                error={!!loginErrorMsg.password}
                helperText={loginErrorMsg.password}
                onChange={handleChange}
                fullWidth
                sx={{
                    mb: 5,
                }}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />}
                        onChange={() => setFormUser(!formUser)}
                        checked={formUser}
                        label={formUser ? "Entrar como usuário" : "Entrar como empresa"} />
                </FormGroup>
            </Box>
            <div className="btn-login">
                <Button sx={{ mt: 2 }} size="large" variant="contained" onClick={() => { authenticate() }}>Login</Button>
                {/* <Button variant="contained"> Esqueci a Senha</Button> */}
            </div>
        </div>
    )

    const companyLoginForm = (
        <div className="form login-fields card">
            <TextField
                required
                id="companyInfoId"
                label="email da empresa"
                variant="filled"
                error={!!loginErrorMsg.login}
                helperText={loginErrorMsg.login}
                onChange={handleChange}
                value={loginInfo.login}
                name="login"
                fullWidth
                sx={{
                    mt: 5,
                    mb: 5,
                }}
            />
            <TextField
                required
                id="password"
                label="Senha"
                variant="filled"
                type="password"
                name="password"
                value={loginInfo.password}
                error={!!loginErrorMsg.password}
                helperText={loginErrorMsg.password}
                onChange={handleChange}
                fullWidth
                sx={{
                    mb: 5,
                }}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />}
                        onChange={() => setFormUser(!formUser)}
                        checked={formUser}
                        label={formUser ? "Entrar como usuário" : "Entrar como empresa"} />
                </FormGroup>
            </Box>
            <div className="btn-login">
                <Button variant="contained" onClick={() => { authenticate() }}>Login</Button>
                {/* <Button variant="contained"> Esqueci a Senha</Button> */}
            </div>
        </div>
    )

    return (
        <div>
            <Header></Header>
            <div className="login">
                {formUser ? userLoginForm : companyLoginForm}
                {showError && <ModalError closeError={setShowError} errorMsg="Não há usuário cadastrado com esse email" />}
            </div>
        </div>
    )
}

export default Login;