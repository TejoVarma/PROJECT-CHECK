require("dotenv").config();
const express = require("express");
const routers = express.Router();
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const carController = require("../controllers/carDetails.controller");

const fileStorage = new GridFsStorage({
    url : process.env.DB_URL+process.env.DB_NAME,
    file : (req, file) => {
        return {
            bucketName : process.env.DB_COLLECTION,
            filename : `${Date.now()}_${file.originalname}`
        }
    }
});

const fileUpload = multer({
    storage : fileStorage
});

routers.post("/newcar", fileUpload.single("image"), carController.addNewCar);

routers.get("/cars", carController.getCars);

routers.put("/car/:id",fileUpload.single("image"), carController.editCar);

routers.delete("/car/:id", carController.deleteCar);

routers.get("/image/:name", carController.load);

routers.get('/cars/:id', carController.getCarById);

module.exports = routers;