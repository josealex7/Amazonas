import React, {useEffect, useState} from 'react'
import { getAuth } from "firebase/auth";



const User = () => {

    const auth = getAuth();
    const user = auth.currentUser;

    const [value, setValue] = useState({});

    const datosUser = () =>{
        if (user !== null) {
            
                setValue({
                    "name":user.displayName,
                    "email":user.email,
                    "photoURL":user.photoURL,
                    "emailVerified":user.emailVerified,
                    "uid":user.uid
                })
        }
    }

    useEffect(() => {
        datosUser()
    }, [])

    return value
}

export default User
