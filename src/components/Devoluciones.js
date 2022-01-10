import { Divider, Typography } from '@mui/material'
import React from 'react'
import '../styles/Devoluciones.css'


const Devoluciones = () => {
    return (
        <div className='contenedorPedidos'>
            <div className='subContenedorPedidos'>
                <Typography variant='h4' textAlign={'left'} sx={{m:3}} className='h1-usuario'>Tus pedidos</Typography>
                <Divider sx={{ m: 2.5 }}  orientation="horizontal" />
                <Typography variant='h6' textAlign={'center'} sx={{m:2}} className='h1-usuario'>Tienes 0 pedidos</Typography>
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
        