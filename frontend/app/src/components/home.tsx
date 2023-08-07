import './style/home.css'
import logo from '../assets/logo.svg'
import contactIconBlack from '../assets/contactIconBlack.svg'
import aboutIconBlack from '../assets/aboutIconBlack.svg'

export default function Home() {
    return (
        <div className="home--wrapper">
            <div className="home--left">

            </div>
            <div className="home--right">
                
                <div className="navbar">
                    <li className='navbar--item'>
                        <img src={aboutIconBlack} alt="about icon"/>
                        About
                    </li>
                    <li className='navbar--item'>
                        <img src={contactIconBlack} alt='Contact Icon'/>
                        Contact
                    </li>
        
                </div>

                <div className="content">
                    <img src={logo}/>
                    <h2>SCORE MORE BARRELS.</h2>
                </div>

                <div className="getStarted">
                    <button>Get Started</button>
                    <div>Or log in</div>
                </div>
            </div>
        </div>
    )
}