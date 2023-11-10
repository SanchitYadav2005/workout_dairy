const Workout = require("../models/Workouts");
const mongoose = require("mongoose")

// get all workouts.

const getWorkouts = async (req,res)=>{
    const user_id = req.user._id;
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
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
        res.status(404).json({messg: "no such workout found", emptyFields})
    }

    res.status(200).json(workout)
}

// create workout 

const createWorkout = async (req,res)=>{
    const {title,reps,load} = req.body;
    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'please fill all the fields.'})
    }
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title,reps,load, user_id})
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