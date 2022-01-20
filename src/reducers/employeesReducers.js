import { typesEmpleoyees } from "../types/types";
import Link from 'react-router-dom'

const initialState = {
    employees: [],
    search: ''
}

export const employeesReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesEmpleoyees.register:
            return {
                employees: [action.payload]
            }
        case typesEmpleoyees.list:
            return {
                employees: [...action.payload]
            }
        case typesEmpleoyees.delete:
            return {
                employees: state.employees.filter(emp => emp.id !== action.payload)
            }
        case typesEmpleoyees.update:
            let newArray = [];
            state.employees.forEach(element => {
                if(element.id==action.payload.id){
                    newArray.push(action.payload.updateFields)
                } else {
                    newArray.push(element)
                }
            });
            return {
                employees: state.employees.filter(emp => emp.id !== action.payload)
            }
        case  typesEmpleoyees.search:
            return{
                employees: action.payload
            }
        default:
            return state;
    }
}