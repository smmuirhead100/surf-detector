import './style/forecastCard.css'

export default function ForecastCard(props: any) {
  const ratingDict = {0: 'red', 1: 'red', 2:'orange', 3: 'green', 4: 'green', 5: 'purple', 6: 'purple'}
  function backgroundColor(val : number) {
    return ratingDict[val]
  }

  return (
    <div className='forecastCard'>
        
        <div className='date--container'>
          <div className='month'>{props.data.date.month}</div>
          <div className='day'>{props.data.date.day}</div>
        </div>
        
        <div className='reports'>
          <div className='report--container'>
            <div className='height' style={{backgroundColor: backgroundColor(props.data.rating.AM)}}>{props.data.am.min} - {props.data.am.max}ft.</div>
            <div>AM</div>
          </div>
          <div className='report--container'>
            <div className='height' style={{backgroundColor: backgroundColor(props.data.rating.NOON)}}>{props.data.noon.min} - {props.data.noon.max}ft.</div>
            <div>NOON</div>
          </div>
          <div className='report--container'>
            <div className='height' style={{backgroundColor: backgroundColor(props.data.rating.PM)}}>{props.data.pm.min} - {props.data.pm.max}ft.</div>
            <div>PM</div>
          </div>
            
        </div>
    </div>
  )
}