const express = require("express");

const app = express();
const workoutsRoutes = require('./routes/workouts');


app.use(express.json())
//middleware for logging out the path, and request method
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})
//routes.
app.use("/api/workouts",workoutsRoutes);


app.listen(4000, ()=>{
    console.log("server is up on port 4000");
})