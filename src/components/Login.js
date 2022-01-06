import React, {useState} from 'react';
import {useForm } from '../hooks/useForm';
import {useDispatch} from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {loginEmailPassword, loginGoogle, loginFacebook} from '../actions/actionLogin';
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
import { Link } from "react-router-dom";
import {ImgLogo} from '../styles/NavBarDos.elements'
import { Password } from '@mui/icons-material';

function Login() {

    const dispatch = useDispatch();

    const [ values, handleInputChange, actualizarPassword, reset ] = useForm({
        email: '',
    })

    const [valuesP, setValuesP] = useState({
        passwordP: '',
        showPassword: false,
      });

    const {email} = values;

    
    const {passwordP, showPassword} = valuesP;

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


    

    const handleLogin = (e) => {
       e.preventDefault();
       dispatch(loginEmailPassword(email,passwordP));
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
            <form onSubmit={handleLogin}>
                <div className='contenedor-logo-login'>
                    <Link to="/" className='links-amazon'>
                        <ImgLogo  src='https://res.cloudinary.com/dxnn5sbsz/image/upload/v1641399517/amazonas/amazon-logo-2_f9hwav.png'/>
                    </Link>
                </div>
                <div>
                    
                    <TextField sx={{  width: '100%' }} id="filled-basic" label="Correo" variant="outlined" required 
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        color='warning'
                    />
                </div>
                <FormControl sx={{ mt   : 3, width: '100%' }} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password" color='warning'>Contraseña</InputLabel>
                        <OutlinedInput
                            color='warning'
                            id="outlined-adornment-password"
                            type={valuesP.showPassword ? 'text' : 'password'}
                            value={valuesP.password}
                            name="passwordP"
                            onChange={handleChange('passwordP')}
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
                <Button variant="contained" type="submit" size="large" sx={{ mt   : 3, width: '100%' }} style={{backgroundColor:"#E19C2B"}}>Ingresar    </Button>
                <Typography  variant="h6" align={'center'}  sx={{ mt   : 3 }}>
                    ¿No tienes una cuenta?
                    <Link to="/registro" className='linksRegistrate'>
                        Registrate aquí
                    </Link>
                </Typography>
                <div className='contenedorLogin'>
                    <div className='contenedorGoogle'>
                        <div className="auth__social-networks">
                            <div className="google-btn" onClick={handleGoogle}>
                                <div className="google-icon-wrapper">
                                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                    <div className='contenedorTexto'>
                                        <Typography className='textoAcceso' variant="h5 " align={'right'}>Accede con Google</Typography>
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
                                        <Typography className='textoAcceso' variant="h5 " align={'right'}>Accede con Facebook</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Login;