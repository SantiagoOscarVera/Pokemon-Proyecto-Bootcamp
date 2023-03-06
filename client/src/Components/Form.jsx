import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllTypes, postCharacters} from "../Redux/actions"
import estilos from "./Form.module.css";

import { Link } from 'react-router-dom'

const Form = () => {
    const dispatch = useDispatch() 
    const allTypes = useSelector(state=> state.allTypes) 
    const mensaje = useSelector(state=> state.success)
    const error = useSelector(state=> state.error) 
    const [errors, setErrors] = useState({}) 

    const [input, setInput] = useState({  
    name:"",
    hp:"",
    attack:"",
    defense:"",
    speed: "",
    height: "",
    weight: "",
    image:"https://forums.pokemmo.com/uploads/monthly_2022_12/image.gif.f300cfe516ac948b8b5da516633a43bf.gif",
    type: [],
    type1:[],
    type2:[],
})

const validateInput = (input)=> {
    const errors ={}; 
    if(!input.name.length || typeof input.name !== "string") errors.name = "Escriba el nombre de su pokémon"
    if(!input.image.length) errors.image = "Debe ingresar una url valida para que se vea la imagen"
    if(!input.hp.length || input.hp > 100 || input.hp < 1 ) errors.hp = "Debe ingresar un hp entre 1 y 100"
    if(!input.attack.length || input.attack > 100 || input.attack < 1) errors.attack = "Debe ingresar un ataque entre 1 y 100"
    if(!input.defense.length || input.defense > 100 || input.defense < 1) errors.defense = "Debe ingresar una defensa entre 1 y 100"
    if(!input.speed.length || input.speed > 100 || input.speed < 1) errors.speed = "Debe ingresar una velocidad entre 1 y 100 km/h"
    if(!input.height.length || input.height > 20 || input.height < 1) errors.height = "Debe ingresar una altura entre 1 y 20 metros"
    if(!input.weight.length || input.weight > 1000 || input.weight < 1) errors.weight = "Debe ingresar un peso entre 1 y 1000 kg"
    if(!input.type.length ) errors.type = "Debe ingresar al menos un tipo de pokémon"
    return errors
}

useEffect(() => {
    dispatch(getAllTypes()); 
}, [dispatch]);

const handleChange =(event)=>{ 
    setInput({
        ...input, 
        [event.target.name]: event.target.value 
    })
    setErrors(validateInput({
        ...input,
        [event.target.name] : event.target.value
    }))
    console.log(input)
    }


const handleSubmit = (event) => {
    event.preventDefault() 


           if(!Object.keys(errors).length) {  
            dispatch(postCharacters(input)) 
            setInput({
                name:"",
                hp:"",
                attack:"",
                defense:"",
                speed: "",
                height: "",
                weight: "",
                image:"",
                type: [],
                type1:[],
                type2:[],
            })    
        } else {
            alert("Hay caracteristicas en blanco o que no cumplen la consigna, revisar por favor.") 
        }
}




useEffect(()=>{ 
    setErrors(validateInput(input))
},[input]) 



function handleSelect(event) { 

    if (input.type1.length == 0) {              /// si el largo es cero no seleccionamos nada, si es cero pusheame en el input el valor, pero si el largo es 1 ya cambiamos el valor y andalo renovando
        input.type1.push(event.target.value)
        setInput({
        ...input,
            type: [...input.type1, ...input.type2]

    });
    return
            }
            if (input.type1.length == 1) {
        input.type1.pop()
        input.type1.push(event.target.value)
        setInput({
        ...input,
        type: [...input.type1, ...input.type2]

    });
    }

}

function handleSelect2(event) { 
    if (input.type2.length == 0) {              /// si el largo es cero no seleccionamos nada, si es cero pusheame en el input el valor, pero si el largo es 1 ya cambiamos el valor y andalo renovando
        input.type2.push(event.target.value)
        setInput({
        ...input,
        type: [...input.type1, ...input.type2]

    });
    return
            }
            if (input.type1.length == 1) {
        input.type2.pop()
        input.type2.push(event.target.value)
        setInput({
        ...input,
        type: [...input.type1, ...input.type2]

    });
    }
}

return (

    <div className={estilos.container}>
        <div className={estilos.container2}>
                    <nav >
						<Link className={estilos.btnHome} to='/home'> 
								<button>Go to Home</button>
						</Link>
		            </nav> {/* boton que te regresa al home */}
                    
                <div className={estilos.titleSubmit}>
                        <h1 className={estilos.createTitle}>Create a Pokémon</h1>
                </div>
        </div>
                    
        
        <form className={estilos.form} onSubmit={handleSubmit}>  {/* Creacion de formulario */}


            <div className={estilos.range1}> {/* imputs */}
                <label className={estilos.label} htmlFor="name">Name:</label>
                <input className={estilos.input} type="text" name="name" value={input.name} onChange={handleChange}/> 
                <p className={estilos.validacion}>{errors.name && errors.name}</p> 
            </div>

            <div className={estilos.range}>
				<label className={estilos.label} htmlFor="image" >Img:</label>
				<input className={estilos.inputImg} type="text" name="image" placeholder='Url de tu imagen' value={input.image} onChange={handleChange}/>
                <p className={estilos.validacion}>{errors.image && errors.image}</p>
            </div>

            <div className={estilos.range}>
                <label className={estilos.label} htmlFor="hp">Hp:</label>
                <input className={estilos.input} type="number"  min="0" max="100" name="hp" value={input.hp} onChange={handleChange}/>
                <p className={estilos.validacion}>{errors.hp && errors.hp}</p>
            </div>

            <div className={estilos.range}>
                <label className={estilos.label} htmlFor="attack">Ataque:</label>
                <input className={estilos.input} type="number" name="attack" value={input.attack} onChange={handleChange}/>
                <p className={estilos.validacion}>{errors.attack && errors.attack}</p>
            </div>

            <div className={estilos.range}>
                <label className={estilos.label} htmlFor="defense">Defense:</label>
                <input className={estilos.input} type="number" name="defense" value={input.defense} onChange={handleChange}/>
                <p className={estilos.validacion}>{errors.defense && errors.defense}</p>
            </div>

            <div className={estilos.range}>
                <label className={estilos.label} htmlFor="speed">Velocidad:</label>
                <input className={estilos.input} type="number" name="speed" value={input.speed} onChange={handleChange}/>
                <p className={estilos.validacion}>{errors.speed && errors.speed}</p>
            </div>

            <div className={estilos.range}>
                <label className={estilos.label} htmlFor="height">Altura:</label>
                <input className={estilos.input} type="number" name="height" value={input.height} onChange={handleChange}/>
                <p className={estilos.validacion}>{errors.height && errors.height}</p>
            </div>

            <div className={estilos.range}>
                <label className={estilos.label} htmlFor="weight">Peso:</label>
                <input className={estilos.input} type="number" name="weight" value={input.weight} onChange={handleChange}/>
                <p className={estilos.validacion}>{errors.weight && errors.weight}</p>
            </div>

                <h3 className={estilos.typesTitulo}>Select Type</h3>

                    <div className={estilos.tipos}>
                        {/* <label  htmlFor="type">Type:</label> */}
                        <select onChange={(e) => handleSelect(e)}>
                            <option value="none" defaultValue title="">
                                Select Type(s)
                            </option>
                                {allTypes?.map((t) => (
                                <option value={t.name}>{t.name}</option>
                                ))}
                        </select>

                        <select onChange={(e) => handleSelect2(e)}>
                            <option value="none" defaultValue title="">
                                Select Type(s)
                            </option>
                                {allTypes?.map((t) => (
                                <option value={t.name}>{t.name}</option>
                                ))}
                        </select>
                        
                    </div>
                    <div>
                        <p className={estilos.validacion}>{errors.type && errors.type}</p>
                    </div>
                    
            <button className={estilos.btn} type="submit">Create</button>
        </form>
    </div>
)

}




export default Form;