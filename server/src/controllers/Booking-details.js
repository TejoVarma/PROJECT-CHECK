const carBooking = require("../models/Car-booking");
const Cars = require("../models/carDetails.model");
exports.getbookingdetails = async (req, res) => {
  try {
    const users = await carBooking.find({});
    return res.status(200).send({
      success: true,
      userCount: users.length,
      message: "All users Data",
      data:users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Getting All users Data",
      err,
    });
  }
};
exports.bookingdetailcontrol = async (req, res) => {
  try {
    const { startdate, enddate, origin, destination } = req.body;
    if (!startdate || !enddate || !origin || !destination) {
      return res.status(401).send({
        success: false,
        message: "please fill all fields",
      });
    }
    const user = new carBooking({
      startdate,
      enddate,
      origin,
      destination,
    });
    await user.save();
    return res.status(200).send({
      success: true,
      message: "successful",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in car booking",
      err,
    });
  }
};
exports.updatebooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { startdate, enddate, origin, destination } = req.body;
    if (!startdate || !enddate || !origin || !destination) {
      return res.status(401).send({
        success: false,
        message: "please fill all fields",
      });
    }
    const updatedDetails = await carBooking.findByIdAndUpdate(
      id,
      { startdate, enddate, origin, destination },
      { new: true }
    );
    if (!updatedDetails) {
      return res.status(404).send({
        success: false,
        message: "Booking details not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Booking Details Updated Succesfully",
      details: updatedDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in updated booking details",
      err,
    });
  }
};
exports.deletebooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await carBooking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking details not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Booking Details Deleted Succesfully",
      booking,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in deleting booking details",
      err,
    });
  }
};
exports.getAllCars = async (req, res) => {
  try {
    let cars = await Cars.find();
    res.status(200).send({
      success: true,
      message: "all car details",
      data: cars,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "failed to get car details",
      err,
    });
  }
};

