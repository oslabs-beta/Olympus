import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/contacts.css'
import Bryan from '../assets/BKim.png';
import Marshall from '../assets/MKim.png';
import Adam from '../assets/ALang.png';
import Kevin from '../assets/KLe.png';
import LinkedIn from '../assets/Linkedin.png';
import GitHub from '../assets/GitHub.png';

const Contacts = () => {
    return (
        <div className='contacts'>
            <div className='card-container'>
                <div className='card'>
                    <h3><img src={Bryan} width="250" height="250"/></h3>
                    <p className='name'>Bryan <br/> Kim</p>
                    <p>Connect with me below!</p>
                    <p>
                        <a target='_blank' href="https://www.linkedin.com/in/bkimmm"><img src={LinkedIn} width="50" height="50"/></a> <a target='_blank' href="https://github.com/Bkimmm"><img src={GitHub} width="50" height="50"/></a>
                    </p>
                </div>
                <div className='card'>
                    <h3><img src={Marshall} width="250" height="250"/></h3>
                    <p className='name'>Marshall <br/> Kim</p>
                    <p>Connect with me below!</p>
                    <p>
                        <a target='_blank' href="https://www.linkedin.com/in/marshallkkim/"><img src={LinkedIn} width="50" height="50"/></a> <a target='_blank' href="https://github.com/marshallkkim"><img src={GitHub} width="50" height="50"/></a>
                    </p>
                </div>
                <div className='card'>
                    <h3><img src={Adam} width="250" height="250"/></h3>
                    <p className='name'>Adam <br/> Lang</p>
                    <p>Connect with me below!</p>
                    <p>
                        <a target='_blank' href="https://www.linkedin.com/in/adam-lang-573a2b149/"><img src={LinkedIn} width="50" height="50"/></a> <a target='_blank' href="https://github.com/AdamLang96"><img src={GitHub} width="50" height="50"/></a>
                    </p>
                </div>
                <div className='card'>
                    <h3><img src={Kevin} width="250" height="250"/></h3>
                    <p className='name'>Kevin <br/> Le</p>
                    <p>Connect with me below!</p>
                    <p>
                        <a target='_blank' href="https://www.linkedin.com/in/kevin-le-3ab05971/"><img src={LinkedIn} width="50" height="50"/></a> <a target='_blank' href="https://github.com/kle160"><img src={GitHub} width="50" height="50"/></a>
                    </p>                
                </div>
            </div>
        </div>
    )
}

export default Contacts;
