import React from 'react';
import { useDispatch } from "react-redux"

import { deleteCharacter } from "../Redux/actions"
import { Link } from 'react-router-dom';
import estilos from "./Card.module.css";


const Card = ({id, image, name, types})=>{ 

    const dispatch=useDispatch();  

     const handleClick=()=>{
        dispatch(deleteCharacter(id)) 
    } 

return( 
    <div className={estilos.container}> 
            <button className={estilos.btnDelete} onClick={handleClick}>X</button>  

        <li className={estilos.container2}>
			<div className={estilos.container3}>
				<img  src={image} alt={name} />
			</div>
			<div >
				<Link to={`/details/${id}`}>
					<h3 className={estilos.name} >{name}</h3>
				</Link>
		        <h4 className={estilos.tipo}>Types: 
					<ul>
						
						{types?.map((type) => ( /// esto mapea el array en el cual estan los nombres de los tipos de los pokemons
						<li key={type.name} className={type} value={type.name}>
						{type.name}
						</li>
						))}
					</ul>
        		</h4>
                
			</div>
		</li>
    </div>
)
}

export default Card