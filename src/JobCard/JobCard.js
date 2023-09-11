import React from "react";
import './JobCard.css';
import JobPage from "../Components/JobPage/JobPage";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function JobCard(props){

    const navigate = useNavigate();
    const handleOpenJobPage = () => {
        navigate("/Job", {state:{jobInfo: props.props}})
    }

    return (
        <div className="job-card">
            <h2>{props.props.jobTitle}</h2>
            <h3>{props.props.companyId}</h3>
            <p><b>Salário proposto:</b> R${props.props.income}</p>
            <p>{props.props.jobDesc}</p>
        <div>
            <Button onClick={handleOpenJobPage}>Ver oportunidade</Button>
        </div>
        </div>
    )
}