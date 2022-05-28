import React,{useState} from 'react';

import LocalStorage from "../container/LocalStorage.jsx";
import Querybox from "../container/querybox.jsx";
import "../styles/Olympus.css";
import Timer from './Timer.jsx';

const Olympus = () => {

   //// we want to be able to see TTL for both LocalStorage and Redis
     /// 1 ideas - individual timers for each query result
     /// 2 putting a time into query state and decrementing every second
     /// 3 Bryan's idea

  // If the timer is within 0 to 10 seconds, then the data is in local storage
  // If the time is within 10 to 60 seconds, the data is in REDIS
  
  // NEED TO CREATE A REDIS BOX

  const [queryState, setQueryState] = useState({
    query1: "{ test { query1} }",
    query2: "{ test { query2} }",
    query3: "{ test { query3} }",
    query4: "{ test { query4} }",
  });

  const [queryResult, setqueryResult] = useState({
    query1: "{ result { query1} }",
    query2: "{ result { query2} }",
    query3: "{ result { query3} }",
    query4: "{ result { query4} }",
  });

  const [mutationState, setMutationState] = useState({
    query1: "{ test { mutation1} }",
    query2: "{ test { mutation2} }",
    query3: "{ test { mutation3} }",
    query4: "{ test { mutation4} }",
  });

  const [Query, setQuery] = useState('');
  const [Mutation, setMutation] = useState('');
  const [Result, setResult] = useState('');
  const [runQueryState, setRunQuery] = useState(false);
  const [localStorageState, setLocalStorage] =  useState(false);
  const [Cache, setCache] = useState([]);
  const [cached, setCached] = useState({
    "{ test { query1} }": false,
    "{ test { query2} }": false,
    "{ test { query3} }": false,
    "{ test { query4} }": false,
  })
  // const [localTimer, setlocalTimer] = useState(second)

  const [dataLocation, setDataLocation] = useState("Cache Miss")
   
   

  const runQuery = () => {
    console.log('check', Query)
    setRunQuery(true);
    setLocalStorage(true)  
  };

  const runMutation = () => {
    
  };
  const dropDown = (e) => {
    setQuery(queryState[e.target.value]);
    setResult(queryResult[e.target.value]);
    setRunQuery(false);
    console.log(Query);
  }
  
  const reset = (e) => {
    setQuery('');
    setResult('');
    setRunQuery(false);
    window.location.reload(false);
  };

  // const localTime = (time)=>{
    
  // };

  if(localStorageState && !cached[Query]) {
    console.log('check')
    const newCache = Cache.slice()
    const newCached = {...cached}
    newCached[Query] = true
    newCache.push(<br></br>)
    newCache.push(<div> {Query} : {Result}   <Timer /></div>)
    setCache(newCache)
    setLocalStorage(false)
    setCached(newCached)
  }

  return (
    <div className="demo-container">
      <h2>Try out our Demo</h2>
      <div className="demo">
        <ul className="demo-instructions">
          <li>Select a type of query and run the query</li>
          <li>Note the performance improvement on subsequent requests</li>
          <li>
            Test out a simple mutation query, it passes through unaffected
          </li>
        </ul>
        <br></br>
        <div className='row'>
          <Querybox 
          Query={Query} 
          Result={Result} 
          runQueryState = {runQueryState}
          />
          <LocalStorage 
          Cache = {Cache}
          />

        </div>
        
        <div className="query-buttons">
        <select className="dropdown" onChange={dropDown}>
          <option value={"Query String Here"}>None Selected</option>
          <option value={"query1"}>Query 1</option>
          <option value={"query2"}>Query 2</option>
          <option value={"query3"}>Query 3</option>
          <option value={"query4"}>Query 4</option>
        </select>
        <button className="get-button" onClick={runQuery}>
          Run Query
        </button>
        <button className="mutation-button" onClick={runMutation}>
          Run Mutation
        </button>
        <button className="reset-button" onClick={reset}>
          Reset
        </button>
      </div>
      </div>
    </div>
  );
};

export default Olympus;
