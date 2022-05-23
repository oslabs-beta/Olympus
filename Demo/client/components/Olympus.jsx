import React from "react";
import Trend from "react-trend";
import "../styles/Olympus.css";

const Olympus = () => {
  const runQuery = () => {
    console.log("yes");
  };

  const addOne = () => {
    console.log("yes");
  };
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
        <div className="demo-display">
          <div>
            <div
              className="scroll-view"
              style={{
                overflow: "scroll",
                height: "25vh",
                backgroundColor: "lightgray",
                width: "40rem",
                borderRadius: "5px",
                border: "solid 1px black",
              }}
            >
              <code>Olympus Demo Query</code>
            </div>
            <br></br>
            <div
              className="scroll-view"
              style={{
                overflow: "scroll",
                height: "25vh",
                backgroundColor: "lightgray",
                width: "40rem",
                borderRadius: "5px",
                border: "solid 1px black",
              }}
            >
              <code>Olympus Demo Result of Query</code>
            </div>
          </div>
          <div>
            <div className="graph">
              <h3 style={{ color: "gold" }}>Network Trend Graph</h3>
              <Trend
                className="Trend-Chart"
                smooth={true}
                autoDrawDuration={3000}
                autoDrawEasing="ease-out"
                //   data={fetchTimes}
                //Sample data
                data={[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]}
                gradient={["#00c6ff", "#F0F", "#FF0"]}
                radius={10}
                strokeWidth={2}
                strokeLinecap={"round"}
              />
            </div>
          </div>
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
