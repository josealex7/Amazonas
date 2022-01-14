import { typesCarrito } from "../types/types"

const initialState = {
    carrito: []
}


export const carritoReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesCarrito.agregar:
            return {
                carrito: [...state.carrito,action.payload]
            }
        case typesCarrito.borrar:
            return {
                carrito: state.carrito.filter(producto => producto.id !== action.payload)
            }
        case typesCarrito.actualizar:
            let newArray = []
            state.carrito.forEach(e=>{
                console.log('hola')
                console.log(action.payload.cantidad)
                if(e.id == action.payload.id){
                    
                    let newObject = {}
                    e['cantidad'] = action.payload.cantidad
                    newObject=e;
                    console.log(newObject)
                    newArray.push(newObject)
                } else {
                    newArray.push(e)
                }
                
            })
            return {
                carrito: newArray
            }

        default:
            return state;
    }
}