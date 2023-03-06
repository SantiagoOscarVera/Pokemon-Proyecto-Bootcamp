import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetails, getPokemonDetail } from "../Redux/actions.js";
import { useParams } from "react-router-dom";
import TypesPokemonInfo from "../Components/General/TypesPokemonInfo";	
import { Link } from 'react-router-dom'
import estilos from "./PokemonDetail.module.css";


const PokemonDetail = () => {
	const dispatch = useDispatch(); 
	const { id } = useParams(); 

	useEffect(() => {
		///console.log("este es el id" + id)
		dispatch(clearDetails()); 
		dispatch(getPokemonDetail(id));
	}, [dispatch, id]);

	const pokemonInfo = useSelector((state) => state.pokemon); 
	const loading = useSelector((state) => state.loading); 
 
	return (
		<>
	<div className={estilos.container}>

		<div className={estilos.contenedor2}>
            <nav >
					<Link className={estilos.btnHome} to='/home'> 
								<button>Go to Home</button>
					</Link>
		    </nav> 

			{loading ? <div><h1>Loading</h1></div> : 

					<div className={estilos.contDetalle}>
						<div className={estilos.contDetalleIzq}>
							<img src={pokemonInfo.image ? pokemonInfo.image : pokemonInfo.img}  />
						</div>

						<div className={estilos.contDetalleDer}>
									<h1 className={estilos.name} >{pokemonInfo.name}</h1> 

																	
									<p>ID: {pokemonInfo.id}</p> 
								
									<p>HP: {pokemonInfo.hp} </p>
									<p>Attack:{" "} {pokemonInfo.attack}</p>
									<p>Defense:{" "} {pokemonInfo.defense}</p>
									<p>Speed:{" "} {pokemonInfo.speed}</p>
									<p>Height:{" "} {pokemonInfo.height} m</p>
									<p>Weight:{" "} {pokemonInfo.weight} kg</p>

							<div className={estilos.type}>
									<h3 className={container.typesTitulo}>Type/s:</h3>
										<TypesPokemonInfo type={pokemonInfo.type} /> 
							</div>	
						</div>
				</div>
								
			}
		</div>	
	</div>
</>)
} 


export default PokemonDetail;