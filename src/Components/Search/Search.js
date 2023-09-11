import React, {useState, useEffect} from "react";
import api from "../../api";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import JobCard from "../../JobCard/JobCard";
import './Search.css'

export default function Search(){
    const [jobListing, setJobListing] = useState([]);
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
            });
    }, []);

    return (
        <div>
            <Header/>
            <div className='job-listing'>
            {jobListing.map(job => <JobCard props={job}/>
                )}
            </div>
        </div>
    )
}