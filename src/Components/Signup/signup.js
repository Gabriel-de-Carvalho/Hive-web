import React, {useState} from "react";
import Header from '../Header/Header';
import { Button, TextField } from "@mui/material";
import api from "../../api";

export default function Signup(){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function signup(){
        const newUserInfo = {
            user: username,
            password: password,
            email: email
        }
        
                
        var config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }

        api.post('/user/', newUserInfo, config).then(response => console.log(response)).catch(error => alert(error));
    }


    return(
        <div>
            <Header></Header>

            <div className="signup-main-body">
                <div className="form signup-fields">
                    <TextField
                        required
                        variant="filled"
                        id="username"
                        label="Nome de usuário"
                        sx={{width: 100}}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <TextField
                        required
                        variant="filled"
                        id="email"
                        label="Email"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        required
                        variant="filled"
                        id="password"
                        label="Senha"
                        type="password"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div>
                        <Button onClick={signup}>Cadastrar-se</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}