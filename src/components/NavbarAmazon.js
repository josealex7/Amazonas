import React from 'react'
import { ContainerPrincipal, LogoContainer, ContainerButtons, Button1, Button2, ImgLogo } from "../styles/NavBarDos.elements";
import { Link } from 'react-router-dom'
import BarraBusqueda from './BarraBusqueda'
import '../styles/NavbarAmazon.css'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import User from '../hooks/User';
import UseLocation from '../hooks/UseLocation';
import { google } from 'google-maps';

const NavbarAmazon = () => {

    const [address, getAdd] = UseLocation();

    const useUser = User();

    const getAddress= () =>{
        getAdd()
        let miDireccion = new google.maps.LatLng(address.latitude, address.longitude);
        console.log(miDireccion)
    }

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
                                <button onClick={getAddress}>
                                    <div className='contenedor-direccion'>
                                        <img src="https://img.icons8.com/material/24/FFFFFF/worldwide-location--v1.png"/>
                                        <label> {
                                                address.latitude!==0 && address.longitude!==0? 
                                                address.longitude + " - "+address.latitude:
                                                "Elige tu dirección"
                                                }
                                        </label>
                                    </div>
                                </button>
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
                    <li >
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
