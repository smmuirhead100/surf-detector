import './style/generalNavbar.css'
import logo from '../../assets/logo.svg'
import spotsIconBlack from '../../assets/spotsIconBlack.svg'
import spotsIconWhite from '../../assets/spotsIconWhite.svg'
import cameraIconBlack from '../../assets/cameraIconBlack.svg'
import cameraIconWhite from '../../assets/cameraIconWhite.svg'
import contactIconBlack from '../../assets/contactIconBlack.svg'
import aboutIconBlack from '../../assets/aboutIconBlack.svg'
import githubIconBlack from '../../assets/githubIcon.png'
import logoutIcon from '../../assets/logoutIcon.svg'
import { useState, useEffect } from 'react'
import getSpots from '../../utils/getSpots'
import { useAuth } from "../../context/AuthProvider"
import { useNavigate } from "react-router-dom"
import capitalizeAfterUnderscore from '../../utils/capitalizeAfterUnderscore'

export default function GeneralNavbar(props) {
    const [spotsOpen, setSpotsOpen] = useState(false)
    const [camsOpen, setCamsOpen] = useState(false)
    const [spots, setSpots] = useState([])
    const [dropdownX, setDropdownX] = useState(null)
    const [dropdownY, setDropdownY] = useState(null)
    const signOut = useAuth()['signOut']
    const navigate = useNavigate()
    
    useEffect(() => {
        const handleWindowResize = () => {
            setCamsOpen(false);
            setSpotsOpen(false);
        };
        
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        getSpots()
        .then(data => setSpots(data))
    },[])
    
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
          const { error } = await signOut();
          console.log(error)
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
    function handleSpotsClick(e){
        setDropdownX(e.currentTarget.getBoundingClientRect().left)
        setDropdownY(e.currentTarget.getBoundingClientRect().bottom)
        setCamsOpen(false)
        setSpotsOpen(prev => !prev)
    }

    function handleSpotClick(e){
        props.changeSpot(revertToUnderscore(e.target.innerHTML))
    }

    function handleCamsClick(e){
        setDropdownX(e.currentTarget.getBoundingClientRect().left)
        setDropdownY(e.currentTarget.getBoundingClientRect().bottom)
        setSpotsOpen(false)
        setCamsOpen(prev => !prev)
    }

    function handleLeave(){
        setSpotsOpen(false)
        setCamsOpen(false)
    }

    return (
        <div className="general--navbar">
            
            <div className="general--navbar--logo">
                <img src={logo} alt="logo" style={{ width: '5rem' }}/>
            </div>

            <ul className="navbar--list">
                <li className={spotsOpen ? 'navbar--selected--item' : 'navbar--unselected--item'} onMouseEnter={handleSpotsClick} onMouseLeave={handleLeave}>
                    {spotsOpen ? 
                        <img src={spotsIconWhite} alt='Spots Icon'/> 
                        : 
                        <img src={spotsIconBlack} alt='Spots Icon'/>}
                    Spots
                    {spotsOpen ?                                        // Render Spots if is open
                    <div className='navbar--dropdown--spots' style={{ top: `${dropdownY}px`, left: `${dropdownX}px`, color: 'black'}}>
                        {spots.map((spot) => (
                            spot == capitalizeAfterUnderscore(props.currSpot) ? 
                            <li onClick={handleSpotClick} className='selected--spot'>{spot}</li> :
                            <li onClick={handleSpotClick}>{spot}</li>
                        ))}
                    </div> : null
                }
                </li>
                
                <li className={camsOpen ? 'navbar--selected--item' : 'navbar--unselected--item'} onMouseEnter={handleCamsClick} onMouseLeave={handleLeave}>
                    {camsOpen ? 
                        <img src={cameraIconWhite} alt='Camera Icon'/>
                        :
                        <img src={cameraIconBlack} alt='Camera Icon'/>
                        }
                    Cams
                    {camsOpen ?                                        // Render Cams if is open
                    <div className='navbar--dropdown--cams' style={{ top: `${dropdownY}px`, left: `${dropdownX}px`, color: 'black'}}>
                        <li>Coming soon!</li>
                    </div> : null
                }
                    </li>

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
            </ul>

                <div className='general--navbar--logout'>
                    <li onClick={handleLogout}>
                        <img src={logoutIcon} alt='Logout Icon'/>
                        Logout
                    </li>
                </div>
            

        </div>
    )
}