import React, { useContext } from 'react';
import "./Header.css"
import Button from "@mui/material/Button"
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';
function Header() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const loggout = () => { 
        auth.setUser({});
        auth.setLogged(false);
        auth.setCompany({});
        localStorage.clear();
        navigate("/");
    }

    const profileUser = () => {
        return <div className="header-user">
                        <FontAwesomeIcon icon={faUserTie} size="2xl" onClick={() => navigate("/profile")}/>
                        <a onClick={() => navigate("/profile")}>{auth.user.user}</a>
                    </div>
    }

    const profileCompany = () => {
        return <div className="header-user">
            {console.log("empresa")}
            <ApartmentIcon sx={{fontSize: 40}} onClick={() => navigate("/companyPage")}/>
            <a onClick={() => navigate("/companyPage")}>{auth.company.companyName}</a>
        </div>
    }

    const renderIconProfile = () => {
        if(Object.keys(auth.user).length !== 0){
            return true;
        }
        return false;
    }


    const renderOptionsLogin = () => {
        console.log(!auth.logged)
        if(!auth.logged){
            return <div className="header-login">
                 <Button sx={{background: "white", color: "black", borderRadius: 4}} variant='contained' onClick={() => navigate('/login')}>Entrar</Button>
                 <Button onClick={() => navigate("/signup")} variant="contained">Cadastrar-se</Button>
            </div> 
        } else {
            return <div className='profile-header'>
                    {renderIconProfile() ? profileUser() : profileCompany()}
                    <div className='loggout'>
                        <LogoutIcon sx={{fontSize: 40}} onClick={loggout}/>
                        <a onClick={loggout}>Sair</a>
                    </div>
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
                        
                        variant='standard'
                        sx={{background: 'white',
                            mr: 2,
                            width: '80ch'}}
                    />
                    <Button variant="contained">Pesquisar</Button>
            </div>

            {renderOptionsLogin()}

        </div>
    )
}

export default Header;