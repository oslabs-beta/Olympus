import React,{useState} from 'react';
// import '../styles/Querybox.css'



const Querybox = (props) => {
   
  const queryboxCalled = () => {
    setCached
  }


    // if the run button is clicked for the first time, console.log('cache miss')
    // if the run button is clicked for the second time or more, console.log('cache hit')
  
  return (
    <div className='column'>
        <div className="demo-display">
          <div>
            <div
              className="scroll-view"
              style={{
                overflow: "scroll",
                height: "25vh",
                backgroundColor: "lightgray",
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
              className="scroll-view"
              style={{    
                overflow: "scroll",
                height: "25vh",
                backgroundColor: "lightgray",
                width: "25rem",
                borderRadius: "5px",
                border: "solid 1px black",
              }}
            >
              <h2>Olympus Demo Result of Query</h2>
              {props.Query.demoResult}
            </div>
          </div>
        </div>

    </div>
  )
}

export default Querybox