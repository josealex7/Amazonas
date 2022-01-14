export const guardarDatos = (state) => {
    // let arrayCarrito=[];
    // if(localStorage.getItem('arrayCarrito')){
    //     arrayCarrito=JSON.parse(localStorage.getItem('arrayCarrito'))
    // }
    // arrayCarrito.push(
    //     producto
    // )
    // localStorage.setItem('arrayCarrito',JSON.stringify(arrayCarrito))
    localStorage.setItem('arrayCarrito',JSON.stringify(state))
}

export const obtenerDatos = () => {
    const arrayCarrito = localStorage.getItem('arrayCarrito');
    if(arrayCarrito===null){
        return undefined
    }
    return JSON.parse(arrayCarrito)
}