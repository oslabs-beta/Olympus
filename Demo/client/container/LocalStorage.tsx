import React, {useState} from 'react'

const LocalStorage = (props:any) => {
  const keeps = []
  const entries:any = Object.values(props.queryArray)
  for(let i = 0; i < entries.length; i++) {
    if(entries[i]["isCached"] && entries[i]["localStorageTimer"] > 0) {
     keeps.push(<p>"result": {entries[i]["resultString"]}, "TTL": {entries[i]["localStorageTimer"]}</p>)
     keeps.push(<br></br>)

    }
  }
  return (
    <div>
        <div 
        className='LocalStorage'
        style={{
            height: "52vh",
            backgroundColor: "grey",
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