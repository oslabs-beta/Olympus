import React, {useState} from 'react'

const RedisStorage = (props) => {
  const keeps = []
  const entries = Object.values(props.queryArray)
  for(let i = 0; i < entries.length; i++) {
    if(entries[i]["isCached"] &&  entries[i]["redisTimer"] > 0) {
     keeps.push(<p>"result": {entries[i]["resultString"]}, "TTL": {entries[i]["redisTimer"]}</p>)
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
            <h2>Redis Cache</h2>
            {keeps}
        </div>
    </div>
  )
}

export default RedisStorage