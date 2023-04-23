const express = require('express');
const app = express();
const cors = require('cors');
const carRoutes = require('./routes/carDetails.routes');
const bookingRoutes=require("./routes/Booking-router")
const mybookings=require("./routes/mybooking.router")

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors());

app.use('/admin', carRoutes);
app.use('/user',bookingRoutes)
app.use('/user',mybookings)
app.use('/api',require ("./routes/user.router"));
app.use('/api',require ("./routes/admin.router"));
module.exports = app;