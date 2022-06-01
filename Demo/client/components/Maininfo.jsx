import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/maininfo.css'

const Maininfo = () => {
    return (
        <div>
            <div className='infoBox'>
              <h1>What is Olympus?</h1>
                <p> An intuitive hybrid caching solution for GraphQL.</p>
                <br></br>
                <br></br>
              <h1>What is the current problem with caching?</h1>
                <p> RESTful API has been the industry standard for designing web APIs. The use of RESTful API has lead to issues with over and under-fetching of data. <br></br><br></br> Recently, GraphQL has gained significant traction and popularity due to its fast, flexible, and efficient API calls. GraphQL is a query language that gives the user the ability to get exactly what they want when fetching data — while only requiring the use of one request/endpoint. When compared to the traditional RESTful architecture, however, caching is still a challenge in GraphQL.</p>
                <br></br>
                <br></br>
              <h1>What is the solution?</h1>
                <p> Olympus' caching solution will automatically cache your GraphQL queries/responses on your server and your client’s browser local storage.</p>
                <br></br>
                <br></br>
              <h1>How to download?</h1>
                <p> Click the link "NPM Download" above to get started. </p>
            </div>
            <br></br>
        </div>
    )
}

export default Maininfo;
