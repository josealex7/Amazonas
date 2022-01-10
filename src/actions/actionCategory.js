import { typesCategory } from "../types/types";

export const  actionTodo=()=>{
    return{
        type: typesCategory.todo,
        payload: 1
    }
}

export const  actionVendidos=()=>{
    return{
        type: typesCategory.vendidos,
        payload: 2
    }
}

export const  actionRegalados=()=>{
    return{
        type: typesCategory.regalados,
        payload: 3
    }
}

export const  actionComputo=()=>{
    return{
        type: typesCategory.computo,
        payload: 4
    }
}

export const actionVideo = ()=>{
    return{
        type: typesCategory.video,
        payload: 5
    }
}

export const actionAudio = ()=>{
    return{
        type: typesCategory.audio,
        payload: 6
    }
}