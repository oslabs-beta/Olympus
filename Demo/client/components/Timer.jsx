import React from 'react'
import { useState, useEffect} from 'react';

const Timer = (props) => {
    const [counter, setCounter] = useState(10);
    if (counter > 0){
      // console.log('')
      props.StorageMessage(props.Query,'local storage cache')
    } else if(counter===0 || counter < 0){
      props.StorageMessage(props.Query,'Redis Cache')
    }
    useEffect(() => {
      // props.StorageMessage(props.Query,'local storage cache')

      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      console.log("this is counter", counter)
      console.log('this is timer:', timer)
      return () => clearInterval(timer);
      
    }, [counter]);
    // if(counter > 0  && 11>counter){
    //   props.StorageMessage(props.Query,'local storage cache')
    // }else if(counter===0){
    //   props.StorageMessage(props.Query,'Redis Cache')
    // }
    
    // if(counter > 11){
      
    // }

    return (
      <div>
        Countdown: {counter}
      </div>
    );
}



export default Timer;


