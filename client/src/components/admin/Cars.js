import React from "react";
import { Link } from "react-router-dom";

export default function Cars({ car }) {
    const { carname, perkm, availablefrom, availabletill, image } = car;
    return <div className="card-container-admin">
            <Link to={`edit/${car._id}`}>
                <section className="image-container-admin">
                    <img className="image-admin" src={`http://localhost:4000/admin/${image}`} alt="car"/>
                </section>
            </Link>
            <footer className="card-footer-admin">
                <section className="persons-container-admin">
                    <p className="persons-admin">5 persons</p>
                </section>
                <section className="description-admin">
                    <p className="carname-admin">{carname}</p>
                    <p className="perkm-admin">{perkm}Rs/Km</p>
                </section>
                <section className="date-container-admin">
                    <p className="date-notation-admin">Available date</p>
                    <p className="date-admin">{availablefrom}-{availabletill}</p>
                </section>
            </footer>
        </div>
}