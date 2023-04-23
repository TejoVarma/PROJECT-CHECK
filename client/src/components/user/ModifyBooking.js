import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function ModifyBooking() {
  const navigate = useNavigate();
  const [destination, setdestination] = useState([]);
  const [formdata, setFormdata] = useState({
    startdate: "",
    enddate: "",
    origin: "",
    destination: "",
  });
  const [data, setData] = useState({});

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };
  useEffect(() => {
    fetch("http://localhost:4000/user/getbookingdetails")
      .then((response) => response.json())
      .then((data) => setData(data.data[data.data.length - 1]))
      .catch((error) => console.error(error));
  }, []);
  //   console.log(data.data[data.data.length-1])
  console.log(data);
  // useEffect(() => {
  //     fetch("http://localhost:4000/user/getbookingdetails")
  //       .then((response) => response.json())
  //       .then((destination) =>
  //         setdestination(destination.data[destination.data.length - 1])
  //       );
  //   }, []);
  //   console.log(destination._id)

  const submitData = () => {
    console.log(data);
    const id = data._id;
    console.log(id);
    axios
      .put(`http://localhost:4000/user/updatebooking/${id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/booking");
  };
  return (
    <div className="display">
      <Header />
      <div className="total">
        <div className="home">
          <div className="text-quote">
            Main quote for the Website will be Placed here to make understand
          </div>

          <div className="input-all">
            <input
              className="booking-fields"
              placeholder="startdate"
              name="startdate"
              type="date"
              value={data.startdate}
              onChange={(event) =>
                setData({ ...data, startdate: event.target.value })
              }
            />

            <input
              className="booking-fields"
              placeholder="enddate"
              name="enddate"
              type="date"
              value={data.enddate}
              onChange={(event) =>
                setData({ ...data, enddate: event.target.value })
              }
            />

            <input
              className="booking-fields"
              placeholder="origin"
              name="origin"
              type="text"
              value={data.origin}
              onChange={(event) =>
                setData({ ...data, origin: event.target.value })
              }
            />

            <input
              className="booking-fields"
              placeholder="destination"
              name="destination"
              type="text"
              value={data.destination}
              onChange={(event) =>
                setData({ ...data, destination: event.target.value })
              }
            />
          </div>

          <button className="button2" variant="primary" onClick={submitData}>
            Check
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModifyBooking;
