import React, { useEffect, useState } from "react";
import "../../styles/BookingPage.css";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BookingDetails from "./BookingDetails";
import Header from "./Header";
const EditMyBookings = () => {
  const navigate = useNavigate();
  const [destination, setdestination] = useState([]);
  const [data, setdata] = useState([]);
  const [cardetails, setcardetails] = useState(false);
  const [singlecar, setsinglecar] = useState({
    carname: "",
    image: "",
    perkm: "",
    id: "",
  });
  const [carType, setCarType] = useState(data);
  const BookingDetail = (Item) => {
    const { carname, image, perkm, _id } = Item;
    console.log(Item);
    setsinglecar({
      carname: carname,
      image: image,
      perkm: perkm,
      id: _id,
    });

    setcardetails(true);
  };
  useEffect(() => {
    fetch("http://localhost:4000/user/getcars")
      .then((response) => response.json())
      .then((data) => setdata(data.data));
  }, []);
  // console.log(data);
  useEffect(() => {
    fetch("http://localhost:4000/user/getbookingdetails")
      .then((response) => response.json())
      .then((destination) =>
        setdestination(destination.data[destination.data.length - 1])
      );
  }, [data]);
  console.log(destination);

  const handleCarTypeChange = (event) => {
    setCarType(event.target.value); // Update state with selected carType value
  };
  useEffect(() => {
    if (carType === "all") {
      setdata(data);
    } else {
      const filteredCars = data.filter((car) => car.model === carType);
      setdata(filteredCars);
      console.log(data);
    }
  }, [carType]);
  // console.log(data);

  return (
    <>
      <Header />
      {!cardetails && (
        <div>
          <div className="below-header">
            {destination.origin} ---&gt;{destination.destination} --&gt;{" "}
            {destination.startdate} - {destination.enddate}
            <Button
              variant="primary"
              className="modify-btn1"
              onClick={() => {
                navigate("/modify");
              }}
            >
              Modify
            </Button>
          </div>
          <section className="thirdNavbar">
            <section className="thirdNavbar">
              <select
                className="dropdown"
                value={carType}
                onChange={handleCarTypeChange}
              >
                <option value="all">All</option>
                <option value="xuv">XUV</option>
                <option value="suv">MV</option>
                <option value="sedan">SEDAN</option>
              </select>
            </section>
            <button
              className="setting"
              onClick={() => {
                window.location.reload();
              }}
            >
              Seating
            </button>
            <button className="setting">Milage</button>
            <button className="setting">Other</button>
          </section>

          <div className="card-container1">
            {data.map((item) => (
              <div key={item._id} className="card">
                <img
                  src={`http://localhost:4000/admin/${item.image}`}
                  alt={item.carname}
                  onClick={() => {
                    console.log("hello");
                  }}
                />
                <p className="seat">5 Persons</p>
                <div className="card-details">
                  <h3>{item.carname}</h3>
                  <p className="RSKM">{item.perkm} Rs/Km</p>
                </div>
                <div className="other flex flex-dir-r j-content">
                  <div className="fair-details">Details:{item.details}</div>
                  <Button
                    variant="primary"
                    className="book-now"
                    // onClick={()=>console.log(item._id)}
                    onClick={() => {
                      BookingDetail(item);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {cardetails && <BookingDetails singlecar={singlecar} />}
    </>
  );
};
export default EditMyBookings;
