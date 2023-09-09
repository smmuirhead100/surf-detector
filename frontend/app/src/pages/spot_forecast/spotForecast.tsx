import './style/spotForecast.css'
import SpotHeader from './spotHeader'
import ForecastDays from './forecastDays'
import DayForecast from './dayForecast'
import GeneralNavbar from './generalNavbar'
import TideForecast from './tideForecast'
import WindForecast from './windForecast'
import LiveCam from './liveCam'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SpotForecast() {
    
    // Obtain spot specified in URL.
    const queryParameters = new URLSearchParams(window.location.search)
    const spot = queryParameters.get("spot")
    const navigate = useNavigate()
    !spot ? navigate('/forecast?spot=salt_creek') : null

    // Declare state variables. 
    const [waveData, setWaveData] = useState(null)
    const [windData, setWindData] = useState(null)
    const [ratingData, setRatingData] = useState(null)
    const [tideData, setTideData] = useState(null)
    const [currTide, setCurrTide] = useState(null)
    const [currWind, setCurrWind] = useState(null)
    const [currTime, setCurrTime] = useState(['-'])
    const [minTimestamp, setMinTimestamp] = useState<number>(0); // Initialize with appropriate default value
    const [maxTimestamp, setMaxTimestamp] = useState<number>(0); 
    const [maxHeight, setMaxHeight] = useState(0)
    const [camPath, setCamPath] = useState('')
    const [currDay, setCurrDay] = useState<string>('');

    useEffect(() => {
        setCurrTime(['-'])
      }, [spot]);
    // Fetch wave data from API.
    useEffect(() => {
        fetch(`https://goldfish-app-qsewy.ondigitalocean.app/wave?spot=${spot}`)
          .then(response => response.json())
          .then(data => {
            setWaveData(data);
            // Find the maximum height and update maxHeight state.
            let maxFoundHeight = 0;
            for (const dataPoint of data) {
                const currentHeight = dataPoint.surf.rawSurf.rawMax;
                if (currentHeight > maxFoundHeight) {
                    maxFoundHeight = currentHeight;
                }
            }
            setMaxHeight(maxFoundHeight)
          })
          .catch(error => console.log(error))
      }, [spot]);
      
    // Fetch rating data from API. 
    useEffect(() => {
        fetch(`https://goldfish-app-qsewy.ondigitalocean.app/rating?spot=${spot}`)
          .then(response => response.json())
          .then(data => {
            setRatingData(data);
          })
          .catch(error => console.log(error))
      }, [spot]);

    // Fetch tide data from API.
    useEffect(() => {
        fetch(`https://goldfish-app-qsewy.ondigitalocean.app/tide?spot=${spot}`)
          .then(response => response.json())
          .then(data => {
            setTideData(data)
          })
          .catch(error => console.log(error))
    }, [spot])

    // Fetch wind data from API.
    useEffect(() => {
        fetch(`https://goldfish-app-qsewy.ondigitalocean.app/wind?spot=${spot}`)
          .then(response => response.json())
          .then(data => {
            setWindData(data)
          })
          .catch(error => console.log(error))
    }, [spot])

    // Fetch cam data from API.
    useEffect(() => {
        fetch(`https://goldfish-app-qsewy.ondigitalocean.app/cam?spot=${spot}`)
          .then(response => response.json())
          .then(data => {
            setCamPath(data.data);
          })
          .catch(error => console.log(error))
      }, [spot]);


    function changeCurrDay(minTimestamp, maxTimestamp, month, day) {
        setMinTimestamp(minTimestamp)
        setMaxTimestamp(maxTimestamp)
        setCurrDay(`${month} ${day.toString()}`)
    }

    function changeCurrTime(t) {
        setCurrTime(t)
    }

    function changeSpot(path){
        if (spot == path) {
            return;
        }
        else {
        setWaveData(null)
        setTideData(null)
        navigate(`/forecast?spot=${path}`)
        }
    }
   
    function handleTide(t) {
        setCurrTide(t)
    }

    function handleWind(w) {
        setCurrWind(w)
    }

    return (
        <div className="w-screen">
            <GeneralNavbar changeSpot={changeSpot} currSpot={spot}/>
            <div className="flex flex-col gap-5">
                <SpotHeader spot={spot} />
                <div className='flex mx-3 p-1 rounded-lg sticky top-1 bg-white drop-shadow-lg z-10'>
                    <ForecastDays waveData={waveData} ratingData={ratingData} changeCurrDay={changeCurrDay} windData={windData} currTide={currTide} currTime={currTime} changeCurrTime={changeCurrTime}/>
                </div>
                <div className='mx-3 p-1 rounded-lg bg-white drop-shadow-lg'>
                    <DayForecast spot={spot} data={waveData} ratingData={ratingData} minTimestamp={minTimestamp} maxTimestamp={maxTimestamp} maxHeight={maxHeight} currDay={currDay} currTime={currTime} changeCurrTime={changeCurrTime}/>
                </div>
                <div className='flex flex-wrap justify-center'>
                    <div className='m-3 p-1 rounded-lg bg-white drop-shadow-lg max-w-md md:w-screen'>
                        <TideForecast spot={spot} handleTide={handleTide} minTimestamp={minTimestamp} maxTimestamp={maxTimestamp} data={tideData} currTime={currTime} changeCurrTime={changeCurrTime}/>
                    </div>
                    <div className='m-3 p-1 rounded-lg bg-white drop-shadow-lg w-fit md:w-screen max-w-lg'>
                        <WindForecast spot={spot} handleWind={handleWind} minTimestamp={minTimestamp} maxTimestamp={maxTimestamp} data={windData} currWind={currWind} currTime={currTime} changeCurrTime={changeCurrTime}/>
                    </div>
                    <div className='m-3 p-1 rounded-lg bg-white drop-shadow-lg w-fit md:w-screen max-w-md'>
                        <LiveCam path={camPath} />
                    </div>
                </div>
            </div>
        </div>
    )
}