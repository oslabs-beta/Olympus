import React from 'react'
import { useState, useEffect} from 'react';

const Timer = (props) => {
    const [counter, setCounter] = useState(10);
  
    useEffect(() => {
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
      
    }, [counter]);
    if(11 > counter && counter >0 ){
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


