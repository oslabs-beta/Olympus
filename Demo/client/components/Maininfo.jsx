import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/maininfo.css'

const Maininfo = () => {
    return (
        <div>
            <div
              style={{
                height: "1000px",
                backgroundColor: "white",
                width: "90vh",
                borderRadius: "5px",
                border: "solid 1px black",
              }}
              className='infoBox'
            >
              <h1>Welcome to Our Page!</h1>
              <h2>What is Olympus?</h2>
              <p> An intuitive hybrid caching solution for GraphQL</p>
            </div>
            <h2>Hello</h2>
        </div>
    )
}

export default Maininfo;
