import React from 'react'
import {Link} from 'react-router-dom';
import '../styles/Video.css'
import greekVideo from '../assets/Poseidon.mp4'

const Video = () => {
  return (
    <div className='main'>
        <video autoPlay loop muted id='video'>
            <source src={greekVideo} type='video/mp4'/>
        </video>
        <div className='content'>
            <h1>Olympus</h1>
            <p>GraphQL + Redis</p>
            <p>Hybrid Cache</p>
            <div>
                <Link to='Demo' className='btn'>Demo</Link>
            </div>
        </div>
    </div>
  )
}

export default Video