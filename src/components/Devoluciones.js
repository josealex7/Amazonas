import { Divider, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { ListarCompraAsync } from '../actions/actionCompra'
import { useSelector, useDispatch } from 'react-redux';
import '../styles/Devoluciones.css'
import User from '../hooks/User';

const Devoluciones = () => {

    const dispatch = useDispatch();

    const useUser = User();

    const [pedidos, setPedidos] = useState()

    const { compras } = useSelector(store => store.compras);

    const filtrar = () =>{
        const newArray = compras.filter(elemento => elemento.userId==useUser.uid)
        setPedidos(newArray)
    }

    const Subtotal = () =>{
        
    }

    useEffect(() => {
        dispatch(ListarCompraAsync())
        filtrar()
    }, [])

    return (
        <div className='contenedorPedidos'>
            <div className='subContenedorPedidos'>
                <Typography variant='h4' textAlign={'left'} sx={{m:3}} className='h1-usuario'>Tus pedidos</Typography>
                <Divider sx={{ m: 2.5 }}  orientation="horizontal" />
                {pedidos==undefined || pedidos == null || pedidos.length ==0?
                <Typography variant='h6' textAlign={'center'} sx={{m:2}} className='h1-usuario'>Tienes 0 pedidos</Typography>
                :
                <div>{pedidos?.map((e=>(
                    <div>
                        <div className='contenedorProducto'>
                            <div>
                                <div className='carritoTexto'>
                                    <Typography variant='h6'>
                                        Fecha de compra:
                                        <label className='textoNombreT'>
                                             {e.fechaCompra}
                                        </label>
                                    </Typography>
                                    <Typography variant='h6' sx={{mb:2}}>
                                        Dirección de envio:
                                        <label className='textoNombreT'>
                                             { e.pais}, {e.region}, {e.ciudad}, {e.direccion1}, {e.direccion2}
                                        </label>
                                    </Typography>
                                </div>
                                <Typography variant='h6' sx={{mt:1}}>Productos</Typography>
                                {e.detalleCompra.map((producto)=>(
                                    <div>
                                        <div className='contenedorProducto'>
                                            <img src={producto.imagenes[0]} className=' imagenProductoDe'/>
                                            <div>
                                                <div className='carritoTextoCompra'>
                                                    <Typography variant='body1'>
                                                        <label className='textoNombreP'>
                                                        {producto.nombre}
                                                        </label>
                                                    </Typography>
                                                </div>
                                                <Typography variant='body2' className='' sx={{mt:1}}> 
                                                    <label className='textoNegrilla'>Color: </label> 
                                                    {producto.color}
                                                    </Typography>
                                                    <Typography variant='body2' className=''> 
                                                    <label className='textoNegrilla'>Tipo: </label> 
                                                    {producto.tipo}
                                                    </Typography>
                                                    <Typography variant='body2' className=''>
                                                    <label className='textoNegrilla'>Cantidad: </label>  
                                                        {producto.cantidad}
                                                    </Typography>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))}
                                
                                
                            </div>
                            <div className='Carritoprecio'>
                            <Typography variant='body1' className='textoNegrilla'>
                            COP $
                            {e.valorCompra}
                            </Typography>
                            </div>
                        </div>
                    <hr/>
                    </div>
                    )))}</div>
                    }

                <Divider sx={{ m: 2.5 }}  orientation="horizontal" />
                <Typography variant='h4' textAlign={'left'} sx={{m:3}} className='h1-usuario'>Tus devoluciones</Typography>
                <Divider sx={{ m: 2.5 }}  orientation="horizontal" />
                <Typography  variant='h6' textAlign={'center'} sx={{m:2}} className='h1-usuario'>Tienes 0 devoluciones</Typography>
                <Divider sx={{ m: 2.5 }}  orientation="horizontal" /> 
            </div>
            
            
        </div>
    )
}

export default Devoluciones
        