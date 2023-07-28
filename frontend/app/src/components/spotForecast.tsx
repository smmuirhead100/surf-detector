import './style/spotForecast.css'
import SwellChart from './swellChart'
import GeneralNavbar from './generalNavbar'
import TideChart from './tideChart'
import { useState } from 'react'

export default function SpotForecast(props: any) {
    const [tide, setTide] = useState(null)
    const [tideTime, setTideTime] = useState(null)
    
    function handleTide(tide: number, time: string) {
        setTide(tide)
        setTideTime(time)
    }
    return (
        <div className="spot--forecast--wrapper">
            <GeneralNavbar />
            <div className="spot--forecast--content">
               
                <div className='spot--forecast--chart--wrapper'>
                    <h3>Wave Height</h3>
                    <div className='spot--forecast--chart'>
                        <SwellChart spot={props.spot}/>
                    </div>
                </div>

                <div className='spot--forecast--chart--wrapper'>
                    <h3>Tide</h3>
                    <div className='spot--forecast--chart'>
                        <TideChart spot={props.spot} handleTide={handleTide}/>
                    </div>
                    <div className="tide--display">
                        <p>{tide}</p>
                        <p>{tideTime}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}