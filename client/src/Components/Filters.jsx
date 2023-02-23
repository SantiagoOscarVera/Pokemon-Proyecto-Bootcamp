import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllTypes, filterTypes, filterOrder, filterStrength, filterCreated,} from "../Redux/actions";

const AllFiltersContainer = ({ setCurrentPage }) => { 
	const dispatch = useDispatch(); 
	const allTypes = useSelector((state) => state.allTypes); 

    useEffect(() => { 
		dispatch(getAllTypes());
	}, [dispatch])

    const handlerFilterTypes = (event) => { /// FILTRO POR TIPO
		event.preventDefault();
		dispatch(filterTypes(event.target.value));
		setCurrentPage(() => 1);
	};

    const handlerFilterOrder = (event) => { /// FILTRADO POR ORDEN 
		event.preventDefault();
		dispatch(filterOrder(event.target.value));
		setCurrentPage(() => 1);
	};

    const handlerFilterStrength = (event) => { /// FILTRADO POR FUERZA
		event.preventDefault();
		dispatch(filterStrength(event.target.value));
		setCurrentPage(() => 1);
	};

    const handlerFilterCreated = (event) => { /// /// FILTRADO POR CREADO
		event.preventDefault();
		dispatch(filterCreated(event.target.value));
		setCurrentPage(() => 1);
	};



    return (
		<div>
			<div>
				<label>Tipo de pokemon: </label> 

				<select onChange={(event) => handlerFilterTypes(event)}> 
					<option value='all'>all</option> 
					{allTypes?.map((type) => ( 
						<option key={type.name} value={type.name}>
							{type.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label>Tipo de creacion: </label> {/* Filtrado por CREACION */}
				<select onChange={(event) => handlerFilterCreated(event)}>
					<option value='all'>all</option>
					<option value='existing'>existing</option>
					<option value='created'>created</option>
				</select>
			</div>

			<div>
				<label>Order: </label> {/* Filtrado por ORDEN ALFABETICO */}
				<select onChange={(event) => handlerFilterOrder(event)}>
					<option value='pokedex'>pokedex</option>
					<option value='ascending'>a-z</option>
					<option value='descending'>z-a</option>
				</select>
			</div>

			<div>
				<label>Tipo de fuerza: </label> {/* Filtrado por ORDEN DE FUERZA */}
				<select onChange={(event) => handlerFilterStrength(event)}>
					<option value='default'>default</option>
					<option value='stronger'>stronger</option>
					<option value='weaker'>weaker</option>
				</select>
			</div>
		</div>
	);
};




export default AllFiltersContainer;