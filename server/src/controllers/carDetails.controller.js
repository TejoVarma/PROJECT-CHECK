const CAR_DETAILS = require('../models/carDetails.model');
require('dotenv').config();
const uuid = require('uuid');
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const client = new MongoClient(process.env.DB_URL);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.model');
let carDetailsController = {};

carDetailsController.addNewCar = async function(req,res){
    try
    {
        let token = await getToken(req.headers);
        let payload = await jwt.verify(token,process.env.SECRET);
        // console.log(payload);
        let admin = await Admin.findById(payload.user.id);
        // console.log(admin);
        if(token && admin)
        {
            let car = await new CAR_DETAILS({
                ...req.body,
                _id : uuid.v4(),
                adminId : payload._id,
                image : `image/${req.file.filename}`
            });
            let newCar = car.save();
            res.status(200).json({status : "Success", message : "Successfully Added", result : car});
        }
        else
        {
            res.status(403).json({status : "Failed", result : "Unauthorized"});
        }
    }
    catch(err)
    {
        res.status(400).json({status: "Failed", message : err.message});
    }
};

carDetailsController.getCars = async function(req,res){
    try{
        let token = await getToken(req.headers);
        let payload = await jwt.verify(token,process.env.SECRET);
        let admin = await Admin.findById(payload.user.id);
        if(token && admin)
        {
            let cars = await CAR_DETAILS.find();
            res.status(200).json({status : "Success", result: cars});
        }
        else
        {
            res.status(403).json({status : "Failed", result : "Unauthorized."});
        }
    }
    catch(err)
    {
        res.status(400).json({status : "Failed", message : err.message});
    }
};
carDetailsController.getCarById = async function(req,res){
    try{
        let token = await getToken(req.headers);
        let payload = await jwt.verify(token,process.env.SECRET);
        let admin = await Admin.findById(payload.user.id);
        if(token && admin)
        {
            let car = await CAR_DETAILS.findById(req.params.id);
            res.status(200).json({status : "Success", result: car});
        }
        else
        {
            res.status(403).json({status : "Failed", result : "Unauthorized."});
        }
    }
    catch(err)
    {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

carDetailsController.load = async function(req, res){
    try{
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collection = new GridFSBucket(db, {
            bucketName : process.env.DB_COLLECTION
        });
        const loadImage = collection.openDownloadStreamByName(req.params.name);
        loadImage.on("data", data => res.status(200).write(data));
        loadImage.on("error", (err) => {
            res.status(400).send({status:"failed to load", message: err.message});
        });
        loadImage.on("end", () => {
            res.end();
        });
    }
    catch(err)
    {
        res.status(500).send({status:"Server Error", message : err.message});
    }
};

carDetailsController.editCar = async function(req,res){
    try{
        // await client.connect();
        // const db = client.db(process.env.DB_NAME);
        // const filesSchema = db.collection(process.env.DB_COLLECTION + ".files");
        // const chunksSchema = db.collection(process.env.DB_COLLECTION + ".chunks");
        let token = await getToken(req.headers);
        let payload = await jwt.verify(token,process.env.SECRET);
        let admin = await Admin.findById(payload.user.id);
        if(token && admin)
        {
            let car = await CAR_DETAILS.findById(req.params.id);
            if(car)
            {
                let updatedCar;
                // console.log(req.body);
                if(req.file)
                {
                    // let file = await filesSchema.findOne({filename : car.image});
                    // await chunksSchema.deleteMany({files_id : file._id});
                    // //del file
                    // await filesSchema.deleteOne({_id : file._id});
                    updatedCar =  await CAR_DETAILS.findByIdAndUpdate(req.params.id, {...req.body, image : `image/${req.file.filename}`}, {new : true})
                }
                else
                {
                    updatedCar =  await CAR_DETAILS.findByIdAndUpdate(req.params.id, {...req.body}, {new : true});
                }
                await updatedCar.save();
                res.status(200).json({status : "Success", result : updatedCar});
            }
            else
            {
                res.status(404).json({status : "Failed", result : "Car details not found"});
            }
        }
        else
        {
            res.status(403).json({status : "Failed", result : "Unauthorized."});
        }
    }
    catch(err)
    {
        res.status(400).json({status : "Success", message : err.message});
    }
};
carDetailsController.deleteCar = async function(req,res){
    try{
        // await client.connect();
        // const db = client.db(process.env.DB_NAME);
        // const filesSchema = db.collection(process.env.DB_COLLECTION + ".files");
        // const chunksSchema = db.collection(process.env.DB_COLLECTION + ".chunks");
        let token = await getToken(req.headers);
        let payload = await jwt.verify(token,process.env.SECRET);
        let admin = await Admin.findById(payload.user.id);
        if(token && admin)
        {
            let car = await CAR_DETAILS.findById(req.params.id);
            if(car)
            {
                await CAR_DETAILS.findByIdAndDelete(req.params.id);
                // let file = await filesSchema.findOne({filename : car.image});
                // await chunksSchema.deleteMany({files_id : file._id});
                // //del file
                // await filesSchema.deleteOne({_id : file._id});
                res.status(200).json({status : "Success", message : "Successfully deleted"});
            }
            else
            {
                res.status(404).json({status : "Failed", result : "Car details not found"});
            }
        }
        else
        {
            res.status(403).json({status : "Failed", result : "Unauthorized."});
        }
    }
    catch(err)
    {
        res.status(400).json({status : "Success", message : err.message});
    }
}
function getToken(headers){
    if(headers && headers.authorization){
        let token = headers.authorization;
        return token;
    }
    else
    {
        return null;
    }
}

module.exports = carDetailsController;

