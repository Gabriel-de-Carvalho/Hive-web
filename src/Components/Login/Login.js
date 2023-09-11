import { Button, TextField } from "@mui/material";
import React, {useState} from "react";
import api from "../../api";
import './Login.css'
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function Login() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    function authenticate(){
        var infoLogin = {
            userName: userName,
            password: password
        }
        
        var config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }

        api.post('/auth/signin',
            infoLogin, config
        ).then(response => {
            localStorage.setItem('token', response.data);
            navigate("/");
        })
    }

    return (
        <div>
            <Header></Header>
            <div className="login">
                <div className="form login-fields">
                    <TextField
                        required
                        id="usernameInfo"
                        label="email"
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
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        sx={{
                            mb: 5,
                        }}
                    />
                    <div className="btn-login">
                    <Button variant="contained" onClick={() => { authenticate()}}>Fazer Login</Button>
                    <Button variant="contained"> Esqueci a Senha</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;