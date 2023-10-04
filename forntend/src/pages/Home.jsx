import axios from "axios";
import { useEffect } from "react";
//components
import WorkoutDetails from "../components/WorkoutDetails";
import useWorkoutsContext from '../hooks/useWorkoutsContext'

function Home() {
  const{workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/workouts");
      const json = await res.json();
      if (res.ok) {
        dispatch({type: "SET_WORKOUTS", payload: json})
      }
    };
    getData();
  },[dispatch]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
    </div>
  );
}

export default Home;
