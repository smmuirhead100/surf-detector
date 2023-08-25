import SwellChart from "./swellChart"
import convertTime from "../../utils/convertTime.tsx"
import './style/dayForecast.css'
import { useState, useEffect } from "react"
import InfoBox from '../../components/infoBox.tsx'

export default function DayForecast(props: any) {
    const[height, setHeight] = useState('-')
    const[rating, setRating] = useState('-')
    const[windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        setRating('-')
        setHeight('-')
        props.currTime ? null : props.setCurrTime(['-'])
    }, [props.spot])
    
    useEffect(() => {
        // Define a function to update the windowWidth state
        const updateWindowWidth = () => {
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', updateWindowWidth);
        return () => {
          window.removeEventListener('resize', updateWindowWidth);
        };
      }, []); 

    function changeHeight(h) {
        return h == '-' ? setHeight(h) : setHeight(`${h} feet`)
    }

    function changeRating(r) {
        setRating(r)
    }

    function changeTime(t) {
        props.changeCurrTime(t)
    }

    return (
        <div className="day--forecast--container">
            <div className="day--forecast">
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#A8A6A7'}}>Forecast</div>
                <div style={{ fontSize: '2rem', fontWeight: 'normal', color: '#A8A6A7'}}>{props.currDay}</div>
                <div className={windowWidth > 1300 ? "chart" : "chart--mobile"}>
                    <SwellChart spot={props.spot} data={props.data} ratingData={props.ratingData} minTimestamp={props.minTimestamp} maxTimestamp={props.maxTimestamp} changeHeight={changeHeight} changeRating={changeRating} changetime={changeTime}/>
                </div>
            </div>
            <div className={windowWidth > 1534 ? "info" : "info--mobile"}>
                <InfoBox title="Height" content={<div style={{ color: 'black'}}>{height}</div>}/>
                <InfoBox title="Conditions" content={<div>{rating}</div>}/>
                <InfoBox title="Time" content={<div>{convertTime(props.currTime[0])}</div>}/>
            </div>
        </div>
    )
}