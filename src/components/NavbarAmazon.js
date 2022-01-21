import React, {useEffect, useState} from 'react'
import {  ImgLogo } from "../styles/NavBarDos.elements";
import { Link } from 'react-router-dom';
import BarraBusqueda from './BarraBusqueda';
import '../styles/NavbarAmazon.css';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import User from '../hooks/User';
import { useSelector, useDispatch } from 'react-redux';
import { listEmployeeAsync } from '../actions/actionEmployees';
import AgregarProducto from './AgregarProducto';


const NavbarAmazon = () => {

    const dispatch = useDispatch();


    const useUser = User();

    let url = '';

    const { carrito } = useSelector(store => store.carrito);

    const { id, name } = useSelector(store => store.login);

    const [ubicacion, setUbicacion] = useState('')

    const getCoordenadas = () => {
        navigator.geolocation.getCurrentPosition(position => {
         const { latitude, longitude } = position.coords;
         url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyDvS3_rBwM7RJYjDOnPzquTpJVlskDs7nI';
         getUbicacion(url);
       });
     }

    const cantidadProduct = () =>{
        let cantidad =0;
        carrito?.forEach(element => {
            cantidad += Number(element.cantidad);
         });
         return cantidad
    }



    const getUbicacion = async(endpoint) => {
        const resp = await fetch(endpoint);
        const {results} = await resp.json();
        setUbicacion(results[0].formatted_address)
      }
 
      useEffect(() => {
        dispatch(listEmployeeAsync())
      }, [])

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
                                <div className='contenedor-direccion' onClick={getCoordenadas}>
                                    <img src="https://img.icons8.com/material/24/FFFFFF/worldwide-location--v1.png"/>
                                    <label className='labelDireccion'> {
                                            ubicacion!=''? 
                                            ubicacion:
                                            "Elige tu dirección"
                                            }
                                    </label>
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
                              name!==undefined?name:'identificate'
                            } 
                        </Link>
                    </li>
                    <li>
                        <Link to="/devoluciones" className='links'>
                            Devoluciones y pedidos
                        </Link>
                    </li>
                    <li>
                        <Link to="/carrito" className='links'>
                            {cantidadProduct()!==0?
                            <div className='cantidadNumCarrito'>{cantidadProduct()}</div>
                            :<div></div>}
                            <img src="https://img.icons8.com/material-rounded/45/FFFFFF/shopping-cart.png"/>
                            <label className='bold-label'>Carrito</label>
                        </Link>
                    </li>
                </ul>
            </header>
            <div className='subMenu'>
                <ul>
                    <li>
                        <Link to="/categoria/1" className='linksSub'>
                            <MenuIcon />
                            <label className='textoTodo'>Todo</label>
                        </Link>
                    </li>
                    <li>
                        <Link to="/categoria/2" className='linksSub'>
                            Los Más Vendidos
                        </Link>
                    </li>
                    <li>
                        <Link to="/categoria/4" className='linksSub'>
                            Cómputo y Tabletas
                        </Link>
                    </li>
                    <li>
                        <Link to="/categoria/3" className='linksSub'>
                            Los Más Regalados
                        </Link>
                    </li>
                    <li>
                        {id!==undefined?    
                        <div>
                            <AgregarProducto/>
                        </div>
                        : ''    
                        }
                        
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarAmazon
