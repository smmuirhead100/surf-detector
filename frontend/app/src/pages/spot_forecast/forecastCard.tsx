import './style/forecastCard.css'

export default function ForecastCard(props: any) {

  return (
    <div className='forecastCard'>
        
        <div className='date--container'>
          <div className='month'>{props.data.date.month}</div>
          <div className='day'>{props.data.date.day}</div>
        </div>
        
        <div className='reports'>
          <div className='report--container'>
            <div className='height'>{props.data.am.min} - {props.data.am.max}ft.</div>
            <div>AM</div>
          </div>
          <div className='report--container'>
            <div className='height'>{props.data.noon.min} - {props.data.noon.max}ft.</div>
            <div>NOON</div>
          </div>
          <div className='report--container'>
            <div className='height'>{props.data.pm.min} - {props.data.pm.max}ft.</div>
            <div>PM</div>
          </div>
            
        </div>
    </div>
  )
}