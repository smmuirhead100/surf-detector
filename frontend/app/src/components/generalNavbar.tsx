import './style/generalNavbar.css'
import logo from '../assets/logo.svg'
import spotsIconBlack from '../assets/spotsIconBlack.svg'
import spotsIconWhite from '../assets/spotsIconWhite.svg'
import cameraIconBlack from '../assets/cameraIconBlack.svg'
import cameraIconWhite from '../assets/cameraIconWhite.svg'
import contactIconBlack from '../assets/contactIconBlack.svg'
import aboutIconBlack from '../assets/aboutIconBlack.svg'
import githubIconBlack from '../assets/githubIcon.png'
import navbarLine from '../assets/navbarLine.svg'
import logoutIcon from '../assets/logoutIcon.svg'
import { useState, useEffect } from 'react'
import getSpots from '../utils/getSpots'
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"

export default function GeneralNavbar(props) {
    const [spotsOpen, setSpotsOpen] = useState(false)
    const [camsOpen, setCamsOpen] = useState(false)
    const [spots, setSpots] = useState([])
    const auth = useAuth()['auth'] 
    const signOut = useAuth()['signOut']
    const navigate = useNavigate()
    
    useEffect(() => {
        getSpots()
        .then(data => setSpots(data))
    },[])

    const handleLogout = async (e) => {
        console.log(auth)
        e.preventDefault();
        console.log('logging out')
        try {
          const { error } = await signOut();
          console.log(error)
          console.log('logged out');
          navigate('/signin'); // Navigate to the sign-in page
        } catch (error) {
          console.log('There was an error logging out');
        }
      };

    const revertToUnderscore = (str) => {
        if (!str) return ''; // If the input string is empty or undefined, return an empty string
        
        // Split the string into words using spaces as separators
        const words = str.split(' ');
      
        // Convert each word to lowercase and join them with underscores
        const underscoredString = words.map((word) => word.toLowerCase()).join('_');
      
        return underscoredString;
    };
      
    function handleSpotsClick(){
        setSpotsOpen(prev => !prev)
    }

    function handleSpotClick(e){
        props.changeSpot(`?spot=${revertToUnderscore(e.target.innerHTML)}`)
    }

    function handleCamsClick(){
        setCamsOpen(prev => !prev)
    }

    return (
        <div className="general--navbar">
            
            <div className="general--navbar--logo">
                <img src={logo} alt="logo" />
            </div>

            <ul className="navbar--list">
                <li className={spotsOpen ? 'navbar--selected--item' : 'navbar--unselected--item'} onClick={handleSpotsClick}>
                    {spotsOpen ? 
                        <img src={spotsIconWhite} alt='Spots Icon'/> 
                        : 
                        <img src={spotsIconBlack} alt='Spots Icon'/>}
                    Spots
                </li>
                {spotsOpen ?                                        // Render Spots if is open
                    <div className='navbar--dropdown--spots'>
                        {spots.map((spot) => (
                        <li onClick={handleSpotClick}>{spot}</li>
                        ))}
                    </div> : null
                }
                
                <li className={camsOpen ? 'navbar--selected--item' : 'navbar--unselected--item'} onClick={handleCamsClick}>
                    {camsOpen ? 
                        <img src={cameraIconWhite} alt='Camera Icon'/>
                        :
                        <img src={cameraIconBlack} alt='Camera Icon'/>
                        }
                    Cams</li>
                {camsOpen ?                                        // Render Cams if is open
                    <div className='navbar--dropdown--cams'>
                        <li>Coming soon!</li>
                    </div> : null
                }

                <li className='navbar--unselected--item'>
                    <img src={aboutIconBlack} alt='About Icon'/>
                    About
                </li>

                <li className='navbar--unselected--item'>
                    <img src={contactIconBlack} alt='Contact Icon'/>
                    Contact
                </li>

                <li className='navbar--unselected--item'>
                    <img src={githubIconBlack} alt='Github Icon'/>
                    Contribute
                </li>

                <div className='general--navbar--logout'>
                    <img src={navbarLine} />
                    <li onClick={handleLogout}>
                        <img src={logoutIcon} alt='Logout Icon'/>
                        Logout
                    </li>
                </div>
            </ul>

        </div>
    )
}