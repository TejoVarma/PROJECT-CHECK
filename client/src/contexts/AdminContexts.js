import React, { createContext, useEffect, useState } from "react";
import { getCars } from "../utils/adminData";

export const CarList = createContext()

export default function AdminContext({ children }) {

    const [cars, setCars] = useState([]);
    const [preview, setPreview] = useState("");
    
    useEffect(()=>{
        getCars().then(res => {
            setCars(res.result.reverse());
        });
        setPreview("");
    },[]);

    useEffect(() => {
        getCars().then(res => {
            setCars(res.result.reverse());
        });
    }, [cars]);

    useEffect(() => {
        getCars().then(res => {
            setCars(res.result.reverse());
        })
    }, [cars]);

    return <CarList.Provider value={{
        cars: cars,
        addCar: (car) => {
            const updated = [car, ...cars];
            setCars(updated);
        },
        editCarContext: () => {
            const updatedCar = [...cars];
            setCars(updatedCar);
        },
        deleteCarContext: () => {
            const deleteCar = [...cars];
            setCars(deleteCar);
        },
        preview,
        addPreview: (url) => setPreview(url)
    }}>
        {children}
    </CarList.Provider>
}