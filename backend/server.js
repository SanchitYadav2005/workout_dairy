const express = require("express");

const app = express();


app.get('/', (req,res)=>{
    res.json({mssg: "welcome to the site!!"})
})


app.listen(4000, ()=>{
    console.log("server is up on port 4000");
})