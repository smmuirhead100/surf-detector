import SwellChart from "./swellChart"
import convertTime from "../../utils/convertTime.tsx"
import './style/dayForecast.css'
import { useState, useEffect } from "react"
import InfoBox from '../../components/infoBox.tsx'

export default function DayForecast(props: any) {
    const[height, setHeight] = useState(null)
    const[rating, setRating] = useState(null)
    const [time, setTime] = useState([null])
    const[windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        // Define a function to update the windowWidth state
        const updateWindowWidth = () => {
          setWindowWidth(window.innerWidth);
        };
    
        // Attach the event listener when the component mounts
        window.addEventListener('resize', updateWindowWidth);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', updateWindowWidth);
        };
      }, []); 

    useEffect(() => {

    }, )
    function changeHeight(h) {
        setHeight(h)
    }

    function changeRating(r) {
        setRating(r)
    }

    function changeTime(t) {
        setTime(t)
    }
    return (
        <div className="day--forecast--container">
            <div className="day--forecast">
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#A8A6A7'}}>Forecast</div>
                <div style={{ fontSize: '2rem', fontWeight: 'normal', color: '#A8A6A7'}}>{props.currDay}</div>
                <div className={windowWidth > 1255 ? "chart" : "chart--mobile"}>
                    <SwellChart spot={props.spot} data={props.data} ratingData={props.ratingData} minTimestamp={props.minTimestamp} maxTimestamp={props.maxTimestamp} changeHeight={changeHeight} changeRating={changeRating} changetime={changeTime}/>
                </div>
            </div>
            <div className={windowWidth > 1534 ? "info" : "info--mobile"}>
                <InfoBox title="Height" content={<div style={{ color: 'black'}}>{height} feet</div>}/>
                <InfoBox title="Conditions" content={<div>{rating}</div>}/>
                <InfoBox title="Time" content={<div>{convertTime(time[0])}</div>}/>
            </div>
        </div>
    )
}