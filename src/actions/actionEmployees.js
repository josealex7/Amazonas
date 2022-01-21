import  {typesEmpleoyees} from '../types/types';
import { db } from "../firebase/firebaseConfig";
import { addDoc,collection,getDocs,query,where,doc,deleteDoc, updateDoc,} from "@firebase/firestore";

export const searchAsyn = (categoria) => {

    return async (dispatch) => {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productos = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            if(Array.isArray(categoria)){
            if(data.categoria[0]==categoria[0]){
                data['id']=doc.id
                productos.push({
                    ...data
                })
            }} else {
                let name = data.nombre.toLowerCase()
                if(name.includes(categoria.toLowerCase())){
                    data['id']=doc.id
                    productos.push({
                    ...data
                    })
                }
            }
        });
        dispatch(searchSync(productos))
    }
}


export const searchSync = (employee) => {
    return{
        type: typesEmpleoyees.search,
        payload: employee
    }
}


//DELETE

export const deleteEmployeeAsync = (id) =>{
    return async(dispatch) => {
        deleteDoc(doc(db, 'productos', id))
        dispatch(deleteSync(id))
        dispatch(listEmployeeAsync())
    }
}

export const deleteSync = (id) => {
    return{
        type: typesEmpleoyees.delete,
        payload: id
    }
}

//Update

export const updateEmployessAsync = (id, updateFields)=>{
    return async(dispatch)=>{
        updateDoc(doc(db, "productos", id), updateFields);
        dispatch(updateSync(id, updateFields))
        dispatch(listEmployeeAsync())
    }
}

export const updateSync = (id, updateFields) => {
    return{
        type: typesEmpleoyees.delete,
        payload: {
            id,
            updateFields
        }
    }
}

//READ

export const listEmployeeAsync = () => {
    return async (dispatch) => {

        const querySnapshot = await getDocs(collection(db, "productos"));
        const productos = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            data['id']=doc.id
            productos.push({
                ...data
            })
        });
        dispatch(listSync(productos));
    }
}

export const listSync = (employees) => {
    return {
        type: typesEmpleoyees.list,
        payload: employees
    }
}


//CREATE

export const registerEmployeeAsync = (newEmployee) => {
    
    return(dispatch) => {
        addDoc(collection(db,"productos"),newEmployee)
        .then(resp => {
            dispatch(registerEmployeeSync(newEmployee))
            dispatch(listEmployeeAsync())
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const registerEmployeeSync = (employee) => {
    return{
        type: typesEmpleoyees.register,
        payload: employee
    }

}