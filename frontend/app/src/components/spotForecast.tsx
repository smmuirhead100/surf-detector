import './style/spotForecast.css'
import SwellChart from './swellChart'
import GeneralNavbar from './generalNavbar'
import TideChart from './tideChart'
import SpotHeader from './spotHeader'
import ProfileHeader from './profileHeader'
import CrowdChart from './crowdChart'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SpotForecast() {
    const queryParameters = new URLSearchParams(window.location.search)
    const spot = queryParameters.get("spot")
    const [tide, setTide] = useState(null)
    const [tideTime, setTideTime] = useState(null)
    const [swellChartLoading, setSwellChartLoading] = useState(true)
    const [tideChartLoading, setTideChartLoading] = useState(true)
    const [crowdLoading, setCrowdLoading] = useState(true)
    const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key to trigger component remount
    const navigate = useNavigate()
    
    function handleTide(tide: number, time: string) {
        setTide(tide)
        setTideTime(time)
    }

    function handleSwellChartLoading() {
        setSwellChartLoading(false)
    }

    function handleTideChartLoading() {
        setTideChartLoading(false)
    }

    function handleCrowdLoading() {
        setCrowdLoading(false)
    }

    function changeSpot(path){
        setRefreshKey(refreshKey + 1); // Increment the refresh key
        setSwellChartLoading(true)
        setTideChartLoading(true)
        navigate(`/forecast${path}`)
    }
   
    return (
        <div className="spot--forecast--wrapper">
            
            <div className="general--navbar--wrapper">
                <GeneralNavbar changeSpot={changeSpot}/>
            </div>
            
            <div className="spot--forecast--content">
                
                {/**Spot Title */}
                <div className='spot--forecast--header--wrapper'>
                    <SpotHeader spot={spot} />
                    <ProfileHeader />
                </div>

                {/**Swell Chart */}
                <div className='spot--forecast--chart--wrapper'>
                    <h3>Wave Height</h3>
                    <div key={`swellChart_${refreshKey}`} className={swellChartLoading ? 'spot--forecast--swell--chart--loading' : 'spot--forecast--swell--chart'}>
                        <SwellChart spot={spot} handleLoading={handleSwellChartLoading}/>
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

                <div className='spot--forecast--chart--wrapper'>
                    <div>test</div>
                </div>
             


            </div>
        </div>
    )
}