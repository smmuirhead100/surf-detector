export default function ParseRatingData(ratingData){
    
    const organizeData = (data) => {
        const forecasts = [];
    
        const groupedData = data.reduce((acc, current) => {
        if (!current.timestamp || !current.rating || !current.rating.description) {
            console.error('Invalid data format:', current);
            return acc;
        }
    
        const date = new Date(current.timestamp * 1000);
        const day = date.toDateString();
    
        if (!acc[day]) {
            acc[day] = {
            AM: [],
            NOON: [],
            PM: []
            };
        }
    
        const hour = date.getHours();
        let period;
        if (hour >= 0 && hour < 12) {
            period = 'AM';
        } else if (hour >= 12 && hour < 18) {
            period = 'NOON';
        } else {
            period = 'PM';
        }
    
        acc[day][period].push({
            description: current.rating.description,
            value: current.rating.value,
            timestamp: current.timestamp
        });
    
        return acc;
        }, {});
    
        for (const day in groupedData) {
            const dayData = groupedData[day];
            let minTimestamp = null
            let maxTimestamp = null
            let index = 0
            while (minTimestamp == null) {     // Get the earliest possible timestamp
                minTimestamp = dayData.AM[index]?.timestamp > 0 ? dayData.AM[index]?.timestamp : null
                index ++
                if (index > 20) {
                    minTimestamp = 0
                    break;
                }
            }
            maxTimestamp = dayData.AM[dayData.AM.length-1]?.timestamp
            const avgAmRating = Math.round(dayData.AM.reduce((sum, entry) => sum + entry.value, 0) / dayData.AM.length);
            const avgNoonRating = Math.round(dayData.NOON.reduce((sum, entry) => sum + entry.value, 0) / dayData.NOON.length);
            const avgPmRating = Math.round(dayData.NOON.reduce((sum, entry) => sum + entry.value, 0) / dayData.NOON.length);
        
            forecasts.push({
                date: {month: day.split(' ')[1], day: parseInt(day.split(' ')[2]), minTimestamp: minTimestamp, maxTimestamp: maxTimestamp},
                AM: avgAmRating,
                NOON: avgNoonRating,
                PM: avgPmRating,
            });
        }
        return forecasts;
    };
    
    const processedData = organizeData(ratingData);
    
    return processedData;
    }
  