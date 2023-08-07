import './style/signup.css'
import logo from '../assets/logoHorizontalBlack.svg'
import GeneralFooter from './generalFooter'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUpSubmitted() {
    return (
        <div className="signup--wrapper">
            
            <div className="signup--header">
                <img src={logo} alt="logo icon" />
            </div>
            
            <div className="signup--container" style={{display: 'flex', justifyContent: 'center'}}>
                <div className='signupSubmitted' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '3rem'}}>
                    <h3 style={{textAlign: 'center'}}>Thank you for your interest in TwoSurf! We are currently limiting the number of users on the platform.</h3>
                    <p>We'll let you know when you are granted access.</p>
                </div>
            </div>

            <div className='signup--footer'>
                <GeneralFooter />
            </div>
        </div>
    )
}