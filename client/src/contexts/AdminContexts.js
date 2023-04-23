import React, { createContext, useEffect, useState } from "react";
import { getCars } from "../utils/adminData";

export const CarList = createContext()

export default function AdminContext({children}) {

    const [cars, setCars] = useState([]);
    const [deleteCars,setDeleteCars] = useState([]);
    const [editCars, setEditCars] = useState([]);
    const [preview, setPreview] = useState("");
    useEffect(() => {
        getCars().then(res => {
            setCars(res.result.reverse());
        });
        setPreview("")
        
    }, []);

    useEffect(()=>{
        getCars().then(res=>{
            setEditCars(res.result.reverse());
        })
    },[]);

    useEffect(()=>{
        getCars().then(res=>{
            setDeleteCars(res.result.reverse());
        })
    },[])

    return <CarList.Provider value={{
        cars : cars,
        addCar : (car) => {
            const updated = [car, ...cars];
            setCars(updated);
        },
        editCarContext : () => {
            const updatedCar = [...editCars];
            setCars(updatedCar);
        },
        deleteCarContext : ()=>{
            const deleteCar = [...deleteCars];
            setCars(deleteCar);
        },
        preview,
        addPreview : (url) => setPreview(url)
    }}>
        {children}
    </CarList.Provider>
}