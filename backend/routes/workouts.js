const express = require("express")
const router = express.Router();


//get workouts
router.get('/',(req,res)=>{
    res.json({mssg:"get all the workouts"})
})

// get single workout.
router.get('/:id',(req,res)=>{
    res.json({mssg:"get a single workout"})
})

// Post a new workout
router.post("/", (req,res)=>{
    res.json({mssg:"create a new workout"})
})
//DELETE a workout
router.delete("/:id",(req,res)=>{
    res.json({mssg:"delete a workout"})
})

//UPDATE  a workout
router.patch("/:id",(req,res)=>{
    res.json({mssg:"update a workout"})
})



module.exports = router;