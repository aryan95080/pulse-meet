import { createContext, useState } from "react";

export const AdminContext=createContext()


const AdminContextProvider=(props)=>{
    const [atoken,setAtoken]=useState('')
    const backendUrl=import.meta.VITE_BACKEND_URL

    const value={
        atoken,setAtoken,backendUrl,
    }
    return  (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider