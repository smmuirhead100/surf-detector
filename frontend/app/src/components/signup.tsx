import './style/signup.css'
import logo from '../assets/logoHorizontalBlack.svg'
import GeneralFooter from './generalFooter'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    let navigate = useNavigate()

    function handleSignIn(){
        let path='/signin'
        navigate(path)
    }

    function handleCreateAccount() {
        let path='submitted'
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
                        <h3>Create your free TwoSurf account.</h3>
                        <p>Already have an account? <strong onClick={handleSignIn}>Sign in.</strong></p>
                    </div>

                    <form className="signup--form">
                        <div className="signup--form--fields">
                            <div className="names">
                                
                                <input className='firstName' placeholder='FIRST NAME'/>
                                <input className='lastName' placeholder='LAST NAME'/>
                            
                            </div>

                            <div className="credentials">
                                <input type='email' className='email' placeholder='EMAIL'/>
                                <input type='password' className='password' placeholder='PASSWORD' />
                            </div>
                        </div>

                        <button type="submit" onClick={handleCreateAccount}>Create account</button>

                    </form>
                </div>
            </div>

            <div className="signup--footer">
                <GeneralFooter />
            </div>
        </div>
    )
}