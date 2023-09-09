import WindChart from "./windChart"
import InfoBox from "../../components/infoBox"
import { useState } from 'react'
import convertTime from "../../utils/convertTime"
import windArrow from "../../assets/windArrow.svg"

export default function WindForecast(props: any) {
    const [time, setTime] = useState(0)
    const [wind, setWind] = useState({directionRelation: null, speed: null, direction: null})
    const rotationAngle = wind.direction !== null ? wind.direction : 0;

    function changeTime(t) {
        setTime(t)
    }

    function changeWind(w) {
        if (w != null && typeof w.speed === 'number') {
            w.speed = w.speed.toFixed(2);
        }
        setWind(w);
    }
    
    const display = <div className="flex flex-col items-center">
                        <div className="flex items-center">
                            <img src={windArrow} className="w-7" style={{ transform: `rotate(${rotationAngle}deg)`}}/>
                            {wind.speed} mph
                        </div>
                        <div className="text-10">{wind.directionRelation}</div>
                    </div>
    return (
        <div className='flex flex-col p-3'>
            <div className="text-2xl text-gray-600">Wind</div>
            <div className='info'>
                <InfoBox title={convertTime(time)} content={display}/>
            </div>
            {props.spot && props.minTimestamp && props.maxTimestamp && props.data && props.spot ?
                <WindChart spot={props.spot} changeWind={changeWind} minTimestamp={props.minTimestamp} maxTimestamp={props.maxTimestamp} data={props.data} changeTime={changeTime}/> :
                <p>loading</p>
            }
      </div>
    )
}