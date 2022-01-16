import {
    Routes, Route,
    Navigate
} from 'react-router-dom';
import Devoluciones from '../components/Devoluciones';
import Usuario from '../components/Usuario';
import {Employees} from '../components/Employees'
import {List}  from '../components/List';
import Formulario from '../components/Formulario';

export const DashboardRoutes = () => {
    return ( 
        <div>
            <Routes>
                <Route path='/devoluciones' element={<Devoluciones/>} />
                <Route path='/usuario' element={<Usuario/>} />
                <Route path='/formulario' element={<Formulario/>} />
                <Route path='*' element={<Navigate to="/usuario"/>} />
            </Routes>
        </div>
    )
}