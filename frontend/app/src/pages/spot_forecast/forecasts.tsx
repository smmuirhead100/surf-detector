import ForecastCard from "./forecastCard"
import ParseWaveData from "../../utils/parseWaveData"
import ParseRatingData from "../../utils/parseRatingData"
import './style/forecasts.css'

export default function Forecasts(props: any) {
    if (!props.waveData || !props.ratingData) {
        return <p>Loading</p>
    }

    const waveData = ParseWaveData(props.waveData);
    const ratingData = ParseRatingData(props.ratingData); // Use type assertion

    const combinedData = waveData.map(wave => {

        const matchingRating = ratingData.find(rating =>
            rating.date.month === wave.date.month && rating.date.day === wave.date.day
        );
        
        return {
            ...wave,
            rating: matchingRating
        };
    });

    console.log(combinedData)
    const cards = combinedData.map((data) => (
        <ForecastCard key={`${data.date.month}-${data.date.day}`} data={data} />
    ));

    return (
        <div className="forecasts">
            {cards}
        </div>
    )
}
