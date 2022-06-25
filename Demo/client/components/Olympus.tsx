import React, { useState, useEffect } from "react";
import LocalStorage from "../container/LocalStorage";
import RedisCache from "../container/RedisStorage";
import Querybox from "../container/Querybox";
import "../styles/Olympus.css";

type bigQuery ={
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

const Olympus = () => {
  const [queryArray, setQueryArray] = useState({
    query1: {
      queryString:
        "{ empireHero: hero(episode: EMPIRE) { name } jediHero: hero(episode: JEDI) { name } }",
      resultString:
        '{ "data": { "empireHero": { "name": "Anakin Skywalker" }, "jediHero": { "name": "R2-D2" } } }',
      mutationString: '{ "data": { "empireHero": { "name": "Darth Vader" }, "jediHero": { "name": "R2-D2" } } }',
      isCached: false,
      localStorageTimer: 10,
      redisTimer: 60,
      cacheMessage: " Cache Missed",
      beenMutated: false,
      cacheTime: null,
    },
    query2: {
      queryString: '{ human(id: "1000") { name height } }',
      resultString:
        '{ "data": { "human": { "name": "Luke Skywalker", "height": 1.72 } } }',
      mutationString: '{ "data": { "human": { "name": "Luke Skywalker", "height": 2 } } }',
      isCached: false,
      localStorageTimer: 10,
      redisTimer: 60,
      cacheMessage: " Cache Missed",
      beenMutated: false,
      cacheTime: null,
    },
    query3: {
      queryString: '{ human(id: "1000") { name homeworld }',
      resultString:
        '{ "data": { "human": { "name": "Luke Skywalker", "homeworld": Tatooine } } }',
      mutationString: '{ "data": { "human": { "name": "Luke Skywalker", "homeworld": Naboo } } }',
      isCached: false,
      localStorageTimer: 10,
      redisTimer: 60,
      cacheMessage: " Cache Missed",
      beenMutated: false,
      cacheTime: null,
    },
    query4: {
      queryString:
        "{ hero { name } }",
      resultString:
      '{ "data": { "hero": { "name": "R2-D2" } } }',
      mutationString: '{ "data": { "hero": { "name": "C3PO" } } }',
      isCached: false,
      localStorageTimer: 10,
      redisTimer: 60,
      cacheMessage: " Cache Missed",
      beenMutated: false,
      cacheTime: null,
    },
  });

  const defaultState = {
    query1: {
      queryString: "",
      resultString: "{ result { query1 } }",
      mutationString: "{ mutation { query1 } }",
      isCached: false,
      localStorageTimer: 10,
      redisTimer: 60,
      cacheMessage: " Cache Missed",
      beenMutated: false,
      cacheTime: null,
    },
    query2: {
      queryString: "{ test { query2 } }",
      resultString: "{ result { query2 } }",
      mutationString: "{ mutation { query2 } }",
      isCached: false,
      localStorageTimer: 10,
      redisTimer: 60,
      cacheMessage: " Cache Missed",
      beenMutated: false,
      cacheTime: null,
    },
    query3: {
      queryString: "{ test { query3 } }",
      resultString: "{ result { query3 } }",
      mutationString: "{ mutation { query3 } }",
      isCached: false,
      localStorageTimer: 10,
      redisTimer: 60,
      cacheMessage: " Cache Missed",
      beenMutated: false,
      cacheTime: null,
    },
    query4: {
      queryString: "{ test { query4 } }",
      resultString: "{ result { query4 } }",
      mutationString: "{ mutation { query4 } }",
      isCached: false,
      localStorageTimer: 10,
      redisTimer: 60,
      cacheMessage: " Cache Missed",
      beenMutated: false,
      cacheTime: null,
    },
  };

  const [Query, setQuery] = useState({
    hasRun: false,
    targetValue: "",
    demoTest: "",
    demoResult: "",
  });
  const isCached = (key:string) => {
    const stateCopy:bigQuery = { ...queryArray };
    // const temp = stateCopy[key as keyof bigQuery]
    stateCopy[key as keyof bigQuery].isCached = true;
    setQueryArray(stateCopy);
  };
  //value here shouldn't be any
  //tried null|number|string didnt work ??? might as well put any i guess
  const cacheTime = (key:string, value: any) => {
    const stateCopy:bigQuery = { ...queryArray };
    stateCopy[key as keyof bigQuery].cacheTime = value;
    setQueryArray(stateCopy);
  };

  function normal(mu:number, sigma:number, nsamples:number) {
    if (!nsamples) nsamples = 6;
    if (!sigma) sigma = 1;
    if (!mu) mu = 0;

    var run_total = 0;
    for (var i = 0; i < nsamples; i++) {
      run_total += Math.random();
    }

    return (sigma * (run_total - nsamples / 2)) / (nsamples / 2) + mu;
  }

  const redisTimer = (key:string) => {
    const stateCopy = { ...queryArray };
    stateCopy[key as keyof bigQuery].redisTimer = stateCopy[key as keyof bigQuery].redisTimer - 1;
    setQueryArray(stateCopy);
  };
  const localStorageTimer = (key:string) => {
    const stateCopy = { ...queryArray };
    stateCopy[key as keyof bigQuery].localStorageTimer = stateCopy[key as keyof bigQuery].localStorageTimer - 1;
    setQueryArray(stateCopy);
  };

  const cacheMessage = (key:string, value:string) => {
    const stateCopy = { ...queryArray };
    stateCopy[key as keyof bigQuery].cacheMessage = value;
    setQueryArray(stateCopy);
  };

  const runQuery = () => {
    const copyArray = { ...Query };
    copyArray.hasRun = true;
    copyArray.demoResult = queryArray[Query.targetValue as keyof bigQuery].resultString;
    setQuery(copyArray);
    if (!queryArray[Query.targetValue as keyof bigQuery].isCached) {
      let t3: string|number = normal(150, 50, 200);
      t3 = t3.toFixed(3);
      t3 = t3 + "ms Response";
      cacheTime(Query.targetValue, t3);
      console.log("here", queryArray[Query.targetValue as keyof bigQuery]);
      if (Query.targetValue !== "Query String Here") {
        isCached(Query.targetValue);
        console.log("queryArrayLocal", queryArray);
        console.log("QueryLocal", Query);
        let runInterval = setInterval(() => {
          localStorageTimer(Query.targetValue);

          if (
            queryArray[Query.targetValue as keyof bigQuery].localStorageTimer <= 0 ||
            queryArray[Query.targetValue as keyof bigQuery].beenMutated
          ) {
            clearInterval(runInterval);
          }
        }, 1000);

        console.log("queryArrayRedis", queryArray);
        console.log("QueryRedis", Query);
        let runRedis = setInterval(() => {
          redisTimer(Query.targetValue);
          if (
            queryArray[Query.targetValue as keyof bigQuery].redisTimer <= 0 ||
            queryArray[Query.targetValue as keyof bigQuery].beenMutated
          ) {
            clearInterval(runRedis);
            const copyState = { ...queryArray };
            copyState[Query.targetValue as keyof bigQuery].beenMutated = false;
            copyState[Query.targetValue as keyof bigQuery].isCached = false;
            copyState[Query.targetValue as keyof bigQuery].localStorageTimer = 10;
            copyState[Query.targetValue as keyof bigQuery].redisTimer = 60;
            setQueryArray(copyState);
            console.log("clearinterval state", queryArray);
          }
        }, 1000);
      }
    } else {
      if (queryArray[Query.targetValue as keyof bigQuery].localStorageTimer > 0) {
        cacheMessage(Query.targetValue, "From Local Storage");
        const t1: number|string = "<1 ms Response Time";
        cacheTime(Query.targetValue, t1);
        console.log("here", queryArray[Query.targetValue as keyof bigQuery]);
      } else if (queryArray[Query.targetValue as keyof bigQuery].redisTimer > 0) {
        cacheMessage(Query.targetValue, "From Redis Cache");
        let t2: number|string = normal(10, 6, 200);
        t2 = t2.toFixed(3);
        t2 = t2 + " ms Response Time";
        cacheTime(Query.targetValue, t2);
        console.log("here", queryArray[Query.targetValue as keyof bigQuery]);
      } else if (queryArray[Query.targetValue as keyof bigQuery].redisTimer === 0) {
        cacheMessage(Query.targetValue, "Cache Missed");
        let t3: number|string = normal(150, 50, 200);
        t3 = t3.toFixed(3);
        t3 = t3 + " ms Response Time";
        cacheTime(Query.targetValue, t3);
        const copyState = { ...queryArray };
        copyState[Query.targetValue as keyof bigQuery] = defaultState[Query.targetValue as keyof bigQuery];
        setQueryArray(copyState);
        console.log("here", queryArray[Query.targetValue as keyof bigQuery]);
      }
    }
  };

  const runMutation = () => {
    const queryCopy = { ...Query };
    queryCopy.demoResult = queryArray[Query.targetValue as keyof bigQuery].mutationString;
    setQuery(queryCopy);
    const copyState = { ...queryArray };
    copyState[Query.targetValue as keyof bigQuery].beenMutated = true;
    copyState[Query.targetValue as keyof bigQuery].isCached = false;
    copyState[Query.targetValue as keyof bigQuery].cacheTime = null;
    copyState[Query.targetValue as keyof bigQuery].localStorageTimer = 10;
    copyState[Query.targetValue as keyof bigQuery].redisTimer = 60;
    copyState[Query.targetValue as keyof bigQuery].cacheMessage = " Cache Missed";
    setQueryArray(copyState);
  };
  //added event listener REACT.CHANGEEVENT  no sure how it works. 
  const dropDown = (e: any) => {
    if (e.target.value !== "Query String Here") {
      // console.log(e.target.value)
      console.log(Query);
      let tempObj = { ...Query };
      tempObj.hasRun = false;
      tempObj.targetValue = e.target.value;
      tempObj.demoTest = queryArray[e.target.value as keyof bigQuery].queryString;
      tempObj.demoResult = queryArray[e.target.value as keyof bigQuery].resultString;
      setQuery(tempObj);
    }
  };
  const reload = () => {
    return window.location.reload();
  };

  return (
    <div className="demo-container">
      <h2>DEMO OUR PRODUCT</h2>
      <br></br>
      <div className="demo">
        <ul className="demo-instructions">
          <p className="info">
            {" "}
            Click a query in the drop down menu and click "Run Query"
          </p>
          <li className="info">
            {" "}
            Query will be stored in local storage for 10 seconds and Redis for
            60 seconds{" "}
          </li>
          <li className="info">
            {" "}
            Running the query subsequently will improve response times in Result
            of Query{" "}
          </li>
          <li className="info"> TTL* = Time to Live </li>
          {/* <br></br> */}
        </ul>
        <br></br>
        <div className="row">
          <Querybox Query={Query} queryArray={queryArray} key="querybox" />
          <LocalStorage queryArray={queryArray} key="localstorage" />
          <RedisCache queryArray={queryArray} key="redisCache" />
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
