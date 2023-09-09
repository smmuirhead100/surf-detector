import './style/forecastCard.css'

export default function ForecastCard(props: any) {
  const ratingDict = {0: '#FF5454', 1: '#FF5454', 2:'#E7A600', 3: '#23AE00', 4: '#166D00', 5: '#4100CA', 6: '#4100CA'}
  
  function backgroundColor(val : number) {
    return ratingDict[val]
  }

  function handleClick(){
      props.handleClick(props.data.date.month, props.data.date.day, props.data.minTimestamp, props.data.maxTimestamp)
  }

  return props.isLoading ? 
    (
        <div className='flex flex-col gap-5 border-solid border-2 border-black'>
            
            <div className='flex flex-col justify-center items-center gap-1 p-2'>
              <div className='bg-gray-400 rounded-md w-28 text-gray-400 h-10'></div>
              <div className='bg-gray-400 rounded-md w-10 text-gray-400 h-7'></div>
            </div>
            
            <div className='flex justify-evenly gap-1 p-1'>
              <div className='flex flex-col items-center gap-1'>
                <div className='bg-gray-400 rounded-md w-12 text-gray-400 h-10'></div>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <div className='bg-gray-400 rounded-md w-12 text-gray-400 h-10'></div>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <div className='bg-gray-400 rounded-md w-12 text-gray-400 h-10'></div>
              </div>
            </div>
        </div>
    )
   :
    (
        <div onClick={handleClick} className={props.selectedCard?.month == props.data.date.month && props.selectedCard?.day == props.data.date.day ? 'flex flex-col border-solid border-4 border-black rounded-lg min-h-full lg:gap-3' : 'flex flex-col border-solid border-4 border-gray-200 rounded-lg min-h-full lg:gap-3'}>
            
            <div className='flex flex-col justify-center items-center'>
              <div className='text-xl lg:text-3xl' style={props.selectedCard?.month == props.data.date.month && props.selectedCard?.day == props.data.date.day ? {color: 'black'} : {color: '#A8A6A7'}}>{props.data.date.month}</div>
              <div className='text-md lg:text-xl'><strong>{props.data.date.day}</strong></div>
            </div>
            
            <div className='flex justify-evenly gap-1 px-1'>
              <div className='flex flex-col items-center'>
                <div className='w-12 rounded-md text-sm px-1 py-1 lg:w-16 text-center text-white' style={{backgroundColor: backgroundColor(props.data.rating.AM)}}>{props.data.am.min} - {props.data.am.max}ft.</div>
                <div>AM</div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='w-12 rounded-md text-sm px-1 py-1 lg:w-16 text-white text-center' style={{backgroundColor: backgroundColor(props.data.rating.NOON)}}>{props.data.noon.min} - {props.data.noon.max}ft.</div>
                <div>NOON</div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='w-12 rounded-md text-sm px-1 py-1 lg:w-16 text-white text-center' style={{backgroundColor: backgroundColor(props.data.rating.PM)}}>{props.data.pm.min} - {props.data.pm.max}ft.</div>
                <div>PM</div>
              </div>
            </div>
        </div>
    )
}
