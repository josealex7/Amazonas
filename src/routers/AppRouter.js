import React,{useState,useEffect} from "react";
import {
    // HashRouter
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from '../components/Login';
import {Registro} from '../components/Registro';
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import Footer from '../components/Footer';
import HomeUno from "../components/HomeUno";
import NavbarAmazon from "../components/NavbarAmazon";
import Categoria from "../components/Categoria";
import Detalle from "../components/Detalle";
import Carrito from "../components/Carrito";
import Agregado from "../components/Agregado";

export default function AppRouter() {
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user?.uid){
         setIsLoggedIn(true)
        }
        else{
         setIsLoggedIn(false)
        }
        setChecking(false)
    })
}, [setIsLoggedIn,setChecking])

if(checking){
  return(
      <h1>Espere...</h1>
  )
}

  return (
    <Router>
        <NavbarAmazon/>
            <Routes>
                <Route path="/" element={
                            <HomeUno/>
                    } />

                <Route path="/detalle/:id" element={
                            <Detalle/>
                    } />

                <Route path="/carrito" element={
                            <Carrito/>
                    } />

                <Route path="/agregado/:id" element={
                            <Agregado/>
                    } />

                <Route path="/categoria/:id" element={
                            <Categoria/> 
                    } />

                <Route path="/login" element={
                        <PublicRoute isAuthenticated={isLoggedIn}>  
                            <Login/> 
                        </PublicRoute>
                    } />

                <Route path="/registro" element={
                        <PublicRoute isAuthenticated={isLoggedIn}>
                            <Registro/>
                        </PublicRoute>
                    } />

                    
                <Route path="/*" element={
                        <PrivateRoute isAuthenticated={isLoggedIn}>
                            <DashboardRoutes/>
                        </PrivateRoute>
                    }/>
            </Routes>
        <Footer/>
    </Router>
  );
}