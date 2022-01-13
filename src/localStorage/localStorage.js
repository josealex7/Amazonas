export const guardarDatos = (producto) => {
    let arrayCarrito=[];
    if(localStorage.getItem('arrayCarrito')){
        arrayCarrito=JSON.parse(localStorage.getItem('arrayCarrito'))
    }
    arrayCarrito.push(
        producto
    )
    localStorage.setItem('arrayCarrito',JSON.stringify(arrayCarrito))
}

export const obtenerDatos = () => {
    const arrayCarrito = localStorage.getItem('arrayCarrito');
    if(arrayCarrito===null){
        return undefined
    }
    return JSON.parse(arrayCarrito)
}