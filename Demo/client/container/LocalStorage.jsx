import React, {useState} from 'react'
// import Timer from '../components/Timer.jsx'

const LocalStorage = (props) => {
  const keeps = []
  const entries = Object.values(props.queryArray)
  for(let i = 0; i < entries.length; i++) {
    if(entries[i]["isCached"] &&  entries[i]["localStorageTimer"] > 0) {
     keeps.push(<p>"result": {entries[i]["resultString"]}, "TTL": {entries[i]["localStorageTimer"]}</p>)
    }
  }
           
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
            {keeps}
        </div>
    </div>
  )
}

export default LocalStorage