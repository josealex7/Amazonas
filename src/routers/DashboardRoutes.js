import {
    Routes, Route,
    Navigate
} from 'react-router-dom';
import Devoluciones from '../components/Devoluciones';
import Usuario from '../components/Usuario';

export const DashboardRoutes = () => {
    return ( 
        <div>
            <Routes>
                <Route path='/devoluciones' element={<Devoluciones/>} />
                <Route path='/usuario' element={<Usuario/>} />
                <Route path='*' element={<Navigate to="/usuario"/>} />
            </Routes>
        </div>
    )
}