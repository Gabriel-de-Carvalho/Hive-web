import { Button, TextField, FormGroup, FormControlLabel, Switch, Box } from "@mui/material";
import React, {useContext, useState} from "react";
import api from "../../api";
import './Login.css'
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/UserContext";
import ModalError from "../Modals/ModalError";

function Login() {
    const [userName, setUsername] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [formUser, setFormUser] = useState(true);
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const auth = useContext(AuthContext);

    const navigate = useNavigate();
    
    function authenticate(){
        var config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }
        console.log(companyEmail)
        var infoLogin;

        if(formUser){
            var infoLogin = {
                userName: userName,
                password: password
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
                companyEmail: companyEmail,
                password: password
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
        
        
        var config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }


    }

    const userLoginForm = (
        <div className="form login-fields">
                    <TextField
                        required
                        id="usernameInfo"
                        label="email do usuário"
                        variant="filled"
                        onChange={e => setUsername(e.target.value)}
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
                        onChange={e => setPassword(e.target.value)}
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
                        label={formUser ? "Entrar como usuário": "Entrar como empresa"} />
                        </FormGroup>
                    </Box>
                    <div className="btn-login">
                    <Button variant="contained" onClick={() => { authenticate()}}>Fazer Login</Button>
                    <Button variant="contained"> Esqueci a Senha</Button>
                    </div>
                </div>
    )

    const companyLoginForm = (
        <div className="form login-fields">
                    <TextField
                        required
                        id="companyInfoId"
                        label="email da empresa"
                        variant="filled"
                        onChange={e => {
                            setCompanyEmail(e.target.value);
                            console.log(companyEmail)
                        }}
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
                        onChange={e => setPassword(e.target.value)}
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
                        label={formUser ? "Entrar como usuário": "Entrar como empresa"} />
                        </FormGroup>
                    </Box>
                    <div className="btn-login">
                    <Button variant="contained" onClick={() => { authenticate()}}>Fazer Login</Button>
                    <Button variant="contained"> Esqueci a Senha</Button>
                    </div>
                </div>
    )

    return (
        <div>
            <Header></Header>
            <div className="login">
                {formUser ? userLoginForm : companyLoginForm}
                {showError && <ModalError closeError={setShowError} errorMsg="Não há usuário cadastrado com esse email"/>}
            </div>
        </div>
    )
}

export default Login;