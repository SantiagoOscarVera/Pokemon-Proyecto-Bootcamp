import axios from "axios";
export const GET_ALL_CHARACTERS = "GET_ALL_CHARACTERS" 
export const ERROR = "ERROR";
export const SUCCESS_POST = "SUCCESS_POST" 
export const GET_NAME_POKEMONS = "GET_NAME_POKEMONS"
export const GET_ALL_TYPES = "GET_ALL_TYPES"
export const FILTER_TYPES = "FILTER_TYPES"
export const FILTER_ORDER = "FILTER_ORDER"
export const FILTER_STRENGTH = "FILTER_STRENGTH"
export const FILTER_CREATED = "FILTER_CREATED"
export const CLEAR_DETAILS = "CLEAR_DETAILS"
export const POKEMON_LIST_LOADING = "POKEMON_LIST_LOADING"
export const GET_POKEMON_DETAILS = "GET_POKEMON_DETAILS"
export const DELETE_CHARACTER   = "DELETE_CHARACTER"

export const getAllCharacters = () => { 
    return async function (dispatch) { 
        try {
            const response = await axios.get( "/pokemons") 
            const characters = response.data;
            dispatch({ 

            type:   GET_ALL_CHARACTERS,
            payload: characters 

        })
    } catch (error) {
        dispatch({ 
            type: ERROR,
            payload: error 
            })
        }
    }
}

export const postCharacters = (character) => { 
    return async function (dispatch) { 
        try {
            const response = await axios.post( "/pokemons", character) 
            const mensaje = response.data;
            dispatch({ 

            type:   SUCCESS_POST, 
            payload: mensaje 

        })
    } catch (error) {
        dispatch({ 
            type: ERROR,
            payload: error 
            })
        }
    }
}

export function buscadorPokemons (name) {
    return async function (dispatch) { 
        try {
            const info = await axios.get(`/pokemons?name=${name}`) 
            return dispatch({ 

            type:   GET_NAME_POKEMONS,
            payload: info.data, 

        })
    } catch (error) {
        return dispatch({ 
            type: ERROR,
            payload: error 
            })
        }
    }
}

export function getAllTypes() {
	return async function (dispatch) {
		try {
			const allTypes = await axios.get("/types"); 
			return dispatch({

				type: GET_ALL_TYPES,
				payload: allTypes.data,

			});
		} catch (error) {
			dispatch({ 
                type: ERROR,
                payload: error 
                })
		}
	};    
}

export function filterTypes(payload) {
	return {
		type: FILTER_TYPES,
		payload,
	};
}
export function filterOrder(payload) {
	return {
		type: FILTER_ORDER,
		payload,
	};
}

export function filterStrength(payload) {
	return {
		type: FILTER_STRENGTH,
		payload,
	};
}

export function filterCreated(payload) {
	return {
		type: FILTER_CREATED,
		payload,
	};
}

export function clearDetails() { 
	return {
		type: CLEAR_DETAILS,
		payload: {},
	};
}

export function getPokemonDetail(id) {
	return async function (dispatch) {
		dispatch({
			type: POKEMON_LIST_LOADING, 
		});
		try {
            
			const pokeInfoId = await axios.get(`/pokemons/${id}`) 
			
            return dispatch({
				type: GET_POKEMON_DETAILS,  
				payload: pokeInfoId.data[0] 
                
			});
		} catch (error) {
			dispatch({ 
                type: ERROR,
                payload: error 
                })
		}
	};
}


export const deleteCharacter = (id) => { 
    return {
      type: DELETE_CHARACTER, 
      payload: id, 
    };
};


