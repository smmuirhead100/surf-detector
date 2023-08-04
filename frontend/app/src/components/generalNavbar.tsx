import './style/generalNavbar.css'
import logo from '../assets/logo.svg'
import { useState, useEffect } from 'react'
import getSpots from '../utils/getSpots'

export default function GeneralNavbar() {
    const [spotsOpen, setSpotsOpen] = useState(false)
    const [camsOpen, setCamsOpen] = useState(false)
    const [spots, setSpots] = useState([])
    
    useEffect(() => {
        getSpots()
        .then(data => setSpots(data))
    },[])

    function handleSpotsClick(){
        setSpotsOpen(prev => !prev)
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
                <li className={spotsOpen ? 'navbar--selected--item' : 'navbar--unselected--item'} onClick={handleSpotsClick}>Spots</li>
                {spotsOpen ?                                        // Render Spots if is open
                    <div className='navbar--dropdown'>
                        {spots.map((spot) => (
                        <li>{spot}</li>
                        ))}
                    </div> : null
                }
                
                <li className={camsOpen ? 'navbar--selected--item' : 'navbar--unselected--item'} onClick={handleCamsClick}>Cams</li>
                {camsOpen ?                                        // Render Cams if is open
                    <div className='navbar--dropdown'>
                        <li>Coming soon!</li>
                    </div> : null
                }

                <li>About
                </li>

                <li>Contact
                </li>

                <li>Contribute
                </li>
            </ul>
        </div>
    )
}