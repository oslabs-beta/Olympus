import React,{useState,useEffect} from 'react';

import LocalStorage from "../container/LocalStorage.jsx";
import Querybox from "../container/querybox.jsx";
import TimePassed from './TimePassed.jsx';
import "../styles/Olympus.css";
import Timer from './Timer.jsx';

const Olympus = () => {

  const [queryArray, setQueryArray] = useState({
    query1: {queryString:  "{ test { query1} }", resultString:"{ result { query1} }", isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: 'Cache Missed'},
    query2: {queryString:  "{ test { query2} }", resultString:"{ result { query2} }", isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: 'Cache Missed'},
    query3: {queryString:  "{ test { query3} }", resultString:"{ result { query3} }", isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: 'Cache Missed'},
    query4: {queryString:  "{ test { query4} }", resultString:"{ result { query4} }", isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: 'Cache Missed'},
  });
  const [Query, setQuery] = useState({
    targetValue: '',
    demoTest: '',
    demoResult:'',
    
  })
   const isCached = (key) => {
     const stateCopy = {...queryArray};
     console.log(stateCopy)
     console.log("thisiskey", key)
     console.log("atKey", stateCopy[key])
     stateCopy[key].isCached = true;
     setQueryArray(stateCopy)
   }

  const localStorageTimer = (key) => {
    // if(stateCopy[key].localStorageTimer === 0 ) return clearInterval()
    const stateCopy = {...queryArray};
    stateCopy[key].localStorageTimer = stateCopy[key].localStorageTimer - 1
    setQueryArray(stateCopy)
  }
  
  const cacheMesage = (key, value) => {
    const stateCopy = {...queryArray};
    stateCopy[key].cacheMesage = value
    setQueryArray(stateCopy)
  }

  const runQuery = () => {
    if (Query.targetValue !== "Query String Here") {
      console.log('run query target value',Query.targetValue)
       isCached(Query.targetValue)
      let runInterval = setInterval(() => {
        localStorageTimer(Query.targetValue)
        console.log("timeleft", queryArray[Query.targetValue].localStorageTimer)
        console.log("isLess", queryArray[Query.targetValue].localStorageTimer <= 0)
         if(queryArray[Query.targetValue].localStorageTimer <= 0) {
           cacheMesage(Query.targetValue, "Redis Cache")
           clearInterval(runInterval)
        }
      }, 1000)
      
    }
  };

  const runMutation = () => {
    
  };

  const dropDown = (e) => {
    if (e.target.value !== "Query String Here") {
      // console.log(e.target.value)
      let tempObj = {...Query}
      tempObj.targetValue = e.target.value
      tempObj.demoTest = queryArray[e.target.value].queryString
      tempObj.demoResult = queryArray[e.target.value].resultString
      setQuery(tempObj)
    }
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
            Query = {Query}
            key= 'querybox'
          />
          <LocalStorage
          queryArray = {queryArray}
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
        {/* <button className="reset-button" onClick={reset}>
          Reset
        </button> */}
      </div>
      </div>
    </div>
  );
};

export default Olympus;
