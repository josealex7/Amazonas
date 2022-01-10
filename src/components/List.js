import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployeeAsync } from '../actions/actionEmployees';
import { useData } from '../hooks/useData';
import { obtenerDatos } from "../localStorage/localStorage";
import { experimentalStyled as styled ,Typography, Grid, Paper, Box } from '@mui/material';
import {Link} from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
  }));

export const List = () => {

    const storageState = obtenerDatos();

    const [arrayProduct, setarrayProduct] = useState(null)

    const dispatch = useDispatch();

    const { employees } = useSelector(store => store.employee);

    const [masVendidos, masRegalados, computoTabletas, televisionVideo, audioSonido] = useData();
    
    

    const devolverNew = () =>{
        let newArray=[]
        if(storageState.numero==1){
            setarrayProduct(employees)
        } else if(storageState.numero==2){
            newArray = masVendidos()
        } else if(storageState.numero==3){
            newArray = masRegalados()
        } else if(storageState.numero==4){
            newArray = computoTabletas()
        } else if(storageState.numero==5){
            newArray = televisionVideo()
        } else if(storageState.numero==6){
            newArray = audioSonido()
        }
        setarrayProduct(newArray)
    }

    useEffect(() => {
        devolverNew()
    }, [])



    return (
        <div>
            {/* <table className="table text-center mt-3">

                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((e, i) => (
                            <tr key={i}>
                                <td><img src={e.url} width="50" height="50" /></td>
                                <td>{e.descripcion}</td>
                                <td>{e.nombre}</td>
                                <td>{e.correo}</td>
                                <input
                                    value="Delete"
                                    type="button"
                                    className="btn btn-outline-dark"
                                    onClick={() => dispatch(deleteEmployeeAsync(e.correo))}
                                />
                            </tr>
                        ))
                    }
                </tbody>
            </table> */}

            <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                        arrayProduct?.map((e)=>(
                        <Grid item xs={2} sm={4} md={4}>
                            <Link to="/employees" className='links'>
                                <Item>
                                    <img className='imagenCategoria' src={e.imagenes[0]}/>
                                    <Typography className='textoCategoria' variant='h6' textAlign={'left'} sx={{ mb:3 }}>{e.nombre}</Typography>
                                </Item>
                            </Link>
                        </Grid>
                        ))
                        }
                    </Grid>
            </Box>

            <h1>Productos</h1>
            <div>
                
            </div>
        </div>
    )
}