import './style/home.css'
import logo from '../../assets/logo.svg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import homeImage from '../../assets/homeImage.jpg'
import exampleDashboard from '../../assets/exampleDashboard.png'
import { useAuth } from '../../context/AuthProvider'

export default function Home() {
    let navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const auth = (useAuth()['auth'])
    
    function handleSignUp(){
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

    function handleSignIn(){
        let path='/signin'
        navigate(path)
    }
    if (auth) {
        navigate('/forecast')
    } else {
        return (
            <div className="flex flex-col">
                <div className="flex p-2 bg-white justify-center sticky top-0">
                    <div>
                        <img src={logo} className="w-10"/>
                    </div>
                </div>
                <div className="bg-cover bg-center bg-no-repeat h-80 flex justify-center items-center flex-col gap-6"style={{backgroundImage: `url(${homeImage})`}}>
                    <div className="flex h-fit text-2xl font-bold text-white p-1 text-opacity-90">SCORE MORE BARRELS</div>
                    <div className="flex">
                        <div className="flex justify-between items-center w-70 p-2 bg-white bg-opacity-50 rounded-md mx-3 border-transparent border-2 focus-within:border-twosurfblue">
                            <input type='email' className=" text-black p-1 bg-transparent placeholder:text-black placeholder:text-opacity-70 focus:outline-none" placeholder='Email'></input>
                            <div className="bg-black py-2 px-2 rounded-md text-white text-xs text-opacity-80 hover:cursor-default" onClick={handleSignUp}>Sign up</div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-10 py-10 items-center my-3'>
                    <div className="text-center px-10 text-gray-600">Get access to free 16 day forecasts including wind, tide, and height information.</div>
                    <div className="border-solid border-2 border-transparent border-b-solid border-b-3 border-b-black w-1/2"></div>
                    <img src={exampleDashboard} className="width-30 my-5"/>
                    <div className="text-center px-10 text-gray-600">As an early user, we’ll give you the ability to request the addition of new spots!</div>
                    <div className="bg-twosurfblue py-2 px-3 text-white font-bold rounded-lg hover:cursor-default" onClick={handleSignIn}>Get started</div>
                </div>
            </div>
    )
        }
}