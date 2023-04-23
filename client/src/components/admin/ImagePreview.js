import React, { useContext } from "react";
import { CarList } from "../../contexts/AdminContexts";
import '../../styles/Admin.css'

export default function ImagePreview() {

    const {preview} = useContext(CarList);

    return <>
        <div id="preview-img-container-admin">
            <img src={preview} alt="preview" />
        </div>
    </>
    
}