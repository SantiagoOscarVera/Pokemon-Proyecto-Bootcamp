import React from "react";
import { Link } from "react-router-dom";
import estilos from "./LandingPage.module.css";

const LandingPage = () => {
    return (
        <div className={estilos.container}>
            <div className={estilos.infoContainer} >   
                <Link to="/home">    
                <button className={estilos.btn}> LABORATORIO POKÉMON    </button>
                </Link> 
            </div>  
        </div>
    ) 
}


export default LandingPage;