export default function ParseWaveData(waveData) {

  const organizeData = (data) => {
    const forecasts = [];
    
    const getMonthAbbreviation = (date) => {
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      return months[date.getMonth()];
    };

    const groupedData = data.reduce((acc, current) => {
      if (!current.timestamp || !current.surf || !current.surf.min || !current.surf.max) {
        console.error('Invalid data format:', current);
        return acc;
      }
  
      const date = new Date(current.timestamp * 1000);
      const day = date.getDate();
  
      if (!acc[day]) {
        acc[day] = [];
      }
  
      acc[day].push(current);
  
      return acc;
    }, {});
  
    for (const day in groupedData) {
      const dayData = groupedData[day];
  
      const amData = dayData.slice(0, 3); // First 3 entries for AM
      const noonData = dayData.slice(3, 6); // Next 3 entries for NOON
      const pmData = dayData.slice(6, 9); // Last 3 entries for PM
  
      const amAvgMinHeight =
        amData.reduce((sum, entry) => sum + entry.surf.min, 0) / amData.length;
      const amAvgMaxHeight =
        amData.reduce((sum, entry) => sum + entry.surf.max, 0) / amData.length;
  
      const noonAvgMinHeight =
        noonData.reduce((sum, entry) => sum + entry.surf.min, 0) / noonData.length;
      const noonAvgMaxHeight =
        noonData.reduce((sum, entry) => sum + entry.surf.max, 0) / noonData.length;
  
      const pmAvgMinHeight =
        pmData.reduce((sum, entry) => sum + entry.surf.min, 0) / pmData.length;
      const pmAvgMaxHeight =
        pmData.reduce((sum, entry) => sum + entry.surf.max, 0) / pmData.length;
  
      forecasts.push({
        date: { month: getMonthAbbreviation(new Date(waveData[0].timestamp * 1000)), day: +day },
        am: { avgMinHeight: amAvgMinHeight, avgMaxHeight: amAvgMaxHeight },
        noon: { avgMinHeight: noonAvgMinHeight, avgMaxHeight: noonAvgMaxHeight },
        pm: { avgMinHeight: pmAvgMinHeight, avgMaxHeight: pmAvgMaxHeight },
      });
    }
  
    return forecasts;
  };

    const processedData = waveData.length>0 ? organizeData(waveData) : console.log('error, no data fed to parseWaveData')

    return processedData
}
