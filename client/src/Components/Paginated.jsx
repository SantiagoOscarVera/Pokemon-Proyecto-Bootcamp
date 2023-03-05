import React from "react";
import estilos from "./Paginated.module.css"


export const Paginated = ({ pokemonsPage, everyPokemons, page }) => { 
  const pageNumber = []; 
  for (let i = 1; i <= Math.ceil(everyPokemons / pokemonsPage); i++) { 
    pageNumber.push(i);
  }
  return (
    <nav > 
      <div className={estilos.numerosPaginado}>
        {pageNumber &&
          pageNumber.map((number) => (
            <button onClick={() => page(number)} href="!#" className="button" key={number}>
              {number}
            </button>
          ))}
      </div>
    </nav>
  );
};

export default Paginated;