import React, {useState} from 'react';
import Header from '../Header/Header';
import "./LandPage.css"
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModalError from '../Modals/ModalError';


function LandPage() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [showModalError, setShowModalError] = useState(false);

    const search = function(){
        if(query == ""){
           setShowModalError(true);
        } else {
            navigate('/search/', {state: {keywords: query}})
        }

    }

  
    return(
        <div className='landpage'>
            
            <Header/>
            <div className='form-landpage'>
               <div>
                    <p className='introductory-text'>
                        Bem vindo a Hive, uma plataforma de divulgação e busca de vagas com transparencia.
                    </p>
               </div>

               <TextField
                        sx = {
                            {mb: 3}
                        }
                        id="outlined-search-input"
                        label="Procure aqui um emprego que combine com você"
                        autoComplete="current-password"
                        variant="standard"
                        fullWidth
                        onChange={e => setQuery(e.target.value)}
                        />
                <Button onClick={search}>Pesquisar</Button>
            </div>
            {showModalError && <ModalError closeError={setShowModalError} errorMsg="Insira pelo menos uma palavra chave"/>}
        </div>
    )
}

export default LandPage;