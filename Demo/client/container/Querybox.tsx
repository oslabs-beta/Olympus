// import { Query } from 'mongoose';
import React,{useState} from 'react';

type boxProps = {
  Query: propsQuery,
  queryArray: propQueryArray
}
type propsQuery = {
  hasRun: boolean;
  targetValue: string;
  demoTest: string;
  demoResult: string;
}
type propQueryArray = 
{
  query1: {
      queryString: string;
      resultString: string;
      mutationString: string;
      isCached: boolean;
      localStorageTimer: number;
      redisTimer: number;
      cacheMessage: string;
      beenMutated: boolean;
      cacheTime: null;
  };
  query2: {
    queryString: string;
      resultString: string;
      mutationString: string;
      isCached: boolean;
      localStorageTimer: number;
      redisTimer: number;
      cacheMessage: string;
      beenMutated: boolean;
      cacheTime: null;
  };
  query3: {
    queryString: string;
      resultString: string;
      mutationString: string;
      isCached: boolean;
      localStorageTimer: number;
      redisTimer: number;
      cacheMessage: string;
      beenMutated: boolean;
      cacheTime: null;
  };
  query4: {
    queryString: string;
      resultString: string;
      mutationString: string;
      isCached: boolean;
      localStorageTimer: number;
      redisTimer: number;
      cacheMessage: string;
      beenMutated: boolean;
      cacheTime: null;
  };
}

const Querybox = (props:boxProps) => {
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
              {props.Query.hasRun ? (<p>{props.Query.demoResult} <br></br>  {props.queryArray[props.Query.targetValue as keyof propQueryArray].cacheMessage} <br></br> {props.queryArray[props.Query.targetValue as keyof propQueryArray].cacheTime}  </p>) : (<p>{''}</p>)}
            </div>
          </div>
        </div>

    </div>
  )
}

export default Querybox