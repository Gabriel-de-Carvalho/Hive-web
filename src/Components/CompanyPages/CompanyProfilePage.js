import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import AuthContext from "../../Context/UserContext";
import { Box, Modal, TextField } from "@mui/material";
import { Button } from "@mui/joy";
import "./companyPage.css";
import api from "../../api";
import ModalDeleteAccount from "../Modals/ModalDeleteAccount";

export default function CompanyProfilePage() {

    const [showModalDeleteAccount, setShowModalDeleteAccount] = useState(false);
    console.log(localStorage.getItem("token"))
    const [companyInfoModalShow, setCompanyInfoModalShow] = useState(false);
    const [companyInfoUpdateForm, setCompanyInfoUpdateForm] = useState({
        companyName: "",
        siteCompany: "",
        city: "",
        state: "",
        country: "",
        numberEmployees: "",

    })

    const [modalUpdateErrors, setModalUpdateErrors] = useState({
        companyName: "",
        siteCompany: "",
        city: "",
        state: "",
        country: "",
        numberEmployees: "",
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

    const onChangeModalCompanyInfo = (e) => {
        const { name, value } = e.target;
        setCompanyInfoUpdateForm({ ...companyInfoUpdateForm, [name]: value })
    }

    const validateForm = () => {
        const newErrors = {
            companyName: companyInfoUpdateForm.companyName === '' ? "Insira um nome válido" : '',
            city: companyInfoUpdateForm.city === '' ? "insira uma cidade": '',
            state: companyInfoUpdateForm.state === '' ? "insira um estado": '',
            country: companyInfoUpdateForm.country === '' ? "insira um país": '',
        }

        setModalUpdateErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    }

    const handleSubmitForm = (e) => {
        e.stopPropagation();

        if(validateForm()){
            const token = localStorage.getItem("token");
            api.put('/company/', companyInfoUpdateForm, {
                headers:{
                    Authorization: "Bearer " + token
                }
            })
            .then(response => user.setCompany(response.data))
            .catch(err => console.log(err));
            setCompanyInfoUpdateForm({
                companyName: "",
                siteCompany: "",
                city: "",
                state: "",
                country: "",
                numberEmployees: "",
            })
        }
    }

    const user = useContext(AuthContext);
    console.log(user)

    return (
        <div>
            <Header />
            <div className="profile-company-page">
                <div className="profile-company-card">
                    <div className="profile-company">
                    <div className="profile-company-name">
                        <h2> {user.company.companyName}</h2>
                    </div>
                    <div className="profile-company-info info-email">
                        {user.company.companyEmail}
                    </div>
                    <div className="profile-company-info info-site">
                        <div>{user.company.siteCompany}</div>
                    </div>
                    <div className="profile-company-info info-employess">
                        <div>{user.company.numberEmployees} funcionários</div>
                    </div>
                    <div className="profile-company-info info-location">
                        <div>{user.company.country}</div>
                        <div>{user.company.state}</div>
                        <div>{user.company.city}</div>
                    </div>
                    
                    <div className="profile-company-info info-buttons-action">
                        <Button onClick={() => setCompanyInfoModalShow(true)} variant="primary" sx={{mr: 3, background: "blue", color: "white"}}>Editar perfil</Button>
                        <Button onClick={() => setShowModalDeleteAccount(true)} variant="solid" color="danger">Deletar perfil</Button>
                    </div>
                    </div>
                </div>
            </div>

            {
             /* 
             
             começa o modal para edição das informações da empresa
             
             */
             }

            <Modal
                open={companyInfoModalShow}
                onClose={() => setCompanyInfoModalShow(false)}
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Nome da empresa"
                            fullWidth
                            name="companyName"
                            value={companyInfoUpdateForm.companyName}
                            sx={{ m: 1 }}
                            error={!!modalUpdateErrors.companyName}
                            helperText={modalUpdateErrors.companyName}
                            variant="outlined"
                            onChange={onChangeModalCompanyInfo}

                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Trabalho Atual"
                            fullWidth
                            sx={{ m: 1 }}
                            value={companyInfoUpdateForm.siteCompany}
                            error={!!modalUpdateErrors.siteCompany}
                            variant="outlined"
                            name="currentJob"
                            helperText={modalUpdateErrors.siteCompany}
                            onChange={onChangeModalCompanyInfo}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Cidade"
                            fullWidth
                            sx={{ m: 1}}
                            variant="outlined"
                            value={companyInfoUpdateForm.city}
                            name="city"
                            error={!!modalUpdateErrors.city}
                            helperText={modalUpdateErrors.city}
                            onChange={onChangeModalCompanyInfo}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Estado"
                            fullWidth
                            sx={{ m: 1}}
                            variant="outlined"
                            value={companyInfoUpdateForm.state}
                            name="state"
                            error={!!modalUpdateErrors.state}
                            helperText={modalUpdateErrors.state}
                            onChange={onChangeModalCompanyInfo}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="País"
                            fullWidth
                            sx={{ m: 1}}
                            variant="outlined"
                            value={companyInfoUpdateForm.country}
                            name="country"
                            error={!!modalUpdateErrors.country}
                            helperText={modalUpdateErrors.country}
                            onChange={onChangeModalCompanyInfo}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            label="Quantidade de funcionários"
                            fullWidth
                            sx={{ m: 1}}
                            variant="outlined"
                            value={companyInfoUpdateForm.numberEmployees}
                            name="numberEmployees"
                            error={!!modalUpdateErrors.numberEmployees}
                            helperText={modalUpdateErrors.numberEmployees}
                            onChange={onChangeModalCompanyInfo}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Button
                            onClick={handleSubmitForm}
                            variant="solid" 
                            color='primary'
                            sx={{ m: 1 }}
                            >
                            Atualizar cadastro
                        </Button>
                    </Box>
                </Box>
            </Modal>
           {showModalDeleteAccount && <ModalDeleteAccount isUser={false} closeDelete={setShowModalDeleteAccount}/>}
        </div>
    )
}