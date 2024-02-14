require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

//importing schema
require("./models/imageDetails");
const Images = mongoose.model("ImageDetails");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));


// //////////////////////////////////////////////////

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "C:/Users/Aniruddh Vaish/Desktop/Keshav_proj/AuthInMern/client/src/components/Main/images/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });


app.post("/upload-image", upload.single("image"), async (req, res) => {
    console.log(req.body);
    const imageName = req.file.filename;

    try {
        await Images.create({ image: imageName });
        res.json({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});

app.get("/get-image", async (req, res) => {
    try {
        Images.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        res.json({ status: error });
    }
});