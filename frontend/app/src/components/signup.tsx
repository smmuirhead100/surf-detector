import './style/signup.css'
import logo from '../assets/logoHorizontalBlack.svg'
import GeneralFooter from './generalFooter'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { useRef, useState } from 'react'

export default function SignUp() {
    let navigate = useNavigate()
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const register = (email, password, options) =>
    supabase.auth.signUp({ email, password, options});

    function handleSignIn(){
        let path='/signin'
        navigate(path)
    }

    async function handleCreateAccount(e) {
        e.preventDefault();
        if (
          !passwordRef.current?.value ||
          !emailRef.current?.value ||
          !confirmPasswordRef.current?.value ||
          !firstNameRef.current?.value ||
          !lastNameRef.current?.value
        ) {
          setErrorMsg("Please fill all the fields");
          return;
        }
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
          setErrorMsg("Passwords don't match");
          return;
        }
        try {
          setErrorMsg("");
          setLoading(true);
          const { data, error } = await register(
            emailRef.current.value,
            passwordRef.current.value,
            { data : {
              firstName: firstNameRef.current.value,
              lastName: lastNameRef.current.value
              }
            }
          );
          if (!error && data) {
            let path='submitted'
            navigate(path)
          }
          if(error) {
            setErrorMsg(error.message)
          }
        } catch (error) {
          setErrorMsg("Error in Creating Account");
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
                        <h3>Create your free TwoSurf account.</h3>
                        <p>Already have an account? <strong onClick={handleSignIn}>Sign in.</strong></p>
                    </div>

                    <form className="signup--form" onSubmit={handleCreateAccount}>
                        <div className="signup--form--fields">
                            <div className="names">
                                
                                <input className='firstName' placeholder='FIRST NAME'/>
                                <input className='lastName' placeholder='LAST NAME'/>
                            
                            </div>

                            <div className="credentials">
                                <input ref={emailRef} type='email' className='email' placeholder='EMAIL' required/>
                                <input ref={passwordRef} type='password' className='password' placeholder='PASSWORD' />
                                <input ref={confirmPasswordRef} type='password' className='password' placeholder='CONFIRM PASSWORD' />
                            </div>
                        </div>

                        <button type="submit">{loading ? 'Loading' : 'Create account'}</button>
                        {errorMsg != '' ? <div>Error: {errorMsg}</div> : null}
                    </form>
                </div>
            </div>

            <div className="signup--footer">
                <GeneralFooter />
            </div>
        </div>
    )
}