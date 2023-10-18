import React from "react";
import "./Experience.css"

export default function Experience(props){
    const dateEnd = !!props.experience.dateEnd ? props.experience.dateEnd.split("T")[0] : ""
    console.log(props)
    return (

                    <div className="experience">
                        <h2>{props.experience.jobTitle}</h2>
                        <p>{props.experience.dateInit.split("T")[0]} - {props.experience.currentJob ? "presente" : dateEnd}</p>
                        <p>descrição das atividades:</p>
                        <p>{props.experience.jobDesc}</p>
                    </div>
       
    )
}