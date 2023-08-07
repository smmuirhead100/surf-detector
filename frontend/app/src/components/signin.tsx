import './style/signup.css'
import logo from '../assets/logoHorizontalBlack.svg'
import GeneralFooter from './generalFooter'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
    let navigate = useNavigate()

    function handleSignIn(){
        let path='/signup'
        navigate(path)
    }
    
    return (
        <div className="signup--wrapper">
            <div className="signup--header">
                <img src={logo} alt="logo icon" />
            </div>

            <div className="signup--container">
                <div className="signup--subcontainer">
                    
                    <div className="description">
                        <h3>Login to your TwoSurf account.</h3>
                        <p>Don't have an account? <strong onClick={handleSignIn}>Sign up.</strong></p>
                    </div>

                    <form className="signup--form">
                        <div className="signup--form--fields">

                            <div className="credentials">
                                <input type='email' className='email' placeholder='EMAIL'/>
                                <input type='password' className='password' placeholder='PASSWORD' />
                            </div>
                        </div>

                        <button type="submit">Sign in</button>

                    </form>
                </div>
            </div>

            <div className="signup--footer">
                <GeneralFooter />
            </div>
        </div>
    )
}