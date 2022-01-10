import { useState } from "react";
import { useSelector } from 'react-redux';


export const useData = () =>{
    
    

    const { employees } = useSelector(store => store.employee);

    const masVendidos = () =>{
        employees.sort(function (a, b){
            return (b.ventas - a.ventas)
        })
        return employees
    }

    const masRegalados = () =>{
        employees.sort(function (a, b){
            return (b.regalados - a.regalados)
        })
        return employees
    }

    const computoTabletas = ()=>{
        const newEmployes = employees.filter((comp => comp.categoria[0] == 'computo' || comp.categoria[1] == 'tabletas' || comp.categoria[0] == 'tabletas' || comp.categoria[1] == 'computo'))
        return newEmployes
    }

    const televisionVideo = ()=>{
        const newEmployes = employees.filter((comp => comp.categoria[0] == 'television' || comp.categoria[1] == 'television' || comp.categoria[0] == 'video' || comp.categoria[1] == 'video'))
        return newEmployes
    }

    const audioSonido = ()=>{
        const newEmployes = employees.filter((comp => comp.categoria[0] == 'audio' || comp.categoria[1] == 'audio' || comp.categoria[0] == 'sonido' || comp.categoria[1] == 'sonido'))
        return newEmployes
    }

    return [masVendidos, masRegalados, computoTabletas, televisionVideo, audioSonido]

}