import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'; /// nos permite crear las rutas
import {Provider} from 'react-redux';/// para que mis componentes puedan tener acceso al estado de reducer tenemos que envolver mi app con el provider
import store from './Redux/Store';


ReactDOM.render(
  <Provider store={store}> {/* es para que el store este disponible para toda mi app */}
    <BrowserRouter> {/* me deja que le ponga componentes */}
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
