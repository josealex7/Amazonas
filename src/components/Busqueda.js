import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BorrarCarrito, ActualizarCarrito, VaciarCarrito } from '../actions/actionCarrito';
import { Button, TextField, Typography } from '@mui/material';
import '../styles/carrito.css'
import '../styles/busqueda.css'
import { Link } from "react-router-dom";


const Busqueda = () => {
    
    const { employees } = useSelector(store => store.employee);

    return (
        <div className='divPrincipalCarrito'>
            <div className='divSubCarrito divSubCarritoBusqueda'>
                {employees == undefined || employees.length == 0 ?
                <div>
                    <Typography variant='h4'>El producto no se encuentra.</Typography>
                    <hr/>
                    <br/>
                    <hr/>
                </div>
               :
               <div>
                   <Typography variant='h4'>Resultados</Typography>
                   <hr/>
                    {employees.map((e=>(
                        <Link to={`/detalle/${e.id}`} className='linksBusqueda'>
                            <div>
                                <div className='contenedorProducto'>
                                    <img src={e.imagenes[0]} className='imagenProducto imagenProductoBusqueda'/>
                                    <div>
                                        <div className='carritoTexto carritoTextoBusqueda'>
                                            <Typography variant='h6'>
                                                <label className='textoNombre textoNombreBusqueda'>
                                                    {e.nombre}
                                                </label>
                                            </Typography>
                                        </div>
                                        <div className="calificacionE calificacionBusqueda ">
                                            <label className={e.calificacion>1?'radio1A':'radio1'}>★</label>
                                            <label className={e.calificacion>2?'radio1A':'radio1'}>★</label>
                                            <label className={e.calificacion>3?'radio1A':'radio1'}>★</label>
                                            <label className={e.calificacion>4?'radio1A':'radio1'}>★</label>
                                            <label className={e.calificacion>=5?'radio1A':'radio1'}>★</label>
                                            <label className='numeroCalificacionD'>{e.calificacion}</label>
                                        </div>
                                        <Typography variant='body2' className='textoVerdeDisponible'>Disponible</Typography>
                                        <Typography variant='body1' className='textoNegrilla'>
                                            COP$
                                            <label className='textoNegrilla'> {Intl.NumberFormat('es-DE').format((e.precio))}</label>
                                        </Typography>                                
                                        <Typography variant='body2' className=''>
                                        <label className='textoNegrilla'>Envío GRATIS </label>
                                            a Colombia.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </Link>
                        )))}
               </div>
                }
            </div>
        </div>
    )
}

export default Busqueda

