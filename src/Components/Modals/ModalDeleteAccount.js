import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from "@mui/joy";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/UserContext';
import "./Modal.css";

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
};

export default function ModalDeleteAccount(props) {
    console.log(props.isUser)
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        props.closeDelete(false)
    };
    const [step, setStep] = useState(1);
    const auth = useContext(AuthContext)
    const deleteSucessScreen = () => {
        return <Box sx={style}>
            <div className='modal-delete-account'>
                <Typography sx={{m: 2}} id="modal-modal-title" variant="h6" component="h2">
                    Conta deletada com sucesso
                </Typography>
                <Typography>
                    Você será redirecionado para a tela inicial
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        </Box>
    }

    const confirmationScreen = () => {
        return <Box sx={style}>
            <div className='modal-delete-account'>
                <Typography sx={{m: 2}} id="modal-modal-title" variant="h6" component="h2">
                    Tem certeza que deseja deletar a conta?
                </Typography>
                <Typography >
                    Todos os dados referentes a ela serão perdidos.
                </Typography>
                <Box sx={{m: 2}}>
                    <Button variant="solid" color='danger' onClick={handleDeleteAccount}>Deletar</Button>
                </Box>
            </div>
        </Box>
    }
    const loggout = () => {
        auth.setUser({});
        auth.setLogged(false);
        auth.setCompany({});
        localStorage.removeItem("token");
    }

    const handleStepsScreen = () => {
        switch (step) {
            case 1: return confirmationScreen();
            case 2: return deleteSucessScreen();
        }
    }

    const handleDeleteAccount = () => {
        const token = localStorage.getItem("token");
        if(props.isUser){
            api.delete("/user/", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(response => {
                setStep(2);
                loggout()
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            })
        } else {
            api.delete("/company/", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(response => {
                setStep(2);
                loggout()
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            })
        }

    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {handleStepsScreen()}
            </Modal>
        </div>
    );
}