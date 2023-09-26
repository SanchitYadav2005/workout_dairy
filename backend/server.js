const express = require("express");

const app = express();

//middleware for logging out the path, and request method

app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})
app.get('/', (req,res)=>{
    res.json({mssg: "welcome to the site!!"})
})


app.listen(4000, ()=>{
    console.log("server is up on port 4000");
})