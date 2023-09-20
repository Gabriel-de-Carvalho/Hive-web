import React, {useState, useEffect} from "react";
import api from "../../api";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import JobCard from "../../JobCard/JobCard";
import './Search.css'
import ModalError from "../Modals/ModalError";

export default function Search(){
    const [jobListing, setJobListing] = useState([]);
    const [showError, setShowError] = useState(false);
    const {state} = useLocation();
    useEffect(() => {
            var keywords = state.keywords;
            var keywordsFormatted = keywords.split(" ");
            var keywordsFormatted = keywordsFormatted.join(',');
            var token = localStorage.getItem('token');
            api.get('/job/search/',
                {
                    params: {
                        keywords: keywordsFormatted
                    },
                    headers: {
                        Authentication: "Bearer " + token
                    }
                }
            ).then(response => {
                setJobListing(response.data)
            }).catch(err => {
                setShowError(true)
                console.log(err.response);
            });
    }, []);

    return (
        <div>
            <Header/>
            <div className='job-listing'>
            {jobListing.map(job => <JobCard props={job}/>
                )}
            </div>
            {showError && <ModalError closeError={setShowError} errorMsg="Não foi possivel encontrar vagas"/>}
        </div>
    )
}