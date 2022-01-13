import { useEffect, useState } from 'react'
import {guardarDatos, obtenerDatos} from '../localStorage/localStorage'

export const useCategoria = () =>{

    const [numero, setNumero] = useState()
    
    const guardarNum = (numero) =>{
        guardarDatos({
            numero
        })
    }


    const obtenerCat = () =>{
        const storageState = obtenerDatos()
        setNumero(storageState.numero)
    }
    

    if(numero!=obtenerDatos().numero){
        setNumero(obtenerDatos().numero)
    }

    useEffect(() => {
        obtenerCat()
    }, [])

    return [guardarNum, obtenerCat]
}