import './style/forecastCard.css'

export default function ForecastCard(props: any) {
  const ratingDict = {0: 'red', 1: 'red', 2:'orange', 3: 'green', 4: 'green', 5: 'purple', 6: 'purple'}
  
  function backgroundColor(val : number) {
    return ratingDict[val]
  }

  function handleClick(){
      props.handleClick(props.data.date.month, props.data.date.day)
  }

  return props.isLoading ? 
    (
        <div className='forecastCard' style={{borderColor: '#D1D1D1'}}>
            
            <div className='date--container'>
              <div className='month'></div>
              <div className='day'></div>
            </div>
            
            <div className='reports'>
              <div className='report--container'>
                <div className='height--loading'>AM</div>
                <div className='time--loading'>AM</div>
              </div>
              <div className='report--container'>
                <div className='height--loading'>NOON</div>
                <div className='time--loading'>NOON</div>
              </div>
              <div className='report--container'>
                <div className='height--loading'>PM</div>
                <div className='time--loading'>PM</div>
              </div>
            </div>
        </div>
    )
   :
    (
        <div className='forecastCard' onClick={handleClick} style={props.selectedCard?.month == props.data.date.month && props.selectedCard?.day == props.data.date.day ? {border: 'solid black 3px'} : {border: 'solid black 1px'}}>
            
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
