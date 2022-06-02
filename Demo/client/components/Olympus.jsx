import React, { useState, useEffect } from "react";
import LocalStorage from "../container/LocalStorage.jsx";
import RedisCache from "../container/RedisStorage.jsx";
import Querybox from "../container/Querybox.jsx";
import "../styles/Olympus.css";

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
  const isCached = (key) => {
    const stateCopy = { ...queryArray };
    stateCopy[key].isCached = true;
    setQueryArray(stateCopy);
  };

  const cacheTime = (key, value) => {
    const stateCopy = { ...queryArray };
    stateCopy[key].cacheTime = value;
    setQueryArray(stateCopy);
  };

  function normal(mu, sigma, nsamples) {
    if (!nsamples) nsamples = 6;
    if (!sigma) sigma = 1;
    if (!mu) mu = 0;

    var run_total = 0;
    for (var i = 0; i < nsamples; i++) {
      run_total += Math.random();
    }

    return (sigma * (run_total - nsamples / 2)) / (nsamples / 2) + mu;
  }

  const redisTimer = (key) => {
    const stateCopy = { ...queryArray };
    stateCopy[key].redisTimer = stateCopy[key].redisTimer - 1;
    setQueryArray(stateCopy);
  };
  const localStorageTimer = (key) => {
    const stateCopy = { ...queryArray };
    stateCopy[key].localStorageTimer = stateCopy[key].localStorageTimer - 1;
    setQueryArray(stateCopy);
  };

  const cacheMessage = (key, value) => {
    const stateCopy = { ...queryArray };
    stateCopy[key].cacheMessage = value;
    setQueryArray(stateCopy);
  };

  const runQuery = () => {
    const copyArray = { ...Query };
    copyArray.hasRun = true;
    copyArray.demoResult = queryArray[Query.targetValue].resultString;
    setQuery(copyArray);
    if (!queryArray[Query.targetValue].isCached) {
      let t3 = normal(150, 50, 200);
      t3 = t3.toFixed(3);
      t3 = t3 + "ms Response";
      cacheTime(Query.targetValue, t3);
      console.log("here", queryArray[Query.targetValue]);
      if (Query.targetValue !== "Query String Here") {
        isCached(Query.targetValue);
        console.log("queryArrayLocal", queryArray);
        console.log("QueryLocal", Query);
        let runInterval = setInterval(() => {
          localStorageTimer(Query.targetValue);

          if (
            queryArray[Query.targetValue].localStorageTimer <= 0 ||
            queryArray[Query.targetValue].beenMutated
          ) {
            clearInterval(runInterval);
          }
        }, 1000);

        console.log("queryArrayRedis", queryArray);
        console.log("QueryRedis", Query);
        let runRedis = setInterval(() => {
          redisTimer(Query.targetValue);
          if (
            queryArray[Query.targetValue].redisTimer <= 0 ||
            queryArray[Query.targetValue].beenMutated
          ) {
            clearInterval(runRedis);
            const copyState = { ...queryArray };
            copyState[Query.targetValue].beenMutated = false;
            copyState[Query.targetValue].isCached = false;
            copyState[Query.targetValue].localStorageTimer = 10;
            copyState[Query.targetValue].redisTimer = 60;
            setQueryArray(copyState);
            console.log("clearinterval state", queryArray);
          }
        }, 1000);
      }
    } else {
      if (queryArray[Query.targetValue].localStorageTimer > 0) {
        cacheMessage(Query.targetValue, "From Local Storage");
        const t1 = "<1 ms Response Time";
        cacheTime(Query.targetValue, t1);
        console.log("here", queryArray[Query.targetValue]);
      } else if (queryArray[Query.targetValue].redisTimer > 0) {
        cacheMessage(Query.targetValue, "From Redis Cache");
        let t2 = normal(10, 6, 200);
        t2 = t2.toFixed(3);
        t2 = t2 + " ms Response Time";
        cacheTime(Query.targetValue, t2);
        console.log("here", queryArray[Query.targetValue]);
      } else if (queryArray[Query.targetValue].redisTimer === 0) {
        cacheMessage(Query.targetValue, "Cache Missed");
        let t3 = normal(150, 50, 200);
        t3 = t3.toFixed(3);
        t3 = t3 + " ms Response Time";
        cacheTime(Query.targetValue, t3);
        const copyState = { ...queryArray };
        copyState[Query.targetValue] = defaultState[Query.targetValue];
        setQueryArray(copyState);
        console.log("here", queryArray[Query.targetValue]);
      }
    }
  };

  const runMutation = () => {
    const queryCopy = { ...Query };
    queryCopy.demoResult = queryArray[Query.targetValue].mutationString;
    setQuery(queryCopy);
    const copyState = { ...queryArray };
    copyState[Query.targetValue].beenMutated = true;
    copyState[Query.targetValue].isCached = false;
    copyState[Query.targetValue].cacheTime = null;
    copyState[Query.targetValue].localStorageTimer = 10;
    copyState[Query.targetValue].redisTimer = 60;
    copyState[Query.targetValue].cacheMessage = " Cache Missed";
    setQueryArray(copyState);
  };

  const dropDown = (e) => {
    if (e.target.value !== "Query String Here") {
      // console.log(e.target.value)
      console.log(Query);
      let tempObj = { ...Query };
      tempObj.hasRun = false;
      tempObj.targetValue = e.target.value;
      tempObj.demoTest = queryArray[e.target.value].queryString;
      tempObj.demoResult = queryArray[e.target.value].resultString;
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
