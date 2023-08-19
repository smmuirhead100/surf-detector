export default function ParseWaveData(waveData) {

  const organizeData = (data) => {
    const forecasts = [];
    
    const months = {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to beginning of today
    
    const groupedData = data.reduce((acc, current) => {
      if (!current.timestamp || !current.surf || !current.surf.min || !current.surf.max) {
        console.error('Invalid data format:', current);
        return acc;
      }

      const date = new Date(current.timestamp * 1000);
      
      // Compare the timestamp's date with today's date
      if (date >= today) {
        const month = date.getMonth();
        const day = date.getDate();
        const key = `${month}-${day}`; // Combine month and day to form a unique key

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(current);
      }

      return acc;
    }, {});

    for (const key in groupedData) {
      const dayData = groupedData[key];
      console.log(dayData)
      const [monthStr, dayStr] = key.split('-');
      const month = parseInt(monthStr);
      const day = parseInt(dayStr);

      const amData = dayData.filter(entry => {
        const hour = new Date(entry.timestamp * 1000).getHours();
        return hour >= 4 && hour < 10;
      });
      const noonData = dayData.filter(entry => {
        const hour = new Date(entry.timestamp * 1000).getHours();
        return hour >= 10 && hour < 14;
      });
      const pmData = dayData.filter(entry => {
        const hour = new Date(entry.timestamp * 1000).getHours();
        return hour >= 14 && hour <= 21;
      });
  
      const amAvgMinHeight =
        Math.round(amData.reduce((sum, entry) => sum + entry.surf.min, 0) / amData.length);
      const amAvgMaxHeight =
        Math.round(amData.reduce((sum, entry) => sum + entry.surf.max, 0) / amData.length);
  
      const noonAvgMinHeight =
        Math.round(noonData.reduce((sum, entry) => sum + entry.surf.min, 0) / noonData.length);
      const noonAvgMaxHeight =
        Math.round(noonData.reduce((sum, entry) => sum + entry.surf.max, 0) / noonData.length);
  
      const pmAvgMinHeight =
        Math.round(pmData.reduce((sum, entry) => sum + entry.surf.min, 0) / pmData.length);
      const pmAvgMaxHeight =
        Math.round(pmData.reduce((sum, entry) => sum + entry.surf.max, 0) / pmData.length);
  
      forecasts.push({
        date: { month: months[month + 1], day },
        am: { min: amAvgMinHeight, max: amAvgMaxHeight },
        noon: { min: noonAvgMinHeight, max: noonAvgMaxHeight },
        pm: { min: pmAvgMinHeight, max: pmAvgMaxHeight },
      });
    }
  
    return forecasts;
  };

  const processedData = waveData.length > 0 ? organizeData(waveData) : [];

  return processedData;
}
