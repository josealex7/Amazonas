import React, { useState } from 'react'
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
import {registerEmployeeAsync} from '../actions/actionEmployees'
import { useDispatch } from 'react-redux';
import  * as Yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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

const AgregarProducto = () => {

    const MySwal = withReactContent(Swal)

    const dispatch = useDispatch();
    
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

    const [cantidadAcerca, setCantidadAcerca] = useState(1)

    const agregarAcercaArray = () =>{
        let newArray= []
        let elementosAcerca;
        for(let i=0; i<cantidadAcerca;i++){
            if(i==0){
                elementosAcerca = document.getElementById('TextFieldAcerca').value
                newArray.push(elementosAcerca)
            } else {
                let id = 'TextFieldAcerca'+i
                elementosAcerca = document.getElementById(id).value
                if(elementosAcerca!==null && elementosAcerca!==undefined){
                    newArray.push(elementosAcerca)
                }
                
            }
            
        }
        console.log(newArray)
        return newArray
    }

    const handleClickOpen = () => {
        setOpenNew(true);
      };
    
      const handleClose = () => {
        setOpenNew(false);
      };

      const [imagenesArray, setImagenesArray] = useState([])

      const agregarParrafo =()=>{
          let newDiv = document.createElement("div");
          let variableID = 'TextFieldAcerca'+cantidadAcerca
          console.log(variableID)
          newDiv.innerHTML=`
            <textarea  id="${variableID}" class="textAreaCreate" cols="55" rows="6" placeholder="Ingrese la información acerca del producto"></textarea>
          `;
          document.getElementById('ContenedorAcerca').appendChild(newDiv);
        setCantidadAcerca(cantidadAcerca+1)
      }

    const handleFileChangedImg = (e) => {

        const file = e.target.files[0];
        let contenedorDiv = document.getElementById('contenedorTitulosImagenes');
        contenedorDiv.innerHTML+=
        `
        <h4>${file.name}</h4>
        <hr/>
        `;
        fileUpload(file)
            .then(response => {
                let array = formik.initialValues.imagenes
                console.log(array)
                array.push(response)
                console.log(array)
                formik.initialValues.imagenes = array
                console.log(response);
            })
            .catch(error => {
                console.log(error.message);
            })
        }

      const formik = useFormik(
        {
        initialValues: {
            nombre : "",
            marca: "",
            color: "",
            tipo: "",
            calificacion: "",
            precio: "",
            ventas: "",
            regalados: "",
            imagenes:[],
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required()
        }),
        onSubmit: (data) => {
          data['categoria']=seleccionarCategoria();
          data['acerca']=agregarAcercaArray();
          console.log(data)
          dispatch(registerEmployeeAsync(data))
        handleClose()
        MySwal.fire({
            title: 'Buen trabajo',
            html: '¡El producto fue agregado de manera exitosa!',
            icon: 'success'
          })
        },
    })

    return (
        <div>
            <label className='textAgregar' onClick={handleClickOpen} >Agregar nuevo producto</label>
             <Dialog open={openNew} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Nuevo producto tecnologico</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Ingresa la información del producto que se 
                        mostrara en el detalle y sus respectivas imagenes
                        </DialogContentText>
                            <TextField
                                margin="dense"
                                color='warning'
                                name="nombre"
                                label="Nombre"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                            />
                            <TextField
                                color='warning'
                                onChange={formik.handleChange}
                                margin="dense"
                                name="marca"
                                label="Marca"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                margin="dense"
                                onChange={formik.handleChange}
                                name="color"
                                color='warning'
                                label="Color"
                                fullWidth
                                variant="standard"
                                
                            />
                            <TextField
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
                                margin="dense"
                                name="calificacion"
                                label="Calificación"
                                onChange={formik.handleChange}
                                fullWidth
                                color='warning'
                                type='number'
                                variant="standard"
                                
                            />
                            <TextField
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
                                <TextField
                                id="TextFieldAcerca"
                                sx={{mt:2, mb:2}}
                                color='warning'
                                label="Acerca del producto"
                                placeholder='Ingrese la información acerca del producto'
                                multiline
                                rows={4}
                                fullWidth
                                variant="standard"
                                />
                            </div>
                            <Button color='warning' variant='contained' onClick={agregarParrafo} sx={{mt:2,mb:2}}>Agregar Nuevo Campo de Acerca del producto</Button>
                            <hr/>
                            <div id='contenedorTitulosImagenes'>
                                <Typography variant='h5' sx={{mb:2, mt:2}}>Imagenes almacenadas</Typography>
                            </div>
                            <hr/>
                            <label htmlFor="contained-button-file">
                                <Input onChange={handleFileChangedImg} accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button color='warning' variant="contained" component="span" sx={{mt:2, mb:2}}>
                                Subir imagen
                                </Button>
                            </label>
                            <hr/>
                        </DialogContent>
                    <DialogActions>
                        <Button color="success" type='submit' variant="contained" sx={{ m:2 }}>
                            Guardar
                        </Button>
                        <Button color="error" variant="contained" sx={{ m:2 }} onClick={handleClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default AgregarProducto
