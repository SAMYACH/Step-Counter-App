import React, { useState, useEffect } from "react";
import axios from "axios";
const baseURL = "http://localhost:5000/teams";

function Counter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${baseURL}/3`).then((response) => {
      setData(response.data);
    });
  }, []);
  function createPost() {
    let countDiff = 1;
    axios
      .post(baseURL, {
        stepCount: countDiff,
        score: countDiff,
      })
      .then((response) => {
        setCount(count + countDiff);
        setData(response.data);
        setLoading(false);
      });
  }

  if (!data) return "No data!";
  return (
    <div>
      <h1>Number on Steps taken by team B :{count}</h1>
      <p>Score:{data.score}</p>
      <h3>Total Counter of team B: {data.stepCount}</h3>
      <button onClick={createPost}>Count</button>
    </div>
    // <>
    //   {loading && (
    //     <div>
    //       {""}
    //       <h1>loading...</h1>
    //     </div>
    //   )}
    //   <h2>Step Counter:</h2>
    //   <h3>TotalCounter of team {count}</h3>
    //   <div>
    //     <button onClick={increaseCount}> fdd+</button>
    //   </div>
    //   ;
    // </>
  );
}
export default Counter;
