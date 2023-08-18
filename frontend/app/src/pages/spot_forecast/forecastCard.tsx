import { useState, useEffect } from 'react'

export default function ForecastCard(props: any) {
  const [waveData, setWaveData] = useState([]); // Data to be used for chart. 

  useEffect(() => {
    // Fetch wave data from API
    console.log('getting wave data')
    fetch(`https://goldfish-app-qsewy.ondigitalocean.app/wave?spot=${props.spot}`)
      .then(response => response.json())
      .then(data => {
        setWaveData(data);
      })
      .catch(error => console.log(error))
  }, []);


  return (
    <p>hi</p>
  )
}