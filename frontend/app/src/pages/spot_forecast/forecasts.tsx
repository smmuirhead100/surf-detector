import ForecastCard from "./forecastCard"
import ParseWaveData from "../../utils/parseWaveData"
import './style/forecasts.css'

export default function Forecasts(props) {
    console.log(props.waveData)
    if (!props.waveData) {
        return <p>Loading</p>
    }
    const forecastData = ParseWaveData(props.waveData)
    const cards = forecastData.map((data)=> {
        return <ForecastCard data={data}/>
    })

    return (
        <div className="forecasts">
            {cards}
        </div>
    )
}