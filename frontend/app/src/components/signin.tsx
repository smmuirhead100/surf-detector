import './style/signup.css'
import logo from '../assets/logoHorizontalBlack.svg'
import GeneralFooter from './generalFooter'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useAuth } from "../context/AuthProvider"

export default function SignIn() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const login  = useAuth()['login'];
    
    let navigate = useNavigate()

    function handleSignUp() {
        let path='/signup'
        navigate(path)
    }
    
    async function handleSignIn(e){
        e.preventDefault();
        try {
          setErrorMsg("");
          setLoading(true);
          if (!passwordRef.current?.value || !emailRef.current?.value) {
            setErrorMsg("Please fill in the fields");
            return;
          }
          const {
            data: { user, session },
            error
          } = await login(emailRef.current.value, passwordRef.current.value);
          if (error) setErrorMsg(error.message);
          if (user && session) navigate("/forecast");
        } catch (error) {
          setErrorMsg("Email or Password Incorrect");
        }
        setLoading(false);
      };
    
    return (
        <div className="signup--wrapper">
            <div className="signup--header">
                <img src={logo} alt="logo icon" />
            </div>

            <div className="signup--container">
                <div className="signup--subcontainer">
                    
                    <div className="description">
                        <h3>Login to your TwoSurf account.</h3>
                        <p>Don't have an account? <strong onClick={handleSignUp}>Sign up.</strong></p>
                    </div>

                    <form className="signup--form" onSubmit={handleSignIn}>
                        <div className="signup--form--fields">
                            <div className="credentials">
                                <input ref={emailRef} type='email' className='email' placeholder='EMAIL'/>
                                <input ref={passwordRef} type='password' className='password' placeholder='PASSWORD' />
                            </div>
                        </div>

                        <button type='submit'>{loading ? 'Loading' : 'Sign in'}</button>
                        {errorMsg != '' ? errorMsg : null}
                    </form>
                </div>
            </div>

            <div className="signup--footer">
                <GeneralFooter />
            </div>
        </div>
    )
}