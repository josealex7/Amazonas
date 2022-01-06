import React from 'react';
import { ImgLogo } from "../styles/Footer.elements";
import { Link } from 'react-router-dom';
import '../styles/Footer.css'

const Footer = () => {
    return (
        <div className='footer'>     
            <div className='footer-div-center'>
                <div className='footer-div'>
                    
                        <ul>
                            <li className='li-bold'>
                                Conocenos
                            </li>
                            <li>
                                Trabajar en Amazonas
                            </li>
                            <li>
                                Información corporativa
                            </li>
                            <li>
                                Departamento de prensa
                            </li>
                        </ul>
                
                    <ul>
                        <li className='li-bold'>
                            Podemos ayudarte
                        </li>
                        <li>
                            Amazonas y COVID-19
                        </li>
                        <li>
                            Devolver o reemplazar productos
                        </li>
                        <li>
                            Gestionar contenido y dispositivos
                        </li>
                        <li>
                            Ayuda
                        </li>
                    </ul>
                    <ul >
                        <li className='li-bold'>
                            Metodos de pago
                        </li>
                        <li>
                            Tarjetas de credito y debito
                        </li>
                        <li>
                            Tarjetas de regalo
                        </li>
                        <li>
                            Meses sin intereses
                        </li>
                        <li>
                            Amazonas Cash
                        </li>
                        <li>
                            Amazonas Recargable
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <Link to="/" className='links'>
                    <ImgLogo src="https://res.cloudinary.com/dxnn5sbsz/image/upload/v1641393658/amazonas/icono_amazonas_jezf6j.png" alt="logo" />
                </Link>
            </div>            
        </div>
    )
}

export default Footer