import { Button, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'
import { ImgLogo } from '../styles/NavBarDos.elements'
import '../styles/formulario.css'
import { useFormik } from 'formik';
import User from '../hooks/User';
import { AgregarCompraAsync } from '../actions/actionCompra';
import { useDispatch, useSelector } from 'react-redux';
import { VaciarCarrito } from '../actions/actionCarrito'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom"


const Mes = [
    {
      value: '2022',
      label: '2022',
    },
    {
      value: '2023',
      label: '2023',
    },
    {
      value: '2024',
      label: '2024',
    },
    {
      value: '2025',
      label: '2025',
    },
    {
      value: '2026',
      label: '2026',
    },
    {
     value: '2027',
     label: '2027',
    },
    {
     value: '2028',
     label: '2028',
    },
    {
     value: '2029',
     label: '2029',
    },{
      value: '2030',
      label: '2030',
    }
  ];

const Numero = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
    {
      value: '4',
      label: '4',
    },
    {
      value: '5',
      label: '5',
    },
    {
     value: '6',
     label: '6',
    },
    {
     value: '7',
     label: '7',
    },
    {
     value: '8',
     label: '8',
    },{
      value: '9',
      label: '9',
    },
    {
      value: '10',
      label: '10',
    },
    {
      value: '11',
      label: '11',
    },
    {
      value: '12',
      label: '12',
    }
  ];

const currencies = [
    {
      value: 'Colombia',
      label: 'Colombia',
    },
    {
      value: 'Estados Unidos',
      label: 'Estados Unidos',
    },
    {
      value: 'Mexico',
      label: 'Mexico',
    },
    {
      value: 'Brasil',
      label: 'Brasil',
    },
  ];

const Formulario = () => {

    const navigate = useNavigate();

    const useUser = User();

    const dispatch = useDispatch();

    const { carrito } = useSelector(store => store.carrito);

    const [currency, setCurrency] = React.useState('Colombia');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };    

    const [numeros, setNumeros] = React.useState('1');

    const handleChangeNumero = (event) => {
        setNumeros(event.target.value);
    };

    const hoy = new Date();

    function formatoFecha(fecha, formato) {
      const map = {
          dd: fecha.getDate(),
          mm: fecha.getMonth() + 1,
          yy: fecha.getFullYear().toString().slice(-2),
          yyyy: fecha.getFullYear()
      }
  
      return formato.replace(/dd|mm|yy|yyy/gi, matched => map[matched])
  }

    const [id,  setId] = React.useState(useUser.uid)

    const [mes, setMes] = React.useState('2022');

    const Subtotal = () =>{
      let subtotal=0;
      carrito?.forEach(element => {
         subtotal += Number(element.cantidad)*Number(element.precio)
      });
      return Intl.NumberFormat('es-DE').format(subtotal)
  }

    const handleChangeMes = (event) => {
        setMes(event.target.value);
    };
    
    const formik = useFormik(
      {
      initialValues: {
          detalleCompra : carrito,
          nombre: "",
          direccion1: "",
          direccion2: "",
          ciudad: "",
          region: "",
          codigoPostal: "",
          telefono: "",
          numeroTarjeta: "",
          nombreTarjeta: "",
      },
      onSubmit: (data) => {
        
        data['userId']=useUser.uid;
        data['pais']=currency;
        data['fechaVenMes']=numeros;
        data['fechaVenAnio']=mes;
        data['fechaCompra']=formatoFecha(hoy, 'dd/mm/yy');
        data['valorCompra']=Subtotal()
          
        dispatch(AgregarCompraAsync(data))
        .then(resp => {
          dispatch(VaciarCarrito())
            Swal.fire(
              'Compra realizada!',
              'La compra se ha realizado de manera exitosa.',
              'success'
            ).then(
                navigate('/devoluciones')
            )
          })
      },

  })

    return (
        <div className='FormularioPago'>
            <div className='subFormularioPago'>
              <form className="form-group" onSubmit={formik.handleSubmit}>
                  <Typography variant='h4' sx={{mb:2}}>Seleccionar una dirección de envío</Typography>
                  <Typography variant='body2' sx={{mb:2}}>Escribe una dirección de envío para este pedido. Indica también si la dirección de facturación es la misma que la dirección de envío introducida. Cuando hayas terminado, haz clic en el botón "Siguiente".  Si quieres que los productos se envíen a más de una dirección, haz clic en "Añadir otra dirección" para añadir otra dirección</Typography>
                  <hr/>
                  <div className='divformularios'>
                  <Typography variant='h5' className='NegrillaF' sx={{mb:2, mt:2}}>Agregar una nueva dirección</Typography>
                  <Typography variant='body2' className='NegrillaF' sx={{mb:1}}>País o región</Typography>
                  <TextField
                      name='pais'
                      color='warning'
                      id="outlined-select-currency"
                      select
                      value={currency}
                      onChange={handleChange}
                      fullWidth
                      sx={{mb:2}}
                      >
                      {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                          {option.label}
                          </MenuItem>
                      ))}
                      </TextField>
                      <Typography variant='body2' className='NegrillaF' sx={{mb:1}}>Nombre completo (Nombre y apellidos)</Typography>
                      <TextField required name='nombre' onChange={formik.handleChange} color='warning' id="outlined-basic" variant="outlined" fullWidth sx={{mb:2}}/>
                      <Typography variant='body2' className='NegrillaF' sx={{mb:1}}>Dirección</Typography>
                      <TextField required name='direccion1' onChange={formik.handleChange} color='warning' id="outlined-basic" variant="outlined" placeholder='Dirección, apartado postal, nombre de la empresa, c/o' sx={{mb:2}} fullWidth/>
                      <TextField required name='direccion2' onChange={formik.handleChange} color='warning' id="outlined-basic" variant="outlined" placeholder='Departamento, suite, unidad, edificio, piso, etc' sx={{mb:2}} fullWidth/>
                      <Typography  variant='body2' className='NegrillaF' sx={{mb:1}}>Ciudad</Typography>
                      <TextField required name='ciudad' onChange={formik.handleChange} color='warning' id="outlined-basic" variant="outlined" sx={{mb:2}} fullWidth/>
                      <Typography variant='body2' className='NegrillaF' sx={{mb:1}}>Estado / Provincia / Región</Typography>
                      <TextField required name='region' onChange={formik.handleChange} color='warning' id="outlined-basic" variant="outlined" sx={{mb:2}} fullWidth/>
                      <Typography variant='body2' className='NegrillaF' sx={{mb:1}} >Codigo postal</Typography>
                      <TextField required name='codigoPostal' onChange={formik.handleChange} type='number' color='warning' id="outlined-basic" variant="outlined" sx={{mb:2}} fullWidth/>
                      <Typography variant='body2' className='NegrillaF' sx={{mb:1}} >Número de telefono</Typography>
                      <TextField required name='telefono' onChange={formik.handleChange} type='number' color='warning' id="outlined-basic" variant="outlined" sx={{mb:2}} fullWidth/>
                      <label>Se puede utilizar para ayudar a la entrega</label>
                  </div>
                  <hr/>
                  <Typography variant='h4' sx={{mb:2, mt:3}}>Selecciona un método de pago</Typography>
                  <div>
                      <div>
                      <Typography variant='body1'>Especifica a continuación cómo te gustaría realizar el pago y lo guardaremos como opción.</Typography>
                      </div>
                  </div>
                  <Typography variant='h6' className='NegrillaF' sx={{mb:2, mt:2}}>Agregar un método de pago</Typography>
                  <hr/>
                  <div className='contenedorFormularioPago'>
                      <div className='divformularios'>
                          <Typography variant='body1' className='NegrillaF' sx={{mb:2, mt:2}}>Tarjetas de crédito o débito</Typography>
                          <Typography variant='body2' sx={{mb:2, mt:2}}>Amazon acepta las principales tarjetas de crédito y débito.</Typography>
                          <div>
                              <div>
                              <TextField required name='numeroTarjeta' onChange={formik.handleChange} fullWidth color='warning' sx={{mb:2}} id="outlined-basic" label="Número de tarjeta" variant="outlined" />
                              <TextField required name='nombreTarjeta' onChange={formik.handleChange} fullWidth color='warning' sx={{mb:2}} id="outlined-basic" label="Nombre en la tarjeta" variant="outlined" />
                              <Typography variant='body1'>Fecha de vencimiento</Typography>
                              <Typography variant='body2' className='NegrillaF' sx={{mt:1,mb:1}} >Mes</Typography>
                              <TextField
                                  name='fechaVenMes'
                                  color='warning'
                                  id="outlined-select-currency"
                                  select
                                  value={numeros}
                                  onChange={handleChangeNumero}
                                  fullWidth
                                  sx={{mb:2}}
                                  >
                                  {Numero.map((option) => (
                                      <MenuItem key={option.value} value={option.value} onChange={formik.handleChange}>
                                      {option.label}
                                      
                                      </MenuItem>
                                  ))}
                                  </TextField>
                              <Typography variant='body2' className='NegrillaF' sx={{mb:1}} >Año</Typography>
                              <TextField
                                  name='fechaVenAnio'
                                  color='warning'
                                  id="outlined-select-currency"
                                  select
                                  value={mes}
                                  onChange={handleChangeMes}
                                  fullWidth
                                  sx={{mb:2}}
                                  >
                                  {Mes.map((option) => (
                                      <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                                      </MenuItem>
                                  ))}
                                  </TextField>
                              <Typography color='error' variant='body2' className='NegrillaF' sx={{mb:2, mt:1}} >Solamente haz clic en pagar si estas seguro de la información que ingresaste</Typography>
                              <Button variant='contained' value="Save" type="submit" fullWidth color='warning'>Realizar pago</Button>
                              </div>
                          </div>
                      </div>
                      <div className='divformularios2'>
                          <img className='imagenPagos' src='https://res.cloudinary.com/dxnn5sbsz/image/upload/v1642220926/amazonas/tarjetas_ajx7jk.png' />
                      </div>
                  </div>
              </form>
            </div>
        </div>
    )
}

export default Formulario
