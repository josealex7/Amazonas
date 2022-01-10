import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../actions/actionLogin';
import { getAuth } from "firebase/auth";
import User from '../hooks/User';
import { Typography } from '@mui/material';
import '../styles/Usuario.css'

const Usuario = () => {

    const useUser = User();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    
    return (
        <div className='Contenedor-principal-usuario'>
                
            <div className='Contenedor-usuario'>
                <div className='contenedor-boton-logout'>
                <button 
                    className='botonLogout'
                    onClick={() => handleLogout()}>
                        <img src="https://img.icons8.com/external-sbts2018-outline-sbts2018/40/ff8000/external-logout-social-media-basic-1-sbts2018-outline-sbts2018.png"/>
                </button>
                </div>
                
                <div className='contenedor contenedor-cuenta'>
                    <Typography variant='h4' className='h1-usuario'>Mi cuenta</Typography>
                </div>
                    <img className='imagen-usuario' src={useUser.photoURL}></img>
                <div className='contenedor'>
                    <Typography variant='h5' className='h1-usuario'>Nombre de usuario</Typography>
                    <Typography variant='h6' className='h1-usuario'>{useUser.name}</Typography>
                </div>
                <div className='contenedor'>
                    <Typography variant='h5' className='h1-usuario'>Correo electronico</Typography>
                    <Typography variant='h6' className='h1-usuario'>{useUser.email}</Typography>
                </div>
            </div>
        </div>
    )
}

export default Usuario
