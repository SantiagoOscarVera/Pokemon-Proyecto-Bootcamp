import './App.css';
import  {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import PokemonDetail from "./Components/PokemonDetail";
import Form from './Components/Form';
import axios from "axios";
axios.defaults.baseURL = /* "https://pokemon-proyecto-bootcamp-production.up.railway.app/"; */ "https://pokemon-proyecto-bootcamp.vercel.app/"



function App() {
  return ( 
    <BrowserRouter>
    <div> 
      <Switch>
            
            <Route exact path= "/" component={LandingPage} />
            <Route exact path= "/home" component={Home} /> 
            <Route path="/details/:id" component={PokemonDetail} /> 
            <Route path= "/post" component={Form} /> 
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
