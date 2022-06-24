import React from 'react'
import pillars from '../assets/pillars.jpg'
import '../styles/Background.css'

const Background = () => {
  return (
    <div className='background'>
        <img className='demo-background' src={pillars} /> 
    </div>
  )
}

export default Background