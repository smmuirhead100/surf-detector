import ForecastCard from "./forecastCard"
import ParseWaveData from "../../utils/parseWaveData"
import ParseRatingData from "../../utils/parseRatingData"
import { useState, useEffect } from 'react'
import './style/forecastDays.css'

export default function ForecastDays(props: any) {
    
    // Return arbitrary cards if there is no data yet, AKA the data is loading in the parent component. 
    if (!props.waveData || !props.ratingData) {
        let loadingCards = []
        for (let i=0; i < 10; i++) {
            loadingCards.push(<ForecastCard data={null} isLoading={true}/>)
        }
        return (
            <div className="flex overflow-scroll h-30 gap-5">
                {loadingCards}
            </div>
        )
    }

    // Combine data to be fed into Cards
    const [selectedCard, setSelectedCard] = useState({month: '', day: 0, minTimestamp: 0, maxTimestamp: 0})

    // In your useEffect for selectedCard, use optional chaining to avoid accessing properties on null
    useEffect(() => {
        if (selectedCard?.minTimestamp > 0) {
            props.changeCurrDay(selectedCard.minTimestamp, selectedCard.maxTimestamp, selectedCard.month, selectedCard.day);
        }
    }, [selectedCard]);

    const waveData = ParseWaveData(props.waveData);
    const ratingData = ParseRatingData(props.ratingData);
    const combinedData = waveData.map(wave => {
        const matchingRating = ratingData.find(rating =>
            rating.date.month === wave.date.month && rating.date.day === wave.date.day
        );
        return {
            ...wave,
            rating: matchingRating,
            minTimestamp: matchingRating.date.minTimestamp,
            maxTimestamp: matchingRating.date.maxTimestamp
        };
    });

    // Create the group of Cards based on combined data.
    const cards = combinedData.map((data) => (
        <ForecastCard key={`${data.date.month}-${data.date.day}`} data={data} isLoading={false} handleClick={changeSelectedCard} selectedCard={selectedCard}/>
    ));

    function changeSelectedCard(month: string, day: number, minTimestamp: number, maxTimestamp: number) {
        setSelectedCard({month, day, minTimestamp, maxTimestamp})
    }

    // Set initial selected card to be the first one
    
    useEffect(() => {
        if (cards.length > 0) {
            const initialData = cards[0].props.data;
            changeSelectedCard(initialData.date.month, initialData.date.day, initialData.minTimestamp, initialData.maxTimestamp);
        }
    }, []);

    return (
        <div className="flex overflow-scroll gap-3">
            {cards}
        </div>
    )
}
