import './style/crowdChart.css'
import { useEffect, useState} from "react";
import loading from '../assets/loading.gif'
import unixToTime from '../utils/unixToTime';

export default function CrowdChart(props: any) {
  const [crowdData, setCrowdData] = useState([]); // Data to be used for chart. 
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch wave data from API
    console.log('getting wave data')
    fetch(`https://goldfish-app-qsewy.ondigitalocean.app/crowd?spot=${props.spot}`)
      .then(response => response.json())
      .then(data => {
        setCrowdData(() => {
            let res = data[data.length - 1]['crowd'] > data[data.length - 2]['crowd'] ? data[data.length - 1] : data[data.length - 2]
            return res
        });
        setIsLoading(false); // Set loading state to false
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <div>
      {isLoading ? 
          <div className='loadingChartWrapper'>
            <div className='loadingChart'>
                <img src={loading}/>
                <h2>Loading</h2>
            </div> 
          </div>
          : 
          <div className='crowdChart'>
              <p>There are currently <span>{crowdData['crowd']}</span> surfers in the water.</p>
              <div className='crowd--chart--updated'>
                    Last updated at {unixToTime(crowdData['timestamp'])}
              </div>
          </div>}
    </div>
  );
}