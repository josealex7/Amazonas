import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { obtenerDatos, guardarDatos } from "../localStorage/localStorage";
import thunk from 'redux-thunk';
import { loginReducer } from '../reducers/loginReducer';
import { registerReducer } from '../reducers/registerReducer';
import { employeesReducers } from '../reducers/employeesReducers';
import { carritoReducer } from '../reducers/carritoReducer';

const composeEnhancers = (typeof window !== 'undefined' && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    employee: employeesReducers,
    carrito:carritoReducer
})

const storageState = obtenerDatos();

export const store = createStore(
    reducers,
    storageState,
    composeEnhancers( 
        applyMiddleware(thunk))
   
)

store.subscribe(() => {
    guardarDatos({
        carrito: store.getState().carrito
    })
})