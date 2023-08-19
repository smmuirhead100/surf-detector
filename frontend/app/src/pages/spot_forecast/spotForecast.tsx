import './style/spotForecast.css'
import SwellChart from './swellChart'
import GeneralNavbar from './generalNavbar'
import TideChart from './tideChart'
import SpotHeader from './spotHeader'
import ProfileHeader from './profileHeader'
import CrowdChart from './crowdChart'
import Forecasts from './forecasts'
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
    const [isWaveLoading, setIsWaveLoading] = useState(true)
    const [ratingData, setRatingData] = useState(null)
    const [tide, setTide] = useState(null)
    const [tideTime, setTideTime] = useState(null)
    const [tideChartLoading, setTideChartLoading] = useState(true)
    const [crowdLoading, setCrowdLoading] = useState(true)
    const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key to trigger component remount
    
    // Fetch wave data from API.
    useEffect(() => {
        fetch(`https://goldfish-app-qsewy.ondigitalocean.app/wave?spot=${spot}`)
          .then(response => response.json())
          .then(data => {
            setWaveData(data);
            setIsWaveLoading(false); // Set loading state to false
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

    // Functions to handle the loading of data.
    function handleTide(tide: number, time: string) {
        setTide(tide)
        setTideTime(time)
    }

    function handleTideChartLoading() {
        setTideChartLoading(false)
    }

    function handleCrowdLoading() {
        setCrowdLoading(false)
    }

    function changeSpot(path){
        setRefreshKey(refreshKey + 1); // Increment the refresh key
        setTideChartLoading(true)
        setWaveData(null)
        setIsWaveLoading(true)
        navigate(`/forecast${path}`)
    }
   
    return (
        <div className="spot--forecast--wrapper">
            
            <div className="general--navbar--wrapper">
                <GeneralNavbar changeSpot={changeSpot} currSpot={spot}/>
            </div>
            
            <div className="spot--forecast--content">
                
                {/**Spot Title */}
                <div className='spot--forecast--header--wrapper'>
                    <SpotHeader spot={spot} />
                    <ProfileHeader />
                </div>

                <div className='spot--forecast--chart--wrapper'>
                    <Forecasts waveData={waveData} ratingData={ratingData}/>
                </div>


                {/**Swell Chart */}
                <div className='spot--forecast--chart--wrapper'>
                    <h3>Wave Height</h3>
                    <div className={'spot--forecast--swell--chart'}>
                        <SwellChart spot={spot} data={waveData}/>
                    </div>
                </div>

                {/**Tide Chart */}
                <div className='spot--forecast--chart--wrapper'>
                    <h3>Tide</h3>
                    <div key={`tideChart_${refreshKey}`} className={tideChartLoading ? 'spot--forecast--tide--chart--loading' : 'spot--forecast--tide--chart'}>
                        <TideChart spot={spot} handleTide={handleTide} handleLoading={handleTideChartLoading}/>
                    </div>
                    <div className="tide--display">
                        <p>{tide}</p>
                        <p>{tideTime}</p>
                    </div>
                </div>

                
                
                <div className='spot--forecast--chart--wrapper--small'>
                   
                    {/**Crowd Chart */}
                    <div className='spot--forecast--chart--wrapper'>
                        <h3>Crowd</h3>
                        <div key={`crowdChart_${refreshKey}`} className={crowdLoading ? 'spot--forecast--crowd--loading' : 'spot--forecast--crowd--wrapper'}>
                            <CrowdChart spot={spot} handleLoading={handleCrowdLoading}/>
                        </div>
                    </div>

                    {/**Extended Forecast */}
                </div>
            </div>
        </div>
    )
}