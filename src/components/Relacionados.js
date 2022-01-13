import React, { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import '../styles/relacionados.css'
import { listEmployeeAsync } from '../actions/actionEmployees';
import { useSelector, useDispatch } from 'react-redux';


const Relacionados = (props) => {

    const [arrayRelacionado, setArrayRelacionado] = useState(null)

    const productosRelacionados =()=>{
        let contador=0;
        let arrayNew = []
        employees.forEach(element => {
            if(element.categoria[0]==props.props && contador<4){
                arrayNew.push(
                    element
                )
                contador++
            }
        });
        setArrayRelacionado(arrayNew)
    }

    const dispatch = useDispatch();

    const { employees } = useSelector(store => store.employee);

    useEffect(() => {
        dispatch(listEmployeeAsync())
        productosRelacionados()
    }, [])

    return (
        <div className="divRelacionadosPrincipal">
            <Typography variant="h4" className="TituloRelacionados">Productos relacionados con este articulo</Typography>
        </div>
    )
}

export default Relacionados
