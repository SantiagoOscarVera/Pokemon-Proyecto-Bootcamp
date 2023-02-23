import { GET_ALL_CHARACTERS, ERROR, SUCCESS_POST, GET_NAME_POKEMONS, GET_ALL_TYPES, FILTER_TYPES, FILTER_ORDER, FILTER_STRENGTH, FILTER_CREATED, CLEAR_DETAILS, POKEMON_LIST_LOADING, GET_POKEMON_DETAILS, DELETE_CHARACTER } from "./actions";


const initialState = { 
    characters: [], 
    myCharacters: [], 
    error: [],
    allTypes: [], 
    createdPokemonFiltered: [],
    pokemon: {},
    permanent: [],
    filterType: [],
    filterCreate:[],
    loading: true, 
}

 function rootReducer(state=initialState, action){ 

    switch (action.type) { 
        case GET_ALL_CHARACTERS: 
            return { 
                ...state, 
                characters: action.payload, 
                myCharacters:action.payload, 
                createdPokemonFiltered: [...action.payload],
                permanent: action.payload,
                filterType: action.payload,
                filterCreate: action.payload,
                loading: false
            }
        case ERROR:
            return{
                ...state,
                error: action.payload 
            }
            
        case SUCCESS_POST: ///VIENE A SER COMO UN case CREATE_CHARACTER de mi app de rick and morty
            return{
                ...state,
                myCharacters: [...state.myCharacters, action.payload], 
            }

            case GET_NAME_POKEMONS:
                return{
                    ...state,
                    characters: action.payload 
                }

        case GET_ALL_TYPES:
            return {
                    ...state,
                    allTypes: action.payload,
                    };
                    
        case FILTER_TYPES:
			const pokemons = [...state.permanent];

			if (action.payload === "all") {
				return {
					...state,
					
				};
			} else {
				const typesFilter = pokemons.filter(
					(poke) =>
						poke.type[0]?.name === action.payload ||
						poke.type[1]?.name === action.payload ||
                        poke.type[2]?.name === action.payload

				)

                let mixedFilters = typesFilter.filter((pk) => state.filterCreate.includes(pk)); 

				return {
					...state,
					characters: mixedFilters,
                    filterType: typesFilter,
				};
			}
            
        case FILTER_ORDER:
                const orderPokemons = [...state.characters]; 
                if (action.payload === "pokedex") { 
                    orderPokemons.sort((obj1, obj2) => { /// sort() El método sort() ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado.
                        if (obj1.id < obj2.id) { /// si objeto 1 es menor a 2, return primero el de menor id y despues en ascendente 
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                }
                if (action.payload === "ascending") { /// si es ascendente la accion y el nombre empieza primero con una letra anterior al  de la otra palabra, ordenar asi segun el abecedario
                    orderPokemons.sort((obj1, obj2) => {
                        if (obj1.name < obj2.name) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                }
                if (action.payload === "descending") { /// si es descendente la accion y el nombre empieza primero con una letra posterior al  de la otra palabra, ordenar asi segun el abecedario
                    orderPokemons.sort((obj1, obj2) => {
                        if (obj1.name < obj2.name) {
                            return 1;
                        } else {
                            return -1;
                        }
                    });
                }
                return {
                    ...state,
                    characters: orderPokemons, 
                };
                
            case FILTER_STRENGTH:
                    const allPokemons = [...state.characters]; 
                    if (action.payload === "default") { /// si lo tenemos por default
                        allPokemons.sort((obj1, obj2) => { /// ordenar de menor a mayor
                            if (obj1.id < obj2.id) {
                                return -1;
                            } else {
                                return 1;
                            }
                        });
                    }
                    if (action.payload === "stronger") { // si esta en stronger, mas fuerte, retornar el mas fuerte y deahi al mas debil
                        allPokemons.sort((obj1, obj2) => {
                            if (obj1.attack < obj2.attack) {
                                return 1;
                            } else if (obj1.attack > obj2.attack) {
                                return -1;
                            } else {
                                return 0; 
                            }
                        });
                    }
                    if (action.payload === "weaker") { // si esta en stronger, mas fuerte, retornar el mas debil y de ahi al mas fuerte
                        allPokemons.sort((obj1, obj2) => {
                            if (obj1.attack < obj2.attack) {
                                return -1;
                            } else if (obj1.attack > obj2.attack) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                    }
                    return {
                        ...state,
                        characters: allPokemons,
                    };
                    
            case FILTER_CREATED:
                        const allPokemons2 = [...state.permanent]; 
                        if (action.payload === "existing") { 
                            const api = allPokemons2.filter(
                                (pokemon) => pokemon.id < 1000
                            );

                            let mixedFilters = api.filter((pk) => state.filterType.includes(pk))

                            return {
                                ...state,
                                characters: mixedFilters, 
                                createdPokemonFiltered: api,  
                                filterCreate: api
                            };
                        } else if (action.payload === "created") { 
                            const Db = allPokemons2.filter( /// 
                                (pokemon) => pokemon.id.length > 6,
                            );

                            let mixedFilters = Db.filter((pk) => state.filterType.includes(pk))

                            return {
                                ...state,
                                characters: mixedFilters, 
                                createdPokemonFiltered: Db, 
                                filterCreate: Db,
                            };
                        }
                        return { 
                            ...state,
                        };  
                        
            case CLEAR_DETAILS:
                            return {
                                ...state,
                                pokemon: action.payload, 
                                characters: state.permanent,
                            };
            case POKEMON_LIST_LOADING: 
                            return {
                                ...state,
                                loading: true,
                            };
            case GET_POKEMON_DETAILS: 
                            return {
                                ...state,
                                pokemon: action.payload,
                                loading: false,
                            };

            case DELETE_CHARACTER:
                            return {
                              ...state,
                              characters: state.characters.filter( 
                                (char) => char.id !== action.payload
                              ),
                            };
                            


        default:
            return {...state}; 
    }

}

export default rootReducer