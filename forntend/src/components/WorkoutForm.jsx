import { useState } from "react";
import axios from "axios";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

function WorkoutForm() {
  const {dispatch} = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const workout = {title, load, reps}
    const response = await axios.post('/api/workouts', {
        body: JSON.stringify(workout),
        headers:{
            'Content-type' : 'application/json'
        }
    })
    const json = await response.json();
    if(!response.ok){
        setError(json.error);
        console.log(error)
    }else if(response.ok){
        setTitle("")
        setLoad("")
        setReps("")
        setError(null)
        console.log("new workout added!", json)
        dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new workout</h3>

      <label> Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label> Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <label> Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
    </form>
  );
}

export default WorkoutForm;