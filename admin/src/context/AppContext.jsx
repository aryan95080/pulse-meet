import { createContext } from "react";

export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const currency='₹'

    const calculateAge=(dob)=>{
        const today=new Date();
        const birthDate=new Date(dob);
        let age=today.getFullYear() - birthDate.getFullYear();
        return age;
    }
    const months=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const sloteDateFormate=(slotDate)=>{
    const dateArray=slotDate.split('-')
    return `${dateArray[2]} ${months[Number(dateArray[1]) - 1]} ${dateArray[0] }`;

  }
    const value={
        calculateAge,
        sloteDateFormate,
        currency,
        
    }

    return  (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider