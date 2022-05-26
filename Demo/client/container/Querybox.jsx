import React from 'react'
// import '../styles/Querybox.css'



const Querybox = () => {
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
              <code>Olympus Demo Query</code>
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
              <code>Olympus Demo Result of Query</code>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Querybox