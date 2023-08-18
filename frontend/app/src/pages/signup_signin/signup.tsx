import './style/signup.css'
import logo from '../../assets/logoHorizontalBlack.svg'
import GeneralFooter from '../../components/generalFooter'
import SignUpSubmitted from './signupSubmitted'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../utils/supabaseClient'
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
    const [submitted, setSubmitted] = useState(false)
    const register = (email, password, options) =>
    supabase.auth.signUp({ email, password, options});

    function handleSignIn(){
        let path='/signin'
        navigate(path)
    }

    function handleHomeClick() {
      navigate('/home')
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
    
        // Create a new user using Supabase authentication
        const { data: userData, error: userError } = await register(
          emailRef.current.value,
          passwordRef.current.value,
          {
            redirect: 'https://www.twosurf.com',
            data: {
              firstName: firstNameRef.current.value,
              lastName: lastNameRef.current.value,
            },
          }
        );
    
        if (userData && !userError) {
          // Insert user information into the UserAccess table
          const { data: userAccessData, error: userAccessError } = await supabase
            .from("UserAccess")
            .insert([
              {
                user_id: userData.user.id,
                email: userData.user.email
                // Add any other relevant user access data here
              },
            ]);
          if (userAccessData && !userAccessError) {
            console.log('success signinig up')
            setSubmitted(true)
          } else if (userAccessError?.code === '23505') {
            setErrorMsg('User already exists')
          } else if (!userAccessData) {
            console.log('no userAccessData')
            setSubmitted(true)
          }
        } else {
          setErrorMsg(userError.message || "Error creating user");
        }
      } catch (error) {
        console.log(error)
        setErrorMsg("Error in Creating Account");
      }
      setLoading(false);
    }
    
    if (submitted) {
      return <SignUpSubmitted />
    } 
    else { return (
        <div className="signup--wrapper">
            <div className="signup--header">
                <img src={logo} alt="logo icon" onClick={handleHomeClick}/>
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
                                
                                <input ref={firstNameRef} className='firstName' placeholder='FIRST NAME'/>
                                <input ref={lastNameRef} className='lastName' placeholder='LAST NAME'/>
                            
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
    )}
}