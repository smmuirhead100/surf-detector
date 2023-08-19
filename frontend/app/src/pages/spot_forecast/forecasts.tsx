import ForecastCard from "./forecastCard"
import ParseWaveData from "../../utils/parseWaveData"
import ParseRatingData from "../../utils/parseRatingData"
import './style/forecasts.css'

export default function Forecasts(props) {
    if (!props.waveData || !props.ratingData) {
        return <p>Loading</p>
    }
    const forecastData = ParseWaveData(props.waveData)
    console.log(props.waveData)
    console.log(forecastData)
    const cards = forecastData.map((data)=> {
        return <ForecastCard data={data}/>
    })

    return (
        <div className="forecasts">
            {cards}
        </div>
    )
}