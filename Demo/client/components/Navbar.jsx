import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {FaBars, FaTimes} from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = ()=> setClick(!click);

  return (
    <div className='header'>
        <Link to='/'><h1>Olympus</h1></Link>
        <ul className={click ? 'nav-menu active': 'nav-menu'}>
            <li>
                {/* {click ? (<Link to ='/' style={{color:'white'}}>Medium</Link>): (<Link to ='/' >Medium</Link>)} */}
                <Link to ='/' >Medium</Link>
            </li>
            <li>
                 {/* <a href='/' style={click ? {color:'white'}:{color:'black'}}>NPM Download</a> */}
                 <a href='/' style={{color:'black'}}>NPM Download</a>

            </li>
            <li>
                {/* {click ? (<Link to ='/Demo' style={{color:'white'}}>Demo</Link>):(<Link to ='/Demo' >Demo</Link>)} */}
                <Link to ='/Demo' >Demo</Link>
            </li>
            <li>
                {/* {click ? (<Link to ='/team' style={{color:'white'}}>Team</Link>):(<Link to ='/team'>Team</Link>)} */}
                {/* <Link to='/Team' style={click ? {color:'white'}:{color:'black'}}>Team</Link> */}
                <Link to='/Team' style={{color:'black'}}>Team</Link>

            </li>
            <li>
                <a href='https://github.com/oslabs-beta/Olympus' target={'_blank'} style={{color:'black'}}>Github</a>
            </li>
        </ul>
        <div className='hamburger' onClick={handleClick} >
            { click ? (<FaTimes size = {25} style={{color: 'red'}}/>) : (<FaBars size = {20} style={{color:'black'}}></FaBars>)}
            
        </div>
    </div>
  )
}

export default Navbar
