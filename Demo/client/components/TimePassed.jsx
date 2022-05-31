import React from 'react'
import { useState, useEffect} from 'react';

const TimePassed = (props) => {
    // const [counter, setCounter] = useState(0);
  
    // useEffect(() => {
    //   const timer =  setInterval(() => setCounter(counter + 1), 1000);
    //   return () => clearInterval(timer);
    // }, [counter]);
    
    return (
      <div>
          {/* <div>Countdown: {counter}</div> */}
          <div>Where the query was pulled from: {props.Storage[props.Query]}</div>

      </div>
    );
}



export default TimePassed;

