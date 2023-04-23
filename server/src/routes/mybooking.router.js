const express=require("express")
const {getmybookings,postbookings,deletemybooking,getmybookingbyid}=require("../controllers/mybookings.controllers")
const router=express.Router()
router.get('/mybookings',getmybookings);
router.post('/mybookings',postbookings);
router.delete("/mybookings/:id",deletemybooking)
router.get('/get:/id',getmybookingbyid);

module.exports=router;