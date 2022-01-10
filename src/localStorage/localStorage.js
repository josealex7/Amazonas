export const guardarDatos = (state) => {
    localStorage.setItem('categoria',JSON.stringify(state))
}

export const obtenerDatos = () => {
    const categoriaNum = localStorage.getItem('categoria');
    if(categoriaNum===null){
        return undefined
    }
    return JSON.parse(categoriaNum)
}