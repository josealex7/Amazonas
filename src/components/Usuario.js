import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../actions/actionLogin';
import { getAuth } from "firebase/auth";
import User from '../hooks/User';

const Usuario = () => {

    const useUser = User();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    
    return (
        <div>
            <h1>Hola, Este es el usuario de {useUser.name}</h1>
            <img src={useUser.photoURL}></img>
            <button
            onClick={() => handleLogout()}>logout</button>
        </div>
    )
}

export default Usuario
