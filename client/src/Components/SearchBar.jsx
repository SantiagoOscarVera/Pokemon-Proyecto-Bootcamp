import React, {useState} from "react";
import {buscadorPokemons, clearDetails} from "../Redux/actions.js"
import {useDispatch, useSelector} from "react-redux";



const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const filter1 = useSelector((state) => state.permanent)   

    const handleInputChange = (event) => {
        event.preventDefault();  
        setName(event.target.value); 
        
    }

    const handleButtonSubmit =(event)=> {
        event.preventDefault(); 
        
        const name1 = name.toUpperCase()

        console.log(name1)

        let disAndSet = (name1) => { dispatch(buscadorPokemons(name1))}

        let pkFind = filter1.filter(pk => pk.name == name1);
        pkFind.length > 0 ?  disAndSet(name1) : alert(" You must search for a pokemon that exists!")

    }


    return (
        <div>
            <button onClick={()=> dispatch(clearDetails()) }>Reset</button>
            <input
            type="text"
            placeholder="Search Pokemon..."
            onChange={(event) => handleInputChange(event)}
            
            />
            <button
            type="submit"
            onClick={(event) => handleButtonSubmit(event)}
            
            >
            {" "}
            Search{" "}
            </button>
        </div>
        );
}

export default SearchBar;