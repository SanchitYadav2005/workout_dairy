import axios from "axios";
import { useEffect, useState } from "react";
//components
import WorkOutDetails from "../components/WorkoutDetails";

function Home() {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios("/api/workouts");
      const json = await res.json();
      if (res.ok) {
        setWorkouts(json);
      }
    };
    getData();
  }, []);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkOutDetails workout={workout} key={workout._id} />
          ))}
      </div>
    </div>
  );
}

export default Home;
