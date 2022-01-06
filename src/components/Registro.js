import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useForm } from '../hooks/useForm';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {registroEmailPasswordNombre} from '../actions/actionRegister';
import { loginGoogle, loginFacebook } from '../actions/actionLogin';
import {useDispatch} from 'react-redux';
import {TextField, 
    Typography, 
    FormControl, 
    InputLabel, 
    OutlinedInput, 
    InputAdornment, 
    IconButton,
    Button
} from '@mui/material'
import '../styles/style.css'
import '../styles/login.css'

export const Registro = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        nombre: '',
        email: '',
        pass1: '',
        pass2: ''
    });

    const [valuesP, setValuesP] = useState({
        passwordP1: '',
        passwordP2: '',
        showPassword: false,
      });

    const { nombre, email, pass1, pass2 } = formValues;

    const {passwordP1, passwordP2, showPassword} = valuesP;

    const handleChange = (prop) => (event) => {
        setValuesP({ ...valuesP, [prop]: event.target.value });     
      };
    
      const handleClickShowPassword = () => {
        setValuesP({
          ...valuesP,
          showPassword: !valuesP.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    const handleRegistro = (e) => {
        e.preventDefault();
        dispatch(registroEmailPasswordNombre(email,passwordP1,nombre))
    }

    const handleGoogle = () => {
        dispatch(loginGoogle());
    }

    const handleFacebook = () => {
        dispatch(loginFacebook());
   }

    return (
        <div className='contenedorPrincipal'>
        <div className='contenedorForm'>
            <form onSubmit={handleRegistro}>
                <Typography variant="h5" align={'center'} sx={{ mb   : 3 }} className='tituloLogin'>Registrate gratis en FireWork </Typography>

                <TextField sx={{ mb:2 ,width: '100%' }} id="filled-basic" label="Nombre  " variant="outlined" required 
                        type="text"
                        placeholder="Ingrese su nombre"
                        name="nombre"
                        value={nombre}
                        onChange={handleInputChange}
                    />

                <TextField sx={{ mb:2 , width: '100%' }} id="filled-basic" label="Correo" variant="outlined" required 
                        type="email"
                        placeholder="Ingrese su correo"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />

                    <FormControl sx={{ mb   : 3, width: '100%' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={valuesP.showPassword ? 'text' : 'password'}
                                value={valuesP.password}
                                name="passwordP"
                                onChange={handleChange('passwordP1')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {valuesP.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                    </FormControl>

                    <FormControl sx={{ mb   : 3, width: '100%' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={valuesP.showPassword ? 'text' : 'password'}
                                value={valuesP.password}
                                name="passwordP"
                                onChange={handleChange('passwordP2')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {valuesP.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                    </FormControl>

                <Button variant="contained" type="submit" size="large" sx={{ mb   : 3, width: '100%' }} style={{backgroundColor:"#5C7AEA"}}>Registrarse</Button>
                <Typography variant="h6" align={'center'}  sx={{ mb   : 3 }}>
                    ¡Tambien puedes registrarte con Google o Facebook!
                </Typography>
                <div className='contenedorLogin'>
                    <div className='contenedorGoogle'>
                        <div className="auth__social-networks">
                            <div className="google-btn" onClick={handleGoogle}>
                                <div className="google-icon-wrapper">
                                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                    <div className='contenedorTexto'>
                                        <Typography className='textoAcceso' variant="h5 " align={'right'}>Registrate con Google</Typography>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div className='contenedorFacebook'>
                        <div className="auth__social-networks">
                            <div
                                className="google-btn"
                                onClick={handleFacebook}

                            >
                                <div className="google-icon-wrapper">
                                    
                                    <img className="google-icon" src="https://res.cloudinary.com/app-firework1/image/upload/v1640797865/logo/58e919b0eb97430e819064ff_owau9l.png" alt="google button" />
                                    
                                    <div className='contenedorTexto'>
                                        <Typography className='textoAcceso' variant="h5 " align={'right'}>Registrate con Facebook</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
            

        </div>
        </div>
    )
}