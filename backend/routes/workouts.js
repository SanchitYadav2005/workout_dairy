const express = require("express");
const router = express.Router();
const {requireAuth} = require('../middleware/requireAuth')
const {
  getWorkout,
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout
} = require("../controllers/workoutController");

//this will be used on every request.
router.use(requireAuth)

//get workouts
router.get("/", getWorkouts);

// get single workout.
router.get("/:id", getWorkout);

// Post a new workout
router.post("/",createWorkout);
//DELETE a workout
router.delete("/:id",deleteWorkout );

//UPDATE  a workout
router.patch("/:id", updateWorkout);

module.exports = router;
