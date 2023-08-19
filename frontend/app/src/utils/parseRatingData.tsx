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
            value: current.rating.value
        });
    
        return acc;
        }, {});
    
        for (const day in groupedData) {
        const dayData = groupedData[day];
    
        forecasts.push({
            date: {month: day.split(' ')[1], day: parseInt(day.split(' ')[2])},
            AM: dayData.AM,
            NOON: dayData.NOON,
            PM: dayData.PM
        });
        }
    
        return forecasts;
    };
    
    const processedData = organizeData(ratingData);
    
    console.log(processedData);
    }
  