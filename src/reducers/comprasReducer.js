import { typesCompras } from "../types/types";

const initialState = {
    compras: []
}

export const comprasReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesCompras.agregarCompra:
            return{
                compras: [action.payload]
            }
        case typesCompras.listar:
                return{
                    compras: [...action.payload]
                }    
        default:
            return state
    }
}