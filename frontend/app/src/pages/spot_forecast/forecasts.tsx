import ForecastCard from "./forecastCard"
import ParseWaveData from "../../utils/parseWaveData"
import ParseRatingData from "../../utils/parseRatingData"
import { useEffect, useState } from 'react'
import './style/forecasts.css'

export default function Forecasts(props: any) {
    
    // Return arbitrary cards if there is no data yet, AKA the data is loading in the parent component. 
    if (!props.waveData || !props.ratingData) {
        let loadingCards = []
        for (let i=0; i < 10; i++) {
            loadingCards.push(<ForecastCard data={null} isLoading={true}/>)
        }
        return (
            <div className="forecasts">
                {loadingCards}
            </div>
        )
    }

    // Combine data to be fed into Cards
    const[selectedCard, setSelectedCard] = useState(null)
    const waveData = ParseWaveData(props.waveData);
    const ratingData = ParseRatingData(props.ratingData);
    const combinedData = waveData.map(wave => {
        const matchingRating = ratingData.find(rating =>
            rating.date.month === wave.date.month && rating.date.day === wave.date.day
        );
        return {
            ...wave,
            rating: matchingRating
        };
    });

    // Create the group of Cards based on combined data.
    const cards = combinedData.map((data) => (
        <ForecastCard key={`${data.date.month}-${data.date.day}`} data={data} isLoading={false} handleClick={changeSelectedCard} selectedCard={selectedCard}/>
    ));

    function changeSelectedCard(month: string, day: number) {
        setSelectedCard({month, day})
        console.log(selectedCard)
    }

    return (
        <div className="forecasts">
            {cards}
        </div>
    )
}
