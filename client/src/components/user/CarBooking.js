import "../../styles/CarBooking.css";
import Header from "./Header";

function CarBooking() {
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
            />

            <input
              className="booking-fields"
              placeholder="enddate"
              name="enddate"
              type="date"
            />

            <input
              className="booking-fields"
              placeholder="origin"
              name="origin"
              type="text"
            />

            <input
              className="booking-fields"
              placeholder="destination"
              name="destination"
              type="text"
            />
          </div>

          <button className="button2" variant="primary">
            Check
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarBooking;