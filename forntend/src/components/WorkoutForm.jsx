import { useState } from "react";
import axios from "axios";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";

function WorkoutForm() {
  const {dispatch} = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const{user} = useAuthContext()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    if(!user){
      setError("Login first")
      return 
    }
    const workout = {title, load, reps}
    const response = await axios.post('/api/workouts', {
        body: JSON.stringify(workout),
        headers:{
            'Content-type' : 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json();
    if(!response.ok){
        setError(json.error);
        console.log(error)
        setEmptyFields(json.emptyFields)
    }else if(response.ok){
        setTitle("")
        setLoad("")
        setReps("")
        setError(null)
        setEmptyFields([])
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
        className={emptyFields.includes('title')? 'error': ''}
      />
      <label> Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load')? 'error': ''}
      />
      <label> Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps')? 'error': ''}
      />
    </form>
  );
}

export default WorkoutForm;
