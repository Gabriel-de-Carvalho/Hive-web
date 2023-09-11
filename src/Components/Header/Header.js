import React, { useContext } from 'react';
import "./Header.css"
import Button from "@mui/material/Button"
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
function Header() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);


    const renderOptionsLogin = () => {
        if(!auth.logged){
            return <div className="header-login">
                 <Button sx={{background: "white", color: "black", borderRadius: 4}} variant='contained' onClick={() => navigate('/login')}>Entrar</Button>
                 <Button variant="contained">Cadastrar-se</Button>
            </div> 
        } else {
            return <div className="header-user">
            <FontAwesomeIcon icon={faUserTie} size="2xl" onClick={() => navigate("/profile")}/>
            <a onClick={() => navigate("/profile")}>{auth.user.user}</a>
            </div>
        }
    }
    return(
        <div className='header'>

            <div className='title-logo'>
                <h1 onClick={() => {navigate("/")}}>
                    Hive
                </h1>
            </div>
           
            <div className='search-bar-header'>
                    <TextField
                        fullWidth
                        variant='standard'
                        sx={{background: 'white',
                            mr: 2}}
                    />
                    <Button variant="contained">Pesquisar</Button>
            </div>

            {renderOptionsLogin()}

        </div>
    )
}

export default Header;