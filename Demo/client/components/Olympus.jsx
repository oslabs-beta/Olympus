import React,{useState,useEffect} from 'react'
import LocalStorage from "../container/LocalStorage.jsx";
import RedisCache from "../container/RedisStorage.jsx";
import Querybox from "../container/querybox.jsx";
import "../styles/Olympus.css";

const Olympus = () => {

  const [queryArray, setQueryArray] = useState({
    query1: {queryString:  "{ test { query1 } }", resultString:"{ result { query1 } }",  mutationString:"{ mutation {query1}}", isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed',  beenMutated:false},
    query2: {queryString:  "{ test { query2 } }", resultString :"{ result { query2 } }", mutationString:"{ mutation {query2}}", isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed',  beenMutated:false},
    query3: {queryString:  "{ test { query3 } }", resultString:"{ result { query3 } }",  mutationString:"{ mutation {query3}}", isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed',  beenMutated:false},
    query4: {queryString:  "{ test { query4 } }", resultString:"{ result { query4 } }",  mutationString:"{ mutation {query4}}", isCached:false, localStorageTimer:10, redisTimer:60, cacheMessage: ' Cache Missed',  beenMutated:false},
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
    const stateCopy = {...queryArray};
    stateCopy[key].redisTimer = stateCopy[key].redisTimer - 1
    setQueryArray(stateCopy)
  }
  const localStorageTimer = (key) => {
    const stateCopy = {...queryArray};
    stateCopy[key].localStorageTimer = stateCopy[key].localStorageTimer - 1
    setQueryArray(stateCopy)
  }

  
  const cacheMessage = (key, value) => {
    const stateCopy = {...queryArray};
    stateCopy[key].cacheMessage = value
    setQueryArray(stateCopy)

  }

  const runQuery = () => {
    const copyArray = {...Query}
    copyArray.hasRun = true
    copyArray.demoResult = queryArray[Query.targetValue].resultString
    setQuery(copyArray);
   if(!queryArray[Query.targetValue].isCached) {
    if (Query.targetValue !== "Query String Here") {
       isCached(Query.targetValue)
       console.log("queryArrayLocal", queryArray)
       console.log("QueryLocal", Query)
      let runInterval = setInterval(() => {
        localStorageTimer(Query.targetValue)
  
         if(queryArray[Query.targetValue].localStorageTimer <= 0 || queryArray[Query.targetValue].beenMutated) {
           clearInterval(runInterval)
        }
      }, 1000)

      console.log("queryArrayRedis", queryArray)
      console.log("QueryRedis", Query)
      let runRedis = setInterval(() => {
        redisTimer(Query.targetValue)
         if( queryArray[Query.targetValue].redisTimer <= 0 || queryArray[Query.targetValue].beenMutated) {
           clearInterval(runRedis)
          const copyState = {...queryArray}
          copyState[Query.targetValue].beenMutated = false
          copyState[Query.targetValue].isCached = false
          copyState[Query.targetValue].localStorageTimer = 10
          copyState[Query.targetValue].redisTimer = 60
          setQueryArray(copyState);
          console.log('clearinterval state',queryArray)
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
    const queryCopy = {...Query};
    queryCopy.demoResult = queryArray[Query.targetValue].mutationString;
    setQuery(queryCopy);
    const copyState = {...queryArray}
    copyState[Query.targetValue].beenMutated = true
    copyState[Query.targetValue].isCached = false
    copyState[Query.targetValue].localStorageTimer = 10
    copyState[Query.targetValue].redisTimer = 60
    setQueryArray(copyState);
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
      
      <div className="demo">
        <ul className="demo-instructions">
        <h2>Try out our Demo</h2>
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
