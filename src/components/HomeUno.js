import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../styles/homeUno.css'
import { guardarDatos } from "../localStorage/localStorage";
import { experimentalStyled as styled ,Typography, Grid, Paper, Box } from '@mui/material';
import {Link} from 'react-router-dom'
import { useCategoria } from '../hooks/useCaregoria';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
  }));

const HomeUno = () => {

    const dispatch = useDispatch();

    const { employees } = useSelector(store => store.employee);

    // const [guardarNum] = useCategoria()

    // const subscribe=(numero) => {
    //     guardarNum(numero)
    // }

    return (
        <div className='categoriasProduct'>
            <div className='subCategoriaProduct'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4}>
                            <Link to="/categoria/1" className='links'>
                                <Item>
                                    <Typography className='textoCategoria' variant='h5' textAlign={'left'} sx={{ mb:3 }}>Todo</Typography>
                                    <img className='imagenCategoria' src='https://res.cloudinary.com/dxnn5sbsz/image/upload/v1641758133/amazonas/Sin_t%C3%ADtulo_3_jxxjbv.png'/>
                                </Item>
                            </Link>
                        </Grid>
                       
                        <Grid item xs={2} sm={4} md={4} >
                            <Link to="/categoria/2" className='links'>
                                <Item>
                                    <Typography className='textoCategoria' variant='h5' textAlign={'left'} sx={{ mb:3 }}>Lo mas vendido</Typography>
                                    <img className='imagenCategoria' src='https://res.cloudinary.com/dxnn5sbsz/image/upload/v1641757776/amazonas/x1-lenovo_kslzrq.png' />
                                </Item>
                            </Link>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Link to="/categoria/3" className='links'>
                                <Item>
                                    <Typography className='textoCategoria' variant='h5' textAlign={'left'} sx={{ mb:3 }}>Lo mas regalado</Typography>
                                    <img className='imagenCategoria' src='https://res.cloudinary.com/dxnn5sbsz/image/upload/v1641757491/amazonas/portatil-caja-regalo-blanco-ilustracion-3d-aislada_356060-96_yxewb4.jpg' />
                                </Item>
                            </Link>
                        </Grid>
                            
                        <Grid item xs={2} sm={4} md={4}>
                            <Link to="/categoria/4" className='links'>
                                <Item>
                                    <Typography className='textoCategoria' variant='h5' textAlign={'left'} sx={{ mb:3 }}>Computo y tabletas</Typography>
                                    <img className='imagenCategoria' src='https://res.cloudinary.com/dxnn5sbsz/image/upload/v1641757382/amazonas/Janus-Gamer-Intel-Corei5-Teclado-Gamer_icxhfl.png' />
                                </Item>
                            </Link>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Link to="/categoria/5" className='links'>
                                <Item onClick={()=>guardarDatos(5)}>
                                    <Typography className='textoCategoria' variant='h5' textAlign={'left'} sx={{ mb:3 }}>Televisión y video</Typography>
                                    <img className='imagenCategoria' src='https://res.cloudinary.com/dxnn5sbsz/image/upload/v1641757213/amazonas/464-4642640_tv-png-clipart-background-hoodoos-above-the-bow_o35qxx.png' />
                                </Item>
                            </Link>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Link to="/categoria/6" className='links'>
                                <Item onClick={()=>guardarDatos(6)}>
                                    <Typography className='textoCategoria' variant='h5' textAlign={'left'} sx={{ mb:3 }}>Audio y equipos de sonido</Typography>
                                    <img className='imagenCategoria' src='https://res.cloudinary.com/dxnn5sbsz/image/upload/v1641757427/amazonas/SC-AKX400PS-Product_ImageGlobal-1_pe_es_wfpp9q.png' />
                                </Item>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
}

export default HomeUno
