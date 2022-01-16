import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listEmployeeAsync } from '../actions/actionEmployees';
import { experimentalStyled as styled ,Typography, Grid, Paper, Box, Button } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import '../styles/agregado.css'
import '../styles/carrito.css'

const Agregado = () => {

    const { id } = useParams();
    
    const dispatch = useDispatch();

    const { employees } = useSelector(store => store.employee);

    const { carrito } = useSelector(store => store.carrito);

    const [arrayProduct, setarrayProduct] = useState(null)

    const cantidadProduct = () =>{
        let cantidad =0;
        carrito?.forEach(element => {
            cantidad += Number(element.cantidad);
         });
         return cantidad
    }

    const Subtotal = () =>{
        let subtotal=0;
        carrito?.forEach(element => {
           subtotal += Number(element.cantidad)*Number(element.precio)
        });
        return Intl.NumberFormat('es-DE').format(subtotal)
    }

    const producto =()=>{
        const newArray = employees.filter((element=>element.id==id))
        setarrayProduct(newArray[0])
    }

    useEffect(() => {
        dispatch(listEmployeeAsync())
        producto()
    }, [])

    return (
        <div className='divPrincipalCarrito'>
            <div className='divSubCarrito divSubCarritoA'>
                    {arrayProduct!==null && arrayProduct!==undefined?
                    <div className='contenedorProducto contenedorProductoA'>
                        <div>
                            <img src={arrayProduct.imagenes[0]} className='imagenProducto'/>
                        </div>
                        <div className='carritoTextoA'>
                            <Typography variant='h5' textAlign={'left'}>
                                <img src="https://img.icons8.com/ios-glyphs/30/1D8418/checked--v1.png" className='imagenCheck'/>
                                Agregado al carrito
                            </Typography>
                            <Typography variant='body1' sx={{mt: 1}}> 
                                <label className='textoNegrilla'>Color: </label> 
                                {arrayProduct.color}
                            </Typography>
                            <Typography variant='body1' className=''> 
                                <label className='textoNegrilla'>Tipo: </label> 
                                {arrayProduct.tipo}
                            </Typography>
                        </div>
                    </div>
                    :<h1>espere</h1>}   
            </div>
            <div className='divCarritoPagar divCarritoPagarA'>
                <Typography variant='body2' className='textoVerdeDisponible'>Tu pedido es elegible para envio gratis</Typography>
                <Typography textAlign={'left'} variant='h6' sx={{mt:2}}>
                    Subtotal ({cantidadProduct()} producto{cantidadProduct()>1?'s':''}):
                    <label className='textoNegrillaS'>COP ${Subtotal()}</label>
                </Typography>
                <Link to="/formulario" className='links'>
                    <Button variant='contained' fullWidth sx={{mt:2}} color='warning'>Proceder al pago</Button>
                </Link>
                <Link to="/carrito" className='links'>
                    <Button variant='contained' fullWidth sx={{mt:2}}>Ir al carrito</Button>
                </Link>
            </div>
        </div>
    )
}

export default Agregado
