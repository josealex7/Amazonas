import { typesCategory } from "../types/types"

const initialState ={
    num:1
}

export const categoryReducer =(state=initialState, action)=>{
    
    switch(action.type){
        case typesCategory.todo:
            return {
                num: 1
            }
        case typesCategory.vendidos:
            return {
                num: 2
            }
        case typesCategory.regalados:
            return {
                num: 3
            }
        case typesCategory.computo:
            return {
                num: 4
            }
        case typesCategory.video:
            return {
                num: 5
            }
        case typesCategory.audio:
            return {
                num: 6
            }
        default:
            return state
    }
}