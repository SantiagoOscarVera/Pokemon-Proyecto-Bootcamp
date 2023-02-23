/// una vez configurado las actions y despues el reducer, ahora podemos configurar el store
import  rootReducer from "./reducer.js";
import { createStore, applyMiddleware, compose } from  "redux"; // esto es para poder utilizar redux time (?) osea para poder usar las funciones asincronas y para poder utilizar en el navegador tambien redux devtools
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // puede estar en "redux-devtools-extension";// esto es para poder utilizar redux time (?) osea para poder usar las funciones asincronas y para poder utilizar en el navegador tambien redux devtools

const store = createStore(rootReducer,
    composeEnhancer(applyMiddleware(thunk)))

export default store;   