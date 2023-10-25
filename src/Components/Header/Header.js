import React, { useState, useContext } from 'react';
import "./Header.css"
import Button from "@mui/material/Button"
import { TextField, Menu, MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';
import ModalError from '../Modals/ModalError';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Header() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [query, setQuery] = useState("");
    const [showError, setShowError] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
        console.log(event);
    };

    const loggout = () => { 
        auth.setUser({});
        auth.setLogged(false);
        auth.setCompany({});
        localStorage.clear();
        navigate("Hive-web/");
    }

    const search = function(){
        if(query == ""){
            setShowError(true);
        } else {
            navigate('/search/', {state: {keywords: query}})
        }

    }

    const handleMenuNavigation = (event) => {
        const textMenu = event.target.innerText;

        if(textMenu === "meu perfil"){
            navigate("/companyProfile");
        } else if (textMenu === "vagas em aberto"){
            navigate("/openJobs")
        } else if (textMenu === "vagas encerradas"){
            navigate("/closedJobs")
        };

    }
    const profileUser = () => {
        return <div className="header-user">
                        <FontAwesomeIcon icon={faUserTie} size="2xl" onClick={() => navigate("/profile")}/>
                        <a onClick={() => navigate("/profile")}>{auth.user.user}</a>
                    </div>
    }

    const profileCompany = () => {
        return <div className="header-user" onClick={handleClickMenu}>
            {console.log("empresa")}
            <ApartmentIcon sx={{fontSize: 40}}/>
            
            <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClick={handleCloseMenu}
            >
                <MenuItem onClick={handleMenuNavigation}>meu perfil</MenuItem>
                <MenuItem onClick={handleMenuNavigation}>vagas em aberto</MenuItem>
                <MenuItem onClick={handleMenuNavigation}>vagas encerradas</MenuItem>
            </Menu>
            {auth.company.companyName}
            
        </div>
    }

    const renderIconProfile = () => {
        if(Object.keys(auth.user).length !== 0){
            return true;
        }
        return false;
    }


    const renderOptionsLogin = () => {
        if(!auth.logged){
            return <div className="header-login">
                 <Button size='medium' sx={{mr:1, background: "white", color: "black", borderRadius: 4}} variant='contained' onClick={() => navigate('/login')}>Entrar</Button>
                 <Button  sx={{mr:1}} size='medium' onClick={() => navigate("/signup")} variant="contained">Cadastrar</Button>
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
                        onChange={e => setQuery(e.target.value)}
                        variant='standard'
                        sx={{background: 'white',
                            mr: 2,
                            width: '80ch'}}
                    />
                    <Button variant="contained" onClick={search}>Pesquisar</Button>
            </div>

            {renderOptionsLogin()}
            {showError && <ModalError closeError={setShowError} errorMsg="Insira pelo menos uma palavra chave"/>}
        </div>
    )
}

export default Header;