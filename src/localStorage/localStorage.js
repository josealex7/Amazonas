export const guardarDatos = (state) => {
    localStorage.setItem('arrayCarrito',JSON.stringify(state))
}

export const obtenerDatos = () => {
    const arrayCarrito = localStorage.getItem('arrayCarrito');
    if(arrayCarrito===null){
        return undefined
    }
    return JSON.parse(arrayCarrito)
}