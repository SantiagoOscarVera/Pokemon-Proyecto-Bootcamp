import React from "react";
import estilos from "./TypesPokemonInfo.module.css";


const TypesPokemonInfo = ({ type }) => { 
	return (
		<ul >
			{type?.map((type) => ( 
				<li className={estilos.label} key={type.name} value={type.name}>
					{type.name} 
				</li>
			))}
		</ul>
	);
};

export default TypesPokemonInfo;