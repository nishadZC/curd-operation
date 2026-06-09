import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import EmployeeModel from './Employees.js';
import AdminModel from './Admin.js';
import multer from 'multer'
import PhotographerStudio from './Photographer/PhotographerStudio.js';
import path from 'path';
import fs from "fs";
import PhotographerSubEvent from './Photographer/PhotographerSubEvent.js';
import PhotographerSampleModel from './Photographer/PhotographerSampleSchema.js';
import Contact from './contact.js';
import dotenv from 'dotenv';
import connectDB from './db.js';
import HallStudio from './Hall/HallStudio.js';
import HallSubEvent from './Hall/HallSubEvent.js';
import HallSampleModel from './Hall/HallSampleSchema.js';

import CatererStudio from './Caterer/CatererStudio.js';
import CatererSubEvent from './Caterer/CatererSubEvent.js';
import CatererSampleModel from './Caterer/CatererSampleSchema.js';

import BartenderStudio from './Bartender/BartenderStudio.js';
import BartenderSubEvent from './Bartender/BartenderSubEvent.js';
import BartenderSampleModel from './Bartender/BartenderSampleSchema.js';

import DecorationStudio from './Decoration/DecorationStudio.js';
import DecorationSubEvent from './Decoration/DecorationSubEvent.js';
import DecorationSampleModel from './Decoration/DecorationSampleSchema.js';

import WeddingPackage from './Packages/WeddingPackages.js';
import AnniversaryPackage from './Packages/AnniversaryPackages.js';
import BirthdayPackage from './Packages/BirthdayPackages.js';
import BabyShowerPackage from './Packages/BabyShowerPackages.js';

import PackageModel from './Packages/WeddingPackages.js';
import UserDataModel from './user_data.js';
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(express.json());
dotenv.config();
connectDB();
const __dirname = path.resolve();
// mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT || 3001;


const asyncHandler = fn => (req, res) =>
    fn(req, res).catch(
        err => res.status(500).json({ error: err.message }));


// filepath: c:\Users\vn072\OneDrive\Pictures\Documents\GitHub\curd-operation\back-end\server.js
// ...existing code...
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// ...existing code...

app.post("/", asyncHandler(
    async (req, res) =>
        res.json(
            await AdminModel.create(req.body)
        )
));

app.post("/login", asyncHandler(async (req, res) => {
    console.log("Login request received:", req.body);

    const { admin_email, admin_password } = req.body;
    if (!admin_email || !admin_password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await AdminModel.findOne({ admin_email });

    if (!admin) {
        console.log("User not found:", admin_email);
        return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User found:", admin);

    if (admin.admin_password !== admin_password) {
        console.log("Incorrect password for user:", admin_email);
        return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Login successful for:", admin_email);
    res.json({ message: "Login successful", admin });
}));

app.get("/home", asyncHandler(async (req, res) => res.json(await EmployeeModel.find({}))));
app.post("/createUser", asyncHandler(async (req, res) => res.json(await EmployeeModel.create(req.body))));
app.put("/updateUser/:id", asyncHandler(async (req, res) =>
    res.json(await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, { new: true }))
));
app.get("/getUser/:id", asyncHandler(async (req, res) => res.json(await EmployeeModel.findById(req.params.id))));
app.delete("/deleteUser/:id", asyncHandler(async (req, res) =>
    res.json({ message: "User deleted", user: await EmployeeModel.findByIdAndDelete(req.params.id) })
));

//Studios

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const service = req.body.service || req.params.service || req.query.service;
        const uploadPath = `./uploads/${service || 'default'}`;

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Ensure the uploads folder is publicly accessible
app.use("/uploads", express.static("uploads"));
// Route to add a studio with image upload
app.post("/addStudios", upload.single("studio_image"), async (req, res) => {
    try {
        const { studio_name, studio_location, studio_description, studio_contact, studio_email, service } = req.body;
        console.log(service);
        let newStudio;

        if (service == 'Photographer') {
            const studio_image = req.file ? `/uploads/${service}/${req.file.filename}` : "";
            newStudio = await PhotographerStudio.create({
                studio_name,
                studio_location,
                studio_description,
                studio_contact,
                studio_email,
                studio_image,
            });
        }
        else if (service == 'Hall') {
            const studio_image = req.file ? `/uploads/${service}/${req.file.filename}` : "";
            newStudio = await HallStudio.create({
                studio_name,
                studio_location,
                studio_description,
                studio_contact,
                studio_email,
                studio_image,
            });
        }
        else if (service == 'Caterer') {
            const studio_image = req.file ? `/uploads/${service}/${req.file.filename}` : "";
            newStudio = await CatererStudio.create({
                studio_name,
                studio_location,
                studio_description,
                studio_contact,
                studio_email,
                studio_image,
            });
        }
        else if (service == 'Decoration') {
            const studio_image = req.file ? `/uploads/${service}/${req.file.filename}` : "";
            newStudio = await DecorationStudio.create({
                studio_name,
                studio_location,
                studio_description,
                studio_contact,
                studio_email,
                studio_image,
            });
        }
        else if (service == 'Bartender') {
            const studio_image = req.file ? `/uploads/${service}/${req.file.filename}` : "";
            newStudio = await BartenderStudio.create({
                studio_name,
                studio_location,
                studio_description,
                studio_contact,
                studio_email,
                studio_image,
            });
        }

        res.json({ message: "Studio added successfully!", studio: newStudio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/updateStudio", upload.single("studio_image"), async (req, res) => {
    try {
        const { studio_id, studio_name, studio_location, studio_description, studio_contact, studio_email, service } = req.body;
        // console.log(req.body);
        

        if (!studio_id || !service) {
            console.log(studio_id, service);
            return res.status(400).json({ error: "Missing studio_id or service type." });
        }

        const studio_image = req.file ? `/uploads/${service}/${req.file.filename}` : undefined;

        const updateData = {
            studio_name,
            studio_location,
            studio_description,
            studio_contact,
            studio_email,
        };

        // Only add image to updateData if a new image is uploaded
        if (studio_image) {
            updateData.studio_image = studio_image;
        }

        let updatedStudio;
        console.log("Hanga asa!!");
        if (service === "Photographer") {
            
            updatedStudio = await PhotographerStudio.findByIdAndUpdate(studio_id, updateData, { new: true });
        } else if (service === "Hall") {
            updatedStudio = await HallStudio.findByIdAndUpdate(studio_id, updateData, { new: true });
        } else if (service === "Caterer") {
            updatedStudio = await CatererStudio.findByIdAndUpdate(studio_id, updateData, { new: true });
        } else if (service === "Decoration") {
            updatedStudio = await DecorationStudio.findByIdAndUpdate(studio_id, updateData, { new: true });
        } else if (service === "Bartender") {
            updatedStudio = await BartenderStudio.findByIdAndUpdate(studio_id, updateData, { new: true });
        }

        if (!updatedStudio) {
            return res.status(404).json({ error: "Studio not found or update failed." });
        }

        res.json({ message: "Studio updated successfully!", studio: updatedStudio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/getStudios", async (req, res) => {
    try {
        const { service } = req.query;
        // console.log(service);


        if (!service) {
            return res.status(400).json({ message: "Service is required" });
        }

        // console.log(service);
        let studios;

        if (service == 'Photographer') {

            studios = await PhotographerStudio.find();
        }
        else if (service == 'Hall') {
            studios = await HallStudio.find();
        }
        else if (service == 'Caterer') {
            studios = await CatererStudio.find();
        }
        else if (service == 'Decoration') {
            studios = await DecorationStudio.find();
        }
        else if (service == 'Bartender') {
            studios = await BartenderStudio.find();
        }


        res.json(studios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






// Route to upload multiple images for a specific studio
const ServiceStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const service = req.body.service || req.params.service || req.query.service;
        const uploadPath = `./uploads/${service || 'default'}`;
        const studioId = req.query.studioId; // ✅ Fetch studioId from query parameters
        if (!studioId || !service) {
            return cb(new Error("Studio ID and Service is required"), false);
        }
        const dir = `${uploadPath}/${service}_samples/${studioId}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const ServiceUpload = multer({ storage: ServiceStorage });

// ✅ Fix the Upload Route
app.post("/uploadImages", ServiceUpload.array("images", 10), async (req, res) => {
    try {
        const service = req.body.service || req.params.service || req.query.service;
        const uploadPath = `/uploads/${service || 'default'}`;
        const { studioId } = req.query; // ✅ Use req.query to get studioId
        if (!studioId || !service) {
            return res.status(400).json({ message: "Studio ID and Service is required" });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No images uploaded" });
        }

        const imagePaths = req.files.map(file => `${uploadPath}/${service}_samples/${studioId}/${file.filename}`);

        if (!studioId || !service) {
            return res.status(400).json({ message: "Studio ID and Service is required" });
        }


        if (service == 'Photographer') {
            await PhotographerSampleModel.create({ studioId, images: imagePaths });
        }
        else if (service == 'Hall') {
            await HallSampleModel.create({ studioId, images: imagePaths });
        }
        else if (service == 'Caterer') {
            await CatererSampleModel.create({ studioId, images: imagePaths });
        }
        else if (service == 'Decoration') {
            await DecorationSampleModel.create({ studioId, images: imagePaths });
        }
        else if (service == 'Bartender') {
            await BartenderSampleModel.create({ studioId, images: imagePaths });
        }

        res.json({ message: "Images uploaded successfully", images: imagePaths });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get uploaded images for a studio
app.get("/getPhotographerImages/:studioId", async (req, res) => {
    try {
        const { studioId } = req.params;
        const { service } = req.query;
        console.log("Requested Studio ID:", studioId); // Debugging log

        if (!studioId || !service) {
            return res.status(400).json({ message: "Studio ID and Service is required" });
        }

        let photographerSample;


        if (service == 'Photographer') {
            photographerSample = await PhotographerSampleModel.findOne({ studioId });
        }
        else if (service == 'Hall') {
            photographerSample = await HallSampleModel.findOne({ studioId });
        }
        else if (service == 'Caterer') {
            photographerSample = await CatererSampleModel.findOne({ studioId });
        }
        else if (service == 'Decoration') {
            photographerSample = await DecorationSampleModel.findOne({ studioId });
        }
        else if (service == 'Bartender') {
            photographerSample = await BartenderSampleModel.findOne({ studioId });
        }

        if (!photographerSample) {
            console.log("No images found for this Studio ID");
            return res.status(404).json({ message: "No images found" });
        }

        console.log("Found images:", photographerSample.images);
        res.json({ images: photographerSample.images });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ error: error.message });
    }
});

// contact section

// Routes
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(200).json({ message: 'Message received' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

//   SubEvents
// Add sub-event for a studio
app.post("/studios/:studioId/subevents", asyncHandler(async (req, res) => {
    const { studioId } = req.params;
    const { title, price, description, service } = req.body;
    // console.log("Service:(from body)"+service);


    if (!title || !price || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    let newSubEvent;
    if (service == 'Photographer') {
        newSubEvent = await PhotographerSubEvent.create({
            studioId,
            title,
            price,
            description
        });
    }
    else if (service == 'Hall') {
        newSubEvent = await HallSubEvent.create({
            studioId,
            title,
            price,
            description
        });
    }
    else if (service == 'Caterer') {
        newSubEvent = await CatererSubEvent.create({
            studioId,
            title,
            price,
            description
        });
    }
    else if (service == 'Decoration') {
        newSubEvent = await DecorationSubEvent.create({
            studioId,
            title,
            price,
            description
        });
    }
    else if (service == 'Bartender') {
        newSubEvent = await BartenderSubEvent.create({
            studioId,
            title,
            price,
            description
        });
    }

    res.status(201).json({ message: "Sub-event added successfully!", subEvent: newSubEvent });
}));

app.get("/studios/:studioId/subevents", asyncHandler(async (req, res) => {
    const { studioId } = req.params;
    const { service } = req.query;
    // console.log("Service:(from query)"+service);


    let subEvents;

    if (service == 'Photographer') {
        subEvents = await PhotographerSubEvent.find({ studioId });
    }
    else if (service == 'Hall') {
        subEvents = await HallSubEvent.find({ studioId });
    }
    else if (service == 'Caterer') {
        subEvents = await CatererSubEvent.find({ studioId });
    }
    else if (service == 'Decoration') {
        subEvents = await DecorationSubEvent.find({ studioId });
    }
    else if (service == 'Bartender') {
        subEvents = await BartenderSubEvent.find({ studioId });
    }
    res.json(subEvents);
}));

app.delete("/subevents/:subEventId", asyncHandler(async (req, res) => {
    const { subEventId } = req.params;
    const { service } = req.query;

    console.log("Service:(from query)"+service);
    console.log("SubEvent ID:", subEventId);
    
    

    if (!service) {
        return res.status(400).json({ error: "Missing 'service' in query parameters." });
    }

    let deletedSubEvent;
    let subEvents;

    if (service === 'Photographer') {        
        deletedSubEvent = await PhotographerSubEvent.findByIdAndDelete(subEventId);
        subEvents = await PhotographerSubEvent.find({ studioId:deletedSubEvent.studioId });
    } else if (service === 'Hall') {
        deletedSubEvent = await HallSubEvent.findByIdAndDelete(subEventId);
        subEvents = await HallSubEvent.find({ studioId:deletedSubEvent.studioId });
    } else if (service === 'Caterer') {
        deletedSubEvent = await CatererSubEvent.findByIdAndDelete(subEventId);
        subEvents = await CatererSubEvent.find({ studioId:deletedSubEvent.studioId });
    } else if (service === 'Decoration') {
        deletedSubEvent = await DecorationSubEvent.findByIdAndDelete(subEventId);
        subEvents = await DecorationSubEvent.find({ studioId:deletedSubEvent.studioId });
    } else if (service === 'Bartender') {
        deletedSubEvent = await BartenderSubEvent.findByIdAndDelete(subEventId);
        subEvents = await BartenderSubEvent.find({ studioId:deletedSubEvent.studioId });
    } else {
        return res.status(400).json({ error: "Invalid service type." });
    }

    if (!deletedSubEvent) {
        return res.status(404).json({ error: "Subevent not found." });
    }

    res.json({ message: "Subevent deleted successfully!", subEvents });
}));


// Route to add package
const package_storage = multer.diskStorage({
    destination: "./upload_package/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});



app.post("/add_package", upload.single("package_image"), async (req, res) => {
    try {
        const {
            package_name,
            package_price,
            package_photographer,
            package_caterer,
            package_hall,
            package_bartender,
            package_decoration,
            package_description
        } = req.body;

        // console.log(req.query.packageType);


        // console.log(typeof package_photographer);

        const packageType = req.query.packageType;
        if (!packageType) {
            return res.status(400).json({ message: "Package type is required" });
        }

        let newPackage;
        if (packageType == "Wedding") {
            newPackage = new WeddingPackage({
                package_name,
                package_price,
                package_photographer,
                package_caterer,
                package_hall,
                package_bartender,
                package_decoration,
                package_description,
                package_image: req.file ? req.file.path : ""
            });
        }
        else if (packageType == "Birthday") {
            newPackage = new BirthdayPackage({
                package_name,
                package_price,
                package_photographer,
                package_caterer,
                package_hall,
                package_bartender,
                package_decoration,
                package_description,
                package_image: req.file ? req.file.path : ""
            });
        }
        else if (packageType == "Anniversary") {
            newPackage = new AnniversaryPackage({
                package_name,
                package_price,
                package_photographer,
                package_caterer,
                package_hall,
                package_bartender,
                package_decoration,
                package_description,
                package_image: req.file ? req.file.path : ""
            });
        }
        else if (packageType == "Baby Shower") {
            newPackage = new BabyShowerPackage({
                package_name,
                package_price,
                package_photographer,
                package_caterer,
                package_hall,
                package_bartender,
                package_decoration,
                package_description,
                package_image: req.file ? req.file.path : ""
            })
        }

        await newPackage.save();
        res.status(200).json({ message: "Package added successfully" });
    } catch (error) {
        console.error("Error adding package:", error);
        res.status(500).json({ message: "Server error" });
    }
});
app.get("/get_packages", async (req, res) => {
    try {
        const packageType = req.query.packageType;
        if (!packageType) {
            return res.status(400).json({ message: "Package type is required" });
        }


        if (packageType == "Wedding") {
            const packages = await WeddingPackage.find();
            res.send(packages);
        }
        else if (packageType == "Birthday") {
            const packages = await BirthdayPackage.find();
            res.json(packages);
        }
        else if (packageType == "Anniversary") {
            const packages = await AnniversaryPackage.find();
            res.json(packages);
        }
        else if (packageType == "Baby Shower") {
            const packages = await BabyShowerPackage.find();
            res.json(packages);
        }

    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/update_package", upload.single("package_image"), async (req, res) => {
    try {
        const {
            package_id,
            package_name,
            package_price,
            package_photographer,
            package_caterer,
            package_hall,
            package_bartender,
            package_decoration,
            package_description
        } = req.body;

        const packageType = req.query.packageType;
        console.log(req.body);

        if (!packageType || !package_id) {            
            return res.status(400).json({ message: "Both package type and package ID are required." });
        }

        const updateData = {
            package_name,
            package_price,
            package_photographer,
            package_caterer,
            package_hall,
            package_bartender,
            package_decoration,
            package_description,
        };

        // Only update image if a new file is uploaded
        if (req.file) {
            updateData.package_image = req.file.path;
        }

        let updatedPackage;

        if (packageType === "Wedding") {
            updatedPackage = await WeddingPackage.findByIdAndUpdate(package_id, updateData, { new: true });
        } else if (packageType === "Birthday") {
            updatedPackage = await BirthdayPackage.findByIdAndUpdate(package_id, updateData, { new: true });
        } else if (packageType === "Anniversary") {
            updatedPackage = await AnniversaryPackage.findByIdAndUpdate(package_id, updateData, { new: true });
        } else if (packageType === "Baby Shower") {
            updatedPackage = await BabyShowerPackage.findByIdAndUpdate(package_id, updateData, { new: true });
        } else {
            return res.status(400).json({ message: "Invalid package type." });
        }

        if (!updatedPackage) {
            return res.status(404).json({ message: "Package not found." });
        }

        res.status(200).json({ message: "Package updated successfully", updatedPackage });
    } catch (error) {
        console.error("Error updating package:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// POST: Save user enquiry
app.post("/user_form", async (req, res) => {
    try {
      const { user_name, email, location, phone, package_id } = req.body;
  
      const newUserData = new UserDataModel({
        user_name,
        email,
        location,
        phone,
        package_id
      });
  
      await newUserData.save();
      res.status(201).json({ message: "User enquiry saved successfully!" });
    } catch (error) {
      console.error("Error saving user data:", error);
      res.status(500).json({ message: "Failed to save user data." });
    }
  });
  
  app.get("/admin_home", async (req, res) => {
    try {
      const users = await UserDataModel.find();
      const enrichedUsers = await Promise.all(
        users.map(async (user) => {
          const pkg = await PackageModel.findById(user.package_id);
          return {
            ...user._doc,
            packageDetails: pkg || null
          };
        })
      );
  
      res.json(enrichedUsers);
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

app.listen(PORT, () => console.log("Server running on port " + PORT));
