import React, { useState, useEffect } from "react";
import "../../styles/BookingDetails.css";
import { Button } from "react-bootstrap";
import MyBooking from "./MyBooking";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const BookingDetails = (singlecar) => {
  const navigate = useNavigate();
  // const [mybook, setmybook] = useState(false);
  const currentDate = new Date().toLocaleDateString(); // get current date in format MM/DD/YYYY
  const currentTime = new Date().toLocaleTimeString();
  const [destination, setdestination] = useState([]);
  const [lang,setLang]=useState([]);
  const [lat,setLat]=useState([])
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/user/getbookingdetails")
  //     .then((resp) => {
  //       setdestination(resp.data.users[resp.data.users.length - 1]);
  //     })
  //     .catch((error) => {
  //       console.log("showing error", error);
  //     });
  // }, [destination.length]);
 
  useEffect(() => {
    fetch("http://localhost:4000/user/getbookingdetails")
      .then((response) => response.json())
      .then((destination) =>
        setdestination(destination.data[destination.data.length - 1])
      );
  }, []);
  useEffect(()=>{
    fetch(`https://nominatim.openstreetmap.org/search?q=hyderabad&format=json&limit=1&addressdetails=1`)
    .then((response)=>response.json())
    .then((lang)=>setLang(lang[0].lon))
  },[])
  console.log(lang);
  const handleClick = () => {
    const data = {
      origin: destination.origin,
      destination: destination.destination,
      carname: singlecar.singlecar.carname,
      image: singlecar.singlecar.image,
      startdate: destination.startdate,
      enddate: destination.enddate,
    };
    // console.log(data)
    fetch("http://localhost:4000/user/mybookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonResponse) => {
        console.log("successful:", jsonResponse);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    navigate("/mybookings");
  };
  return (
    <>
      <div className="EditBox flex">
        <div className="left-box Left-Edit-Section">
          <div>
            <h3 className="title1">Booking Details</h3>
          </div>

          <div>
            <div className="mid-div">
              <div>
                <p>Car Name</p>
                <p>Car Number</p>
              </div>

              <div>
                <h3>{singlecar.singlecar.carname}</h3>
                <p>MH 03 ZQ 1234</p>
              </div>

              <div className="mini-3rd-div-img">
                <img
                  src={`http://localhost:4000/admin/${singlecar.singlecar.image}`}
                  alt="photo"
                />
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="mid-div">
              <div>
                <p>Origin</p>
                <p>Destination</p>
                <p>Start Date</p>
                <p>End Date</p>
              </div>

              <div>
                <p>{destination.origin}</p>
                <p>{destination.destination}</p>
                <p>{destination.startdate}</p>
                <p>{destination.enddate}</p>
              </div>

              <div className="mini-3rd-div-img">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d973521.5531922826!2d73.48046505385568!3d17.6113483639419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3bc100404d639073%3A0xc0e2f0fe65fa2b25!2sKolhapur%20Bus%20Stand%20(CBS)%2C%20Benadikar%20Path%2C%20Shahupuri%2C%20Kolhapur%2C%20Maharashtra%20416001!3m2!1d16.7034517!2d74.24323319999999!4m5!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!3m2!1d18.520430299999997!2d73.8567437!5e0!3m2!1sen!2sin!4v1680106081224!5m2!1sen!2sin"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          <hr />

          <div className="bottom-div">
            <div>
              <p>Booking ID </p>
              <p>Booking Date</p>
              <p>Booking Time</p>
            </div>
            <div>
              <p>{singlecar.singlecar.id} </p>
              <p>{currentDate}</p>
              <p>{currentTime}</p>
              <div>
                {" "}
                <Button
                  className="cancel-btn1"
                  variant="primary"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  {" "}
                  Cancel{" "}
                </Button>
              </div>
            </div>
          </div>

          <hr />
        </div>

        <div className="right-box Right-Edit-Section">
          <div>
            <h3 className="title2">Payment Details</h3>
          </div>

          <div>
            <div className="price">
              <p>Price per km</p>
              <p>Rs {singlecar.singlecar.perkm}</p>
            </div>

            <div className="pricing">
              <p>Pricing</p>
              <p>Rs {singlecar.singlecar.perkm * 150}</p>
            </div>

            <div className="tax">
              <p>Tax Charges</p>
              <p>Rs {(singlecar.singlecar.perkm * 150 * 18) / 100}</p>
            </div>

            <hr />

            <div className="tax">
              <p>Sub Total</p>
              <p>
                Rs{" "}
                {singlecar.singlecar.perkm * 150 +
                  (singlecar.singlecar.perkm * 150 * 18) / 100}
              </p>
            </div>
            <Button
              variant="primary"
              className="proceed-btn"
              onClick={handleClick}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
