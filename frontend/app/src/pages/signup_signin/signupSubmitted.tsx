import './style/signup.css'
import logo from '../../assets/logoHorizontalBlack.svg'
import GeneralFooter from '../../components/generalFooter'
import { useNavigate } from 'react-router-dom'
import arrowRight from '../../assets/arrowRight.svg'

export default function SignUpSubmitted() {
    const navigate = useNavigate()
    return (
        <div className="signup--wrapper">
            
            <div className="signup--header">
                <img src={logo} alt="logo icon" />
            </div>
            
            <div className="signup--container" style={{display: 'flex', justifyContent: 'center'}}>
                <div className='signupSubmitted' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <h3 style={{textAlign: 'center'}}>Thank you for your interest in TwoSurf! A link has been sent to verify your Email address. </h3>
                    <div onClick={(()=> navigate('/signin'))}><p>Sign In</p><img src={arrowRight} style={{width: '1rem'}}/></div>
                </div>
            </div>

            <div className='signup--footer'>
                <GeneralFooter />
            </div>
        </div>
    )
}