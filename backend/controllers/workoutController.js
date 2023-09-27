const Workout = require("../models/Workouts");
const mongoose = require("mongoose")

// get all workouts.

const getWorkouts = async (req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get single workout

const getWorkout = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({mssg: "no search found"})
    }
    const workout = await Workout.findById(id)

    if(!workout){
        res.status(404).json({messg: "no such workout found"})
    }

    res.status(200).json(workout)
}

// create workout 

const createWorkout = async (req,res)=>{
    try{
        const {title,reps,load} = req.body;
        const workout = await Workout.create({title,reps,load})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// update 
const updateWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({mssg: "no search found"})
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!workout){
        res.status(404).json({messg: "no such workout found"})
    }
    res.status(200).json(workout)
}

// delete

const deleteWorkout = async (req,res)=>{
    const {id} = req.params;
    // checking if the id is valid or not
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({mssg: "no search found"})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        res.status(404).json({messg: "no such workout found"})
    }
    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}