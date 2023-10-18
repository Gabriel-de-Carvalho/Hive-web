import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/UserContext";
import Header from "../Header/Header";
import api from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import Experience from "../Experience/Experience";
import FormExperience from "./FormExperience";
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Modal, Box} from "@mui/material";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/joy";
import ModalDeleteAccount from "../Modals/ModalDeleteAccount";
import ModalSuccess from "../Modals/ModalSuccess";

export default function Profile() {
    var auth = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [renderExperiences, setRenderExperiences] = useState(false);
    const [experiences, setExperiences] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalSuccess, setShowModalSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState('');

    // useState referente ao modal
    const [userInfoModal, setUserInfoModal] = useState(false);
    const [userInfo, setUserInfo] = useState({
        user: "",
        email: "",
        bio: "",
        currentJob: "",
    });
    const [modalErrors, setModalErrors] = useState({
        user: "",
        bio: "",
        currentJob: "",
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        api.get('/user/', {
            headers: {
                'Authorization': "Bearer " + token
            }
        }).then(response => {
            setUser(response.data)
            if (response.data.experiences !== undefined && response.data.experiences !== null) {
                setRenderExperiences(true);
                setExperiences(response.data.experiences)
            }

        }).catch((error) => {
            console.log(error);
        })
    }, [])
    
    const onChangeModalUserInfo = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value })
    }

    const validateForm = () => {
        console.log(auth)
        const newErrors = {
            user: userInfo.user === '' ? "Insira um nome válido" : '',
            bio: userInfo.bio === '' ? "Descrição não pode ser vazia" : '',
        }

        setModalErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    }

    const handleUpdateUserSubmit = (e) => {
        e.preventDefault();

            userInfo.email = auth.user.email;
            const token = localStorage.getItem("token")
            api.put('/user/',  userInfo, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(response => { 
                setUser(response.data) 
                setSuccessMsg("Dados alterados com sucesso!")
                setShowModalSuccess(true);
                setUserInfoModal(false);

            })
            setUserInfo({
                user: "",
                email: "",
                bio: "",
                currentJob: "",
            })
    }

    return (
        <div>
            <Header />
            <div className="profile-page">
                <div className="profile-info card">
                    {/* <div className="profile-photo">
                        <FontAwesomeIcon icon={faCamera} />
                    </div> */}
                    <div className="profile-personal-info">
                        <div className="edit-icon" onClick={() => setUserInfoModal(true)}> <EditIcon /></div>
                        <Typography variant="h4" mb={2}>{user.user}</Typography>
                        <Typography variant="h6" mb={2}>{user.email}</Typography> 
                        {!!user.currentJob ? <Typography variant="h6" mb={2}>{user.currentJob}</Typography> : <div></div>}
                    </div>
                    <div className="profile-personal-bio">
                        <p><h3>Sobre mim</h3></p>
                        <p>{user.bio}</p>
                    </div>
                    <div className="profile-action-button">
                        <Button onClick={() => setShowModalDelete(true)} color="danger" variant="solid">Apagar Perfil</Button>
                    </div>
                </div>
                <div className="profile-experiences card">
                    <FormExperience setExperiences={setExperiences} />
                    {renderExperiences && experiences.map(experience => <Experience experience={experience} />)}
                </div>
            </div>

             {
             /* 
             
             começa o modal para edição das informações do usuário 
             
             */
             }

            <Modal
                open={userInfoModal}
                onClose={() => setUserInfoModal(false)}
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Nome Completo"
                            fullWidth
                            name="user"
                            sx={{ m: 1 }}
                            error={!!modalErrors.user}
                            helperText={modalErrors.user}
                            variant="outlined"
                            onChange={onChangeModalUserInfo}

                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Trabalho Atual"
                            fullWidth
                            sx={{ m: 1 }}
                            error={!!modalErrors.currentJob}
                            variant="outlined"
                            name="currentJob"
                            helperText={modalErrors.currentJob}
                            onChange={onChangeModalUserInfo}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Insira uma descrição a seu respeito"
                            fullWidth
                            sx={{ m: 1}}
                            variant="outlined"
                            multiline
                            name="bio"
                            error={!!modalErrors.bio}
                            helperText={modalErrors.bio}
                            onChange={onChangeModalUserInfo}
                            rows={4}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Button
                            variant="contained"
                            sx={{ m: 1 }}
                            onClick={handleUpdateUserSubmit}>
                            Atualizar cadastro
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {showModalDelete && <ModalDeleteAccount isUser={true} closeDelete={setShowModalDelete}/>}
            {showModalSuccess && <ModalSuccess  successMsg={successMsg} closeDelete={setShowModalSuccess} />}
        </div>
    )
}