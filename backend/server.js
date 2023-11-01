const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const workoutsRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

app.use(cors())
app.use(express.json())
//middleware for logging out the path, and request method
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})
//routes.
app.use("/api/workouts",workoutsRoutes);
app.use("/api/user",userRoutes);

//connect to db.
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // listning on port
        app.listen(process.env.PORT, ()=>{
            console.log("connected to db & server is up on port ", process.env.PORT);
        })
    })
    .catch((error)=>{
        console.log(error)
    })