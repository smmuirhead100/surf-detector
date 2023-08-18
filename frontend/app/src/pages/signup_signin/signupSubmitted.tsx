import './style/signup.css'
import logo from '../../assets/logoHorizontalBlack.svg'
import GeneralFooter from '../../components/generalFooter'

export default function SignUpSubmitted() {
    return (
        <div className="signup--wrapper">
            
            <div className="signup--header">
                <img src={logo} alt="logo icon" />
            </div>
            
            <div className="signup--container" style={{display: 'flex', justifyContent: 'center'}}>
                <div className='signupSubmitted' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <h3 style={{textAlign: 'center'}}>Thank you for your interest in TwoSurf! A link has been sent to verify your Email address. </h3>
                    <p style={{textAlign: 'center'}}>We are currently accepting a limited number of users. We'll let you know when it's your turn.</p>
                </div>
            </div>

            <div className='signup--footer'>
                <GeneralFooter />
            </div>
        </div>
    )
}