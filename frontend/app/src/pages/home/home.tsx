import './style/home.css'
import logo from '../../assets/logo.svg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import homeImage from '../../assets/homeImage.jpg'
import exampleDashboard from '../../assets/exampleDashboard.png'
import { useAuth } from '../../context/AuthProvider'
import useProgressiveImg from '../../utils/progressiveImg'

export default function Home() {
    let navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const auth = (useAuth()['auth'])
    const [src, { blur }] = useProgressiveImg("homeImageLowQuality.png", "homeImage.jpg")
    function navigateSignUp(){
        let path = '/signup'
        navigate(path)
    }
    
    useEffect(() => {
        function handleResize() {
          setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, [windowWidth]);


    useEffect(() => {
        windowWidth < 950 ? setIsMobile(true) : setIsMobile(false)
    }, [windowWidth])

    function handleSignIn(){
        let path='/signin'
        navigate(path)
    }
    if (auth) {
        navigate('/forecast')
    } else {
        return (
            <div className="flex flex-col">
                <div className="flex p-2 bg-white">
                    <div>
                        <img src={logo} className="w-10"/>
                    </div>
                </div>
                <div className="bg-cover bg-center bg-no-repeat h-80 flex justify-center items-center flex-col gap-6"style={{backgroundImage: `url(${homeImage})`}}>
                    <div className="flex h-fit text-2xl font-bold text-white p-1 text-opacity-90">SCORE MORE BARRELS</div>
                    <div className="flex">
                        <div className="flex justify-between items-center w-60 p-2 bg-white bg-opacity-50 rounded-md mx-3">
                            <div className="text-opacity-70 text-black px-2">Email</div>
                            <div className="bg-black py-1 px-2 rounded-md text-white text-xs text-opacity-80">Sign up</div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-10 py-10 items-center my-3'>
                    <div className="text-center px-10 text-gray-600">Get access to free 16 day forecasts including wind, tide, and height information.</div>
                    <div className="border-solid border-2 border-transparent border-b-solid border-b-3 border-b-black w-1/2"></div>
                    <img src={exampleDashboard} className="width-30 my-5"/>
                    <div className="text-center px-10 text-gray-600">As an early user, we’ll give you the ability to request the addition of new spots!</div>
                    <div className="bg-twosurfblue p-3 text-white font-bold">Get started</div>
                </div>
            </div>
    )
        }
}