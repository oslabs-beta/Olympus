import React, {useState} from 'react'
// import Timer from '../components/Timer.jsx'

const LocalStorage = (props) => {

  
         
  return (
    <div>
        <div 
        className='LocalStorage'
        style={{
            overflow: 'Scroll',
            height: "52vh",
            backgroundColor: "lightgray",
            width: "25rem",
            borderRadius: "5px",
            border: "solid 1px black",
        }}
        >
          
            <h2>Local Storage</h2>
            {JSON.stringify(props.queryArray)}
        </div>
    </div>
  )
}

export default LocalStorage