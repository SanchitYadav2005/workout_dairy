const express = require("express");
const router = express.Router();
const {
  getWorkout,
  getWorkouts,
  createWorkout,
} = require("../controllers/workoutController");

//get workouts
router.get("/", getWorkouts);

// get single workout.
router.get("/:id", getWorkout);

// Post a new workout
router.post("/",createWorkout);
//DELETE a workout
router.delete("/:id", (req, res) => {
  res.json({ mssg: "delete a workout" });
});

//UPDATE  a workout
router.patch("/:id", async (req, res) => {});

module.exports = router;
