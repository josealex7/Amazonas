import {types} from '../types/types';
import Cookies from 'js-cookie';

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            Cookies.set('User', JSON.stringify([{
                "name":action.payload.displayname,
                "uid":action.payload.id
            }]))
        return{
            id: action.payload.id,
            name: action.payload.displayname
        }

        case types.logout:
            return {}

        default:
          return state;
    }
}