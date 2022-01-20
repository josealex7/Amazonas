import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { 
    MenuItem, 
    Typography, 
    Button, 
    TextField, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText,
    DialogTitle 
} from '@mui/material'
import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import { fileUpload } from '../helpers/FileUpload';
import { useDispatch } from 'react-redux';
import { updateEmployessAsync } from '../actions/actionEmployees';
import  * as Yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom"
import '../styles/agregarProducto.css'


const Input = styled('input')({
    display: 'none',
  });

const Categorias = [
    {
    value: 'computo',
    label: 'Computo y Tabletas',
    },
    {
    value: 'television',
    label: 'Televisión y Video',
    },
    {
    value: 'audio',
    label: 'Audio y Sonido',
    },
  ];

const EditarProducto = (arrayProduct) => {

    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)

    const { id } = useParams();

    const dispatch = useDispatch();

    const {prop} = arrayProduct
    
    const [categoria, setCategoria] = React.useState('computo');

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };

    const [openNew, setOpenNew] = React.useState(false);
    
    const seleccionarCategoria = () =>{
        if(categoria=='computo'){
            return ['computo','tabletas']
        } else if (categoria=='television'){
            return ['television','video']
        } else {
            return ['audio','sonido']
        }
    }

    const agregarAcercaArray = () =>{
        let newArray= []
        let elementosAcerca;
        for(let i=0; i<prop.acerca.length;i++){
            let id = 'TextFieldAcerca'+i
            elementosAcerca = document.getElementById(id).value
            if(elementosAcerca!==null && elementosAcerca!==undefined){
                newArray.push(elementosAcerca)
            }
        }
        return newArray
    }

    const handleClickOpen = () => {
        setOpenNew(true);
    };
    
    const handleClose = () => {
        setOpenNew(false);
    };

    const eliminarImagen = (url) =>{
        let newArray = formik.initialValues.imagenes
        formik.initialValues.imagenes = newArray.filter(element => url!==element)
        ocultarImagenes(url)
    }

    const ocultarImagenes = (url) =>{
        let divOcultar = document.getElementById(url+'img')
        divOcultar.setAttribute('class','displayNone');
        divOcultar.innerHTML=''
    }

    const handleFileChangedImg = (e) => {
        const file = e.target.files[0];
        let contenedorDiv = document.getElementById('contenedorTitulosImagenes');
        fileUpload(file)
            .then(response => {
                let array = formik.initialValues.imagenes
                array.push(response)
                formik.initialValues.imagenes = array
                    contenedorDiv.innerHTML+=
                    `
                    <div className='contenedirImagenEditar'>
                        <img className='imagenEditar' src='${response} '/>
                    </div>
                    `                
            })
            .catch(error => {
                console.log(error.message);
            })
        }

      const formik = useFormik(
        {
        initialValues: {
            nombre : prop.nombre,
            marca: prop.marca,
            color: prop.color,
            tipo: prop.tipo,
            calificacion: prop.calificacion,
            precio: prop.precio,
            ventas: prop.ventas,
            regalados: prop.regalados,
            imagenes:prop.imagenes,
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required(),
            marca: Yup.string().required(),
            color: Yup.string().required(),
            tipo: Yup.string().required()
        }),
        onSubmit: (data) => {
          data['categoria']=seleccionarCategoria();
          data['acerca']=agregarAcercaArray();
          dispatch(updateEmployessAsync(id,data))
          handleClose()
          MySwal.fire({
            title: 'Buen trabajo',
            html: '¡El producto fue actualizado de manera exitosa!',
            icon: 'success'
          }).then(
            navigate('/')
          )
          

        },
    })

    return (
        <div>
            <Button onClick={handleClickOpen} variant='contained' color='success' fullWidth sx={{mb:1, mt:1}}>Editar</Button>
             <Dialog open={openNew} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Editar este Producto</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Ingresa la información que desea actualizar y haga clic en 
                        guardar para mantener los cambios
                        </DialogContentText>
                            <TextField
                                defaultValue={prop.nombre}
                                margin="dense"
                                color='warning'
                                name="nombre"
                                label="Nombre"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                            />
                            <TextField
                                defaultValue={prop.marca}
                                color='warning'
                                onChange={formik.handleChange}
                                margin="dense"
                                name="marca"
                                label="Marca"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                defaultValue={prop.color}
                                margin="dense"
                                onChange={formik.handleChange}
                                name="color"
                                color='warning'
                                label="Color"
                                fullWidth
                                variant="standard"
                                
                            />
                            <TextField
                                defaultValue={prop.tipo}
                                margin="dense"
                                name="tipo"
                                color='warning'
                                label="Tipo"
                                onChange={formik.handleChange}
                                fullWidth
                                variant="standard"
                                
                            />
                            <TextField
                                name='categoria'
                                color='warning'
                                id="outlined-select-currency"
                                select
                                value={categoria}
                                onChange={handleChangeCategoria}
                                fullWidth
                                helperText="Seleccione la categoria a la que pertenece el producto"
                                sx={{mt:2}}
                                >
                                {Categorias.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                defaultValue={prop.calificacion}
                                margin="dense"
                                name="calificacion"
                                label="Calificación"
                                onChange={formik.handleChange}
                                fullWidth
                                color='warning'
                                variant="standard"
                            />
                            <TextField
                                defaultValue={prop.precio}
                                margin="dense"
                                name="precio"
                                label="Precio"
                                fullWidth
                                color='warning'
                                onChange={formik.handleChange}
                                type='number'
                                variant="standard"
                                
                            />
                            <TextField
                                defaultValue={prop.ventas}
                                margin="dense"
                                name="ventas"
                                label="Cantidad de Ventas"
                                fullWidth
                                type='number'
                                onChange={formik.handleChange}
                                variant="standard"
                                color='warning'
                                
                            />
                            <TextField
                                defaultValue={prop.regalados}
                                color='warning'
                                margin="dense"
                                name="regalados"
                                onChange={formik.handleChange}
                                label="Cantidad de veces que este producto fue Regalado"
                                fullWidth
                                type='number'
                                variant="standard"
                                
                            />
                            
                            <div className='ContenedorAcerca' id='ContenedorAcerca'>
                            <Typography variant='h5' sx={{mt:2}}>Acerca del producto</Typography>
                                {prop.acerca.map((e)=>{
                                    return (
                                        <TextField
                                        defaultValue={e}
                                        id={'TextFieldAcerca'+prop.acerca.indexOf(e)}
                                        sx={{mt:2, mb:2}}
                                        color='warning'
                                        placeholder='Ingrese la información acerca del producto'
                                        multiline
                                        rows={4}
                                        fullWidth
                                        variant="standard"
                                        />
                                    )
                                })}
                            </div>
                            <hr/>
                            <div id='contenedorTitulosImagenes' className='contenedorTituloImagenes'>
                                <Typography variant='h5' sx={{mb:2, mt:2}} textAlign={'left'}>Imagenes almacenadas</Typography>
                                {prop.imagenes.map((e)=>{
                                    return (
                                        <div className='contenedirImagenEditar' id={e+'img'}>
                                            <img className='imagenEditar' src={e}/>
                                            <Button onClick={()=>eliminarImagen(e)} color='error' variant='contained' className='botonEliminarImagen'>Eliminar</Button>
                                        </div>
                                    )
                                })}
                            </div>
                            <hr/>
                            <label htmlFor="contained-button-file">
                                <Input onChange={handleFileChangedImg} accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button variant="contained" component="span" sx={{mt:2, mb:2}}>
                                    Subir imagen
                                </Button>
                            </label>
                            <hr/>
                        </DialogContent>
                    <DialogActions>
                        <Button color="success" type='submit' variant="contained" sx={{ m:2 }} 
                        // onClick={handleClose}
                        >Actualizar</Button>
                        <Button color="error" variant="contained" sx={{ m:2 }} onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default EditarProducto;
