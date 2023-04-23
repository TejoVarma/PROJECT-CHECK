import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/LandingPage.css'

export default function LandingPage(){
    const navigate = useNavigate();
    return <div className="landing-page">
        <div className="tagline-container">
            <p className="tagline">Why taking stress about travelling...Take a trip by our rental car</p>
            <p className="tagline-sub">As the name suggests...keep travelling to any number of miles and beyond</p>
            <div className="landing-page-button-container">
                <button onClick={()=>{navigate('/userlogin')}} className="landing-page-button">Let me take you through...</button>
            </div>
        </div>
    </div>
}