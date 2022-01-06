import React from 'react'
import { ContainerPrincipal, LogoContainer, ContainerButtons, Button1, Button2, ImgLogo } from "../styles/NavBarDos.elements";
import { Link } from 'react-router-dom'
import BarraBusqueda from './BarraBusqueda'
import '../styles/NavbarAmazon.css'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import User from '../hooks/User';

const NavbarAmazon = () => {

    const useUser = User();

    return (
        <div>
            <header className='navbar-principal'>
                <ul>
                    <li>
                        <Link to="/" className='links'>
                            <ImgLogo src="https://res.cloudinary.com/dxnn5sbsz/image/upload/v1641393658/amazonas/icono_amazonas_jezf6j.png" alt="logo" />
                        </Link>
                    </li>
                    <li>
                        <div>
                            <div>
                                <label>Hola</label>
                                <div className='contenedor-direccion'>
                                    <img src="https://img.icons8.com/material/24/FFFFFF/worldwide-location--v1.png"/>
                                    <label>Elige tu dirección</label>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <BarraBusqueda/>
                    </li>
                    <li>
                        <Link to="/usuario" className='links'>
                            Hola, {
                              useUser.name!==undefined?useUser.name:'identificate'
                            } 
                        </Link>
                    </li>
                    <li>
                        <Link to="/devoluciones" className='links'>
                            Devoluciones y pedidos
                        </Link>
                    </li>
                    <li>
                        <img src="https://img.icons8.com/material-outlined/40/FFFFFF/shopping-cart--v1.png"/>
                        <label className='bold-label'>Carrito</label>
                    </li>
                </ul>
            </header>
            <div className='subMenu'>
                <ul>
                    <li>
                    <MenuIcon />
                        Todo
                    </li>
                    <li>
                        Los Más Vendidos
                    </li>
                    <li>
                        Cómputo y Tabletas
                    </li>
                    <li>
                        Los Más Regalados
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarAmazon
