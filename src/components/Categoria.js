import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useData } from '../hooks/useData';
import { 
    experimentalStyled as styled,
    Typography, 
    Grid, 
    Paper, 
    Box 
} from '@mui/material';
import {Link} from 'react-router-dom'
import { listEmployeeAsync } from '../actions/actionEmployees';
import { useParams } from "react-router-dom";
import '../styles/caregorias.css'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
  }));

export const Categoria = (props) => {
    
    const { id } = useParams();

    const [titulo, setTitulo] = useState('Todo')

    const [arrayProduct, setarrayProduct] = useState(null)

    const dispatch = useDispatch();

    const { employees } = useSelector(store => store.employee);
    
    const [masVendidos, masRegalados, computoTabletas, televisionVideo, audioSonido] = useData();

    const devolverNew = () =>{
        let newArray=[]
        if(id==1){
            setTitulo('Todos los productos')
            newArray = employees
        } else if(id==2){
            setTitulo('Productos mas vendidos')
            newArray = masVendidos()
        } else if(id==3){
            setTitulo('Productos mas regalados')
            newArray = masRegalados()
        } else if(id==4){
            setTitulo('Computo y Tabletas')
            newArray = computoTabletas()
        } else if(id==5){
            setTitulo('Televisión y video')
            newArray = televisionVideo()
        } else if(id==6){
            setTitulo('Audio y sonido')
            newArray = audioSonido()
        }
        setarrayProduct(newArray)
    }

    

    useEffect(() => {
            dispatch(listEmployeeAsync())
            devolverNew()
    }, [id])



    return (
        <div className='selectCategoria'>
            <Typography className='textoCategoria' variant='h3' textAlign={'left'} sx={{ mt:2, ml:3, mb:4}}>{titulo}</Typography>
            <hr />
            <div className='subSelectCategoria'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                        arrayProduct !== null ? arrayProduct.map((e)=>(
                        <Grid item xs={2} sm={4} md={4} key={e.id}>
                            <Link to={`/detalle/${e.id}`} className='links'>
                                <Item >
                                    <img className='imagenCategoria' src={e.imagenes[0]}/>
                                    <div className='tituloCategoria'>
                                    <Typography className='textoCategoria' variant='h6' textAlign={'left'} sx={{ m:2 }}>{e.nombre}</Typography>
                                    </div>
                                    <div className="calificacion">
                                        <label className={e.calificacion>=1?'radio1A':'radio1'}>★</label>
                                        <label className={e.calificacion>=2?'radio1A':'radio1'}>★</label>
                                        <label className={e.calificacion>=3?'radio1A':'radio1'}>★</label>
                                        <label className={e.calificacion>=4?'radio1A':'radio1'}>★</label>
                                        <label className={e.calificacion>=5?'radio1A':'radio1'}>★</label>
                                        <label className='numeroCalificacion'>{e.calificacion}</label>
                                    </div>
                                    <div className='contenedorPrecio'>
                                        <Typography className='textoCategoria' variant='h6' textAlign={'left'} sx={{ m:2 }}>COP $ {Intl.NumberFormat('es-DE').format(e.precio)}</Typography>
                                        <Typography className='textoCategoriaE' variant='body1' textAlign={'left'} sx={{ m:2 }}>Entrega gratis</Typography>
                                    </div>
                                </Item>
                            </Link>
                        </Grid>
                        ) ) : <h1>Cargando ...</h1> }
                    </Grid>
                </Box>
            </div>
            <hr />
        </div>
    )
}

export default Categoria;