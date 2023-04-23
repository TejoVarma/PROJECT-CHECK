import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "../components/admin/Admin";
import AdminAddCar from "../components/admin/AdminAddCar";
import AdminEditCar from "../components/admin/AdminEditCar";
import BookingPage from "../components/user/BookingPage";
import MyBooking from "../components/user/MyBooking";
import BookingDetails from "../components/user/BookingDetails";
import CarBooking from "../components/user/CarBooking";
import EditBookingDetails from "../components/user/EditBookingDetails";
import ModifyBooking from "../components/user/ModifyBooking";
import AdminSignup from "../components/login/AdminSignup";
import AdminLogin from "../components/login/AdminLogin";
import UserSignup from "../components/login/UserSignup";
import UserLogin from "../components/login/UserLogin";
import PrivateComponentAdmin from "../components/PrivateComponentAdmin";
import NotFound from "../components/NotFound";
import PrivateComponent from "../components/PrivateComponentUser";
import LandingPage from "../components/LandingPage";

export default function Routers(){
    return <BrowserRouter>
        <Routes>
            <Route element = {<PrivateComponentAdmin/>}>
                <Route path ="/admin" element={<Admin/>}/>
                <Route path='/admin/addcar' element={<AdminAddCar/>}/>
                <Route path='/admin/edit/:id' element={<AdminEditCar/>}/>
            </Route>
            <Route element={<PrivateComponent/>}>
            <Route path="/booking" element={<BookingPage/>}/>
                <Route path="/mybookings" element={<MyBooking/>}/>
                <Route path="/bookingdetails" element={<BookingDetails/>}/>
                <Route path="/carbooking" element={<CarBooking/>}/>
                <Route path="/editbooking" element={<EditBookingDetails/>}/>
                <Route path="modify" element={<ModifyBooking/>}/>
            </Route>
            <Route path="/" element={<LandingPage/>}/>
            <Route path ="/adminlogin" element={<AdminLogin/>}/>
            <Route path ="/adminsignup" element={<AdminSignup/>}/>
            <Route path ="/usersignup" element={<UserSignup/>}/>
            <Route path ="/userlogin" element={<UserLogin/>}/>
            <Route path ="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
}