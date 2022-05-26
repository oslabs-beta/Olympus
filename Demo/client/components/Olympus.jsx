import React from "react";
import Trend from "react-trend";
import Querybox from "../container/querybox.jsx";
import "../styles/Olympus.css";

const Olympus = () => {
  const runQuery = () => {
    console.log("yes");
  };

  const addOne = () => {
    console.log("yes");
  };

  // olympus function     
    // const data =  await Olympus({
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json; charset=utf-8'},
    //   body: JSON.stringify({query: query.value})
    // });

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
        <div className='row'>
          <Querybox style= {{width:"25%"}}/>
          <Querybox style= {{width:"75%"}}/>
        </div>
      </div>
      <div className="query-buttons">
        <select className="dropdown">
          <option value={"Query String Here"}>None Selected</option>
          <option>Query for films</option>
          <option>Query for planets</option>
          <option>Query for species</option>
          <option>Query for vessels</option>
        </select>
        <button className="get-button" onClick={runQuery}>
          Run Query
        </button>
        <button className="mutation-button" onClick={addOne}>
          Run Mutation
        </button>
      </div>
    </div>
  );
};

export default Olympus;
