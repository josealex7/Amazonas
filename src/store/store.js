import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { obtenerDatos } from "../localStorage/localStorage";
import thunk from 'redux-thunk';
import { loginReducer } from '../reducers/loginReducer';
import { registerReducer } from '../reducers/registerReducer';
import { employeesReducers } from '../reducers/employeesReducers';

const composeEnhancers = (typeof window !== 'undefined' && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    employee: employeesReducers
})



export const store = createStore(
    reducers,
    composeEnhancers( 
        applyMiddleware(thunk))
   
)