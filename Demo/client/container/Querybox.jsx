// import { Query } from 'mongoose';
import React,{useState} from 'react';
const Querybox = (props) => {
  return (
    <div className='column'>
        <div className="demo-display">
          <div>
            <div
              style={{
                height: "25vh",
                backgroundColor: "grey",
                width: "25rem",
                borderRadius: "5px",
                border: "solid 1px black",
              }}
            >
              <h2>Olympus Demo Query</h2>
              <p>{props.Query.demoTest}</p>
            </div>
            <br></br>
            <div
              style={{    
                height: "25vh",
                backgroundColor: "grey",
                width: "25rem",
                borderRadius: "5px",
                border: "solid 1px black",
              }}
            >
              <h2>Response</h2>
              {props.Query.hasRun ? (<p>{props.Query.demoResult} <br></br>  {props.queryArray[props.Query.targetValue].cacheMessage} <br></br> {props.queryArray[props.Query.targetValue].cacheTime}  </p>) : (<p>{''}</p>)}
            </div>
          </div>
        </div>

    </div>
  )
}

export default Querybox