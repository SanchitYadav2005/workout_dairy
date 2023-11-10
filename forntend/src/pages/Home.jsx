import axios from "axios";
import { useEffect } from "react";
//components
import WorkoutDetails from "../components/WorkoutDetails";
import useWorkoutsContext from '../hooks/useWorkoutsContext'
import useAuthContext from '../hooks/useAuthContext'

function Home() {
  const{workouts, dispatch} = useWorkoutsContext()
  const{user} = useAuthContext()

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/workouts",{
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await res.json();
      if (res.ok) {
        dispatch({type: "SET_WORKOUTS", payload: json})
      }
    };
    if(user){
      getData()
    }
  },[dispatch, user]);
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
