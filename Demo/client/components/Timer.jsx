import React from 'react'
import { useState, useEffect} from 'react';

const  Timer = (props) => {
    const [counter, setCounter] = useState(10);
  
    useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);
  
    return (
      <div>
        Countdown: {counter}
      </div>
    );
  }



export default Timer;

