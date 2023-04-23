const myBookings = require("../models/mybookings");
const mongoose = require("mongoose");
exports.getmybookings = async (req, res) => {
  try {
    const users = await myBookings.find({});
    return res.status(200).send({
      success: true,
      userCount: users.length,
      message: "All users Data",
      data: users,
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
exports.postbookings = async (req, res) => {
  try {
    const { startdate, enddate, origin, destination, carname, image } =
      req.body;
    const user = new myBookings({
      startdate,
      enddate,
      origin,
      destination,
      carname,
      image,
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
      message: "error in my bookings",
      err,
    });
  }
};
exports.deletemybooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await myBookings.findByIdAndDelete(bookingId);
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
exports.getmybookingbyid = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await myBookings.findById(req.params.id);
    return res.status(200).send({
      success: true,
      data: booking,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Getting Booking Data by Id",
      err,
    });
  }
};

