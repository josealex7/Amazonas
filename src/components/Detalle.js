import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { listEmployeeAsync } from '../actions/actionEmployees';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/detalle.css'
import { experimentalStyled as styled ,Typography, Grid, Paper, Box } from '@mui/material';
import { guardarDatos } from '../localStorage/localStorage';
import { AgregarCarrito} from '../actions/actionCarrito'


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
  }));


const Detalle = () => {

    const [arrayProduct, setarrayProduct] = useState(null)

    const [arrayRelacionado, setArrayRelacionado] = useState(null)
    
    const { id } = useParams();
    
    const dispatch = useDispatch();

    const { employees } = useSelector(store => store.employee);

    const hoy = new Date();

    const AgregarCarritoD = (producto) =>{
        producto['cantidad']=1
        dispatch(AgregarCarrito(producto))
    }

    function formatoFecha(fecha, formato,dias) {
        const map = {
            dd: fecha.getDate()+dias,
            mm: fecha.getMonth() + 1,
            yy: fecha.getFullYear().toString().slice(-2),
            yyyy: fecha.getFullYear()
        }
    
        return formato.replace(/dd|mm|yy|yyy/gi, matched => map[matched])
    }

    const productosRelacionados =()=>{
        let contador=0;
        let arrayNew = []
        let newArray = employees.filter((element=>element.id==id))
        newArray = newArray[0]
        employees.forEach(element => {
            if(element.categoria[0]==newArray.categoria[0] && element.id!==newArray.id){
                if(contador<4 ){
                    arrayNew.push(
                        element
                    )
                }
                contador++
            }
        });
        setArrayRelacionado(arrayNew)
    }

    const producto =()=>{
        const newArray = employees.filter((element=>element.id==id))
        setarrayProduct(newArray[0])
    }

    useEffect(() => {
        dispatch(listEmployeeAsync())
        producto()
        productosRelacionados()
    }, [id])

    return (
        <div className='divDetallePrincipal'>
                 {arrayProduct!==null?
                <div className='divSubDetalle'>
                    <div className='imagenesDetalle'>
                        <div className='imagenesProduct'>
                            {arrayProduct.imagenes.map((element => (
                                <img src={element} className='imagenIndividual'/>    
                            )))
                            }
                        </div>
                        <div className='imagenPrincipalProduct'>
                            <img src={arrayProduct.imagenes[0]}/>
                        </div>
                    </div>
                    <div className='informacionProducto'>
                        <Typography variant='h6' style={{fontWeight:'bold'}}>{arrayProduct.nombre}</Typography>
                        <Typography variant='body1' className='marcaProduct'>Marca: {arrayProduct.marca}</Typography>
                        <div className="calificacionE">
                            <label className={arrayProduct.calificacion>1?'radio1A':'radio1'}>★</label>
                            <label className={arrayProduct.calificacion>2?'radio1A':'radio1'}>★</label>
                            <label className={arrayProduct.calificacion>3?'radio1A':'radio1'}>★</label>
                            <label className={arrayProduct.calificacion>4?'radio1A':'radio1'}>★</label>
                            <label className={arrayProduct.calificacion>=5?'radio1A':'radio1'}>★</label>
                            <label className='numeroCalificacionD'>{arrayProduct.calificacion}</label>
                        </div>
                        <hr/>
                        <Typography variant='body1' sx={{mb:2}}>Precio: 
                        <label className='labelPrecio'>  ${Intl.NumberFormat('es-DE').format((arrayProduct.precio).toFixed(0))}</label>
                        <label className='envioGratis'>Envio GRATIS.</label>
                        <label className='detallePrecio'> Detalles</label></Typography>
                        <Typography variant='body1'>Hasta 
                            <label className='envioGratis'>18 meses sin intereses</label>
                            de ${Intl.NumberFormat('es-DE').format((arrayProduct.precio/18).toFixed(0))}.
                            <label className='detallePrecio'> Ver mensuales</label>
                        </Typography>
                        <Typography variant='body1' sx={{mb:2}}>
                            <label className='detallePrecio'> Solicita tu tarjeta Amazon Recargable </label>
                            y obtén $10.000 de descuento en tu primera compra mayor a $50.000
                        </Typography>
                        <Typography variant='body1' sx={{mb:1}}> Color: 
                            <label className='envioGratis'>{arrayProduct.color}</label>
                        </Typography>
                        <Typography variant='body1' sx={{mb:1}}> Tipo: 
                            <label className='envioGratis'>{arrayProduct.tipo}</label>
                        </Typography>
                        <hr/>
                        <Typography variant='h5' style={{fontWeight:'bold'}} sx={{mb:1, mt:2}}>Acerca de este articulo</Typography>
                        {arrayProduct.acerca.map((element=>(
                            <Typography variant='body1' sx={{mb:1, mt:1}}>-{element}</Typography>
                        )))}
                    </div>
                    <div className='AgregarCarrito'>
                        <label className='labelPrecio mensajeCarrito'>  ${Intl.NumberFormat('es-DE').format(arrayProduct.precio)}</label>
                        <Typography variant='body2' className='envioGratisC' sx={{mb:1, mt:1}}>
                            Envío GRATIS.
                            <label className='detallePrecio'> Detalles</label>
                        </Typography>
                        <Typography variant='body2' className='' sx={{mb:1, mt:1}}>
                            Llega: 
                            <label className='envioGratis'>{formatoFecha(hoy, 'dd/mm/yy',5)} - {formatoFecha(hoy, 'dd/mm/yy',10)}</label>
                        </Typography>
                        <Typography variant='body2' className='mensajeCarrito' sx={{mb:2, mt:1}}>
                            Lo recibiras entre estas fechas 
                        </Typography>
                        <Link to={`/agregado/${arrayProduct.id}`} className='links'>
                            <div className='botonCarrito' onClick={()=>AgregarCarritoD(arrayProduct)}>
                                <div className='iconoCarrito'>
                                    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/shopping-cart--v2.png"/>
                                </div>
                                <label className='textoCarrito'>Agregar al carrito</label>
                            </div>
                        </Link>
                        <Link to="/formulario" className='links'>
                            <div className='botonCarrito botonCarritoS' onClick={()=>AgregarCarritoD(arrayProduct)}>
                                <div className='iconoCarrito'>
                                <img src="https://img.icons8.com/material-outlined/24/FFFFFF/circled-play.png"/>
                                </div>
                                <label className='textoCarrito'>Comprar ahora</label>
                            </div>
                        </Link>
                        <div className='transaccion'>
                            <label className='detallePrecio'> Transacción segura</label>
                        </div>
                    </div>
                </div>:'Espere' 
                }

                {/* Esta es la opcion de productos relacionados */}

                <div className="divRelacionadosPrincipal">
                    <Typography variant="h4" className="TituloRelacionados" sx={{mb:5}}>Productos relacionados con este articulo</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {arrayRelacionado?.map((e=>(
                                <Grid item xs={1} sm={3} md={3} key={e.id}>
                                <Link to={`/detalle/${e.id}`} className='links'>
                                    <Item >
                                        <img className='imagenCategoria imagenCategoriaD' src={e.imagenes[0]}/>
                                        <div className='tituloCategoria'>
                                        <Typography className='textoCategoria textoCategoriaDe' variant='h6' textAlign={'left'} sx={{ m:2 }}>{e.nombre}</Typography>
                                        </div>
                                        <div className="calificacion">
                                            <label className={e.calificacion>1?'radio1A':'radio1'}>★</label>
                                            <label className={e.calificacion>2?'radio1A':'radio1'}>★</label>
                                            <label className={e.calificacion>3?'radio1A':'radio1'}>★</label>
                                            <label className={e.calificacion>4?'radio1A':'radio1'}>★</label>
                                            <label className={e.calificacion>=5?'radio1A':'radio1'}>★</label>
                                            <label className='numeroCalificacion'>{e.calificacion}</label>
                                        </div>
                                        <div className='contenedorPrecio'>
                                            <Typography className='textoCategoria textoCategoriaD' variant='h6' textAlign={'left'} sx={{ m:2 }}>${Intl.NumberFormat('es-DE').format(e.precio)}</Typography>
                                        </div>
                                    </Item>
                                </Link>
                            </Grid>
                            )))
                            }
                        </Grid>
                    </Box>
                    
                </div>
        </div>
    )
}

export default Detalle
