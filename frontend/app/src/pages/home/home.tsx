import './style/home.css'
import logo from '../../assets/logoHorizontalBlack.svg'
import { useNavigate } from 'react-router-dom'
import homeImage from '../../assets/homeImage.jpg'
import login from '../../assets/login.svg'
import exampleDashboard from '../../assets/exampleDashboard.png'
import { useAuth } from '../../context/AuthProvider'
import TSFooter from '../../components/tsFooter.tsx'

export default function Home() {
    let navigate = useNavigate()
    const auth = (useAuth()['auth'])
    
    function handleSignUp(){
        let path = '/signup'
        navigate(path)
    }

    function handleSignIn(){
        let path='/signin'
        navigate(path)
    }

    if (auth) {
        navigate('/forecast')
    } else {
        return (
            <div className="flex flex-col">
                <div className="flex p-2 bg-white justify-between sticky top-0">
                    <div className='flex items-center justify-center'>
                        <img src={logo} className="md:w-30 lg:w-40"/>
                    </div>
                    <div className='flex items-center gap-1 text-black px-2 lg:text-xl hover:cursor-pointer' onClick={handleSignIn}>
                        <div>Login</div>
                        <img src={login} className="w-3 lg:w-5" />
                    </div>
                </div>
                <div className="bg-cover bg-center bg-no-repeat h-80 md:h-96 lg:h-screen flex justify-center items-center flex-col gap-6"style={{backgroundImage: `url(${homeImage})`}}>
                    <div className="flex h-fit text-2xl md:text-3xl lg:text-6xl font-bold text-white p-1 text-opacity-90">SCORE MORE BARRELS</div>
                    <div className="flex">
                        <div className="flex justify-between items-center w-70 lg:w-96 p-2 bg-white bg-opacity-50 rounded-md mx-3 border-transparent border-2 focus-within:border-twosurfblue">
                            <input type='email' className=" text-black p-1 bg-transparent placeholder:text-black placeholder:text-opacity-70 focus:outline-none lg:text-xl" placeholder='Email'></input>
                            <div className="hover:cursor-pointer bg-black py-2 px-2 rounded-md text-white text-xs text-opacity-80 lg:text-xl" onClick={handleSignUp}>Sign up</div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-10 md:gap-20 md:my-10 py-10 items-center my-3'>
                    <div className="text-center px-10 text-gray-600 md:text-2xl">Get access to free 16 day forecasts including wind, tide, and height information.</div>
                    <div className="border-solid border-2 border-transparent border-b-solid border-b-3 border-b-black w-1/2"></div>
                    <img src={exampleDashboard} className="w-2/3 my-5"/>
                    <div className="text-center px-10 text-gray-600 md:text-2xl">As an early user, we’ll give you the ability to request the addition of new spots!</div>
                    <button className="bg-twosurfblue border-solid border-2 border-transparent hover:border-black hover:border-opacity-20 py-2 px-3 text-white font-bold rounded-lg md:text-2xl hover:cursor-pointer" onClick={handleSignUp}>Get started</button>
                </div>
                <TSFooter />
            </div>
    )
        }
}