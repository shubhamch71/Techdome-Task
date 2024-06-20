const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const cloudinary = require('cloudinary');

dotenv.config();
const port = process.env.PORT;


////////------ cloudinary -------//////////
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: true
}));

//////-----connection with database-----//////
require("./database/conn");

////////--------routes--------/////////
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//////////--------api----------/////////
app.use("/api", userRoutes);
app.use("/api", blogRoutes);


app.get("/", (req, res) => {
    res.send("Express : backend");
})

app.post("/", (req, res) => {
    console.log(JSON.stringify(req.body, 0, 2));
    res.status("200").send(req.body)
})

app.listen(port, () => {
    console.log(`listening at port ${port}`)
})