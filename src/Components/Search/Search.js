import React, {useState, useEffect, useContext} from "react";
import api from "../../api";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import JobCard from "../../JobCard/JobCard";
import './Search.css'
import ModalError from "../Modals/ModalError";
import { Pagination } from "@mui/material";
import AuthContext from "../../Context/UserContext";

export default function Search(){
    const [jobListing, setJobListing] = useState([]);
    const [showError, setShowError] = useState(false);
    const {state} = useLocation();
    const [page, setPage] = useState(0);
    const [countPages, setCountPages] = useState(0);

    var auth = useContext(AuthContext)
    console.log(auth)
    useEffect(() => {
            var keywords = state.keywords;
            var keywordsFormatted = keywords.split(" ");
            var keywordsFormatted = keywordsFormatted.join(',');
            var token = localStorage.getItem('token');
            api.get('/job/search/',
                {
                    params: {
                        keywords: keywordsFormatted,
                        page: page,
                        size: 12
                    },
                    headers: {
                        Authentication: "Bearer " + token
                    }
                }
            ).then(response => {
                setJobListing(response.data.jobs.content)
                setCountPages(response.data.totalPages)
                console.log(response.data)
            }).catch(err => {
                setShowError(true)
                console.log(err.response);
            });
    }, []);

    useEffect(() => {
        console.log(page)
        var keywords = state.keywords;
        var keywordsFormatted = keywords.split(" ");
        var keywordsFormatted = keywordsFormatted.join(',');
        api.get('/job/search/',{
            params: {
                keywords: keywordsFormatted,
                page: page,
                size: 12
            }
        }).then(response => {
            setJobListing(response.data.jobs.content)
            console.log(page)
        }).catch(err => {
            setShowError(true);
            console.log(err.response);
        })
    }, [page])

    const handlePageChange = (event, value) => {
        setPage(value-1);
    }

    return (
        <div>
            <Header />
            <div className="search-page">
                <h2 className="search-page-header">Oportunidades Encontradas:</h2>
                <div className='job-listing'>
                    {jobListing.map(job => <JobCard props={job} jobsIds={auth.user.jobOpportunitiesIds}/>
                    )}

                </div>
                <Pagination count={countPages} page={page + 1} onChange={handlePageChange} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }} />
                {showError && <ModalError closeError={setShowError} errorMsg="Não foi possivel encontrar vagas" />}
            </div>
        </div>
    )
}