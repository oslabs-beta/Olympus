import React,{useState,useEffect} from 'react';

import LocalStorage from "../container/LocalStorage.jsx";
import RedisCache from "../container/RedisStorage.jsx";

import Querybox from "../container/querybox.jsx";
import "../styles/Olympus.css";

const Olympus = () => {

  const [queryArray, setQueryArray] = useState({
    query1: {queryString:  "{ test { query1 } }", resultString:"{ result { query1 } }", mutationString:"{ mutation {query1}}",isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed', beenMutated:false},
    query2: {queryString:  "{ test { query2 } }", resultString:"{ result { query2 } }", mutationString:"{ mutation {query2}}",isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed', beenMutated:false},
    query3: {queryString:  "{ test { query3 } }", resultString:"{ result { query3 } }", mutationString:"{ mutation {query3}}",isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed', beenMutated:false},
    query4: {queryString:  "{ test { query4 } }", resultString:"{ result { query4 } }", mutationString:"{ mutation {query4}}",isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed', beenMutated:false},
  });

  const defaultState = {
    query1: {queryString:  "{ test { query1 } }", resultString:"{ result { query1 } }", mutationString:"{ mutation { query1 } }",isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed', beenMutated:false},
    query2: {queryString:  "{ test { query2 } }", resultString:"{ result { query2 } }", mutationString:"{ mutation { query2 } }",isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed', beenMutated:false},
    query3: {queryString:  "{ test { query3 } }", resultString:"{ result { query3 } }", mutationString:"{ mutation { query3 } }",isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed', beenMutated:false},
    query4: {queryString:  "{ test { query4 } }", resultString:"{ result { query4 } }", mutationString:"{ mutation { query4 } }",isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed', beenMutated:false},
  }
  
  const [Query, setQuery] = useState({
    hasRun: false, 
    targetValue: '',
    demoTest: '',
    demoResult:''
  })
   const isCached = (key) => {
     const stateCopy = {...queryArray};
     stateCopy[key].isCached = true;
     setQueryArray(stateCopy)
   }


  const redisTimer = (key) => {
    // if(stateCopy[key].redisTimer === 0 ) return clearInterval()
    // if(Query.beenMutated) return

    const stateCopy = {...queryArray};
    stateCopy[key].redisTimer = stateCopy[key].redisTimer - 1
    setQueryArray(stateCopy)
  }
  const localStorageTimer = (key) => {
    // if(stateCopy[key].localStorageTimer === 0 ) return clearInterval()
    const stateCopy = {...queryArray};
    stateCopy[key].localStorageTimer = stateCopy[key].localStorageTimer - 1
    setQueryArray(stateCopy)
  }

  
  const cacheMessage = (key, value) => {
    const stateCopy = {...queryArray};
    stateCopy[key].cacheMessage = value
    setQueryArray(stateCopy)
    // const queryCopy = {...Query};
    // queryCopy[key].demoResult = Query.demoResult + value;
    // setQuery(queryCopy)
  }

  const runQuery = () => {
    const copyArray = {...Query}
    copyArray.hasRun = true
    copyArray.demoResult = queryArray[Query.targetValue].resultString
    setQuery(copyArray);
   if(!queryArray[Query.targetValue].isCached) {
    if (Query.targetValue !== "Query String Here") {
      // console.log('run query target value',Query.targetValue)
       isCached(Query.targetValue)
      let runInterval = setInterval(() => {
        localStorageTimer(Query.targetValue)
        // console.log('run query target value',Query.targetValue)
        // console.log("timeleft", queryArray[Query.targetValue].localStorageTimer)
        // console.log("isLess", queryArray[Query.targetValue].localStorageTimer <= 0)
         if(queryArray[Query.targetValue].localStorageTimer <= 0 || queryArray[Query.targetValue].beenMutated) {
          //  cacheMessage(Query.targetValue, "Redis Cache")
           
           clearInterval(runInterval)
           const copyState = {...queryArray}
           copyState[Query.targetValue] = defaultState[Query.targetValue]
           setQueryArray(copyState);
       
        }
      }, 1000)
      let runRedis = setInterval(() => {
        redisTimer(Query.targetValue)
        // console.log('run query target value',Query.targetValue)
        // console.log("timeleft", queryArray[Query.targetValue].redisTimer)
        // console.log("isLess", queryArray[Query.targetValue].redisTimer <= 0)
         if( queryArray[Query.targetValue].redisTimer <= 0 || queryArray[Query.targetValue].beenMutated) {
          //  cacheMessage(Query.targetValue, "cache Missed")
           clearInterval(runRedis)
           const copyState = {...queryArray}
           copyState[Query.targetValue] = defaultState[Query.targetValue]
           setQueryArray(copyState);
       
        }
      }, 1000)
      
    }
  } else {
    if(queryArray[Query.targetValue].localStorageTimer > 0) {
      cacheMessage(Query.targetValue, "From Local Storage")
    }
    else if(queryArray[Query.targetValue].redisTimer > 0){
      cacheMessage(Query.targetValue, "From Redis Cache")
    }else if(queryArray[Query.targetValue].redisTimer === 0 ){
      cacheMessage(Query.targetValue, "Cache Missed")
      const copyState = {...queryArray}
      copyState[Query.targetValue] = defaultState[Query.targetValue]
      setQueryArray(copyState);
    }
  }
};

  const runMutation = () => {
    // mutation shows up in demo result query box 
    // Local storage timer, redis storage timer, message is reset 

    const queryCopy = {...Query};
    queryCopy.demoResult = queryArray[Query.targetValue].mutationString;
    setQuery(queryCopy);
    const copyState = {...queryArray}
    if(copyState[Query.targetValue].isCached) { 
    copyState[Query.targetValue].beenMutated = true
    copyState[Query.targetValue].isCached = false
    setQueryArray(copyState);
    }
  };

  const dropDown = (e) => {    
    if (e.target.value !== "Query String Here") {
      // console.log(e.target.value)
      console.log(Query)
      let tempObj = {...Query}
      tempObj.hasRun = false
      tempObj.targetValue = e.target.value
      tempObj.demoTest = queryArray[e.target.value].queryString
      tempObj.demoResult = queryArray[e.target.value].resultString 
      setQuery(tempObj)
    }
  }
  const reload = ()=>{
    return window.location.reload();
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
            queryArray = {queryArray}
            key= 'querybox'
          />
          <LocalStorage
            queryArray = {queryArray}
            key='localstorage'
          />
           <RedisCache
            queryArray = {queryArray}
            key='redisCache'
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
        <button className="reset-button" onClick={reload}>
          Reset
        </button>
      </div>
      </div>
    </div>
  );
};

export default Olympus;
