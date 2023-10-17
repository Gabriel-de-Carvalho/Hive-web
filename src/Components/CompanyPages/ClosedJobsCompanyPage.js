import React, {useState, useEffect} from "react";
import api from "../../api";
import JobCard from "../../JobCard/JobCard";
import Header from "../Header/Header";
import "./companyPage.css"
import { Pagination } from "@mui/material";

export default function ClosedJobsCompanyPage() {
    const [closedJobsList, setClosedJobsList] = useState([]);

    const [page, setPage] = useState(0);
    const [countPages, setCountPages] = useState(0);
    const handlePageChange = (event, value) => {
        setPage(value-1);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        api.get("/job/closed", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(response => {
            setClosedJobsList(response.data.jobs.content);
            setCountPages(response.data.totalPages);
        })
    }, [])

    const handleListingRendering = () => {
        if(closedJobsList.length !== 0) {
            
            return <div className="list-jobs">
                {closedJobsList.map(job => <JobCard props={job}/>)}
            </div>
        } else {
            return <div>
                <p>Empresa não possuir vagas de emprego encerradas</p>
            </div>
        }
    }

    return(
        <div className="closed-job-list">
            <Header />
            <div className="closed-job-list-page">
                <h2>Oportunidades encerradas</h2>
                <div >
                {handleListingRendering()}
                <Pagination count={countPages} page={page + 1} onChange={handlePageChange} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }} />
                </div>
                
            </div>
        </div>
    )
}