import './style/crowdChart.css';
import { useEffect, useState } from "react";
import loading from '../../assets/loading.gif';
import unixToTime from '../../utils/unixToTime';

export default function CrowdChart(props: any) {
  const [crowdData, setCrowdData] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('getting wave data');
    fetch(`https://goldfish-app-qsewy.ondigitalocean.app/crowd?spot=${props.spot}`)
      .then(response => response.json())
      .then(data => {
        const latestData = data[data.length - 1]['crowd'] > data[data.length - 2]['crowd']
          ? data[data.length - 1]
          : data[data.length - 2];

        setCrowdData(latestData);
        setIsLoading(false);
        props.handleLoading();
      })
      .catch(error => {
        props.handleLoading()
        setIsLoading(false)
        console.log(error)
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className='loadingChartWrapper' key='loading'>
          <div className='loadingChart'>
            <img src={loading} alt='Loading' />
            <h2>Loading</h2>
          </div>
        </div>
      ) : (
        <div className='crowdChart' key='crowdChart'>
          {crowdData ? (
            <>
              <p>There are currently <span>{crowdData['crowd']}</span> surfers in the water.</p>
              <div className='crowd--chart--updated'>
                Last updated at {unixToTime(crowdData['timestamp'])}
              </div>
            </>
          ) : (
            <p>There is currently no crowd data available for this spot.</p>
          )}
        </div>
      )}
    </div>
  );
}
