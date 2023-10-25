import axios from "axios";

const handleSetToken = () => {
    const token = localStorage.getItem("token");
    console.log("teste");
    if(token !== "" && token !== undefined){
        console.log("token setado");
        return "Bearer " + token;
    }
    return "";
}

const api = axios.create({
    baseURL : "http://52.203.13.80:8080"
})

export default api;