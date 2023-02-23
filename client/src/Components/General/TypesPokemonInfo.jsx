import React from "react";


const TypesPokemonInfo = ({ type }) => { 
	return (
		<ul >
			{type?.map((type) => ( 
				<li key={type.name} value={type.name}>
					{type.name} 
				</li>
			))}
		</ul>
	);
};

export default TypesPokemonInfo;