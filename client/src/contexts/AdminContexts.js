import React, { createContext, useEffect, useState } from "react";
import { getCars } from "../utils/adminData";

export const CarList = createContext()

export default function AdminContext({children}) {

    const [cars, setCars] = useState([]);
    const [preview, setPreview] = useState("");
    useEffect(() => {
        getCars().then(res => {
            setCars(res.result.reverse());
        });
        setPreview("")
        
    }, [])

    return <CarList.Provider value={{
        cars : cars,
        addCar : (car) => {
            const updated = [car, ...cars];
            setCars(updated);
        },
        editCarContext : (car) => {
            const updatedCar = [car ,...cars];
            setCars(updatedCar);
        },
        preview,
        addPreview : (url) => setPreview(url)
    }}>
        {children}
    </CarList.Provider>
}