import React, {useState} from 'react'
import Timer from '../components/Timer.jsx'

const LocalStorage = (props) => {
//   const [Cache, setCache] = useState([])
//     if(props.runQueryState) {
//       const newCache = Cache.slice()
//       newCache.push(<p> {props.Query} : {props.Result}</p>)
//       setCache(newCache)
//       props.LocalStorageChange()
//     }
    
         
  return (
    <div>
        {/* <h2> Local Storage </h2> */}
        {/* <Timer /> */}
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
            {props.Cache}
        </div>
    </div>
  )
}

export default LocalStorage