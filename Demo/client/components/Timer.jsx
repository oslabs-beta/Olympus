import React from 'react'
import { useState, useEffect} from 'react';

const Timer = (props) => {
    const [counter, setCounter] = useState(10);
  
    useEffect(() => {
      // props.StorageMessage(props.Query,'local storage cache')

      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
      
    }, [counter]);
    if(counter > 0){
      props.StorageMessage(props.Query,'local storage cache')
    }else{
      props.StorageMessage(props.Query,'Redis Cache')
    }
    
    // if(counter > 11){
      
    // }

    return (
      <div>
        Countdown: {counter}
      </div>
    );
}



export default Timer;


