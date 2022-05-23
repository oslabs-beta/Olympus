import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/contacts.css'

const Contacts = () => {
    return (
        <div className='contacts'>
            <div className='card-container'>
                <div className='card'>
                    <h3>- INSERT PIC HERE -</h3>
                    <p className='name'>Bryan Kim</p>
                    <p>- INSERT TEXT HERE -</p>
                </div>
                <div className='card'>
                    <h3>- INSERT PIC HERE -</h3>
                    <p className='name'>Marshall Kim</p>
                    <p>- INSERT TEXT HERE -</p>
                </div>
                <div className='card'>
                    <h3>- INSERT PIC HERE -</h3>
                    <p className='name'>Adam Lang</p>
                    <p>- INSERT TEXT HERE -</p>
                </div>
                <div className='card'>
                    <h3>- INSERT PIC HERE -</h3>
                    <p className='name'>Kevin Le</p>
                    <p>- INSERT TEXT HERE -</p>
                </div>
            </div>
        </div>
    )
}

export default Contacts;
