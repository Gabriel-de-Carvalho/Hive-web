import React, {useContext} from "react";
import './JobCard.css';
import JobPage from "../Components/JobPage/JobPage";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/UserContext";

export default function JobCard(props){
    const auth = useContext(AuthContext);
    console.log(props)

    const navigate = useNavigate();
    const handleOpenJobPage = () => {
        var jobInfo = props.props;
        jobInfo.isParticipant = isUserAlreadyParticipant();
        navigate("/Job", {state:{jobInfo: jobInfo}})
    }

    const isUserAlreadyParticipant = () => {
        console.log(auth)
        if(auth.logged){
            
            return props.jobsIds.includes(props.props.id)
        }
        return false;
    }

    return (
        <div className="job-card card">
            <h2>{props.props.jobTitle}</h2>
            <p>{props.props.jobDesc.substring(0, 145)}{props.props.jobDesc.length >= 245 ? "..." : ""}</p>
        <div>
            <Button onClick={handleOpenJobPage}>{isUserAlreadyParticipant() ? "Inscrito" : "Ver oportunidade"}</Button>
        </div>
        </div>
    )
}