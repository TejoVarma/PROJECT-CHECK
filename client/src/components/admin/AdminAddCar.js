import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarList } from "../../contexts/AdminContexts";
import { addNewCar } from "../../utils/adminData";
import AdminHeader from "./AdminHeader";
import ImagePreview from "./ImagePreview";

export default function AdminAddCar() {
    const navigate = useNavigate();
    const {addCar, addPreview, preview} = useContext(CarList);

    // const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        carname: "",
        type: "",
        model: "",
        mileage: "",
        perkm: "",
        availablefrom: "",
        availabletill: "",
        description: "",
        cardetails: "",
        details: ""
    });

    function formValidation(e) {
        e.preventDefault();
        // setLoader(true);

        const car = new FormData(e.target);
        addNewCar(car)
        .then(res => {
            if(res.status === "Success") {
                addCar(res.result);
                addPreview("");
                setFormData({
                    carname: "",
                    type: "",
                    model: "",
                    mileage: "",
                    perkm: "",
                    availablefrom: "",
                    availabletill: "",
                    description: "",
                    cardetails: "",
                    details: ""
                });
                // setLoader(false);
                navigate("/admin")
            } else {
                // setLoader(false);
                alert("Failed to add car, try again...")
            }
            
        })
    }
    return <>
        <AdminHeader/>
        <div className="add-car-body">
            <div className="add-car-heading-admin"><h2>Add Car Details</h2></div>
            <div className="form-container-admin">
                <form onSubmit={formValidation}>
                    <div className="sections-admin">
                        <div className="left-section-admin">
                            <div className="field-container-admin">
                                <label className="labels-admin" htmlFor="carname-admin">Car Name</label>
                                <input type={"text"} id="carname-admin" name="carname" placeholder="Name of the car" value={formData.carname} maxLength = {15} required onChange={(e) => {
                                    setFormData(data => {
                                        return {
                                            ...data,
                                            carname: e.target.value
                                        }
                                    })
                                }} />
                            </div>
                            <div className="field-container-admin flex-admin">
                                <div className="flex-boxes-admin">
                                    <label className="labels-admin" htmlFor="type-admin">Type</label>
                                    <select name="type" id="type-admin" required onChange={(e) => {
                                        setFormData(data => {
                                            return {
                                                ...data,
                                                type: e.target.value
                                            }
                                        })
                                    }}>
                                        <option value="petrol">petrol</option>
                                        <option value="diesel">diesel</option>
                                        <option value="ev">ev</option>
                                    </select>
                                </div>
                                <div className="flex-boxes-admin">
                                    <label className="labels-admin" htmlFor="model-admin">Model</label>
                                    <select name="model" id="model-admin" required onChange={(e) => {
                                        setFormData(data => {
                                            return {
                                                ...data,
                                                model: e.target.value
                                            }
                                        })
                                    }}>
                                        <option value="xuv">xuv</option>
                                        <option value="suv">suv</option>
                                        <option value="sedan">sedan</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field-container-admin flex-admin">
                                <div className="flex-boxes-admin">
                                    <label className="labels-admin" htmlFor="mileage-admin">Mileage</label>
                                    <input type={"number"} id="mileage-admin" name="mileage" placeholder="KM/L" value={formData.mileage} required onChange={(e)=>{
                                        setFormData(data=>{
                                            return {
                                                ...data,
                                                mileage : e.target.value
                                            }
                                        })
                                    }}/>
                                </div>
                                <div className="flex-boxes-admin">
                                    <label className="labels-admin" htmlFor="perkm-admin">PerKm</label>
                                    <input type={"number"} id="perkm-admin" name="perkm" placeholder="0000" value={formData.perkm} required onChange={(e)=>{
                                        setFormData(data => {
                                            return {
                                                ...data,
                                                perkm : e.target.value
                                            }
                                        });
                                    }}/>
                                </div>
                            </div>
                            <div className="field-container-admin flex-admin">
                                <div className="flex-boxes-admin">
                                    <label className="labels-admin" htmlFor="availablefrom-admin">Available From</label>
                                    <input type={'date'} id="availablefrom-admin" name="availablefrom" placeholder="DD MM YYYY" value={formData.availablefrom} required onChange={(e) => {
                                        setFormData(data => {
                                            return {
                                                ...data,
                                                availablefrom: e.target.value
                                            }
                                        })
                                    }} />
                                </div>
                                <div className="flex-boxes-admin">
                                    <label className="labels-admin" htmlFor="availabletill-admin">Available Till</label>
                                    <input type={'date'} id="availabletill-admin" name="availabletill" placeholder="DD MM YYYY" value={formData.availabletill} required onChange={(e) => {
                                        setFormData(data => {
                                            return {
                                                ...data,
                                                availabletill: e.target.value
                                            }
                                        })
                                    }} />
                                </div>
                            </div>
                            <div className="field-container-admin">
                                <label className="labels-admin" htmlFor="description-admin">Description</label>
                                <textarea rows="5" cols="60" name="description" id="description-admin" placeholder="Description" value={formData.description} required onChange={(e) => {
                                    setFormData(data => {
                                        return {
                                            ...data,
                                            description: e.target.value
                                        }
                                })}}></textarea>
                            </div>
                        </div>
                        <div className="right-section-admin">
                            <div className="field-container-admin">
                                <label className="labels-admin" htmlFor="file-admin">Image</label>
                                <input type={"file"} id="file-admin" name="image" accept="image/*" required onChange={(e) => {
                                    addPreview(URL.createObjectURL(e.target.files[0]));
                                    setFormData(data => {
                                        return {
                                            ...data,
                                            image: e.target.files[0]
                                        }
                                    })
                                }} />
                            </div>
                            <div id="preview-container">
                                {preview ? <ImagePreview /> : null}
                            </div>
                            <div className="field-container-admin">
                                <label className="labels-admin" htmlFor="cardetails-admin">Car Details</label>
                                <textarea rows="5" cols="60" name="cardetails" id="cardetails-admin" placeholder="Car Details" value={formData.cardetails} required onChange={(e) => {
                                    setFormData(data => {
                                        return {
                                            ...data,
                                            cardetails: e.target.value
                                        }
                                })}}></textarea>
                            </div>
                            <div className="field-container-admin">
                                <label className="labels-admin" htmlFor="details-admin">Details</label>
                                <textarea rows="5" cols="60" name="details" id="details-admin" placeholder="Details" value={formData.details} required onChange={(e) => {
                                    setFormData(data => {
                                        return {
                                            ...data,
                                            details: e.target.value
                                        }
                                })}}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="buttons-container-admin">
                        <div className="field-container-admin flex-boxes-admin">
                            <button className="cancel-button-admin" onClick={()=> navigate('/admin')}>Cancel</button>
                        </div>
                        <div className="field-container-admin flex-boxes-admin post-admin">
                            <button className="submit-button-admin" type={"submit"}>Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}