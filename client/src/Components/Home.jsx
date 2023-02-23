import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCharacters } from "../Redux/actions";
import Character from "./Character";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import AllFiltersContainer from "./Filters"
import estilos from "./Home.module.css";
import Paginated from "./Paginated";

import { Link } from 'react-router-dom'

const Home = () => {

    const dispatch = useDispatch()
    const characters = useSelector(state=>state.characters) 
    const error =useSelector(state=>state.error)  
    const [currentPage, setCurrentPage] = useState(1); 
    const [pokemonsPage] = useState(12); 
    const indexOfLastPokemon = currentPage * pokemonsPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPage; 



    useEffect(()=>{ 
             dispatch(getAllCharacters()) 
        },[])  // eslint-disable-line react-hooks/exhaustive-deps 
            // el arreglo esta vacio pero puede tener la palabra dispatch tambien, cuando esta vacio es porque se esta montando el componente... si no le pongo el array ",[]" se va a montar y actualizar el componente

            const currentPokemones = characters.slice( /// El método slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido). El array original no se modificará.
            indexOfFirstPokemon,
            indexOfLastPokemon
            );

            const page = (pageNumber) => setCurrentPage(pageNumber)

            return (
                
                <div className={estilos.container}>
                    <nav >
						<Link className={estilos.btnForm} to='/post'> 
								<button>Go to Form</button>
						</Link>
		            </nav> 

                    <div className={estilos.menuContainer}>
                            <SearchBar/> 
                        <div>
						    <AllFiltersContainer setCurrentPage={setCurrentPage} />
					    </div>
                    </div>   
            {characters.length > 0 ? <></> : <h1>Loading...</h1>}
                    <div className={estilos.paginatedList}>
                        <Paginated
                            key={characters.id}
                            pokemonsPage={pokemonsPage}
                            everyPokemons={characters.length}
                            page={page}
                        />
                    </div>

                    <div className={estilos.pokeListContainer}>
                        <ul className={estilos.pokeList}>
                            {currentPokemones[0] !== "" && currentPokemones.length > 0 ? (
                                <Cards currentPokemones={currentPokemones} /> 
                                    ) : (
                                        <div > 
	                                        <p >
                                                This pokemon is not on the list...
			                                </p>
                                                
                                        </div>
                                        )
                            }
                        </ul>
                    </div>
                
                </div> 
            
    )   

}



export default Home;