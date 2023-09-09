import './style/generalNavbar.css'
import logo from '../../assets/logo.svg'
import spotsIconBlack from '../../assets/spotsIconBlack.svg'
import spotsIconWhite from '../../assets/spotsIconWhite.svg'
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
    const [spots, setSpots] = useState([])
    const [dropdownX, setDropdownX] = useState(null)
    const [dropdownY, setDropdownY] = useState(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const signOut = useAuth()['signOut']
    const navigate = useNavigate()
    
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
        setSpotsOpen(prev => !prev)
    }

    function handleSpotClick(e){
        props.changeSpot(revertToUnderscore(e.target.innerHTML))
    }

    function handleAboutClick() {
        setSpotsOpen(false);
        navigate('/about');
    }

    function handleContributeClick() {
        setSpotsOpen(false); 
        window.location.href = 'https://github.com/smmuirhead100/surf-detector';
    }

    function handleContactClick() {
        setSpotsOpen(false);
        navigate('/contact');
    }

    function handleLeave(){
        setSpotsOpen(false)
    }

    return ( 
        <>
        <div className="flex bg-white border-solid border-b-2 border-black justify-between">
            
            <div className="max-w-3 flex px-4 flex-5">
                <img src={logo} alt="logo" className="w-20"/>
            </div>

            <ul className="flex flex-1 items-center justify-start overflow-hidden">
                <li className={spotsOpen ? 'flex cursor-default bg-black rounded-lg px-4 py-2 text-white gap-1' : 'gap-1 flex cursor-default rounded-lg px-4 py-2'} onMouseEnter={handleSpotsClick} onMouseLeave={handleLeave}>
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

                <li className='flex gap-1 cursor-default rounded-lg px-4 py-2 hover:bg-gray-200' onClick={handleAboutClick}>
                    <img src={aboutIconBlack} alt='About Icon'/>
                    About
                </li>

                <li className='flex transform ease-in-out gap-1 cursor-default rounded-lg px-4 py-2 hover:bg-gray-200 translate-y-16 sm:translate-y-0 duration-150' onClick={handleContactClick}>
                    <img src={contactIconBlack} alt='Contact Icon'/>
                    Contact
                </li>

                <li className='flex transform ease-in-out gap-1 cursor-default rounded-lg px-4 py-2 hover:bg-gray-200 translate-y-16 sm:translate-y-0 duration-150' onClick={handleContributeClick}>
                    <img src={githubIconBlack} alt="Github Icon" className="w-auto max-h-6"/>
                    Contribute
                </li>
            </ul>

                <div className='flex border-solid items-center gap-2 px-3' onClick={handleLogout}>
                        <img src={logoutIcon} alt='Logout Icon'/>
                        <div className="hidden md:block">Logout</div>
                </div>
            

        </div>
    </>
    )
}