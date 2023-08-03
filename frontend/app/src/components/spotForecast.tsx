import './style/spotForecast.css'
import SwellChart from './swellChart'
import GeneralNavbar from './generalNavbar'
import TideChart from './tideChart'
import SpotHeader from './spotHeader'
import ProfileHeader from './profileHeader'
import CrowdChart from './crowdChart'
import { useState } from 'react'

export default function SpotForecast(props: any) {
    const [tide, setTide] = useState(null)
    const [tideTime, setTideTime] = useState(null)
    const [swellChartLoading, setSwellChartLoading] = useState(true)
    const [tideChartLoading, setTideChartLoading] = useState(true)
    const [crowdLoading, setCrowdLoading] = useState(true)
    
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
   
    return (
        <div className="spot--forecast--wrapper">
            
            <div className="general--navbar--wrapper">
                <GeneralNavbar />
            </div>
            
            <div className="spot--forecast--content">
                
                {/**Spot Title */}
                <div className='spot--forecast--header--wrapper'>
                    <SpotHeader spot={props.spot} />
                    <ProfileHeader />
                </div>

                {/**Swell Chart */}
                <div className='spot--forecast--chart--wrapper'>
                    <h3>Wave Height</h3>
                    <div className={swellChartLoading ? 'spot--forecast--swell--chart--loading' : 'spot--forecast--swell--chart'}>
                        <SwellChart spot={props.spot} handleLoading={handleSwellChartLoading}/>
                    </div>
                </div>

                {/**Tide Chart */}
                <div className='spot--forecast--chart--wrapper'>
                    <h3>Tide</h3>
                    <div className={tideChartLoading ? 'spot--forecast--tide--chart--loading' : 'spot--forecast--tide--chart'}>
                        <TideChart spot={props.spot} handleTide={handleTide} handleLoading={handleTideChartLoading}/>
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
                        <div className={crowdLoading ? 'spot--forecast--crowd--loading' : 'spot--forecast--crowd--wrapper'}>
                            <CrowdChart spot={props.spot} handleLoading={handleCrowdLoading}/>
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