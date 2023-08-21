import './style/spotForecast.css'
import SwellChart from './swellChart'
import GeneralNavbar from './generalNavbar'
import TideChart from './tideChart'
import SpotHeader from './spotHeader'
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
    const [windData, setWindData] = useState(null)
    const [ratingData, setRatingData] = useState(null)
    const [tideData, setTideData] = useState(null)
    const [tide, setTide] = useState(null)
    const [tideTime, setTideTime] = useState(null)
    const [crowdLoading, setCrowdLoading] = useState(true)
    const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key to trigger component remount
    const [minTimestamp, setMinTimestamp] = useState(0)
    const [maxTimestamp, setMaxTimestamp] = useState(0)
    
    console.log(windData)
    // Fetch wave data from API.
    useEffect(() => {
        fetch(`https://goldfish-app-qsewy.ondigitalocean.app/wave?spot=${spot}`)
          .then(response => response.json())
          .then(data => {
            setWaveData(data);
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

    function changeCurrDay(minTimestamp, maxTimestamp) {
        setMinTimestamp(minTimestamp)
        setMaxTimestamp(maxTimestamp)
    }
    
    // Functions to handle the loading of data.
    function handleTide(tide: number, time: string) {
        setTide(tide)
        setTideTime(time)
    }

    function handleCrowdLoading() {
        setCrowdLoading(false)
    }

    function changeSpot(path){
        if (spot == path) {
            return;
        }
        else {
        setRefreshKey(refreshKey + 1); // Increment the refresh key
        setWaveData(null)
        setTideData(null)
        navigate(`/forecast?spot=${path}`)
        }
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
                </div>

                <div className='spot--forecast--chart--wrapper' style={{ position: 'sticky'}}>
                    <Forecasts waveData={waveData} ratingData={ratingData} changeCurrDay={changeCurrDay}/>
                </div>


                <div className='spot--forecast--chart--wrapper--small'>
                    {/**Swell Chart */}
                    <div className='spot--forecast--chart--wrapper'>
                        <h3>Wave Height</h3>
                        <div key={`swellChart_${refreshKey}`} className='spot--forecast--swell--chart'>
                            <SwellChart spot={spot} data={waveData} minTimestamp={minTimestamp} maxTimestamp={maxTimestamp}/>
                        </div>
                    </div>

                    {/**Tide Chart */}
                    <div className='spot--forecast--chart--wrapper'>
                        <h3 className='tide--header'>Tide<span style={!tideData ? {color: '#D1D1D1', backgroundColor: '#D1D1D1'} : null}>Height: {tide}</span><span style={!tideData ? {color: '#D1D1D1', backgroundColor: '#D1D1D1'} : null}>Time: {tideTime?.split(' ')[1]}</span></h3>
                        <div key={`tideChart_${refreshKey}`} className='spot--forecast--tide--chart'>
                            <TideChart spot={spot} handleTide={handleTide} minTimestamp={minTimestamp} maxTimestamp={maxTimestamp} data={tideData} />
                        </div>
                    </div>

                    {/**Wind Chart */}
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